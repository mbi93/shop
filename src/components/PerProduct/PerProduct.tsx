import { Link, useParams } from "react-router";
import s from "./per-product.module.scss";
import { Paths } from "../../routes/Paths";
import CustomBtn from "../UI/CustomBtn";
import { nonameIcon, starIcon } from "../../utils";
import { useGetProductById } from "../../services/products";
import PerProductSkeleton from "./PerProductSkeleton";
import { cartStore } from "../../store/cartStore";
import { toast } from "react-toastify";

const PerProduct = () => {
  const { id } = useParams();
  const { data } = useGetProductById(id);
  const { addToCart } = cartStore();
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
  return data ? (
    // return false ? (
    <div className={s.single}>
      <nav className={s.single__nav}>
        <Link className={s.single__link} to={Paths.menu}>
          {"<"}
        </Link>
        <h1 className="title">{data.title}</h1>
        <CustomBtn
          onClick={cartHandler}
          text="В корзину"
          width={143}
          icon={nonameIcon}
          className={s.single__cart}
        />
      </nav>
      <div className={s.single__content}>
        <img src={data.image} alt="" className={s.single__img} />
        <div>
          <div className={s.single__card}>
            <h3>Цена</h3>
            <p>
              {data.price} <span>₽</span>
            </p>
          </div>
          <div className={s.single__card}>
            <h3>Рейтинг</h3>
            <div className={s.single__rating}>
              {data.rating}
              <img src={starIcon} alt="" />
            </div>
          </div>
          <p className={s.single__desc}>{data.description}</p>
        </div>
      </div>
    </div>
  ) : (
    <PerProductSkeleton />
  );
};

export default PerProduct;
