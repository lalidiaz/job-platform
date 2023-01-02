import styled from "styled-components";

interface IJobInfo {
  children?: JSX.Element | JSX.Element[];
}
const JobInfo = ({ children }: IJobInfo) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  .icon {
    font-size: 1rem;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    svg {
      color: var(--grey-400);
    }
  }
  .text {
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
  }
`;
export default JobInfo;
