import { useState, useEffect } from "react";
import { Logo, FormRow } from "../components";
import { toast } from "react-toastify";
import { registerUser, loginUser } from "../features/user/userSlice";
import { useAppSelector, useAppDispatch } from "../hooks";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};
const Register = (): JSX.Element => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const { isLoading, user, error } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = (e.target as HTMLInputElement).name;
    const value = (e.target as HTMLInputElement).value;

    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, email, password, isMember } = values;

    if (!email || !password || (!isMember && !name)) {
      toast.error("Please fill out all fields.");
      return;
    }

    if (isMember) {
      dispatch(loginUser({ email, password }));

      return;
    }
    dispatch(registerUser({ email, name, password }));
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  return (
    <Wrapper>
      <div className="full-page">
        <form className="form" onSubmit={handleSubmit}>
          <Logo />
          <h3> {values.isMember ? "Login" : "Register"} </h3>
          {!values.isMember && (
            <FormRow
              name="name"
              type="text"
              value={values.name}
              handleChange={handleChange}
              labelText="Name"
            />
          )}

          <FormRow
            name="email"
            type="email"
            value={values.email}
            handleChange={handleChange}
            labelText="Email"
          />
          <FormRow
            name="password"
            type="password"
            value={values.password}
            handleChange={handleChange}
            labelText="Password"
          />

          <button type="submit" className="btn btn-block" disabled={isLoading}>
            {isLoading ? "loading..." : "submit"}
          </button>

          <button
            type="button"
            className="btn btn-block btn-hipster"
            disabled={isLoading}
            onClick={() =>
              dispatch(
                loginUser({ email: "testUser@test.com", password: "secret" })
              )
            }
          >
            {isLoading ? "loading..." : "demo"}
          </button>

          <p>
            {values.isMember ? "Not a member yet." : "Already a member."}
            <button type="button" onClick={toggleMember} className="member-btn">
              {values.isMember ? "Register" : "Login"}
            </button>
          </p>

          {/* {error && <p>error</p>} */}
        </form>
      </div>
    </Wrapper>
  );
};
export default Register;

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  background-color: var(--green);

  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    background-color: var(--background);
    border: 0.1rem solid var(--text);
    border: 0;
  }
  h3 {
    text-align: center;
    color: var(--text);
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
    color: var(--text);
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--green);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
`;
