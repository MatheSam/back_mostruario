"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const roleList_service_1 = __importDefault(require("../../services/roles/roleList.service"));
const rolesListController = (req, res) => {
    try {
        const roles = (0, roleList_service_1.default)();
        return res.status(200).send(roles);
    }
    catch (err) {
        if (err instanceof Error) {
            return res.status(400).send({
                "error": err.name,
                "message": err.message
            });
        }
    }
};
exports.default = rolesListController;
