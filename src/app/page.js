import React from "react";
import Layout from "../app/Components/layouts/ShopLayout";
import Product from "./Components/templates/Product";
import ReactQueryProvider from "./ReactQueryProvider"; 

const Page = () => {
  return (
    <ReactQueryProvider>
      <Layout>
        <Product />
      </Layout>
    </ReactQueryProvider>
  );
};

export default Page;
