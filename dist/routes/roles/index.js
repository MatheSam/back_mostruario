"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rolesCreate_controller_1 = __importDefault(require("../../controllers/roles/rolesCreate.controller"));
const rolesList_controller_1 = __importDefault(require("../../controllers/roles/rolesList.controller"));
const rolesRoutes = (0, express_1.Router)();
rolesRoutes.post('', rolesCreate_controller_1.default);
rolesRoutes.get('', rolesList_controller_1.default);
exports.default = rolesRoutes;
