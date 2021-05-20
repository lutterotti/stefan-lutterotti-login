export interface User {
  id: number,
  name: string;
  username: string;
  email: string;
  address: any
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  }
}

export interface Album {
  userId: number;
  id: number;
  title: string;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export {};