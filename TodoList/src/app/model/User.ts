export class User {
    userId: string;
    name: string;
    password: string;
    email: string;
    userType: string;
  
    constructor(userId: string, name: string, password: string, email: string, userType: string) {
      this.userId = userId;
      this.name = name;
      this.password = password;
      this.email = email;
      this.userType = userType;
    }
  }
  