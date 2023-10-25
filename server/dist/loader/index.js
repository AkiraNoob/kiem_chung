"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("./express"));
const dotnet_1 = __importDefault(require("./dotnet"));
const appLoader = (app) => {
    (0, express_1.default)(app);
    (0, dotnet_1.default)(app);
    return app;
};
exports.default = appLoader;
