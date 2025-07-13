import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import hugoPlugin from "vite-hugo-plugin";
import eslint from "vite-plugin-eslint";
import StylelintPlugin from "vite-plugin-stylelint";
import svgSpritePlugin from "vite-plugin-svg-sprite-component";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        additionalData: (content, filename) => {
          // Only inject variables for .vue files
          if (filename.endsWith(".vue")) {
            return `
              @import "site/assets/css/configuration/_colors.scss";
              @import "site/assets/css/configuration/_settings.scss";
              @import "site/assets/css/configuration/_typography.scss";
              @import "site/assets/css/utility/_functions.scss";
              @import "site/assets/css/utility/_mixins.scss";
              @import "site/assets/css/vendor/mappy-breakpoints.scss";
              @import "site/assets/css/vendor/typi/typi.scss";
              ${content}
            `;
          }
          return content;
        },
      },
    },
  },
  publicDir: "public",
  resolve: {
    alias: {
      "@": resolve(__dirname, "site/assets/js"),
    },
  },
  plugins: [
    vue(),
    eslint({
      include: "site/assets/js/**/*.js",
      exclude: "site/assets/js/vendor/**/*",
      failOnError: false,
    }),
    StylelintPlugin({
      include: "site/assets/css/**/*.scss",
      exclude: "site/assets/css/vendor/**/*",
      emitErrorAsWarning: true,
    }),
    svgSpritePlugin({ symbolId: (name) => "icon-" + name }),
    hugoPlugin({
      appDir: resolve(__dirname, "site"),
      hugoOutDir: resolve(__dirname, "dist"),
      ignoreHTMLFiles: [resolve(__dirname, "dist/weihnachtsgruss/index.html")],
    }),
  ],
});
