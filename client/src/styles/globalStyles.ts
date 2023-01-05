import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family:var(--poppins);
    background-color:var(--background);
    color:var(--text);
  }
    h1 {
      margin-top: 0;
      font-size: 2.5rem;
    }
    
    h2 {
      font-size: 2.441rem;
    }
    
    h3 {
      font-weight: 700;
      font-size: 1.4rem;
    }
    
    h4 {
      font-size: 1.563rem;
    }
    
    h5 {
      font-size: 1.25rem;
    }
    
    a {
      text-decoration: none;
      letter-spacing: var(--letterSpacing);
    }
    a,
    button {
      line-height: 1.15;
    }
    button:disabled {
      cursor: not-allowed;
    }
    ul {
      list-style-type: none;
      padding: 0;
    }

    .btn {
      cursor: pointer;
      color: var(--white);
      background: var(--green);
      border: transparent;
      border-radius: var(--borderRadius);
      letter-spacing: var(--letterSpacing);
      padding: 0.375rem 0.75rem;
      transition: var(--transition);
      text-transform: capitalize;
      display: inline-block;
    }
    .btn:hover {
      background: var(--green-dark);
    }

  .form {
    width: 90vw;
    max-width: var(--fixed-width);
    border-radius: var(--borderRadius);
    padding: 2rem 2.5rem;
    margin: 3rem auto;
    border:1px solid var(--gray);
    transition: var(--transition);
  }
 
  .form-label {
    display: block;
    font-size: var(--smallText);
    margin-bottom: 0.5rem;
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
  }
  .form-input,
  .form-textarea,
  .form-select {
    width: 100%;
    padding: 0.375rem 0.75rem;
    border-radius: var(--borderRadius);
    border: 1px solid var(--grey-200);
    background-color:var(--inputBackground);
  }
  .form-input,
  .form-select,
  .btn-block {
    height: 35px;
  }

  .form-row{
    margin-bottom:20px;
  }

  .form-textarea {
    height: 7rem;
  }
  ::placeholder {
    font-family: inherit;
    color: var(--grey-400);
  }
  .form-alert {
    color: var(--red-dark);
    letter-spacing: var(--letterSpacing);
    text-transform: capitalize;
  }
  /* alert */

  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }

  .container {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
  }
  .full-page {
    min-height: 100vh;
  }

  .btn-block {
    width: 100%;
  }

  .logo{
    width:150px;
    
  }

  `;

export default GlobalStyle;
