
export class User {
    constructor(
      private user: string,
      private token: string,
      private expirationDate: Date
    ) {}
  
    get expireDate() {
      return this.expirationDate;
    }
  
    get userToken() {
      return this.token;
    }
  }