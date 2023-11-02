// @ts-ignore
import { useMountPoint } from "@template-ui/main";
// @ts-ignore
import { useAuth } from "@template-ui/auth";

import { createDatabase } from '../models/db';

const Component = () => {
  const { items } = useMountPoint("db-load");
  const { getJwtToken } = useAuth();

  // console.log('db-load:', items);

  (items || []).map((metadata: any) => {
    return createDatabase(metadata, getJwtToken);
  });

  return null;
};

export default Component;
