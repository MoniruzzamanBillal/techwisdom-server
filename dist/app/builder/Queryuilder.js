"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Querybuilder {
    constructor(queryModel, query) {
        this.queryModel = queryModel;
        this.query = query;
    }
    // ! for searching
    search(searchableFiels) {
        var _a;
        const searchTerm = (_a = this.query) === null || _a === void 0 ? void 0 : _a.searchTerm;
        if (searchTerm) {
            this.queryModel = this.queryModel.find({
                $or: searchableFiels.map((field) => ({
                    [field]: { $regex: searchTerm, $options: "i" },
                })),
            });
        }
        return this;
    }
    //   ! filter
    filter() {
        const queryObj = Object.assign({}, this.query);
        const excludedQueryField = [
            "searchTerm",
            "sort",
            "limit",
            "page",
            "fields",
        ];
        excludedQueryField.forEach((value) => delete queryObj[value]);
        this.queryModel = this.queryModel.find(queryObj);
        return this;
    }
    //   ! sorting
    sort() {
        var _a, _b;
        const sort = ((_b = (_a = this.query) === null || _a === void 0 ? void 0 : _a.sort) === null || _b === void 0 ? void 0 : _b.split(",").join(" ")) || "-createdAt";
        this.queryModel = this.queryModel.sort(sort);
        return this;
    }
    // ! pagination
    pagination() {
        var _a, _b, _c, _d, _e, _f, _g;
        if (((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.searchTerm) || ((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.sort) || ((_c = this === null || this === void 0 ? void 0 : this.query) === null || _c === void 0 ? void 0 : _c.type)) {
            return this;
        }
        else if (((_d = this === null || this === void 0 ? void 0 : this.query) === null || _d === void 0 ? void 0 : _d.limit) || ((_e = this.query) === null || _e === void 0 ? void 0 : _e.page)) {
            const limit = Number((_f = this.query) === null || _f === void 0 ? void 0 : _f.limit) || 10;
            const page = Number((_g = this.query) === null || _g === void 0 ? void 0 : _g.page) || 1;
            const skip = (page - 1) * limit;
            this.queryModel = this.queryModel.skip(skip).limit(limit);
            return this;
        }
        return this;
    }
    // ! field
    field() {
        var _a, _b;
        const fields = ((_b = (_a = this.query) === null || _a === void 0 ? void 0 : _a.fields) === null || _b === void 0 ? void 0 : _b.split(",").join(" ")) || "-__v";
        this.queryModel = this.queryModel.select(fields);
        return this;
    }
}
exports.default = Querybuilder;
