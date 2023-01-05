import { useAppSelector } from "../hooks";
import styled from "styled-components";
import { StatItem } from "./";
import { FaCalendarCheck } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import { AiOutlinePaperClip } from "react-icons/ai";

const StatsContainer = () => {
  const { stats } = useAppSelector((store) => store.allJobs);

  const defaultStats = [
    {
      title: "pending applications",
      count: stats?.pending || 0,
      icon: <MdPendingActions />,
      color: "#81a0d3",
    },
    {
      title: "interviews scheduled",
      count: stats?.interview || 0,
      icon: <FaCalendarCheck />,
      color: "#fac372",
    },
    {
      title: "jobs declined",
      count: stats?.declined || 0,
      icon: <AiOutlinePaperClip />,
      color: "#ed7370",
    },
  ];

  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />;
      })}
    </Wrapper>
  );
};
const Wrapper = styled.section`
  display: grid;
  row-gap: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }
  @media (min-width: 1120px) {
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 1rem;
  }
`;
export default StatsContainer;
