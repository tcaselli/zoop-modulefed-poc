# ESLint dbshop plugin

(Part of the global configuration)

## Installation

Clone all the repos of microfrontends (all dbshop-mf...) in the same directory then,

Make sure you have setup your .npmrc registry correctly:
https://wiki.mgm-tp.com/confluence/pages/viewpage.action?pageId=131302935

```
registry=https://artifacts.mgm-tp.com/artifactory/api/npm/npm-repos/
_auth = <USERNAME>:<PASSWORD> (converted to base 64)
email = <YOUR EMAIL HERE>
always-auth = true

@com.mgmtp.dbshop:registry=https://artifacts.mgm-tp.com/artifactory/api/npm/npm-local/
//artifacts.mgm-tp.com/artifactory/api/npm/npm-local/:_password=<BASE64_PASSWORD>
//artifacts.mgm-tp.com/artifactory/api/npm/npm-local/:username=<USERNAME>
//artifacts.mgm-tp.com/artifactory/api/npm/npm-local/:email=<YOUR EMAIL HERE>
//artifacts.mgm-tp.com/artifactory/api/npm/npm-local/:always-auth=true
```

To install the package in a microfrontend:

`yarn add @com.zooplus/eslint`

## Usage

In eslintrc config:

```javascript
module.exports = {
  // ...
  plugins: ["@com.zooplus/zooplus"],
  rules: {
    "@com.zooplus/zooplus": "rule1",
  },
};
```

### Rules available

- @com.zooplus/zooplus/rule1: prevent the use of dispatch(setCart(...)).

## To extend the rules

Add a new rule in src/rules then export it in src/index.ts file.

Then build the project to update the lib directory.

Make sure to add the rule to the config `eslintrc.js` in zoop-f-config.
