const ConcatSource = require("webpack-sources/lib/ConcatSource");
const Compilation = require("webpack/lib/Compilation");

module.exports = class ModuleFedSingleRuntimePlugin {
  _options;
  constructor(options) {
    this._options = { fileName: "remoteEntry.js", ...options };
  }
  // Define `apply` as its prototype method which is supplied with compiler as its argument
  apply(compiler) {
    if (!this._options) return null;
    const { fileName } = this._options;

    // Specify the event hook to attach to
    compiler.hooks.thisCompilation.tap("EnableSingleRunTimeForFederationPlugin", (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: "EnableSingleRunTimeForFederationPlugin",
          stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
        },
        (assets) => {
          const runtime = assets["runtime.js"];
          const remoteEntry = assets[fileName];
          console.log(runtime);
          console.log(remoteEntry);
          // const mergedSource = new ConcatSource(runtime, remoteEntry);
          // compilation.updateAsset(runtime, mergedSource)
        }
      );
    });
  }
};
