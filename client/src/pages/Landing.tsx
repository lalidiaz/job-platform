import Wrapper from "../styles/landingStyles";
import { Logo } from "../components";
import { Link } from "react-router-dom";

const Landing: React.FC = () => {
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
            Direct trade flannel retro, bushwick intelligentsia lyft glossier man braid Brooklyn adaptogen etsy organic
            four dollar toast umami bruh. Flexitarian flannel tilde keffiyeh intelligentsia normcore swag whatever.
            Artisan actually deep v pabst. Chia lomo air plant bruh leggings microdosing 3 wolf moon tilde irony.{" "}
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
