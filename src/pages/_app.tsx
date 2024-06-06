import { AppProps } from "next/app";
import Layout from "@/components/Layout";
import "../styles/globals.css";
import { Toaster } from "@/components/ui/toaster";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
      <Toaster />
    </Layout>
  );
}

export default MyApp;
