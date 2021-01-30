import React from "react";
import { createGlobalStyle } from "styled-components";

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
  return (
    <React.Fragment>
      <GlobalStyles />
      <Component {...pageProps} />
    </React.Fragment>
  );
}

export default MyApp;
