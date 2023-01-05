import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { FormRow, FormRowSelect } from "../../components";
import { toast } from "react-toastify";
import styled from "styled-components";
import { device } from "../../styles/device";
import { handleChange, clearValues, createJob, editJob } from "../../features/job/jobSlice";
import { useNavigate } from "react-router-dom";

const AddJob = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobTypeOptions,
    jobType,
    statusOptions,
    status,
    isEditing,
    editJobId,
  } = useAppSelector((store) => store.job);
  const navigate = useNavigate();
  const { user } = useAppSelector((store) => store.user);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      toast.error("Please fill out all fields");
      return;
    }

    if (isEditing) {
      dispatch(editJob({ jobId: editJobId, position, company, jobLocation, jobType, status }));
      return;
    }

    dispatch(
      createJob({
        position,
        company,
        jobLocation,
        jobType,
        status,
      })
    );

    setTimeout(() => {
      navigate("/all-jobs");
    }, 2000);
  };

  const handleJobInput = (
    e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>
  ): void => {
    const name: string = e.target.name;
    const value: string = e.target.value;

    dispatch(handleChange({ name, value }));
  };

  useEffect(() => {
    if (!isEditing) {
      dispatch(handleChange({ name: "jobLocation", value: user?.location }));
    }
  }, [dispatch, isEditing, user?.location]);

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "Edit job" : "Add job"}</h3>
        <div className="form-center">
          <FormRow type="text" name="position" value={position} handleChange={handleJobInput} />
          <FormRow type="text" name="company" value={company} handleChange={handleJobInput} />
          <FormRow
            type="text"
            name="jobLocation"
            labelText="job location"
            value={jobLocation}
            handleChange={handleJobInput}
          />
          <FormRowSelect
            name="status"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions!}
          />
          <FormRowSelect
            name="jobType"
            labelText="job type"
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions!}
          />
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};
export default AddJob;

const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 100%;

  @media ${device.laptop} {
    padding: 3rem 2rem 4rem;
  }

  h3 {
    margin-top: 0;
    padding: 20px 0px 0px 0px;
  }
  .form {
    margin: 0;
    box-shadow: none;
    max-width: 100%;
    width: 100%;
    border-radius: var(--borderRadius);
  }

  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-bottom: 20px;
    button {
      height: 35px;
    }
  }
  .clear-btn {
    background: var(--red);
  }
  .clear-btn:hover {
    background: var(--pink);
  }
  @media ${device.tablet} {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
    .btn-container {
      margin-top: 0;
    }
  }
  @media ${device.desktop} {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .form-center button {
      margin-top: 0;
    }
  }
`;
