import { Input } from "../../components";
import { AuthLayout } from "../layout/AuthLayout";
import * as Yup from "yup";
import { registerWithEmailPassword } from "../../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { checkingCredentials, logout } from "../../store/auth";
import { RootState } from "../../store/store";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  const { status, errorMessage } = useSelector(
    (state: RootState) => state.auth
  );
  const isCheckingAuthetication = useMemo(
    () => status === "checking",
    [status]
  );
  const [userRegister, setUserRegister] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialValues = {
    displayName: "",
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    displayName: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values: any) => {
    dispatch(checkingCredentials());
    const registerData = {
      displayName: values.displayName,
      email: values.email,
      password: values.password,
    };
    const result = await registerWithEmailPassword(
      registerData.email,
      registerData.password,
      registerData.displayName
    );
    if (!result.ok)
      return dispatch(logout({ errorMessage: result.errorMessage }));

    setUserRegister(true);
    setTimeout(() => {
      setUserRegister(false);
      navigate("/auth/login");
    }, 2000);

    return result;
  };
  return (
    <AuthLayout
      title="Sign Up"
      initialValues={initialValues}
      validationSchema={validationSchema}
      label="Create Password"
      paragraph="Already have an account?"
      link="/auth/login"
      linkText="Login"
      children={
        <>
          <Input
            id="displayName"
            label="Name"
            type="text"
            name="displayName"
            placeholder="Enter your name"
          />
        </>
      }
      onHandleSubmit={handleSubmit}
      isDisabled={isCheckingAuthetication}
      errorMessage={errorMessage}
      displayError={!!errorMessage}
      notification={userRegister}
    />
  );
};
