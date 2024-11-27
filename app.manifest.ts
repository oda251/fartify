import { UserManifest } from "wxt";

const Manifest: UserManifest = {
  name: "Fartify",
  version: "1.0.0",
  permissions: ["storage", "activeTab", "background"],
  web_accessible_resources: [
    {
      resources: ["sounds/*"],
      matches: ["<all_urls>"],
    },
  ],
};

export default Manifest;
