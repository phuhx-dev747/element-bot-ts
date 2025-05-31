"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = dakwacoCrawService;
const axios_1 = __importDefault(require("axios"));
const database_1 = require("../database");
const models_1 = require("../../models");
const dakwaco_routes_1 = require("./dakwaco.routes");
function dakwacoCrawService(start, end) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = start; i <= end; i++) {
            const data = yield dakwacoCrawData(i.toString());
            if (data) {
                const model = new models_1.SimpleModel(models_1.TableNameEnum.USER_WC, {
                    customerCode: data.customer_code,
                    customerName: data.customer_name,
                    customerAddress: data.customer_address,
                    customerTel: data.customer_tel,
                    districtCode: data.district_code,
                    wardCode: data.ward_code
                });
                yield (0, database_1.insertData)(model);
            }
            else {
                console.log(`KH ${i}: No data found`);
            }
        }
    });
}
const dakwacoCrawData = (code) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post(dakwaco_routes_1.dakwacoRoutes.getCustomerData(code));
        return response.data.data[0] || null;
    }
    catch (error) {
        return null;
    }
});
