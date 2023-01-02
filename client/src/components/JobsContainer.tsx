import { useEffect } from "react";
import { Job, Loading } from ".";
import { useAppSelector, useAppDispatch } from "../hooks";
import styled from "styled-components";
import { device } from "../styles/device";
import { getAllJobs } from "../features/job/allJobSlice";

const JobsContainer = () => {
  const { jobs, isLoading } = useAppSelector((store) => store.allJobs);
  const dispatch = useAppDispatch();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    dispatch(getAllJobs());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <Wrapper>
        <Loading center />
      </Wrapper>
    );
  }

  if (jobs.length === 0) {
    <Wrapper>
      <h2>No jobs to display</h2>
    </Wrapper>;
  }

  return (
    <Wrapper>
      <h5>Jobs Info</h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id as string} {...job} createdAt={job.createdAt as Date} />;
        })}
      </div>
    </Wrapper>
  );
};

export default JobsContainer;

const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }
  .jobs {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  @media ${device.tablet} {
    .jobs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }
`;
