# template-ui-db

## Configuration

Put common MFE styles and images into assets/styles and assets/images.
Bootstrap styles, custom colors and fonts are loaded by the main app using the @template-ui/theme project and put into global namespace.
@template-ui/shared project contains common UI components.
Other apps might have their own shared components: for example, @template-ui/shared.

Each MFE is using css modules, so when applying styles to your UI components in MFE use either global theme styles or local styles using cas modules className=(styles.name} notation.

For testing do mock any imports from projects with @template-ui namespace and any other namespaces you imported.

Remove any dependency that is not needed from package.json.
Consider adding any libraries that should be loaded only once to externals section in Webpack and to import maps in the main app.

Remove/Modify mfe.json to have proper 'env' and 'roles' as properties at the routes level and also in any mount points.
By default, if 'env' or 'roles' are omitted, the micro app will be available in all environments and to all users.

Utilize utility module single-spa pattern to share common services.

## State sharing
Each MFE receives publish and subscribe functions from custom props which allows micro apps to communicate vi pub/sub model.
Avoid using redux if possible.  Utilize React Context APIs (useContext) and/or consider adding global state via Utility MicroApp.

## Local development

[Full documentation](https://single-spa.js.org/docs/recommended-setup#local-development)

Tutorial video: [youtube](https://www.youtube.com/watch?v=vjjcuIxqIzY&list=PLLUD8RtHvsAOhtHnyGx57EYXoaNsxGrTU&index=4) / [bilibili](https://www.bilibili.com/video/av83617789/)

It is preferred to do local development one module at a time.

```sh
cd mfe/db
npm install
npm start
```

Go to http://localhost:9015 and follow the instruction.

Now, go to https://template-stg.example.com. In the browser console, run the following:

```js
localStorage.setItem("devtools", true);
```

Refresh the page. Click on the tan / beige rectangle:

![image](https://user-images.githubusercontent.com/5524384/75211359-e46b9280-5740-11ea-80bb-974846df414b.png)

Set an [import map override](https://github.com/joeldenning/import-map-overrides/) to `9015`.

![image](https://user-images.githubusercontent.com/5524384/75211553-7e333f80-5741-11ea-97d6-d3d86ffd1826.png)

Refresh the page. Your local code for this module will now be running on https://template-stg.example.com. You may make changes locally and refresh the page to see them.
