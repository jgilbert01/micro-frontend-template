import React from "react";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import RefreshingSpinner from "./components/RefreshingSpinner";
import Prefetch from "./components/Prefetch";
import Polling from "./components/Polling";
import LongPolling from "./components/LongPolling";

export default (props: any) => {
  return (
    <QueryClientProvider client={props.queryClient} contextSharing>
      <RefreshingSpinner />
      <Prefetch />
      <Polling />
      <LongPolling /> 
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
};
