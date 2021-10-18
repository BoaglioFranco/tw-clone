import "../styles/globals.scss";
import type { AppContext, AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "next/app";
import { initStore } from "../store/initStore";
import Cookies from "universal-cookie";

const queryClient = new QueryClient();




function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />

    </QueryClientProvider>
  );
}


MyApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const cookies = new Cookies(appContext.ctx.req?.headers.cookie).getAll();
  initStore(cookies)
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps }
}

export default MyApp;
