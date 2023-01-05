import { ReactNode } from "react";
import styled from "styled-components";

interface IStatItem {
  count: number;
  title: string;
  icon: ReactNode;
  color: string;
}

const StatItem = (item: IStatItem) => {
  const { color, count, icon, title } = item;
  return (
    <Wrapper color={color}>
      <header>
        <span className="count">{count}</span>
        <span className="icon">{icon}</span>
      </header>
      <h5 className="title">{title}</h5>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  padding: 2rem;
  border: 1px solid var(--border);
  border-radius: var(--borderRadius);
  border-bottom: 3px solid ${(props) => props.color};
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .count {
    display: block;
    font-weight: 600;
    font-size: 2.3rem;
    color: ${(props) => props.color};
  }
  .title {
    margin: 0;
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: left;
    margin-top: 0.5rem;
    font-weight: 400;
  }
  .icon {
    width: 50px;
    height: 40px;
    border-radius: var(--borderRadius);
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 2rem;
      color: ${(props) => props.color};
    }
  }
`;

export default StatItem;
