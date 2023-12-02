import Api from '@/backend/models/Api'

class NextApi extends Api {
  constructor() {
    super({ host: process.env.API_HOST })
  }
}

export { NextApi }
