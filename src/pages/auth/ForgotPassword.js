import React from "react";
import Logo from "../../assets/images/logo.jpg";
import LogoDark from "../../images/logo-dark.png";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import { Block, BlockContent, BlockDes, BlockHead, BlockTitle, Button, PreviewCard } from "../../components/Component";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <>
      <Head title="Forgot-Password" />
      <Block className="nk-block-middle nk-auth-body  wide-xs">
        <div className="brand-logo pb-4 text-center">
          <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
            {/* <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
              <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" /> */}
            <img className="logo-dark logo-img logo-img-lg" style={{ maxHeight: "80px" }} src={Logo} alt="logo" />
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
              <BlockTitle tag="h5">Reset password</BlockTitle>
              <BlockDes>
                <p>If you forgot your password, well, then we’ll email you instructions to reset your password.</p>
              </BlockDes>
            </BlockContent>
          </BlockHead>
          <form>
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="default-01">
                  Email
                </label>
              </div>
              <input
                type="text"
                className="form-control form-control-lg"
                id="default-01"
                placeholder="Enter your email address"
              />
            </div>
            <div className="form-group">
              <Button color="primary" size="lg" className="btn-block" onClick={(ev) => ev.preventDefault()}>
                Send Reset Link
              </Button>
            </div>
          </form>
          <div className="form-note-s2 text-center pt-4">
            <Link to={`${process.env.PUBLIC_URL}/login`}>
              <strong>Return to login</strong>
            </Link>
          </div>
        </PreviewCard>
      </Block>
      {/* <AuthFooter /> */}
    </>
  );
};
export default ForgotPassword;
