import Wrapper from "../styles/errorStyles";
import { Link } from "react-router-dom";

const Error: React.FC = (): JSX.Element => {
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
