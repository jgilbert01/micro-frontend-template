import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  // loadRootComponent: () => System.import('./root.component.js').then((mod) => mod.default),
  // domElementGetter: () => document.getElementById('container'),
  errorBoundary: (err, info, props) => <div>Error</div>,


  loadRootComponent: () => import('./root.component.js').then((mod) => mod.default),
  domElementGetter: () => {
    // document.getElementById('nav')

    // Make sure there is a div for us to render into
    let el = document.getElementById('nav');
    if (!el) {
      el = document.createElement('div');
      el.id = 'app1';
      document.body.appendChild(el);
    }

    let l = document.createElement('div');
    l.href="//cdn.jsdelivr.net/npm/semantic-ui@latest/dist/semantic.min.css" ;
    l.rel="stylesheet";
    document.head.appendChild(l);

    return el;
  },
  // errorBoundary(err, info, props) {
  //   return <div>Error</div>;
  // },
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
