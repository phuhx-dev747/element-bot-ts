import axios from "axios";

export function createCrawlData(start: number, end: number): () => void {
  const baseUrl = "https://dakwaco.com.vn/TraCuu/TraCuuHoaDonVT";

  async function fetchData(code: string): Promise<any> {
    try {
      const url = `${baseUrl}?MaKH=${code}&TuThang=1&TuNam=2026&DenThang=1&DenNam=2026`;
      const response = await axios.post(url);
      return response.status;
    } catch (error) {
      console.error(`Error fetching data for code ${code}:`, error);
      throw error;
    }
  }

  return () => {
    for (let i = start; i <= end; i++) {
      fetchData(i.toString());
    }
  };
}
