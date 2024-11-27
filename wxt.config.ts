import { defineConfig, UserConfig } from "wxt";
import Manifest from "./app.manifest";

const config: UserConfig = {
  manifest: Manifest,
  extensionApi: "chrome",
  modules: ["@wxt-dev/module-react"],
  srcDir: "src",
  outDir: "dist",
  entrypointsDir: "entrypoints",
  dev: {
    server: {
      port: 8080,
    },
  },
  alias: {
    "@/*": "src/*",
    "@config": "app.config.ts",
    "@manifest": "app.manifest.ts",
  },
};

// See https://wxt.dev/api/config.html
export default defineConfig(config);
