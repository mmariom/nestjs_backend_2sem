export class UserProfileDto {
    id: number;
    username: string;
    name: string;
    role: string;
    tenant: {
      id: number;
      email: string;
    };
  
    constructor(partial: Partial<UserProfileDto>) {
      Object.assign(this, partial);
    }
  }
  