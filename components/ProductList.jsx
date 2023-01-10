import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from "../features/productSlice";
import styles from "../styles/ProductList.module.css";
import ProductCard from "./ProductCard"


const ProductList = () => {
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = useState(1);

  const { currentPageProducts, productById, isLoading, totalProduct } = useSelector((state) => state.product)
  let products = currentPageProducts.map((product) => productById[product]);
  const dispatch = useDispatch();

  useEffect((name) => {
    name = filterName
    dispatch(getProducts({ page, name }));
  }, [page, filterName, dispatch]);


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>SẢN PHẨM TRONG BẾP THI THI</h1>
      <p className={styles.desc}>
        Bếp Thi Thi mang đến cho quí khách hàng những sản phẩm tươi ngon nhất trên thị trường hiện nay
      </p>
      <div className={styles.wrapper}>
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product} />
        ))}
      </div>
      {totalProduct
        ? (<button className={styles.btnLoadMore}
          onClick={() => setPage((page) => page + 1)}
          disabled
        // disabled={Boolean(totalProduct) && products.length >= totalProduct}
        >
          Xem Thêm Sản Phẩm
        </button>
        )
        : (<Typography variant="h6"
          sx={{ fontWeight: 500 }}
        >Đang Tải sản phẩm ...</Typography>)
      }

      <div>

      </div>
    </div>
  );
};

export default ProductList;
