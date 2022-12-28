import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family:var(--work-sans);
    background-color:var(--theme-ui-background);
    color:var(--theme-ui-text);
  }
    h1 {
      margin-top: 0;
      font-size: 3.052rem;
    }
    
    h2 {
      font-size: 2.441rem;
    }
    
    h3 {
      font-size: 1.953rem;
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
      background: var(--theme-ui-purple);
      border: transparent;
      border-radius: var(--borderRadius);
      letter-spacing: var(--letterSpacing);
      padding: 0.375rem 0.75rem;
      box-shadow: var(--shadow-2);
      transition: var(--transition);
      text-transform: capitalize;
      display: inline-block;
    }
    .btn:hover {
      background: var(--primary-700);
      box-shadow: var(--shadow-3);
    }

  .form {
    width: 90vw;
    max-width: var(--fixed-width);
    border-radius: var(--borderRadius);
    box-shadow: var(--shadow-2);
    padding: 2rem 2.5rem;
    margin: 3rem auto;
    transition: var(--transition);
  }
  .form:hover {
    box-shadow: var(--shadow-4);
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
    background: var(--backgroundColor);
    border: 1px solid var(--grey-200);
  }
  .form-input,
  .form-select,
  .btn-block {
    height: 35px;
  }
  .form-row {
    margin-bottom: 1rem;

    .form-label{
      color:var(--theme-ui-text);
    }
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
    width:5rem;
  }

  `;

export default GlobalStyle;
