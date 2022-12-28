import styled from "styled-components";
import { Link } from "react-router-dom";

const Error = (): JSX.Element => {
  return (
    <Wrapper className="full-page">
      <div>
        <h3>Page not found</h3>
        <Link to="/">go back home</Link>
      </div>
    </Wrapper>
  );
};
export default Error;

const Wrapper = styled.main`
  text-align: center;
  img {
    width: 90vw;
    max-width: 600px;
    display: block;
    margin-bottom: 2rem;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  h3 {
    margin-bottom: 0.5rem;
  }
  p {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: var(--grey-500);
  }
  a {
    color: var(--primary-500);
    text-decoration: underline;
    text-transform: capitalize;
  }
`;
