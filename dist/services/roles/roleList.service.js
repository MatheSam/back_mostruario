"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const role_entity_1 = require("../../entities/role.entity");
const rolesListService = () => {
    return role_entity_1.Roles;
};
exports.default = rolesListService;
