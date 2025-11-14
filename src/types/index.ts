export interface IRegister {
  username: string;
  password: string;
  password2: string;
  email: string;
}

export interface IProfile {
  username: string;
  password: string;
  email: string;
  avatar: FileList;
}

export interface ILogin {
  username: string;
  password: string;
}

export interface IUser {
  avatar: null | string;
  email: string;
  id: number;
  username: string;
}

export interface IProduct {
  description: string;
  id: number;
  image: string;
  price: string;
  quantity: number;
  rating: number;
  title: string;
}

export interface IPage {
  selected: number
}

export interface ICartProduct extends IProduct {
  amount: number
}