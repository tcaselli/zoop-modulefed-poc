const path = require("path");
const fs = require("fs");

const patchSharingReact = () => {
  const React = require("react");

  const reactPath = path.dirname(__non_webpack_require__.resolve("react"));

  const umdReact =
    process.env.NODE_ENV === "production"
      ? path.join(reactPath, "umd/react.production.min.js")
      : path.join(reactPath, "umd/react.development.js");

  const stringReact = fs.readFileSync(umdReact, "utf-8");

  return React.createElement("script", {
    dangerouslySetInnerHTML: {
      __html: stringReact,
    },
  });
};

const patchSharingReactDom = () => {
  const React = require("react");

  const reactDomPath = path.dirname(__non_webpack_require__.resolve("react-dom"));

  const umdReactDom =
    process.env.NODE_ENV === "production"
      ? path.join(reactDomPath, "umd/react-dom.production.min.js")
      : path.join(reactDomPath, "umd/react-dom.development.js");

  const stringReactDom = fs.readFileSync(umdReactDom, "utf-8");

  return React.createElement("script", {
    dangerouslySetInnerHTML: {
      __html: stringReactDom,
    },
  });
};

module.exports = { patchSharingReact, patchSharingReactDom };
