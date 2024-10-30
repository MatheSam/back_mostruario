"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rolesCreate_service_1 = __importDefault(require("../../services/roles/rolesCreate.service"));
const rolesCreateController = (req, res) => {
    try {
        const { name } = req.body;
        const role = (0, rolesCreate_service_1.default)({ name });
        return res.status(201).send(role);
    }
    catch (err) {
        if (err instanceof Error) {
            return res.status(400).send({
                "message": err.message
            });
        }
    }
};
exports.default = rolesCreateController;
