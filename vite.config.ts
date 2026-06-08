import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

/**
 * 개발 모드(npm run dev)에서 `/api/*` 요청을
 * Vercel 서버리스 함수와 동일한 핸들러로 처리해주는 플러그인.
 *
 * - 운영 환경(Vercel) 에서는 `api/*.ts` 가 자동으로 서버리스 함수가 되므로
 *   이 플러그인은 dev 에서만 동작한다.
 * - .env.local 의 OPENAI_API_KEY 를 process.env 로 자동 주입한다.
 */
function devApiRoutes(): Plugin {
  return {
    name: "dev-api-routes",
    apply: "serve",
    config(_userConfig, { mode }) {
      const env = loadEnv(mode, process.cwd(), "");
      for (const key of Object.keys(env)) {
        if (process.env[key] === undefined) {
          process.env[key] = env[key];
        }
      }
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url ?? "";
        if (!url.startsWith("/api/")) return next();

        // /api/travel-assistant -> ../api/travel-assistant.ts
        const route = url.split("?")[0].replace(/^\/api\//, "");
        try {
          const mod = await server.ssrLoadModule(`/api/${route}.ts`);
          const handler = mod.default;
          if (typeof handler !== "function") {
            res.statusCode = 500;
            res.end(
              JSON.stringify({
                error: `API route /api/${route} has no default export`,
              })
            );
            return;
          }
          await handler(req, res);
        } catch (err) {
          // 모듈이 없으면 404, 그 외에는 500
          const code =
            err instanceof Error && /Failed to load url/.test(err.message)
              ? 404
              : 500;
          // eslint-disable-next-line no-console
          console.error(`[dev-api] /api/${route} error`, err);
          res.statusCode = code;
          res.setHeader("content-type", "application/json; charset=utf-8");
          res.end(
            JSON.stringify({
              error:
                code === 404
                  ? `API route not found: /api/${route}`
                  : "Internal API error (dev)",
            })
          );
        }
      });
    },
  };
}

export default defineConfig({
  /**
   * 배포 환경별 base 경로.
   *  - 기본(Vercel / 로컬): "/"
   *  - GitHub Pages: gh-pages 빌드 시 환경변수 BASE 로 주입
   *    (.github/workflows/deploy.yml 참고)
   */
  base: process.env.BASE ?? "/",
  plugins: [react(), devApiRoutes()],
  server: {
    host: true,
    port: 5173,
  },
});
