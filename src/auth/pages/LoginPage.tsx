import { useDispatch, useSelector } from "react-redux";
import { AuthLayout } from "../layout/AuthLayout";
import * as Yup from "yup";
import {
  handleGoogleLogin,
  loginWithEmailPassword,
} from "../../firebase/config";
import { checkingCredentials, logout, login } from "../../store/auth";
import { RootState } from "../../store/store";
import { useMemo } from "react";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector(
    (state: RootState) => state.auth
  );
  const isAuthenticating = useMemo(() => status === "checking", [status]);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async () => {
    dispatch(checkingCredentials());
    const result = await loginWithEmailPassword(
      initialValues.email,
      initialValues.password
    );
    if (!result.ok) {
      return dispatch(logout({ errorMessage: result.errorMessage }));
    }
    dispatch(login(result));
  };

  const handleGoogleSignIn = async () => {
    dispatch(checkingCredentials());
    const result = await handleGoogleLogin();

    if (!result.ok) return dispatch(logout(result.errorMessage));
    dispatch(login(result));
  };

  return (
    <AuthLayout
      title="Login"
      initialValues={initialValues}
      validationSchema={validationSchema}
      label="Password"
      paragraph="Need to create an account?"
      link="/auth/register"
      linkText="Sign Up"
      isLogin={true}
      isDisabled={isAuthenticating}
      onHandleSubmit={handleSubmit}
      onGoogleSignIn={handleGoogleSignIn}
      displayError={!!errorMessage}
      errorMessage={errorMessage}
    />
  );
};
