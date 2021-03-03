Those are shared configs for dbshop microfrontends.

Import them in your rules files like this:

In `.babelrc.js` file of your micro frontend:

```javascript
module.exports = require('dbshop-mf-shared/config/babelrc')();
```

If you need to extend those configs create a new object from the import and export the modified object:

```javascript
const baseConfig = require('dbshop-mf-shared/config/babelrc')();
module.exports = { ...baseConfig /* Your modifications of the config */ };
```
