"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dakwacoRoutes = void 0;
const baseUrl = "https://dakwaco.com.vn/TraCuu/TraCuuHoaDonVT";
exports.dakwacoRoutes = {
    getCustomerData: (customerCode) => `${baseUrl}?MaKH=${customerCode}&TuThang=1&TuNam=2026&DenThang=1&DenNam=2026`
};
