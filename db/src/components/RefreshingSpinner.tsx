import React from "react";
// import { Spinner } from "react-bootstrap";
import { useIsFetching } from "react-query";

const Component = () => {
  const isFetching = useIsFetching();

  if (isFetching) {
    return (
      <div className="d-flex justify-content-center my-3">
        {/* <Spinner animation="border" role="status"> */}
          <span className="visually-hidden">Background fetch...</span>
        {/* </Spinner> */}
      </div>
    );
  } else {
    return null;
  }
};

export default Component;
