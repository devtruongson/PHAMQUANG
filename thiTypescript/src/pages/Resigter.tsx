import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signupData } from "../api/auth";
import Header from "../components/Header/Header";
import Footer from "../components/footer/Footer";

const Resigter = () => {
  const navigate = useNavigate();
  const [dataLogin, setDataLogin] = useState<any>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handelSignin = (event: any) => {
    event.preventDefault();
    if (
      dataLogin.email.trim() == "" ||
      dataLogin.password.trim() == "" ||
      dataLogin.confirmPassword.trim() == "" ||
      dataLogin.name.trim() == ""
    ) {
      toast.error("vui lòng nhập đầy đủ email, password");
      return;
    }
    signupData(dataLogin)
      .then((data) => {
        console.log(data);
        toast.success("Tạo tài khoản thành công , tự động đăng nhập !");
        localStorage.setItem("user", JSON.stringify(data.data.user));
        navigate("/");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
        console.error(error);
      });
  };
  return (
    <div>
      <Header />

      {/* <section className="text-center">
        <div
          className="p-5 bg-image"
          style={{
            backgroundImage:
              'url("https://mdbootstrap.com/img/new/textures/full/171.jpg")',
            height: 300,
          }}
        />
        <div
          className="card mx-4 mx-md-5 shadow-5-strong"
          style={{
            marginTop: "-100px",
            background: "hsla(0, 0%, 100%, 0.8)",
            backdropFilter: "blur(30px)",
          }}
        >
          <div className="card-body py-5 px-md-5">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-8">
                <h2 className="fw-bold mb-5">Sign up now</h2>
                <form onSubmit={(e: any) => handelSignin(e)}>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div data-mdb-input-init className="form-outline">
                        <label className="form-label" htmlFor="form3Example1">
                          {" "}
                          name
                        </label>

                        <input
                          onChange={(e: any) =>
                            setDataLogin({
                              ...dataLogin,
                              name: e.target.value,
                            })
                          }
                          type="text"
                          id="form3Example1"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div data-mdb-input-init className="form-outline">
                        <label className="form-label" htmlFor="form3Example2">
                          Email
                        </label>

                        <input
                          onChange={(e: any) =>
                            setDataLogin({
                              ...dataLogin,
                              email: e.target.value,
                            })
                          }
                          type="email"
                          id="form3Example2"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                 
                  <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example3">
                      password
                    </label>

                    <input
                      onChange={(e: any) =>
                        setDataLogin({
                          ...dataLogin,
                          password: e.target.value,
                        })
                      }
                      type="password"
                      id="form3Example3"
                      className="form-control"
                    />
                  </div>
                
                  <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example4">
                      Confirm Password
                    </label>

                    <input
                      onChange={(e: any) =>
                        setDataLogin({
                          ...dataLogin,
                          confirmPassword: e.target.value,
                        })
                      }
                      type="password"
                      id="form3Example4"
                      className="form-control"
                    />
                  </div>
                 
                  <div className="form-check d-flex justify-content-center mb-4">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      id="form2Example33"
                      defaultChecked
                    />
                    <label
                      className="form-check-label"
                      htmlFor="form2Example33"
                    >
                      Subscribe to our newsletter
                    </label>
                  </div>
                 
                  <button
                    type="submit"
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className="btn btn-primary btn-block mb-4"
                  >
                    Sign up
                  </button>
                  
                  <div className="text-center">
                    <Link to={"/login"}>or sign in with:</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <div
        style={{ marginTop: "29px" }}
        className="row mgt-default box-content-default"
      >
        <div className="col-md-12 col-lg-12 col-xs-12 no-padding menu-main-user/register">
          {/**/}
          <div>
            <div className="st-register-screen st-login-screen">
              <div className="content-login">
                <div className="st-tile-login cl-tt"></div>
                <div
                  style={{ backgroundColor: "#ccc" }}
                  className="st-main-content"
                >
                  <div className="st-grid-left st-height-register bg-content-df">
                    <div className="st-logo-mazii">
                      <span
                        style={{ color: "white", fontWeight: "bold" }}
                        className="st-tile-content register_new"
                      >
                        Register a new account
                      </span>
                      {/* <img
                        src="assets/imgs/logo/mazii-logo-blue.png"
                        alt="mazii"
                        title="Mazii"
                      /> */}
                    </div>
                    <p className="txt-login cl-content">
                      Login with external ID:
                    </p>
                    <div className="box-login-fast">
                      <div id="google-sign-in-btn" className="width-gg">
                        <img
                          src="https://mazii.net/assets/imgs/icon/ic_google.png"
                          alt="google"
                          title="google"
                        />
                        <p className="txt-gg">Google</p>
                      </div>
                      <div id="apple-sign-in-btn" className="width-apple">
                        <img
                          src="https://mazii.net/assets/imgs/icon/ic_apple_white.png"
                          alt="apple"
                          title="apple"
                        />
                        <p className="txt-gg">Apple</p>
                      </div>
                    </div>
                    <p className="txt-login cl-content">or:</p>
                    <form
                      noValidate
                      className="box-login mgt-20 ng-untouched ng-pristine ng-invalid"
                    >
                      <div className="form-group st-form-group">
                        <input
                          onChange={(e: any) =>
                            setDataLogin({
                              ...dataLogin,
                              name: e.target.value,
                            })
                          }
                          type="text"
                          name="name"
                          placeholder="Name"
                          className="form-control st-radius bg-input ng-untouched ng-pristine ng-invalid"
                        />
                        {/**/}
                      </div>
                      <div className="form-group st-form-group">
                        <img
                          src="https://mazii.net/assets/imgs/icon/ic_envelope.png"
                          alt="icon envelope"
                          title="email"
                          className="st_icon st-fa-envelope-o"
                        />
                        <input
                           onChange={(e: any) =>
                            setDataLogin({
                              ...dataLogin,
                              email: e.target.value,
                            })
                          }
                          type="text"
                          name="email"
                          placeholder="Email"
                          className="form-control st-radius bg-input ng-untouched ng-pristine ng-invalid"
                        />
                        {/**/}
                      </div>
                      <div className="form-group st-form-group">
                        <img
                          src="https://mazii.net/assets/imgs/icon/ic_key.png"
                          alt="icon key"
                          title="password"
                          className="st_icon st-fa-key"
                        />
                        <input
                         onChange={(e: any) =>
                          setDataLogin({
                            ...dataLogin,
                            password: e.target.value,
                          })
                        }
                          type="password"
                          name="password"
                          placeholder="Password"
                          className="form-control st-radius bg-input ng-untouched ng-pristine ng-invalid"
                        />
                        {/**/}
                      </div>
                      <div className="form-group st-form-group">
                        <img
                          src="https://mazii.net/assets/imgs/icon/ic_two_pass.png"
                          alt="pass"
                          title="password"
                          className="st-reconfirm"
                        />
                        <input
                        onChange={(e: any) =>
                          setDataLogin({
                            ...dataLogin,
                            confirmPassword: e.target.value,
                          })
                        }
                          type="password"
                          name="passConfirm"
                          placeholder="Confirm password"
                          className="form-control st-radius bg-input ng-untouched ng-pristine ng-invalid"
                        />
                        {/**/}
                        <p className="txt-center same-position txt-success" />
                      </div>
                    </form>
                    <div className="checkbox">
                      <p className="rule cl-content">
                        <span className="txt-rule-begin">
                          By signing up, I agree to{" "}
                          <a
                            href="en-US/about/term"
                            target="_blank"
                            rel="noopener"
                            className="txt-rule cl-blue"
                          >
                            Mazii's terms of use
                          </a>
                          .
                        </span>
                      </p>
                    </div>
                    <div className="st-btn-register">
                      <button onClick={(e: any) => handelSignin(e)}  type="button" className="st-btn-login btn-login cust-login btn_register">
                        Sign up
                      </button>
                    </div>
                  </div>
                  <div className="st-grid-right">
                    <img
                      src="https://mazii.net/assets/imgs/icon/regist.png"
                      alt="login right"
                      title="register"
                      className="st-img-regist"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/**/}
        </div>
        {/**/}
        {/**/}
      </div>

      <Footer />
    </div>
  );
};

export default Resigter;
