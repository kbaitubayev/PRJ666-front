import Layout from "@/components/Layout";
import RouteGuard from "@/components/RouteGuard";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* <RouteGuard> */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
      {/* </RouteGuard> */}
    </>
  );
}
