import { create } from "zustand";
import type { ICartProduct, IProduct, IUser } from "../types";
import { devtools } from "zustand/middleware";

type Store = {
  cart: ICartProduct[];
  addToCart: (val: IProduct) => void;
  minusToCart: (id: number) => void;
  delToCart: (id: number) => void;
  totalPrice: number;
  changeTotal: () => void;
};

const data = localStorage.getItem("cart");
const localCart: ICartProduct[] = data ? JSON.parse(data) : [];
const total = localCart.reduce((acc, elem) => {
  return acc + +elem.price * elem.amount;
}, 0);

export const cartStore = create<Store>()(
  devtools((set) => ({
    cart: localCart,
    addToCart: (val) =>
      set((state) => {
        const { cart } = state;
        const find = cart.find((elem) => elem.id == val.id);
        if (find) {
          return {
            cart: cart.map((elem) =>
              elem.id == val.id ? { ...elem, amount: elem.amount + 1 } : elem
            ),
          };
        } else {
          return { cart: [...cart, { ...val, amount: 1 }] };
        }
      }),

    minusToCart: (id) =>
      set((state) => {
        const { cart } = state;
        return {
          cart: cart.map((elem) =>
            elem.id == id && elem.amount > 1 ? { ...elem, amount: elem.amount - 1 } : elem
          ),
        };
      }),

      delToCart: (id)=> set((state)=>{
        const {cart} = state;
        return { cart: cart.filter((elem)=> elem.id != id)}
      }),

    totalPrice: total,
    changeTotal: () =>
      set((state) => {
        const { cart } = state;
        return {
          totalPrice: cart.reduce((acc, elem) => {
            return acc + +elem.price * elem.amount;
          }, 0),
        };
      }),
  }))
);
