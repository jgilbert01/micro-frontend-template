import React from "react";
import { useQueryClient } from "react-query";
import axios from "axios";

// @ts-ignore
import { useMountPoint } from "@template-ui/main";
// @ts-ignore
import { useAuth } from "@template-ui/auth";

const Component = () => {
  const { items } = useMountPoint("db-prefetch");
  const { getJwtToken } = useAuth();
  const queryClient = useQueryClient();

  // const items: any = [
  //   {
  //     queryKey: ["lovs", "division"],
  //     queryUrl: "https://u4pmubwtg1.execute-api.us-west-2.amazonaws.com/stg/lovs/division"
  //     permissions
  //   },
  //   {
  //     queryKey: ["lovs", "state"],
  //     queryUrl: "https://u4pmubwtg1.execute-api.us-west-2.amazonaws.com/stg/lovs/state"
  //   },
  // ];
  // console.log('items: ', items);

  items.map((i: any) => {
    // console.log("prefetch: ", i);
    /* istanbul ignore next */
    if (i.queryKey === undefined || i.queryUrl === undefined) {
      console.error("incomplete prefetch config for: ", i);
      return Promise.resolve();
    }

    return queryClient.prefetchQuery(
      i.queryKey,
      async () =>
        axios
          .get(
            i.queryUrl.replace("LOV_SERVICE_URL", process.env.LOV_SERVICE_URL),
            {
              headers: {
                Authorization: `Bearer ${await getJwtToken()}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((resp: any) => {
            return resp.data.data;
          }),
      {
        cacheTime: Infinity,
        staleTime: 24 * 60 * 60 * 1000, // 24 hours
        ...i.queryOptions,
      }
    );
  });

  return null;
};

export default Component;
