import styled from "styled-components";
import { device } from "../styles/device";
import { useAppSelector, useAppDispatch } from "../hooks";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import { toggleSidebar } from "../features/user/userSlice";

const BigSideBar = (): JSX.Element => {
  const { isSidebarOpen } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  const toggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <Wrapper>
      <div className={isSidebarOpen ? "sidebar-container " : "sidebar-container show-sidebar"}>
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks toggle={toggle} />
        </div>
      </div>
    </Wrapper>
  );
};
export default BigSideBar;

const Wrapper = styled.aside`
  display: none;
  @media ${device.laptop} {
    display: block;
    box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);
    .sidebar-container {
      min-height: 100vh;
      height: 100%;
      width: 250px;
      margin-left: -250px;
      transition: var(--transition);
    }
    .content {
      position: sticky;
      top: 0;
    }
    .show-sidebar {
      margin-left: 0;
    }
    header {
      height: 6rem;
      display: flex;
      align-items: center;
      padding-left: 2.5rem;
    }
    .nav-links {
      padding-top: 2rem;
      display: flex;
      flex-direction: column;
    }
    .nav-link {
      display: flex;
      align-items: center;
      color: var(--grey-500);
      padding: 1rem 0;
      padding-left: 2.5rem;
      text-transform: capitalize;
      transition: var(--transition);
    }
    .nav-link:hover {
      background: var(--grey-50);
      padding-left: 3rem;
      color: var(--theme-ui-background);
    }
    .nav-link:hover .icon {
      color: var(--theme-ui-purple);
    }
    .icon {
      font-size: 1.5rem;
      margin-right: 1rem;
      display: grid;
      place-items: center;
      transition: var(--transition);
    }
    .active {
      color: var(--theme-ui-purple);
    }
    .active .icon {
      color: var(--theme-ui-purple);
    }
  }
`;
