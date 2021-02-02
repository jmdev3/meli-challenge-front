import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useLocalStore } from "mobx-react";

import Header from "~/components/shared/Header";
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

const StyledMain = styled.main`
  && {
    display: flex;
    justify-content: center;
    height: 100%;
    background-color: #ebebeb;
    padding-top: 16px;
    font-family: serif;
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
        <Header
          categories={mainStore.categories}
          clearStore={mainStore.clearStore}
        />
        <StyledMain>
          <Component {...pageProps} />
        </StyledMain>
      </MainStoreProvider>
    </React.Fragment>
  );
}

export default MyApp;
