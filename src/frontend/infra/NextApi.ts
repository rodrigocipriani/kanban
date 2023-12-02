import Api from "@/models/Api";

class NextApi extends Api {
  constructor() {
    super({ host: process.env.API_HOST });
  }
}

export { NextApi };
