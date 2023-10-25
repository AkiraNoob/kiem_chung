"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("../api"));
const expressLoader = (app) => {
    app.use('/static', express_1.default.static('public'));
    app.use('/api/v1', api_1.default); // Root
};
exports.default = expressLoader;
