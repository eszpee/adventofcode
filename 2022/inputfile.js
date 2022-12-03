"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readInputArray = exports.readInputTxt = void 0;
const fs_1 = require("fs");
function readInputTxt(path) {
    return (0, fs_1.readFileSync)(path, 'utf8');
}
exports.readInputTxt = readInputTxt;
function readInputArray(path) {
    return readInputTxt(path).split(/\r?\n/);
}
exports.readInputArray = readInputArray;
