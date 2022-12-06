import styled from "styled-components";
import { device } from "./device";

const Wrapper = styled.main`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
    padding: 2rem;
  }
  h1 {
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
  }
  p {
    color: var(--grey-600);
  }

  .btn-hero {
    font-size: 1.25rem;
    padding: 0.5rem 1.25rem;
  }

  .main-img {
    display: none;
  }
  @media ${device.laptop} {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
      width: 100%;
    }
  }
`;

export default Wrapper;
