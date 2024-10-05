"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionsModel = void 0;
const mongoose_1 = require("mongoose");
const subscriptionsSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.subscriptionsModel = (0, mongoose_1.model)("Subscriptions", subscriptionsSchema);
