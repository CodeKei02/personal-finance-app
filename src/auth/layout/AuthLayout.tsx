import { Button, Input, Label } from "../../components";
import { useState, useEffect } from "react";
import { breakpoints, colors } from "../../styles/theme";
import { Form, Formik } from "formik";
import styled from "styled-components";

import LogoFinance from "../../../public/images/logo-large.svg";
import IconHidePassword from "../../../public/images/icon-hide-password.svg";
import IconShowPassword from "../../../public/images/icon-show-password.svg";
import IllustrationAuth from "../../../public/images/illustration-authentication.svg";
import IconError from "../../../public/images/icon-bill-due.svg";
import IconClose from "../../../public/images/icon-close-modal.svg";
import IconGoogle from "../../../public/images/google.png";
const Container = styled.div<{ animate: boolean }>`
  height: 100vh;
  display: grid;
  overflow: hidden;
  place-items: center;
  position: relative;

  header {
    width: 100%;
    height: 60px;
    border-radius: 0 0 8px 8px;
    margin-bottom: 1rem;
    background-color: ${colors.greyDark};
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: -100px;
    transition: all 0.3s ease-in-out;
    transform: translateY(
      ${(props: { animate: boolean }) => (props.animate ? "100px" : "0")}
      );
  }

  @media (min-width: ${breakpoints.desktop}){
    padding: 1.25rem;
    height: auto;
    display: block;
    place-items: unset;

    header {
      display: none;
    }
  }
}
`;

const AuthContainer = styled.div`
  margin: 0 auto;
  width: 90%;

  .image-auth-container {
    display: none;
  }

  @media (min-width: ${breakpoints.desktop}) {
    width: 100%;
    display: flex;
    flex-direction: row;
    height: 95vh;
    overflow: hidden;
    position: relative;

    .image-auth-container {
      display: flex;
      flex-direction: column;
      border-radius: 8px;

      .auth-logo {
        width: 122px;
        height: 22px;
        margin-left: 2rem;
        margin-top: 2rem;
        inset: 0;
        z-index: 10;
      }

      .text-container {
        display: flex;
        flex-direction: column;
        margin-top: auto;
        z-index: 10;
        width: 480px;
        margin-left: 2rem;
        margin-bottom: 2rem;
        color: ${colors.white};

        h2 {
          font-size: 1.5rem;
          font-weight: 800;
          line-height: 1.5;
        }

        p {
          opacity: 0.8;
          font-size: 14px;
          margin-top: 0.5rem;
        }
      }

      .illustration-container {
        background-color: ${colors.greyDark};
        width: 500px;
        height: 100%;
        inset: 0;
        position: absolute;

        .illustrator-auth {
          height: 100%;
          width: 100%;
          object-fit: cover;
        }
      }
    }
  }
`;

const FormContainer = styled.div`
  background-color: ${colors.white};
  border-radius: 8px;
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem 1rem;

  h1 {
    font-weight: 800;
    margin-bottom: 1.5rem;
  }
  .password {
    .password-input {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-right: 1rem;
      height: 45px;
      border-radius: 8px;
      margin-bottom: 2rem;
      border: 1px solid ${colors.beigeNormal};

      input {
        background-color: transparent;
      }

      input:focus {
        outline: none;
      }

      .message-container {
        position: absolute;
        bottom: -25px;
      }
    }
  }

  .footer-text {
    margin: 1.5rem 0;
    display: flex;
    gap: 0.5rem;
    justify-content: center;

    p {
      color: ${colors.greyNormal};
    }

    a {
      color: ${colors.greyDark};
    }
  }

  @media (min-width: ${breakpoints.desktop}) {
    width: 600px;
    padding: 2rem;
    margin: 0 auto;
    place-self: center;
  }
`;

const Flex = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Badge = styled.div<{ notification?: boolean }>`
  display: ${(props) => (props.notification ? "flex" : "none")};
  position: absolute;
  bottom: 0px;
  background-color: white;
  padding: 1rem;
  textalign: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin: 1rem;
  justify-content: space-between;
  justify-self: flex-end;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;

  .line {
    flex: 1;
    margin: 1rem;
    height: 1px;
    background-color: ${colors.greyNormal};
  }
`;

interface AuthLayoutProps {
  children?: React.ReactNode;
  title: string;
  initialValues: any;
  validationSchema: any;
  label: string;
  paragraph: string;
  link: string;
  linkText: string;
  isLogin?: boolean;
  isDisabled?: boolean;
  onHandleSubmit?: any;
  onGoogleSignIn?: any;
  displayError?: boolean;
  errorMessage?: string | null;
  notification?: boolean;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  initialValues,
  validationSchema,
  paragraph,
  label,
  link,
  linkText,
  isLogin,
  isDisabled,
  onHandleSubmit,
  onGoogleSignIn,
  displayError,
  errorMessage,
  notification,
}) => {
  const [showPassword, setShowPassword] = useState("password");
  const toggleVisibilityPassword = () => {
    setShowPassword((prev) => (prev === "password" ? "text" : "password"));
  };
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 10);
  }, []);

  return (
    <Container animate={animate}>
      <header>
        <img src={LogoFinance} alt="logo" />
      </header>
      <AuthContainer>
        <div className="image-auth-container">
          <img src={LogoFinance} alt="logo" className="auth-logo" />
          <div className="illustration-container">
            <img
              src={IllustrationAuth}
              alt="Illustration Authetication"
              className="illustrator-auth"
            />
          </div>
          <div className="text-container">
            <h2>
              Keep track of your money <br /> and save for your future
            </h2>
            <p>
              Personal finance app puts you in control of your spending. Track
              transactions, set budgets, and add to saving pots easily
            </p>
          </div>
        </div>

        <FormContainer>
          <h1>{title}</h1>
          <Formik
            initialValues={initialValues}
            onSubmit={onHandleSubmit}
            validationSchema={validationSchema}
          >
            <Form>
              {children}
              <Input
                id="email"
                label="Email"
                type="email"
                name="email"
                placeholder="Enter your email"
              />
              <div className="password">
                <Label text={label} />
                <div className="password-input">
                  <Input
                    id="password"
                    type={showPassword}
                    name="password"
                    placeholder="Enter your password"
                    border="none"
                  />
                  <img
                    src={
                      showPassword === "password"
                        ? IconHidePassword
                        : IconShowPassword
                    }
                    alt="Toggle password visibility"
                    style={{ cursor: "pointer", width: "20px", height: "20px" }}
                    onClick={() => toggleVisibilityPassword()}
                  />
                </div>
              </div>
              <Button
                background={colors.greyDark}
                backgroundhover={colors.greyLight}
                color={colors.white}
                weight="800"
                size="1rem"
                width="100%"
                display="block"
                disabled={isDisabled}
                type="submit"
              >
                {title}
              </Button>
            </Form>
          </Formik>
          <Flex>
            {isLogin && (
              <Flex style={{ flexDirection: "column", width: "100%" }}>
                <Divider>
                  <span className="line"></span>
                  <span>OR</span>
                  <span className="line"></span>
                </Divider>
                <Button
                  background={colors.greyLight}
                  backgroundhover={colors.beigeLight}
                  color={colors.greyDark}
                  weight="700"
                  size="1rem"
                  width="100%"
                  display="block"
                  type="button"
                  disabled={isDisabled}
                  onClick={onGoogleSignIn}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1rem",
                  }}
                >
                  <img src={IconGoogle} alt="Google Icon" />
                  Continue with Google
                </Button>
              </Flex>
            )}
          </Flex>
          <div
            style={{
              display: `${displayError ? "flex" : "none"}`,
              backgroundColor: "rgba(230, 179, 179, 0.5)",
              padding: ".5rem",
              marginTop: "1rem",
              gap: "0.5rem",
            }}
          >
            <img src={IconError} alt="Error" />
            <p style={{ color: "red" }}>{errorMessage}</p>
          </div>
          <div className="footer-text">
            <p>{paragraph}</p>
            <a href={link}>{linkText}</a>
          </div>
        </FormContainer>
      </AuthContainer>
      <Badge notification={notification}>
        <div
          style={{
            textAlign: "start",
            marginRight: "1rem",
          }}
        >
          <p
            style={{
              color: colors.greyNormal,
              fontSize: ".89rem",
              fontWeight: "700",
            }}
          >
            {isLogin ? "Login Successful" : "Create account successful"}
          </p>
          <p
            style={{
              color: colors.beigeNormal,
              fontSize: ".89rem",
              margin: ".25rem 0rem",
            }}
          >
            {isLogin
              ? "User logged in successfully"
              : "User registered successfully"}
          </p>
        </div>
        <Button
          background="transparent"
          backgroundhover="none"
          color={colors.greyDark}
          border="transparent"
          weight="800"
          size="1rem"
          width="10px"
          display="block"
          type="button"
          disabled={false}
          children={
            <img
              src={IconClose}
              alt="Close"
              style={{ width: "20px", height: "20px" }}
            />
          }
          onClick={() => (notification = false)}
        />
      </Badge>
    </Container>
  );
};
