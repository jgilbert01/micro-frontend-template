import React from "react";
import { useAuth } from '@mfe/shared'

const Root = (props) => {
  const { user } = useAuth();

  return (<div>
    <pre>User: {JSON.stringify(user, null, 2)}</pre>
    <pre>Properties: {JSON.stringify(props, null, 2)}</pre>
  </div>);
};

export default Root;