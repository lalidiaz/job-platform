import { useState, useEffect } from "react";
import { Wrapper } from "../styles/registerStyles";
import { Logo, FormRow } from "../components";
import { toast } from "react-toastify";
import { registerUser, loginUser } from "../features/user/userSlice";
import { useAppSelector, useAppDispatch } from "../hooks";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};
const Register: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const { isLoading, user } = useAppSelector((store) => store.user);
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

          <p>
            {values.isMember ? "Not a member yet." : "Already a member."}
            <button type="button" onClick={toggleMember} className="member-btn">
              {values.isMember ? "Register" : "Login"}
            </button>
          </p>
        </form>
      </div>
    </Wrapper>
  );
};
export default Register;
