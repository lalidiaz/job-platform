import { FormRow, FormRowSelect } from ".";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../hooks";
import { useState, useMemo, SetStateAction } from "react";
import { handleChange, clearFilters } from "../features/job/allJobSlice";

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
        <h4>search form</h4>
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
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 2rem;
    row-gap: 0.5rem;
  }
  h5 {
    font-weight: 700;
  }
  .btn-block {
    align-self: end;
    margin-top: 1rem;
  }
  @media (min-width: 768px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .btn-block {
      margin-top: 0;
    }
  }
`;

export default SearchContainer;
