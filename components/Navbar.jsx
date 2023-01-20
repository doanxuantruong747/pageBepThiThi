import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCarts } from "../features/cartSlice";
import { useRouter } from "next/router";


const Navbar = () => {
  const { quantity, products } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [currentQuantity, setcurrentQuantity] = useState(0)
  const [authorId, setAuthorId] = useState(null)
  let counter = 0;
  const router = useRouter();

  useEffect(() => {
    dispatch(getCarts())
  }, [dispatch, quantity])


  useEffect(() => {
    const id = localStorage.getItem("id")
    if (id) {
      setAuthorId(id)
    }
    dispatch(getCarts())

    products.forEach((product) => {
      if (product.author === authorId) {
        counter += product.quantity
        return setcurrentQuantity(counter)
      }

      if (product.author !== authorId) {
        counter = 0
        return setcurrentQuantity(counter)
      }

    })

    dispatch(getCarts())
  }, [quantity, dispatch])

  const handelClick = () => {
    router.push(`/`)
  }

  const handelClickSanPham = () => {
    router.push(`/#productlist`)
  }


  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.img}
          onClick={handelClick}>
          <Image src="/img/logo.png" alt="" width="65px" height="65px" />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>MUA NGAY!</div>
          <div className={styles.text}>0939 361 051</div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href="/" passHref>
            <li className={styles.listItem} onClick={handelClick}>Trang Chủ</li>
          </Link>
          <li className={styles.listItem} onClick={handelClickSanPham}>Sản Phẩm</li>
          <li className={styles.listItem}>Sự Kiện</li>
          <li className={styles.listItem}>Liên Hệ</li>
        </ul>
      </div>

      <Link href="/cart" passHref>
        <div className={styles.item}>
          <div className={styles.cart}>
            <Image src="/img/cart.png" alt="" width="30px" height="30px" />
            <div className={styles.counter}>{currentQuantity}</div>
          </div>
        </div>
      </Link>

    </div>
  );
};

export default Navbar;
