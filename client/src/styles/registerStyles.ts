import styled from "styled-components";

export const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    background-color: var(--theme-ui-background);
    border: 0.1rem solid var(--theme-ui-text);
  }
  h3 {
    text-align: center;
    color: var(--theme-ui-text);
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
    color: var(--theme-ui-text);
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
`;
