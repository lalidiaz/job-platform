import { useEffect } from "react";
import { Job, Loading, PageBtnContainer } from ".";
import { useAppSelector, useAppDispatch } from "../hooks";
import styled from "styled-components";
import { device } from "../styles/device";
import { getAllJobs } from "../features/job/allJobSlice";

const JobsContainer = () => {
  const {
    jobs,
    isLoading,
    page,
    totalJobs,
    numPages,
    search,
    searchStatus,
    searchType,
    sort,
  } = useAppSelector((store) => store.allJobs);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllJobs());
  }, [page, search, searchStatus, searchType, sort]);

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
      <h4>
        {totalJobs} job{jobs.length > 1 && "s"} found
      </h4>
      <div className="jobs">
        {jobs.map((job) => {
          return (
            <Job
              key={job._id as string}
              {...job}
              createdAt={job.createdAt as Date}
            />
          );
        })}
      </div>
      {numPages > 1 && <PageBtnContainer />}
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
    font-weight: 400;
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
