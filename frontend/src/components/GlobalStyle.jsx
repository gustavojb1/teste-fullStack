import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    /* --white: #fff;
    --white-100: #FEFBF6
    --gray-100: #e1e1e6;
    --gray-300: #c4c4cc;
    --gray-400: #8d8d99;
    --gray-600: #323238;
    --gray-700: #29292e;
    --gray-800: #202024;
    --gray-900: #121214;
    --blue-100: #ECF9FF
    --blue-300: #98ABEE;
    --blue-500: #40A2E3;
    */
    
    --red-500: #f75a68; 
    --green-500: #4cd62b;

    --white: #fff;


    --blue-100: #ECF9FF;
    --blue-300: #a6b8f7;
    --blue-400: #98ABEE;
    --blue-500: #40A2E3;
    --blue-600: #146C94;
    
    --gray-050: #fafafc;
    --gray-100: #ededf3;
    --gray-300: #c4c4cc;

    --gray-800: #202024;


  }

  :focus {
    outline: transparent;
    box-shadow: 0 0 0 2px var(--blue-400);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: var(--blue-100);
    color: var(--gray-800);
    -webkit-font-smoothing: antialiased;

  }

  html{
    font-size: 16px;
  
    @media (max-width: 1080px) {
      font-size: 93.75%; //15px
    }
    @media (max-width: 720px) {
      font-size: 87.5%; //14px
    }
    
  }

  body,
  input,
  textarea,
  button {
    font: 400 1rem "Roboto", sans-serif;
  }
`;

export default GlobalStyle;