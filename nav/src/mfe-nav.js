import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  loadRootComponent: () => import('./root.component.js').then((mod) => mod.default),
  domElementGetter: () => document.getElementById('nav'),
  errorBoundary(err, info, props) {
    return <div>Error</div>;
  },
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
