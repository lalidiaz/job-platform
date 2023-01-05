import { FormRow, FormRowSelect } from ".";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../hooks";
import { useState, useMemo, SetStateAction } from "react";
import { handleChange, clearFilters } from "../features/job/allJobSlice";
import { device } from "../styles/device";

const SearchContainer = (): JSX.Element => {
  const [localSearch, setLocalSearch] = useState("");

  const { isLoading, searchStatus, searchType, sort, sortOptions } = useAppSelector(
    (store) => store.allJobs
  );

  const { jobTypeOptions, statusOptions } = useAppSelector((store) => store.job);

  const dispatch = useAppDispatch();

  const handleSearch = (e: { target: { name: any; value: any } }) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  const debounce = () => {
    let timeoutID: string | number | NodeJS.Timeout | undefined;
    return (e: { target: { value: SetStateAction<string>; name: any } }) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        dispatch(handleChange({ name: e.target.name, value: e.target.value }));
      }, 1000);
    };
  };
  const optimizedDebounce = useMemo(() => debounce(), []);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLocalSearch("");
    dispatch(clearFilters());
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>Search Job</h3>
        <div className="form-center">
          <FormRow type="text" name="search" value={localSearch} handleChange={optimizedDebounce} />

          <FormRowSelect
            labelText="status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            list={["all", ...statusOptions]}
          />

          {/* search by type*/}
          <FormRowSelect
            labelText="type"
            name="searchType"
            value={searchType}
            handleChange={handleSearch}
            list={["all", ...jobTypeOptions]}
          />
          {/* sort */}
          <FormRowSelect name="sort" value={sort} handleChange={handleSearch} list={sortOptions} />
          <button className="btn btn-block btn-danger" disabled={isLoading} onClick={handleSubmit}>
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form {
    width: 100%;
    max-width: 100%;
  }
  .form-input,
  .form-select,
  .btn-block {
    height: 35px;
  }

  .form-center {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 2rem;
    row-gap: 0.5rem;
  }

  .btn-danger {
    background-color: var(--red);
    margin-bottom: 20px;
  }
  .btn-block {
    align-self: end;
    margin-top: 1rem;
  }
  .btn-block:hover {
    background-color: var(--red-dark);
  }
  @media ${device.tablet} {
    .form-center {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media ${device.laptop} {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
`;

export default SearchContainer;
