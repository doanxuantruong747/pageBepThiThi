import styles from "../../styles/Product.module.css";
import Image from "next/image";
import Ratings from "../../components/Ratings"
import { fNumber } from "../../untils/numberFormat";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addShoppingCart, getCarts } from '../../features/cartSlice';
import { getProducts, getProduct } from '../../features/productSlice'
import ProductCardFor from "../../components/ProductCardFor"
import { useState } from "react";
import { BASE_URL } from "../../app/config";
import { useEffect } from "react";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";




const Product = ({ product }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [img, setImg] = useState(product.image[0]);
  const [border, setBorder] = useState();

  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    const page = 1
    dispatch(getProducts(page))
  }, [dispatch])

  useEffect(() => {
    setImg(product.image[0])
  }, [product])

  // function handel click add shopping cart

  let _id = Math.floor(Math.random() * 99590969997139); // create random _id
  const handleClickAddCart = () => {
    let idAuthor = localStorage.getItem("id")

    if (idAuthor) {
      dispatch(addShoppingCart({
        productId: product._id,
        quantity: quantity,
        author: idAuthor
      }))

    }
    if (!idAuthor) {
      localStorage.setItem('id', `${_id}`)
      idAuthor = localStorage.getItem("id")

      dispatch(addShoppingCart({
        productId: product._id,
        quantity: quantity,
        author: idAuthor
      }))
    }
    dispatch(getCarts())
  }
  // function handel clik buy now
  const handleClickBuyNow = () => {
    let idAuthor = localStorage.getItem("id")

    if (idAuthor) {
      dispatch(addShoppingCart({
        productId: product._id,
        quantity: quantity,
        author: idAuthor
      }))
    }
    if (!idAuthor) {
      localStorage.setItem('id', `${_id}`)
      idAuthor = localStorage.getItem("id")

      dispatch(addShoppingCart({
        productId: product._id,
        quantity: quantity,
        author: idAuthor
      }))
    }
    dispatch(getCarts())
    setTimeout(() => {
      router.push('/cart')
    }, 1200);

  }


  const onChangeQuantity = (e) => {
    const value = e.target.value
    setQuantity(value)
  }

  const diminish = () => {
    quantity <= 1
      ? setQuantity(quantity = 1)
      : setQuantity(quantity -= 1)
  }

  const increase = () => {
    setQuantity(quantity += 1);
  }

  const handleClickImage = (image, index) => {
    setImg(image)
    setBorder(index)
  }



  return (
    <div className={styles.container}>

      <div className={styles.containerTop}>
        <div className={styles.left}>
          <div className={styles.imgContainer}>
            <Image src={img}
              objectFit="contain" layout="fill" alt="" />
          </div>
          <div className={styles.listImage}>
            {product.image.map((img, index) => (
              index === border
                ? (<Box
                  onClick={() => { handleClickImage(img, index) }}
                  component="img"
                  sx={{ width: 70, height: 70, ml: 1, mt: 2, borderRadius: 0.5, border: '1px solid #6d9205', }}
                  src={img}
                  alt="product"
                />)
                : (<Box
                  onClick={() => { handleClickImage(img, index) }}
                  component="img"
                  sx={{ width: 70, height: 70, ml: 1, mt: 2, borderRadius: 0.5 }}
                  src={img}
                  alt="product"
                />)
            ))}
          </div>
        </div>

        <div className={styles.right}>

          <h1 className={styles.title}>{product.title}</h1>

          <span className={styles.price}>{fNumber(product.price)}</span>
          <span className={styles.text}>đ</span>

          <div className={styles.box}>
            <h4>Đơn vị tính:</h4>
            <span style={{ marginLeft: '5px' }}>{product.unit}</span>
          </div>

          <div className={styles.box}>
            <h4 className={styles.choose}>Đánh giá:</h4>
            <div className={styles.rating}>
              <Ratings rating={product.rating} />
            </div>
          </div>

          <p className={styles.desc}>{product.describe}</p>


          <div className={styles.box}>
            <h4 >Số Lượng:</h4>
            <div className={styles.boxQuantity}>
              <button
                onClick={diminish}
                className={styles.diminish}>
                -
              </button>
              <input
                onChange={(e) => onChangeQuantity(e)}
                type="input"
                value={quantity}
                className={styles.quantity} />
              <button
                onClick={increase}
                className={styles.increase}>
                +
              </button>
            </div>
          </div>

          <div className={styles.button}>

            <button
              onClick={handleClickBuyNow}
              className={styles.add}
            > Mua Ngay
            </button>

            <button
              onClick={handleClickAddCart}
              className={styles.buy}
            >Thêm vào giỏ hàng</button>
          </div>


        </div>
      </div>

      <div className={styles.containerBotom}>
        <div className={styles.textCenter} >
          <span style={{ marginLeft: '5%' }}>SẢN PHẨM DÀNH CHO BẠN</span>
        </div>

        <Grid container spacing={2} sx={{ mt: "5px" }}>
          {products.map((product) => (
            <Grid key={product._id} item xs={6} md={3} lg={2}>
              <ProductCardFor
                product={product} />
            </Grid>
          ))}
        </Grid>

      </div>

    </div>

  );
};

export default Product;


// function call api -> get single product
export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `${BASE_URL}/products/${params.id}`
  );
  return {
    props: {
      product: res.data,
    },
  };
};