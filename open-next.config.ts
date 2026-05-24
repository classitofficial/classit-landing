import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  // For best results consider enabling R2 caching after the CMS storage
  // and production cache policy are finalized.
});
