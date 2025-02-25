import { defineConfig } from "tsup"

export default defineConfig({
	entry: ["lib/index.ts"],
    outDir: "lib/dist",
    format: ["esm"],
    splitting: false,
    sourcemap: "inline",
    clean: true,
    minify: true,
    dts: true,
    outExtension(ctx) {
        return {
            js: `.${ctx.format}.js`,
        }
    },
})
