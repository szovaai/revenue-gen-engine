// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import path from "node:path";

const entitiesRoot = path.resolve(process.cwd(), "node_modules/entities");

export default defineConfig({
  vite: {
    optimizeDeps: {
      include: [
        "@react-three/drei",
        "@react-three/fiber",
        "@react-three/postprocessing",
        "@supabase/supabase-js",
        "gsap",
        "gsap/ScrollTrigger",
        "lenis",
        "three",
      ],
    },
    resolve: {
      alias: [
        { find: /^entities\/lib\/decode\.js$/, replacement: path.join(entitiesRoot, "lib/decode.js") },
        { find: /^entities\/lib\/encode\.js$/, replacement: path.join(entitiesRoot, "lib/encode.js") },
        { find: /^entities$/, replacement: entitiesRoot },
      ],
    },
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
