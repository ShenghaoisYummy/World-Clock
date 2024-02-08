import React from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import Clock from "./components/Clock";

const theme = {
  primary: "#69c0ff",
  secondary: "#b7eb8f",
  color: {
    dark: "#333",
    light: "#eee",
  },
  clockBackground: {
    light: `rgba(255, 255, 255, 0.1)`,
    dark: `rgba(0, 0, 0, 0.1)`,
  },
};

const backgroundImg = `linear-gradient(to bottom right, ${theme.primary} 0%, ${theme.secondary} 100%)`;
const GlobalStyle = createGlobalStyle`
  :root{
    font-size:10px;
  }

    body {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100dvw;
      min-height: 100dvh;
      font-family: "Orbitron", sans-serif;
      font-size: 2rem;
      text-shadow: 0 3px 5px rgba(0 0 0  / 10%);
      background: ${backgroundImg}

    }  
    *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    list-style: none;
    user-select: none;
    -webkit-user-drag: none;
  }`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  max-width: 1200px;
`;
console.log(theme);
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>
        <Clock city="Sydney" timezone={11} />
        <Clock city="London" timezone={1} />
        <Clock city="London" timezone={1} />
        <Clock />
      </Container>
    </ThemeProvider>
  );
};

export default App;
