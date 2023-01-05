import { useEffect } from "react";
import { StatsContainer, ChartsContainer } from "../../components";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { showStats } from "../../features/job/allJobSlice";

const Stats = () => {
  const { monthlyApplications } = useAppSelector((store) => store.allJobs);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(showStats());
  }, []);

  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};
export default Stats;
