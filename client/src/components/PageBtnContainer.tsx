import { useAppSelector, useAppDispatch } from "../hooks";
import styled from "styled-components";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { changePage } from "../features/job/allJobSlice";
import { device } from "../styles/device";

const PageBtnContainer = () => {
  const { numPages, page } = useAppSelector((store) => store.allJobs);
  const dispatch = useAppDispatch();

  const pages = Array.from({ length: numPages }, (_, index) => {
    return index + 1;
  });

  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numPages) {
      newPage = 1;
    }
    dispatch(changePage(newPage));
  };

  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = numPages;
    }
    dispatch(changePage(newPage));
  };

  return (
    <Wrapper>
      <button type="button" className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft />
        Prev
      </button>
      <div className="btn-container">
        {pages.map((pageNumber) => {
          return (
            <button
              className={pageNumber === page ? "pageBtn active" : "pageBtn"}
              type="button"
              key={pageNumber}
              onClick={() => dispatch(changePage(pageNumber))}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button type="button" className="next-btn" onClick={nextPage}>
        <HiChevronDoubleRight />
        Next
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  .btn-container {
    border-radius: var(--borderRadius);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .pageBtn {
    background: transparent;
    border-color: transparent;
    width: 50px;
    height: 40px;
    font-weight: 700;
    font-size: 1.25rem;
    color: var(--text);
    transition: var(--transition);
    border-radius: var(--borderRadius);
    cursor: pointer;
  }
  .pageBtn:hover {
    background: var(--gray);
  }
  .active {
    background: var(--text);
    color: var(--white);
  }
  .prev-btn,
  .next-btn {
    width: 100px;
    height: 40px;
    background: var(--white);
    border-color: transparent;
    border-radius: var(--borderRadius);
    color: var(--text);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: var(--transition);
  }

  .prev-btn {
    margin: 0px 10px 0px 0px;
  }
  .next-btn {
    margin: 0px 0px 0px 10px;
  }

  .prev-btn:hover,
  .next-btn:hover {
    background: var(--gray);
    color: var(--text);
  }

  @media ${device.laptop} {
    height: 6rem;
    margin-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: end;
    flex-wrap: wrap;
    gap: 1rem;
  }
`;

export default PageBtnContainer;
