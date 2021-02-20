import React from "react";
import { useLocation } from "@reach/router"

export default function Task(props) {
  const location = useLocation();
  // console.log('location: %j', location);
  return (

    <pre>
      {JSON.stringify(location.state, null, 2)}
    </pre>
  );
}
