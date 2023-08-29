import { getDatabase } from '../models/db';

const useDatabase = (name: string) => {
  return getDatabase(name);
};

export default useDatabase;
