import styled from "styled-components";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { JobInfo } from ".";
import { Link } from "react-router-dom";
import moment from "moment";
import { deleteJob, setEditJob } from "../features/job/jobSlice";
import { useAppDispatch } from "../hooks";
import { IJob } from "../types";

const Job = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  status,
}: IJob): JSX.Element => {
  //@ts-ignore
  const date = moment(createdAt).format("MMM Do, YYYY");
  const dispatch = useAppDispatch();

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo>
            <span className="icon">
              <FaLocationArrow />
            </span>
            <span className="text">{jobLocation} </span>
          </JobInfo>
          <JobInfo>
            <span className="icon">
              <FaCalendarAlt />
            </span>
            <span className="text">{date as string} </span>
          </JobInfo>

          <JobInfo>
            <span className="icon">
              <FaBriefcase />
            </span>
            <span className="text">{jobType} </span>
          </JobInfo>

          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/add-job"
              className="btn edit-btn"
              onClick={() =>
                dispatch(
                  setEditJob({
                    editJobId: _id,
                    position,
                    company,
                    jobLocation,
                    jobType,
                    status,
                  })
                )
              }
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => dispatch(deleteJob(_id as string))}
            >
              delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;

const Wrapper = styled.article`
  background: var(--white);
  border-radius: var(--borderRadius);
  border: 1px solid var(--gray);
  display: grid;
  grid-template-rows: 1fr auto;
  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--text);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: flex-end;
    h5 {
      letter-spacing: 0;
    }
  }
  .main-icon {
    width: 45px;
    height: 45px;
    display: grid;
    place-items: center;
    background: var(--text);
    border-radius: var(--borderRadius);
    font-size: 1.2rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
    margin-right: 2rem;
  }
  .info {
    h5 {
      margin-bottom: 0.25rem;
    }
    p {
      margin: 0;
      text-transform: capitalize;
      color: var(--grey-400);
      letter-spacing: var(--letterSpacing);
    }
  }
  .pending {
    background: #fcefc7;
    color: #e9b949;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .interview {
    background: #e0e8f9;
    color: #647acb;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .declined {
    color: #d66a6a;
    background: #ffeeee;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .content {
    padding: 1rem 1.5rem;
  }
  .content-center {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.5rem;
    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 992px) {
      grid-template-columns: 1fr;
    }
    @media (min-width: 1120px) {
      grid-template-columns: 1fr 1fr;
    }
  }
  .status {
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: center;
    width: 100px;
    height: 30px;
    margin-top: 0.5rem;
  }
  footer {
    margin-top: 1rem;
  }
  .edit-btn,
  .delete-btn {
    letter-spacing: var(--letterSpacing);
    cursor: pointer;
    height: 30px;
  }
  .edit-btn {
    background: var(--green);
    margin-right: 0.5rem;
  }
  .delete-btn {
    background: var(--red);
  }
  &:hover .actions {
    visibility: visible;
  }
`;
