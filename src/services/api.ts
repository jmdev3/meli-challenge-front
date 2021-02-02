import Axios, { AxiosInstance } from "axios";

const mileChallengeApi = Axios.create({
  baseURL: "http://localhost:5000/api",
});

class Api {
  meliApi: AxiosInstance = null;

  constructor(_meliApi: AxiosInstance) {
    this.meliApi = _meliApi;
  }

  searchItems(url: string) {
    return this.meliApi
      .get(url)
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  }

  getItem(itemId: string) {
    return this.meliApi
      .get(`/items/${itemId}`)
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  }
}

export default new Api(mileChallengeApi);
