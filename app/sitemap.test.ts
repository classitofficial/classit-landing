import { afterEach, describe, expect, it } from "vitest";
import sitemap from "./sitemap";
import { SITE_URL } from "./shared-metadata";

const originalSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const originalSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

function restoreEnv(name: string, value: string | undefined) {
  if (value === undefined) {
    delete process.env[name];
    return;
  }

  process.env[name] = value;
}

afterEach(() => {
  restoreEnv("NEXT_PUBLIC_SUPABASE_URL", originalSupabaseUrl);
  restoreEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", originalSupabaseKey);
});

describe("sitemap metadata route", () => {
  it("includes public static pages without requiring Supabase env", async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    const entries = await sitemap();

    expect(entries.map((entry) => entry.url)).toEqual([
      `${SITE_URL}/`,
      `${SITE_URL}/blog`,
      `${SITE_URL}/privacy`,
      `${SITE_URL}/terms`,
    ]);
  });
});
