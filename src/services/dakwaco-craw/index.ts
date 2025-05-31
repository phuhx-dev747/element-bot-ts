import axios, { AxiosResponse } from "axios";
import { insertData } from "../database";
import { SimpleModel, TableNameEnum } from "../../models";
import { CustomerApiData, DakwacoApiRes } from "./dakwaco.types";
import { dakwacoRoutes } from "./dakwaco.routes";

export default async function dakwacoCrawService(start: number, end: number) {
  for (let i = start; i <= end; i++) {
    const data = await dakwacoCrawData(i.toString());
    
    if (data) {
      const model = new SimpleModel(TableNameEnum.USER_WC, {
        customerCode: data.customer_code,
        customerName: data.customer_name,
        customerAddress: data.customer_address,
        customerTel: data.customer_tel,
        districtCode: data.district_code,
        wardCode: data.ward_code
      });
      await insertData(model);
      console.log(`KH ${i}: Data inserted successfully`);
    } else {
      console.log(`KH ${i}: No data found`);
    }
  }
}

const dakwacoCrawData = async (code: string): Promise<CustomerApiData | null> => {
  try {
    const response: AxiosResponse<DakwacoApiRes> = await axios.post(dakwacoRoutes.getCustomerData(code));
    return response.data.data[0] || null;
  } catch (error) {
    return null;
  }
};
