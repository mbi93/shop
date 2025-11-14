import s from "./cart.module.scss";
import { closeIcon } from "../../utils";
import type { FC } from "react";
import type { ICartProduct, IProduct } from "../../types";
import { cartStore } from "../../store/cartStore";
import { toast } from "react-toastify";

const CartItem: FC<ICartProduct> = ({ image, title, price, amount, id }) => {
  const { addToCart, minusToCart, delToCart } = cartStore();
  const removeCartItem = () => {
    delToCart(id);
    toast.error("Товар удалён из корзины", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  return (
    <div className={s.cart__item}>
      <div className={s.cart__info}>
        <img src={image} alt="" className={s.cart__img} />
        <h3 className={s.cart__name}>{title}</h3>
        <p className={s.cart__price}>{+price * amount} ₽</p>
      </div>
      <div className={s.cart__controls}>
        <button onClick={() => minusToCart(id)} className={s.cart__minus}>
          –
        </button>
        <span className={s.cart__count}>{amount}</span>
        <button
          onClick={() => addToCart({ id } as IProduct)}
          className={s.cart__plus}
        >
          +
        </button>
        <button onClick={removeCartItem} className={s.cart__del}>
          <img src={closeIcon} alt="" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
