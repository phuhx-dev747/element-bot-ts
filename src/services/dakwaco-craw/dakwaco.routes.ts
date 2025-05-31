const baseUrl = "https://dakwaco.com.vn/TraCuu/TraCuuHoaDonVT";

export const dakwacoRoutes = {
  getCustomerData: (customerCode: string) => `${baseUrl}?MaKH=${customerCode}&TuThang=1&TuNam=2026&DenThang=1&DenNam=2026`
};