import React from "react";
import { createGlobalStyle } from "styled-components";
import { useLocalStore } from "mobx-react";

import api from "~/services/api";
import { MainStore, MainStoreProvider } from "~/stores/mainStore";

const GlobalStyles = createGlobalStyle`
  html {
    height: 100%;
  }
  
  body {
    height: 100%;
    margin: 0;
  }

  #__next {
    height: 100%;
  }
`;

function MyApp({ Component, pageProps }) {
  const mainStore = useLocalStore(() =>
    MainStore.create(
      {
        author: {
          name: "",
          lastname: "",
        },
      },
      { api }
    )
  );

  return (
    <React.Fragment>
      <GlobalStyles />
      <MainStoreProvider value={mainStore}>
        <Component {...pageProps} />
      </MainStoreProvider>
    </React.Fragment>
  );
}

export default MyApp;
