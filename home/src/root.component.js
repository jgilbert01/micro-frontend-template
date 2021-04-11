import React from "react";

export default function Root(props) {
  return (
    <div>
      <h1>
        <p>{props.name} is mounted!</p>
      </h1>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
}
