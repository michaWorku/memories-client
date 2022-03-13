import {
  FC,
  useState,
  useEffect,
  useRef,
  forwardRef,
  Ref,
  ReactElement,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  register,
  login,
  clearAuthErrorActionCreator,
  googleLogin,
} from "../../features/auth/authSlice";

import { AuthFormData, FormModeState, Profile, ProfileState } from "../../type";
import useForm from "../../hooks/useForm";

import { Spinner } from "../../components";
import { Input } from "../../components/controls";
import Icon from "./icon";

import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  Grow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Slide,
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toggleSignInActionCreator, toggleSignUpActionCreator } from "../../features/auth/signupMode";
import GoogleLogin from "react-google-login";

const initialFormData: AuthFormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth: FC = () => {
  const profile = useAppSelector((state) => state.profile);
  const isSignUp = useAppSelector((state) => state.isSignUp);
  const [
    formData,
    setFormData,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  ] = useForm({
    initialState: initialFormData,
    validateOnChange: true,
    validate,
  });
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] =
    useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const firstNameRef = useRef(null);
  const emailRef = useRef(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  function validate(values = formData) {
    let currentErrors: any = { ...errors };
    const digitsRegex = /\d/;
    const lettersRegex = /^[a-zA-Z]+$/;
    const emailRegex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;

    if ("email" in values) {
      currentErrors.email = values.email ? "" : "Please provide a valid email";
      if (!values.email.match(emailRegex)) {
        currentErrors.email = "Please provide a valid email";
      }
    }

    if ("password" in values) {
      currentErrors.password =
        values.password.length >= 6
          ? ""
          : "Password must contain at least 6 characters";
    }

    if (isSignUp) {
      if ("firstName" in values) {
        if (values.firstName.match(digitsRegex)) {
          currentErrors.firstName = "First name cannot contain any number";
        } else if (values.firstName && !values.firstName.match(lettersRegex)) {
          currentErrors.firstName = "First name can contain only letters!";
        }else {
          currentErrors.firstName = values.firstName
            ? ""
            : "Please provide your first name";
        }
      }
      if ("lastName" in values) {
        if (values.lastName.match(digitsRegex)) {
          currentErrors.lastName = "Last name cannot contain any number";
        } else if (values.lastName && !values.lastName.match(lettersRegex)) {
          currentErrors.lastName = "Last name can contain only letters!";
        } else {
          currentErrors.lastName = values.lastName
            ? ""
            : "Please provide your last name";
        }
      }
      if ("confirmPassword" in values) {
        currentErrors.confirmPassword =
          values.confirmPassword && values.confirmPassword === formData.password
            ? ""
            : "Passwords must match";
      }
    }

    setErrors({ ...currentErrors });

    if (values === formData)
      return Object.values(currentErrors).every((el) => el === "");
  }

  const Transition = forwardRef(function Transition(
    props: TransitionProps & {
      children?: ReactElement<any, any>;
    },
    ref: Ref<unknown>
  ) {
    return <Slide direction="down" ref={ref} {...props} />;
  });

  useEffect(() => {
    if (profile?.token && !profile?.error) {
      setTimeout(() => navigate("/posts"), 1200);
    }
  }, [profile]);

  useEffect(() => {
    // Reset form in case of changing form mode by user from Navbar
    resetForm();

    // Focus particular input fields to the corresponding form mode
    if (isSignUp) {
      // @ts-ignore
      firstNameRef.current?.children[1]?.children[0].focus();
    } else {
      // @ts-ignore
      emailRef.current?.children[1]?.children[0].focus();
    }
  }, [isSignUp]);

  // @ts-ignore
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    const profile = {
      token,
      user: result
    } as Profile
    try {
      //dispatch({ type: AUTH, data: { result, token } });
      dispatch(googleLogin(profile))

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () =>
    console.log("Google Sign In was unsuccessful. Try again later");


  const handleAuthModalClose = () => {
    dispatch(clearAuthErrorActionCreator());
    setOpen(false);
  };

  const handleChangeFormMode = () => {
    resetForm();

    // Hide passwords input
    setVisiblePassword(false);
    setVisibleConfirmPassword(false);

    // Toggle appropriate form mode
    if (isSignUp) {
      dispatch(toggleSignInActionCreator());
    } else {
      dispatch(toggleSignUpActionCreator());
    }
  };

  const handleVisiblePassword = () =>
    setVisiblePassword((prevState) => !prevState);
  const handleVisibleConfirmPassword = () =>
    setVisibleConfirmPassword((prevState) => !prevState);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setOpen(true);

    if (validate()) {
      setLoading(true);

      if (isSignUp) {
        await dispatch(register(formData));
      } else {
        await dispatch(login(formData));
      }

      resetForm();
      setTimeout(() => setLoading(false), 1000);
    }
  };

  return (
    <Container maxWidth="xs">
      {loading ? (
        <Spinner gutterTop="8rem" />
      ) : (
        <>
          {!profile?.status && (
            <Grow in>
              <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">
                  {isSignUp ? "Sign Up" : "Sign In"}
                </Typography>
                <form
                  className={classes.form}
                  onSubmit={handleSubmit}
                  autoComplete="on"
                >
                  <Grid container spacing={2} justifyContent="center">
                    {isSignUp && (
                      <>
                        <Input
                          name="firstName"
                          label="First Name"
                          type="text"
                          ref={firstNameRef}
                          value={formData.firstName}
                          onChange={handleInputChange}
                          half
                          error={errors.firstName}
                        />
                        <Input
                          name="lastName"
                          label="Last Name"
                          type="text"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          half
                          error={errors.lastName}
                        />
                      </>
                    )}

                    <Input
                      name="email"
                      label="Email Address"
                      type="email"
                      ref={emailRef}
                      value={formData.email}
                      onChange={handleInputChange}
                      error={errors.email}
                    />
                    <Input
                      name="password"
                      label="Password"
                      type={visiblePassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInputChange}
                      handleVisiblePassword={handleVisiblePassword}
                      error={errors.password}
                    />
                    {isSignUp && (
                      <Input
                        name="confirmPassword"
                        label="Confirm Password"
                        type={visibleConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        handleVisiblePassword={handleVisibleConfirmPassword}
                        error={errors.confirmPassword}
                      />
                    )}
                    <Button
                      className={classes.submitBtn}
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      {isSignUp ? "Register" : "Log In"}
                    </Button>
                    <GoogleLogin
                      clientId="564033717568-bu2nr1l9h31bhk9bff4pqbenvvoju3oq.apps.googleusercontent.com"
                      render={(renderProps) => (
                        <Button
                          className={classes.googleButton}
                          color="primary"
                          fullWidth
                          onClick={renderProps.onClick}
                          disabled={renderProps.disabled}
                          startIcon={<Icon />}
                          variant="contained"
                        >
                          Google Sign In
                        </Button>
                      )}
                      onSuccess={googleSuccess}
                      onFailure={googleError}
                      cookiePolicy="single_host_origin"
                    />
                    <Grid container justifyContent="flex-end">
                      <Grid item>
                        <Button
                          variant="outlined"
                          color="secondary"
                          size="small"
                          onClick={handleChangeFormMode}
                        >
                          {isSignUp
                            ? "Already registered? Sign In"
                            : "Don't have an account? Register"}
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Grow>
          )}
        </>
      )}

      {profile?.error && !loading && (
        <Dialog
          open={open}
          onClose={handleAuthModalClose}
          TransitionComponent={Transition}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{profile?.errorMsg}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Credentials you provided are incorrect! Click TRY AGAIN to enter
              correct data.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                dispatch(clearAuthErrorActionCreator());
              }}
            >
              Try again
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};

export default Auth;
