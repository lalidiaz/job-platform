import styled from "styled-components";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import Logo from "./Logo";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { clearStoreValues, toggleSidebar } from "../features/user/userSlice";
import { device } from "../styles/device";

const Navbar = (): JSX.Element => {
  const [showLogout, setShowLogout] = useState(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((store) => store.user);

  const toggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggle}>
          <HiOutlineMenu color="#5bbba9" />
        </button>
        <div>
          <Logo />
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => dispatch(clearStoreValues("Logging out..."))}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default Navbar;

const Wrapper = styled.nav`
  height: var(--nav-height);
  background-color: var(--background);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.1);

  .logo {
    display: none;
  }
  .nav-center {
    display: flex;
    width: 90vw;
    align-items: center;
    justify-content: space-between;
  }
  .toggle-btn {
    background: transparent;
    border-color: transparent;
    font-size: 1.75rem;
    color: var(--green);
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  .btn-container {
    position: relative;
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
    position: relative;
  }
  .dropdown {
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    background-color: var(--green-dark);
    padding: 0.5rem;
    text-align: center;
    visibility: hidden;
    border-radius: var(--borderRadius);
  }
  .show-dropdown {
    visibility: visible;
  }
  .dropdown-btn {
    color: white;
    background: transparent;
    border-color: transparent;
    letter-spacing: var(--letterSpacing);
    text-transform: capitalize;
    cursor: pointer;
  }
  @media ${device.laptop} {
    position: sticky;
    top: 0;
    .nav-center {
      width: 90%;
    }
    .logo {
      display: none;
    }
  }
`;
