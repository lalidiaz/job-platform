import { useEffect } from "react";
import { StatsContainer, ChartsContainer, Loading } from "../../components";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { showStats } from "../../features/job/allJobSlice";

const Stats = () => {
  const { isLoading, monthlyApplications } = useAppSelector(
    (store) => store.allJobs
  );
  console.log("isLoading", isLoading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(showStats());
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      <StatsContainer />

      {monthlyApplications.length > 0 ? (
        <ChartsContainer />
      ) : (
        <div className="no-data">
          <h3>No data to display</h3>
        </div>
      )}
    </>
  );
};
export default Stats;
