import { registerApplication, start } from 'single-spa';
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from 'single-spa-layout';

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
