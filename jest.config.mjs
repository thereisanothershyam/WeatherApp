/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { createRequire } from "module";
const require = createRequire(import.meta.url);

/** @type {import('jest').Config} */
export default {
  //   snapshotFormat: {
  //     printBasicPrototype: true,
  //   },
  testEnvironment: "jsdom",
  testTimeout: 70_000,
  moduleNameMapper: {
    "\\.(css|less)$":
      "C:\\Users\\venki\\20012024\\WeatherApp\\__mocks__\\styleMocks.js",
  },
  // transform: {
  //   "\\.[jt]sx?$": require.resolve("babel-jest"),
  //   "\\.css$": "C:\\Users\\venki\\20012024\\WeatherApp\\custom-transformer.cjs",
  // },
};
