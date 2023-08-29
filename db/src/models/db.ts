import Dexie from 'dexie';
import 'dexie-observable';
import axios from 'axios';

import { now } from '../utils';

// ------------------
// db registration
// ------------------

export class Db extends Dexie {
  constructor(metadata: any, getJwtToken: any) {
    super(metadata.name);
    const db: any = this;
    db.metadata = metadata;

    db.version(metadata.version || 1)
      .stores(Object.keys(db.metadata.tables)
        .reduce((a, c) => ({
          ...a,
          [c]: db.metadata.tables[c].schema,
        }), {}));

    db.on('ready', onReady(db, getJwtToken))
    db.on('changes', onChange(db, getJwtToken))
  }
};

const DATABASES: any = {};
export const getDatabase = (name: string) => DATABASES[name];
export const createDatabase = (metadata: any, getJwtToken: any) => {
  DATABASES[metadata.name] = new Db(metadata, getJwtToken);
};

// ------------------
// load and prun
// ------------------

const onReady = (db: any, getJwtToken: any) => async () => {
  // console.log(`${db.metadata.name} is ready`);
  const loaded = await load(db, getJwtToken);
  console.log(`${db.metadata.name} loaded = ${loaded}`);

  const pruned = await prune(db);
  console.log(`${db.metadata.name} pruned = ${JSON.stringify(pruned, null, 2)}`);
};

const load = async (db: any, getJwtToken: any) => {
  // console.log(`${db.metadata.name} is loading`);
  return Promise.all(
    Object.keys(db.metadata.tables)
      .filter((tableName: string) => db.metadata.tables[tableName].load)
      .map((tableName: string) => {
        // console.log(`loading: ${tableName}`);
        return query(db.metadata.tables[tableName].load, getJwtToken)
          .then((data: any) => {
            // console.log(`loading: ${JSON.stringify(data, null, 2)}`);
            return db[tableName].bulkPut(
              data.map((r: any) => ({ ...r, latched: true })),
              undefined,
              { allKeys: true },
            );
          });
      })
  );
};

const query = async (route: string, getJwtToken: any) =>
  axios.get(`${route}`,
    {
      headers: {
        Authorization: `Bearer ${await getJwtToken()}`,
        'Content-Type': 'application/json',
      },
      timeout: 5000,
    }
  )
    .then((resp) => {
      // TODO pagination support - &limit=500&last=${resp.data.last}
      return resp.data.data;
    });

const prune = async (db: any) => {
  // console.log(`${db.metadata.name} is pruning`);
  // console.log(JSON.stringify(db.metadata, null, 2));
  return Promise.all(
    Object.keys(db.metadata.tables)
      .filter((tableName: string) => db.metadata.tables[tableName].prune)
      .filter((tableName: string) => db.metadata.tables[tableName].schema.includes('timestamp'))
      .map((tableName: string) => {
        // console.log(`pruning: ${tableName}`);
        const cutoff = now() - db.metadata.tables[tableName].prune;
        // console.log(`cutoff: ${cutoff}`);
        return db[tableName]
          .where('timestamp')
          .below(cutoff)
          .delete();
      })
  );
};

// ------------------
// write thru to BFFs
// ------------------

const onChange = (db: any, getJwtToken: any) => async (changes: any) => {
  // console.log('onChange: ', JSON.stringify(changes, null, 2));

  return Promise.all(
    changes
      // ignore if no sync endpoint
      .filter((change: any) => db.metadata.tables[change.table].sync)
      // ignore if latched
      .filter((change: any) => change.obj && !change.obj.latched)
      // using soft delete to identify real deletes vs cache clear
      .filter((change: any) => change.type < 3)

      // sync 
      // TODO may need to group rapid changes to the same entity
      .map(async (change: any) => {
        console.log('Write-thru for: ', JSON.stringify(change, null, 2));
        return await axios[change.obj.deleted ? 'delete' : 'put'](
          `${db.metadata.tables[change.table].sync}/${change.obj.id}`,
          change.obj,
          {
            headers: {
              Authorization: `Bearer ${await getJwtToken()}`,
              'Content-Type': 'application/json',
            },
            timeout: 5000,
          }
        );
      })
  );
};
