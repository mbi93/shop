import type { FC } from 'react'
import { nonameIcon, starIcon } from '../../utils'
import s from './products.module.scss'
import type { IProduct } from '../../types'
import { Link } from 'react-router'
import { cartStore } from "../../store/cartStore";
import { toast } from "react-toastify";

const ProductsItem: FC<IProduct> = (data) => {
  const { addToCart } = cartStore();
  const {image, price, rating, title, description, id} = data
  // console.log(cart);
  const cartHandler = () => {
    if (data) {
      addToCart(data);
      toast.success("Товар добавлен в корзину", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <div className={s.products__item}>
      <Link to={'/products/' + id}>
        <img src={image} alt="" className={s.products__img} />
      </Link>
        <p className={s.products__price}>{price} <span>₽</span></p>
        <button onClick={cartHandler} className={s.products__cart}>
            <img src={nonameIcon} alt="" />
        </button>
        <div className={s.products__wrapper}>
            <p className={s.products__rating}>
                {rating}
                <img src={starIcon} alt="" />
            </p>
            <h3 className={`${s.products__name} text-limit`}>{title}</h3>
            <p className={`${s.products__desc} text-limit`}>{description}</p>
        </div>
    </div>
  )
}

export default ProductsItem