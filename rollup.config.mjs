import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";

const packageJson = require("./package.json");

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs({
        include: "node_modules/**",
        ignoreGlobal: true, // Bỏ qua các biến toàn cầu không xử lý được
        sourceMap: false, // Nếu bạn không cần sourcemap, có thể tắt nó
      }),
      typescript({ tsconfig: "./tsconfig.json" }),
      terser(),
      postcss({
        extensions: [".scss"],
        inject: true,
        minimize: true,
      }),
    ],
    external: [...Object.keys(packageJson.peerDependencies || {})],
  },
];
