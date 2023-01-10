import styles from "../../styles/Order.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../features/orderSlice";
import { getProducts } from "../../features/productSlice"
import { useEffect, useState } from "react";
import { fNumber } from "../../untils/numberFormat";
import { Rating } from "@mui/material";
import { useRouter } from "next/router";


const Order = () => {
  const status = 0;
  const dispatch = useDispatch();
  let { orders } = useSelector((state) => state.order);
  const { products } = useSelector((state) => state.product);
  const [idAuthor, setIdAuthor] = useState(null)
  const router = useRouter();


  useEffect(() => {
    if (localStorage.getItem("id")) {
      setIdAuthor(localStorage.getItem("id"))
    }
  }, [])

  useEffect(() => {
    const page = 1
    dispatch(getOrders({ page }))
  }, [dispatch])

  useEffect((name) => {
    const page = 1
    dispatch(getProducts({ page }));
  }, [dispatch]);

  const statusClass = (index) => {
    if (index - status < 1) return styles.done;
    if (index - status === 1) return styles.inProgress;
    if (index - status > 1) return styles.undone;
  };

  const handelClick = (id) => {
    router.push(`/product/${id}`)
  }
  return (
    <div className={styles.container}>
      <div className={styles.left}>

        {
          orders.map((order) => {
            if (order.authorId === idAuthor)
              return (

                <div className={styles.card}>
                  <div className={styles.row}>
                    <div className={styles.title}> ĐƠN HÀNG</div>
                  </div>

                  <div className={styles.row}>
                    <div className={styles.status}>

                      <div className={statusClass(order.datHang)}>
                        <div style={{ textAlign: 'center' }}>
                          <Image src="/img/paid.png" width={30} height={30} alt="" />
                          <div>Đặt hàng </div>
                        </div>
                        <div className={styles.checkedIcon}>
                          <Image
                            src="/img/checked.png"
                            width={15}
                            height={15}
                            alt=""
                          />
                        </div>
                      </div>

                      <div className={statusClass(order.soanHang)}>
                        <div style={{ textAlign: 'center' }}>
                          <Image src="/img/bake.png" width={30} height={30} alt="" />
                          <div>Soạn Hàng</div>
                        </div>
                        <div className={styles.checkedIcon}>
                          <Image
                            src="/img/checked.png"
                            width={15}
                            height={15}
                            alt=""
                          />
                        </div>
                      </div>

                      <div className={statusClass(order.giaoHang)}>
                        <div style={{ textAlign: 'center' }}>
                          <Image src="/img/bike.png" width={30} height={30} alt="" />
                          <div>Giao Hàng</div>
                        </div>
                        <div className={styles.checkedIcon}>
                          <Image
                            src="/img/checked.png"
                            width={15}
                            height={15}
                            alt=""
                          />
                        </div>
                      </div>

                      <div className={statusClass(order.nhanHang)}>
                        <div style={{ textAlign: 'center' }}>
                          <Image src="/img/delivered.png" width={30} height={30} alt="" />
                          <div>Nhận Hàng</div>
                        </div>
                        <div className={styles.checkedIcon}>
                          <Image
                            src="/img/checked.png"
                            width={15}
                            height={15}
                            alt=""
                          />
                        </div>
                      </div>

                    </div>
                  </div>

                  <div className={styles.row}>
                    <div className={styles.table}>
                      <div className={styles.trTitle}>

                        <div className={styles.box}>
                          <div>Mã đơn hàng: </div>
                          <span style={{ fontWeight: 500 }}>
                            {order._id}</span>
                        </div>

                        <div className={styles.box}>
                          <div>Khách hàng :</div>
                          <span style={{ fontWeight: 500 }}>
                            {order.customer}</span>
                        </div>

                        <div className={styles.box}>
                          <div> Địa chỉ :</div>
                          <span style={{ fontWeight: 500 }}>
                            {order.address}</span>
                        </div>

                        <div className={styles.box}>
                          <div> Số điện thoại :</div>
                          <span style={{ fontWeight: 500 }}>
                            {order.phone}</span>
                        </div>

                        <div className={styles.divire}></div>

                        {order.products.map((product) => {
                          return (
                            <div key={product._id}>

                              <div className={styles.box}>
                                <div> Tên sản phẩm :</div>
                                <span style={{ fontWeight: 500 }}>
                                  {product.product.title}</span>
                              </div>

                              <div className={styles.box}>
                                <div> Đơn giá :</div>
                                <span style={{ fontWeight: 500 }}>
                                  {fNumber(product.product.price)} <span>đ</span>
                                </span>
                              </div>

                              <div className={styles.box}>
                                <div> Đơn vị tính :</div>
                                <span style={{ fontWeight: 500 }}>
                                  {product.product.unit}
                                </span>
                              </div>

                              <div className={styles.box}>
                                <div> Số lượng :</div>
                                <span style={{ fontWeight: 500 }}>
                                  {fNumber(product.quantity)}
                                </span>
                              </div>

                              <div className={styles.box}>
                                <div> Thành tiền :</div>
                                <span style={{ fontWeight: 500 }}>
                                  {fNumber(product.sum)} <span>đ</span>

                                </span>
                              </div>
                              <div className={styles.divire}></div>
                            </div>
                          )
                        })}

                        <div className={styles.box}>
                          <div> Tổng Đơn Hàng :</div>
                          <span style={{ fontWeight: 500, fontSize: '24px' }}>
                            {fNumber(order.total)} <span>đ</span>
                          </span>
                        </div>


                        <div style={{ textAlign: 'center', marginTop: '5%', fontSize: '18px', fontWeight: 500, width: "80%" }}>
                          ( Thanh toán khi nhận được hàng! )</div>


                      </div>
                      <div className={styles.tr}>

                      </div>
                    </div>
                  </div>
                </div>

              )
          })
        }

      </div>
      <div className={styles.center}>
        <span className={styles.textCenter}>
          SẢN PHẨM LIÊN QUAN</span>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>

          <div
            className={styles.containerCard} >
            {products.map((product) => (
              <div
                onClick={() => { handelClick(product._id) }}
                key={product._id} className={styles.cardProduct}>
                <div className={styles.image}>
                  <Image alt="" src={product.image[0]} width="150" height="150" />
                </div>
                <div>
                  <h1 className={styles.titleProduct}>
                    {product.title}
                  </h1>
                  <span className={styles.priceProduct} >
                    <span style={{ color: "#d50000" }}>{fNumber(product.price)}<span>đ</span></span>  /
                    <span >{product.unit}</span></span>

                  <div className={styles.rating}>
                    <Rating value={product.rating} size="small" />
                  </div>
                </div>
              </div>

            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
