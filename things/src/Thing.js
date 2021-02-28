import React from "react";
import { Link } from "@reach/router";

const Root = (props) => (<div>
  <h1>Thing {props.id}</h1>
  <Link to='/things'>Back</Link>
  <pre>Thing {JSON.stringify(props, null, 2)}</pre>
</div>);


export default Root;