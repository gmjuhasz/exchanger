import axios from "axios";

const BASE_URL = "https://freecurrencyapi.net/api/v2/latest";
const API_KEY = "cfacbdf0-3706-11ec-8526-9103b5ae72dc";
const DEFAULT_CURRENCY = "EUR";

class Rest {
  async fetchCurrencies() {
    try {
      const response = await axios.get(
        `${BASE_URL}?apikey=${API_KEY}&base_currency=${DEFAULT_CURRENCY}`
      );
      if (response.status === 200) {
        const data = response.data;
        return Object.keys(data.data);
      } else {
        return response;
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async fetchRatesFor(currency: string) {
    try {
      const response = await axios.get(
        `${BASE_URL}?apikey=${API_KEY}&base_currency=${currency}`
      );
      if (response.status === 200) {
        const data = response.data;
        return data.data;
      }
    } catch (err) {
      console.log(err);
    }
  }
}

export const { fetchCurrencies, fetchRatesFor } = new Rest();
export default new Rest();
