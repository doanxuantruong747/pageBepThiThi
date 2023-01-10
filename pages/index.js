import Head from "next/head";
import Image from "next/image";
import Featured from "../components/Featured";
import ProductList from "../components/ProductList";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Bep Thi Thi</title>
        <meta name="description" content="Best shop in Thu Duc" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Featured />

      <div id="productlist">
        <ProductList />
      </div>

    </div>
  );
}

