"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const rolesCreateService = ({ name }) => {
    let roles = [];
    const roleExists = 'a'; /* roles.find(role => role.name.toLowerCase() === name.toLowerCase()); */
    if (roleExists) {
        throw new Error("Cargo já existe");
    }
    const role = {
        id: (0, uuid_1.v4)(),
        name,
    };
    roles.push(role);
    return role;
};
exports.default = rolesCreateService;
