import React, { useState } from "react";
import Logo from "../../assets/images/logo.jpg";
import Head from "../../layout/head/Head";
import {
  Block,
  BlockContent,
  BlockHead,
  BlockTitle,
  Button,
  Icon,
  PreviewCard,
} from "../../components/Component";
import { Form, Spinner, Alert } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { login, setUserName, token } from "../../services/authServices";
import { useNavigate } from "react-router-dom";
import { toastConfig } from "../../config/toastConfig";
import { toast } from "react-toastify";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [passState, setPassState] = useState(false);
  const [errorVal, setError] = useState("");

  const navigate = useNavigate();

  const onFormSubmit = async (formData) => {
    setLoading(true);
    const data = new URLSearchParams({
      grant_type: "password",
      username: formData.name,
      password: formData.passcode,
      scope: "",
      client_id: "string",
      client_secret: "string",
    });

    try {
      const response = await token(data);
      if (response.statusCode === 200) {
        const responseLogin = await login();
        setUserName(responseLogin.data);
        navigate("/");
      } else {
        console.log("console_error__1", response);
        toast.error(response.errorMessage, toastConfig);
      }
    } catch (error) {
      toast.error("An error occurred", toastConfig);
    } finally {
      setLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <Head title="Login" />
      <Block className="nk-block-middle nk-auth-body  wide-xs">
        <div className="brand-logo pb-4 text-center">
          <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
            <img className="logo-dark logo-img logo-img-lg" style={{ maxHeight: "80px" }} src={Logo} alt="logo" />
            {/* <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" /> */}
          </Link>
          <div
            style={{
              marginTop: "10px",
              display: "block",
              color: "#0069FF",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            Power of visibility
          </div>
        </div>

        <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
          <BlockHead>
            <BlockContent>
              <BlockTitle tag="h4">Sign-In</BlockTitle>
            </BlockContent>
          </BlockHead>
          {errorVal && (
            <div className="mb-3">
              <Alert color="danger" className="alert-icon">
                <Icon name="alert-circle" /> Unable to login with credentials{" "}
              </Alert>
            </div>
          )}
          <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="default-01">
                  Username
                </label>
              </div>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="default-01"
                  {...register("name", { required: "This field is required" })}
                  // defaultValue="demo-admin"
                  placeholder="Enter your username"
                  className="form-control-lg form-control"
                />
                {errors.name && <span className="invalid">{errors.name.message}</span>}
              </div>
            </div>
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="password">
                  Passcode
                </label>
                <Link className="link link-primary link-sm" to={`${process.env.PUBLIC_URL}/reset`}>
                  Forgot Code?
                </Link>
              </div>
              <div className="form-control-wrap">
                <a
                  href="#password"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setPassState(!passState);
                  }}
                  className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                >
                  <Icon name="eye" className="passcode-icon icon-show"></Icon>

                  <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                </a>
                <input
                  type={passState ? "text" : "password"}
                  id="password"
                  {...register("passcode", { required: "This field is required" })}
                  // defaultValue="i9demo@123"
                  placeholder="Enter your passcode"
                  className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                />
                {errors.passcode && <span className="invalid">{errors.passcode.message}</span>}
              </div>
            </div>
            <div className="form-group">
              <Button size="lg" className="btn-block" type="submit" color="primary">
                {loading ? <Spinner size="sm" color="light" /> : "Sign in"}
              </Button>
            </div>
          </Form>
        </PreviewCard>
      </Block>
      {/* <AuthFooter /> */}
    </>
  );
};
export default Login;
