"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("./database");
const express_1 = __importDefault(require("express"));
const roles_1 = __importDefault(require("./routes/roles"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/cargos', roles_1.default);
app.listen(3000);
