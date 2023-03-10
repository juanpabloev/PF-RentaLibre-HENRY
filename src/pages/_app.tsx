import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout";
import { trpc } from "../utils/trpc";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { store, persistor } from "../redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "../styles/globals.css";

const colors = {
  brand: {
    blueberry: "#404c5a",
    apricot: "#F7882F",
    citrus: "#F7C331",
    apple_core: "#DCC7AA",
  },
};

const theme = extendTheme({ colors });

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SessionProvider session={session}>
          <ChakraProvider theme={theme}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ChakraProvider>
        </SessionProvider>
      </PersistGate>
    </Provider>
  );
};

export default trpc.withTRPC(MyApp);
