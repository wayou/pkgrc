<p align="center">
  <a href="https://badge.fury.io/js/pkgrc">
    <img src="https://badge.fury.io/js/pkgrc.svg"
         alt="Gitter">
  </a>
  <a href="https://saythanks.io/to/wayou">
      <img src="https://img.shields.io/badge/SayThanks.io-%E2%98%BC-1EAEDB.svg">
  </a>

</p>

Fetch a predefined rc file for package manager npm or yarn which contains mirror settings for common used dependencies when `npm install`.

Here's the sample `.npmrc` file you will get:

```
# package-lock=false
registry="https://registry.npm.taobao.org"
disturl="https://npm.taobao.org/dist"
nvm_nodejs_org_mirror="http://npm.taobao.org/mirrors/node"
sass_binary_site="http://npm.taobao.org/mirrors/node-sass"
electron_mirror="http://npm.taobao.org/mirrors/electron/"
SQLITE3_BINARY_SITE="http://npm.taobao.org/mirrors/sqlite3"
profiler_binary_host_mirror="http://npm.taobao.org/mirrors/node-inspector/"
node_inspector_cdnurl="https://npm.taobao.org/mirrors/node-inspector"
selenium_cdnurl="http://npm.taobao.org/mirrors/selenium"
puppeteer_download_host="https://npm.taobao.org/mirrors"
chromedriver_cdnurl="https://npm.taobao.org/mirrors/chromedriver"
operadriver_cdnurl="https://npm.taobao.org/mirrors/operadriver"
phantomjs_cdnurl="https://npm.taobao.org/mirrors/phantomjs"
```

## Usage

```sh
# fetch `.npmrc`
$ npx pkgrc

# fetch `.yarnrc`
$ npx pkgrc yarn
```

Mostly you may combine this util with some other npx command to generate the essential files to startup a project from scratch, e.g.:

```sh
$ npx license mit > LICENSE && npx pkgrc && npx gitignore node && npx pkgrc yarn && yarn init -y
```

## License

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fwayou%pkgrc.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fwayou%pkgrc?ref=badge_large)
