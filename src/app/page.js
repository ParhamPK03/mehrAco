import { Suspense } from "react";
import Layout from "../app/Components/layouts/ShopLayout";
import Product from "./Components/templates/Product";
import ReactQueryProvider from "./ReactQueryProvider";

const Page = () => {
  return (
    <ReactQueryProvider>
      <Layout>
        <Suspense fallback={<div>در حال بارگذاری...</div>}>
          <Product />
        </Suspense>
      </Layout>
    </ReactQueryProvider>
  );
};

export default Page;
