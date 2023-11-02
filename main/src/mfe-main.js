import { registerApplication, start } from 'single-spa';
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from 'single-spa-layout';

/* istanbul ignore next */
if ('serviceWorker' in navigator) {
  console.log('SW registeration...');
  // window.addEventListener('load', () => {
  navigator.serviceWorker
    .register('/service-worker.js')
    .then(registration => {
      console.log('SW registered: ', registration);
    })
    .catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  // });
}

fetch('/apps.json')
  .then(res => res.json())
  .then((layout) => {
    // console.log(layout);
    const routes = constructRoutes(layout);
    const applications = constructApplications({
      routes,
      loadApp: ({ name }) => System.import(name),
    });
    const layoutEngine = constructLayoutEngine({ routes, applications });

    applications.forEach(registerApplication);

    // start after we load these foundational apps
    return Promise.all([System.import('@mfe/shared'), System.import('@mfe/nav')])
      .then(() => {
        layoutEngine.activate();
        start();
      });
  });
