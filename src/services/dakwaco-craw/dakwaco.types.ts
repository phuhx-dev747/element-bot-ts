
export interface CustomerApiData {
  customer_code: string;
  customer_name: string;
  customer_address: string;
  customer_tax_reg_no: string;
  customer_tel: string;
  district_code: string;
  ward_code: string;
  details: any;
}

export interface DakwacoApiRes {
  error_code: string;
  error_message: string | null;
  data: CustomerApiData[];
}