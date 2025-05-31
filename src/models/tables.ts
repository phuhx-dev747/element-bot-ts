// Mỗi bảng có kiểu dữ liệu riêng
export interface User {
  id?: string; 
  customerCode: string;
  customerName: string;
  email: string;
}

export interface UserWC {
  id?: string; 
  customerCode: string;
  customerName: string;
  customerAddress: string;
  customerTel: string;
  districtCode: string;
  wardCode: string;
}

export interface ChatHistory {
  id?: string; 
  userId: string;
  message: string;
  timestamp: Date;
}
