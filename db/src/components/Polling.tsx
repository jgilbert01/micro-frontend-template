import { useQueries } from "react-query";
import axios from "axios";

// @ts-ignore
import { useMountPoint } from "@template-ui/main";
// @ts-ignore
import { useAuth } from "@template-ui/auth";

const Component = () => {
  const { items } = useMountPoint("db-polling");
  const { getJwtToken } = useAuth();

  // const items: any = [
  //   {
  //     isInfinite: false,
  //     queryKey: ["`${currentOrganization.id}`", "tasks"],
  //     queryUrl: "`https://x2f5ylnw4h.execute-api.us-west-2.amazonaws.com/stg/tasks?org=${currentOrganization.id}`",
  //     queryOptions: {},
  //   },
  // ];
  // console.log('items: ', items);

  useQueries(
    items.map((i: any) => ({
      queryKey: i.queryKey,
      queryFn: async () =>
        axios
          // @ts-ignore
          .get(i.queryUrl, {
            headers: {
              Authorization: `Bearer ${await getJwtToken()}`,
              "Content-Type": "application/json",
            },
          })
          .then((resp: any) => {
            return resp.data.data;
          }),
      ...{
        cacheTime: 5 * 60 * 1000, // 5 minutes
        staleTime: 45 * 1000, // 45 seconds
        refetchInterval: 45 * 1000, // 45 seconds
        ...i.queryOptions,
      },
    }))
  );

  return null;
};

export default Component;
