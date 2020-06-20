import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  ${
    "" /* html, body, #root {
    height: 100%;
    min-height: 100%;
    font-family: 'Montserrat', sans-serif;
    overflow: hidden;
  }
  body {
    -webkit-tap-highlight-color: transparent;
    line-height: 1.2;
    font-size: 16px;
    font-weight: 500;
    color: #000000;
  } */
  }
  #root {
    display: flex;
    flex-direction: column;
  }
  button,
  input,
  optgroup,
  select,
  textarea {
    font-weight: 500;
  }
  *, *:after, *:before, input[type="search"] {
    box-sizing: border-box;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  ul {
    list-style: none;
  }
  ul, li, ol, dd, h1, h2, h3, h4, h5, h6, p {
    padding: 0;
    margin: 0;
  }
  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 700;
  }
  button {
    background: none;
    border: none;
  }
  /* Workaround for IE11 focus highlighting for select elements */
  select::-ms-value {
    background: none;
    color: #42413d;
  }
  [role="button"], button, input, select, textarea {
    outline: none;
    &:focus {
      outline: none;
    }
    &:disabled {
      opacity: 1;
    }
  }
  [role="button"], button, input, textarea {
    appearance: none;
  }
  select:-moz-focusring {
    color: transparent;
    text-shadow: 0 0 0 #000;
  }
  select::-ms-expand {
    display: none;
  }
  select option {
    color: #000000;
  }
  p {
    line-height: 1.4285;
    a {
      color: #000000;
      font-decoration: none;
    }
  }
  textarea {
    line-height: 1.4285;
  }
  body, select {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    overflow: scroll;
    overflow-x: hidden;
    touch-action: manipulation;
  }
  ::-webkit-scrollbar {
      width: 0px;  /* Remove scrollbar space */
      background: transparent;  /* Optional: just make scrollbar invisible */
  }
  /* Optional: show position indicator in red */
  ::-webkit-scrollbar-thumb {
      background: #FF0000;
  }
`;
