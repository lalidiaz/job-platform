import { Logo } from "../components";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { device } from "../styles/device";

const Landing = (): JSX.Element => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>tracking</span> app
          </h1>
          <p>
            Direct trade flannel retro, bushwick intelligentsia lyft glossier man braid Brooklyn
            adaptogen etsy organic four dollar toast umami bruh. Flexitarian flannel tilde keffiyeh
            intelligentsia normcore swag whatever. Artisan actually deep v pabst. Chia lomo air
            plant bruh leggings microdosing 3 wolf moon tilde irony.{" "}
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/register
          </Link>
        </div>
        <img src="illustration.png" alt="illustration" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;

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
    color: var(--theme-ui-text);
    span {
      color: var(--theme-ui-purple);
    }
  }
  p {
    color: var(--theme-ui-text);
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
