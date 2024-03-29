'use strict';

const path = require('path');
const fs = require('fs');
const url = require('url');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
console.log(resolveApp,'resolveApp-------')
// resolveModule(resolveApp, 'src/index/index')


const envPublicUrl = process.env.PUBLIC_URL;

function ensureSlash(inputPath, needsSlash) {
  const hasSlash = inputPath.endsWith('/');
  if (hasSlash && !needsSlash) {
    return inputPath.substr(0, inputPath.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${inputPath}/`;
  } else {
    return inputPath;
  }
}

const getPublicUrl = appPackageJson =>
  envPublicUrl || require(appPackageJson).homepage;

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl =
    envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
  return ensureSlash(servedUrl, true);
}

const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
];

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find(extension =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};
console.log(resolveModule(resolveApp, 'src/index/index'),'resolveModule(resolv-------')
console.log(resolveModule(resolveApp, 'src/order/index'),'resolveModule(resolv-------')
console.log(resolveModule(resolveApp, 'src/ticket/index'),'resolveModule(resolv-------')
console.log(resolveModule(resolveApp, 'src/query/index'),'resolveModule(resolv-------')
console.log(resolveApp('public/index.html'),'resolveApppublic/index.htm')
console.log(resolveApp('public/order.html'),'resolveApppublic/index.htm')
console.log(resolveApp('public/ticket.html'),'resolveApppublic/index.htm')
console.log(resolveApp('public/query.html'),'resolveApppublic/index.htm')
// config after eject: we're in ./config/
module.exports = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appOrderHtml: resolveApp('public/order.html'),
  appTicketHtml: resolveApp('public/ticket.html'),
  appQueryHtml: resolveApp('public/query.html'),
  appIndexJs: resolveModule(resolveApp, 'src/index/index'),
  appOrderJs: resolveModule(resolveApp, 'src/order/index'),
  appTicketJs: resolveModule(resolveApp, 'src/ticket/index'),
  appQueryJs: resolveModule(resolveApp, 'src/query/index'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appTsConfig: resolveApp('tsconfig.json'),
  appJsConfig: resolveApp('jsconfig.json'),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveModule(resolveApp, 'src/setupTests'),
  proxySetup: resolveApp('src/setupProxy.js'),
  appNodeModules: resolveApp('node_modules'),
  publicUrl: getPublicUrl(resolveApp('package.json')),
  servedPath: getServedPath(resolveApp('package.json')),
};

console.log({
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appOrderHtml: resolveApp('public/order.html'),
  appTicketHtml: resolveApp('public/ticket.html'),
  appQueryHtml: resolveApp('public/query.html'),
  appIndexJs: resolveModule(resolveApp, 'src/index/index'),
  appOrderJs: resolveModule(resolveApp, 'src/order/index'),
  appTicketJs: resolveModule(resolveApp, 'src/ticket/index'),
  appQueryJs: resolveModule(resolveApp, 'src/query/index'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appTsConfig: resolveApp('tsconfig.json'),
  appJsConfig: resolveApp('jsconfig.json'),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveModule(resolveApp, 'src/setupTests'),
  proxySetup: resolveApp('src/setupProxy.js'),
  appNodeModules: resolveApp('node_modules'),
  publicUrl: getPublicUrl(resolveApp('package.json')),
  servedPath: getServedPath(resolveApp('package.json')),
})

module.exports.moduleFileExtensions = moduleFileExtensions;
