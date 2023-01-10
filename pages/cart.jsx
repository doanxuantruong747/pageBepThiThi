import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { getCarts, updateQuantityCart, deleteCart } from "../features/cartSlice";
import { createOder } from "../features/orderSlice"
import { useEffect, useState } from "react";
import { fNumber } from "../untils/numberFormat";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRouter } from "next/router";


const infoSchema = Yup.object().shape({
  userName: Yup.string().required(" Vui lòng nhập tên người nhập hàng"),
  address: Yup.string().required("Vui lòng nhập địa chỉ giao hàng"),
  phone: Yup.number().transform(value => (isNaN(value) ? undefined : value)).required("Phone is required"),
});

const Cart = () => {
  let { products } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();
  const [idAuthor, setIdAuthor] = useState(null)

  useEffect(() => {
    if (localStorage.getItem("id")) {
      setIdAuthor(localStorage.getItem("id"))
    }
  }, [])

  // get list card 
  useEffect(() => {
    dispatch(getCarts())
  }, [dispatch])

  let totalPrice = 0;
  const [romove, setRomove] = useState(true)
  const [listProduct, setListProduct] = useState(products)
  let quantity = 0

  // handel input quantity
  const onChangeQuantity = (e, id) => {
    setListProduct(
      listProduct.map((item) =>
        id === item._id
          ? { ...item, quantity: (quantity = e.target.value) }
          : item
      )
    )
    dispatch(updateQuantityCart(id, quantity))
    setTimeout(() => {
      dispatch(getCarts())
    }, 500);
  }

  // handel btn decrement
  const decrement = (id) => {
    setListProduct(
      listProduct.map((item) =>
        (id === item._id)
          ? {
            ...item, quantity: (quantity = item.quantity - 1)
          }
          : item
      )
    )
    dispatch(updateQuantityCart(id, quantity))
    setTimeout(() => {
      dispatch(getCarts())
    }, 500);

  }

  // handel btn increment
  const increment = (id) => {
    setListProduct(
      listProduct.map((item) =>
        id === item._id
          ? { ...item, quantity: (quantity = item.quantity + 1) }
          : item
      )
    )
    dispatch(updateQuantityCart(id, quantity))
    setTimeout(() => {
      dispatch(getCarts())
    }, 300);
  }

  // handle delete single cart
  const handleDeleteCart = (id) => {
    products.forEach((product) => {
      if (product._id === id) {
        dispatch(deleteCart(id))
        setTimeout(() => {
          dispatch(getCarts())
          setRomove(true)
        }, 300);
      }
    })
  }

  // get re-render 
  useEffect(() => {
    setTimeout(() => {
      if (romove === true) {
        setListProduct(products)
        dispatch(getCarts())
        setTimeout(() => {
          setRomove(false)
        }, 500);
      }
    }, 300);
  }, [products, romove, dispatch])

  // sum price
  listProduct.forEach((product) => {
    if (product.author === idAuthor) {
      const item = product.productId
      totalPrice += item.price * product.quantity
    }
  })

  // create order
  const valueDefault = {
    userName: '',
    address: '',
    phone: ''
  }
  const { register = valueDefault, handleSubmit } = useForm({ resolver: yupResolver(infoSchema) });

  let carts = [];

  listProduct.map((item) => {
    if (item.author === idAuthor) {
      carts = [...carts, {
        product: item.productId._id,
        quantity: item.quantity,
        sum: (item.productId.price) * (item.quantity)
      }];

    }
  })

  const onSubmit = (data) => {
    // call dispatch create order
    dispatch(createOder(
      {
        customer: data.userName,
        address: data.address,
        phone: data.phone,
        products: carts,
        total: totalPrice,
        authorId: idAuthor,

      }
    ))

    // link next page orders
    setTimeout(() => {

      router.push("/orders")
    }, 1000);

    // delete item in cart
    listProduct.forEach((item) => {
      const id = item._id
      if (item.author === idAuthor) {
        dispatch(deleteCart(id))
        dispatch(getCarts())
      }
    })
  };


  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.table}>
          <div className={styles.trTitle}>
            <div className={styles.sp}>Sản Phẩm</div>
            <div className={styles.gt}>Giá Tiền</div>
            <div className={styles.sl}>Số Lượng</div>
            <div className={styles.tt}>Thành Tiền</div>
            <div></div>
          </div>

          {listProduct.map((product) => {
            const item = product.productId
            if (product.author === idAuthor)
              return (
                <div key={product._id}>
                  <div className={styles.tr} >
                    <div>
                      <div className={styles.imgContainer}>
                        <Image
                          src={item.image[0]}
                          layout="fill"
                          objectFit="cover"
                          alt=""
                        />
                      </div>
                    </div>

                    <div className={styles.detailContainer}>
                      <div className={styles.name}>
                        {item.title}
                      </div>

                      <div className={styles.price}>
                        <span style={{ color: '#d50000' }}>{fNumber(item.price)}</span>
                        <span style={{ borderBottom: '1px solid #d50000', color: '#d50000', fontSize: '13px' }}>đ</span>
                      </div>

                      <div className={styles.quantity}>
                        {product.quantity === 1
                          ? (<button disabled
                            onClick={() => { decrement(product._id) }}
                            className={styles.diminish}>
                            -
                          </button>)
                          : (<button
                            onClick={() => { decrement(product._id) }}
                            className={styles.diminish}>
                            -
                          </button>)
                        }

                        <input
                          onChange={(e) => onChangeQuantity(e, product._id)}
                          type="input"
                          value={product.quantity}
                          className={styles.input} />

                        <button
                          onClick={() => { increment(product._id) }}
                          className={styles.increase}>
                          +
                        </button>

                      </div>

                      <div className={styles.total}>
                        <span style={{ color: ' #d50000' }}>
                          {fNumber(item.price * product.quantity)}</span>
                        <span style={{ borderBottom: '1px solid #d50000', color: '#d50000', fontSize: '13px' }}>đ</span>
                      </div>

                      <div>
                        <div onClick={() => { handleDeleteCart(product._id) }}
                          className={styles.remove}>
                          <Image src="/img/remove.png"
                            objectFit="contain" layout="fill" alt="" />
                        </div></div>
                    </div>

                  </div>
                  <div className={styles.divider}> </div>



                </div>
              )
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.right}>
          <div className={styles.wrapper}>
            <h2 className={styles.title}>ĐƠN HÀNG</h2>

            <div className={styles.box}>
              <b>Tên:</b>
              <input className={styles.inputOder}
                {...register("userName")} />
            </div>

            <div className={styles.box}>
              <b>Địa chỉ:</b>
              <input className={styles.inputOder}
                {...register("address")} />
            </div>

            <div className={styles.box}>
              <b>Điện Thoại:</b>
              <input className={styles.inputOder}
                {...register("phone")} />
            </div>

            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Tổng cộng:</b>


              <span style={{ fontSize: '18px', color: '#d50000' }}>{fNumber(totalPrice)}
                <span style={{ borderBottom: '1px solid #d50000', color: '#d50000', fontSize: '13px' }}>đ</span>
              </span>

            </div>

            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Mã Giảm giá:</b>
              <span style={{ fontSize: '17px', color: '#d50000' }}>
                0,00
                <span style={{ borderBottom: '1px solid #d50000', color: '#d50000', fontSize: '13px' }}>đ</span>
              </span>
            </div>

            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Phí vận chuyển:</b>
              <span style={{ fontSize: '17px', color: '#d50000' }}>
                0,00
                <span style={{ borderBottom: '1px solid #d50000', color: '#d50000', fontSize: '13px' }}>đ</span>
              </span>
            </div>

            <div className={styles.dirive}></div>

            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Tổng Đơn Hàng:</b>
              <span style={{ fontSize: '18px', color: '#d50000', fontWeight: 500 }}>
                {fNumber(totalPrice)}
                <span style={{ borderBottom: '1px solid #d50000', color: '#d50000', fontSize: '13px' }}>đ</span>
              </span>
            </div>

            <input className={styles.button} type="submit" value="ĐẶT HÀNG" />
          </div>
        </div>
      </form>
    </div>

  );
};

export default Cart;


