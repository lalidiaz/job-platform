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
            This is a fullstack application built with <span>ReactJs</span> as the Frontend and{" "}
            <span>Nodejs</span> as the Backend. For you to test the application, you can log in as a
            Test User (you will not be able to edit, delete or modify data). You can also log in or
            register.
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
    padding: 100px 0px 0px 0px;
  }
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  h1 {
    font-weight: 700;
    color: var(--text);
    span {
      color: var(--green-logo);
    }
  }
  p {
    color: var(--text);
    line-height: 1.8rem;

    span {
      color: var(--green-logo);
    }
  }
  .btn-hero {
    font-size: 1rem;
    padding: 0.5rem 1.25rem;
    background-color: var(--green-logo);
  }
  .btn-hero:hover {
    background-color: var(--green-logo-dark);
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
