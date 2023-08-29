import axios from "axios";
import { useQuery } from "react-query";

// @ts-ignore
import { useMountPoint } from "@template-ui/main";
// @ts-ignore
import { useAuth } from "@template-ui/auth";

import { getDatabase } from '../models/db';

const Component = () => {
  const { items } = useMountPoint("db-subscriptions");
  const { getJwtToken } = useAuth();

  // TODO subscribe in service on 1st polling
  // TODO unsubscribe on signout and/or cloudwatch alarm if oldest message is > 2hrs

  useQuery(
    'long-polling',
    query(items, getJwtToken),
    {
      cacheTime: 0,
      staleTime: 0,
      refetchInterval: (data: any) => data?.length ? 0 : 10,
      // enabled: true, // TODO en/disable via localstorage
    },
  );

  return null;
};

export default Component;

const query = (items: any, getJwtToken: any) => async () =>
  axios
    // @ts-ignore
    .get(process.env.LIVE_DATA_URL, {
      headers: {
        Authorization: `Bearer ${await getJwtToken()}`,
        "Content-Type": "application/json",
      },
      timeout: 21000,
    })
    .then(async (resp: any) => {
      // console.log('long polling: ', JSON.stringify(resp.data, null, 2))
      await Promise.all(resp.data.data
        .map(async (event: any) => {
          return items
            .filter((sub: any) => event.type === sub.eventType)
            .map((sub: any) => {
              const db = getDatabase(sub.database);
              return db[sub.table].put({ ...event.raw.new, latched: true });
            });
        }));

        return resp.data.data;
    });
