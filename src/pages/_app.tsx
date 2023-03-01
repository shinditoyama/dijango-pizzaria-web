import LayoutIndex from "@/components/Layout";
import LayoutLogin from "@/components/Layout/login";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ProSidebarProvider } from "react-pro-sidebar";
import { CustomProvider } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import ptBR from "rsuite/locales/pt_BR";

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  let Layout = LayoutIndex;

  if (pathname.indexOf("/login") === 0) {
    Layout = LayoutLogin;
  }

  return (
    <ProSidebarProvider>
      <CustomProvider locale={ptBR}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CustomProvider>
    </ProSidebarProvider>
  );
}
