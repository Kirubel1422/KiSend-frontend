import { googleIcon, twitterIcon } from "../assets";
import { Formik, Form } from "formik";
import { loginSchema } from "../constants/validations";
import { AuthField } from "../components/Input/Form";
import { AiOutlineMail } from "react-icons/ai";
import { BsLock } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../api/authSlice";
import { AlertSuccess, AlertError } from "../utils/alert";
import { loginAction } from "../app/features/authFeature";
import { useDispatch } from "react-redux";
import { ThreeDots } from "react-loader-spinner";

function Login() {
  const dispatch = useDispatch(); // for dispatching actions
  const navigate = useNavigate(); // for routing purposes
  const [login, { isLoading, isError }] = useLoginMutation();

  // For handling login
  const handleLogin = async (values) => {
    try {
      const data = await login(values).unwrap();

      dispatch(loginAction(data)); // Set cache
      AlertSuccess("Welcome!");
      navigate("/global");
    } catch (error) {
      AlertError(error?.data.message);
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center py-10">
      <div
        className={`border border-[${StyleSheet.colors.tertiary}] md:w-[640px] rounded-[25px]`}
      >
        <div className="pt-[8px] pb-[50px] px-[140px]">
          <h1 className="flex items-center justify-center gap-[10px] mb-[25px]">
            <span
              className={`font-bold text-[40px] text-[${StyleSheet.colors.primary}]`}
            >
              Login
            </span>
          </h1>

          <div className="auth-providers-wrapper flex flex-col gap-[9px]">
            <button
              className={`py-[10px] hover:bg-[#F8F8F8] transition-all duration-100  mb-[3px] px-[20px] flex items-center justify-between border border-[${StyleSheet.colors.tertiary}] w-full rounded-[25px]`}
            >
              <img
                src={googleIcon}
                className="w-[23px] aspect-square object-center object-cover"
              />
              <span className={StyleSheet.provider}>Continue with Google</span>{" "}
              <span className="block"></span>
            </button>

            <button
              className={`py-[10px] hover:bg-[#F8F8F8] transition-all duration-100  px-[20px] flex items-center justify-between border border-[${StyleSheet.colors.tertiary}] w-full rounded-[25px]`}
            >
              <img
                src={twitterIcon}
                className="w-[23px] aspect-square object-center object-cover"
              />
              <span className={StyleSheet.provider}>Continue with Twitter</span>{" "}
              <span></span>
            </button>
          </div>

          <hr color={StyleSheet.colors.secondary} className="my-[24px]" />

          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginSchema}
            onSubmit={handleLogin}
          >
            {(formik) => (
              <Form className="flex flex-col gap-[23px]">
                <div>
                  <AuthField
                    label={"Email"}
                    name="email"
                    value={formik.values.email}
                    type="email"
                    placeholder="Enter email address"
                    error={isError}
                    Icon={AiOutlineMail}
                  />
                </div>

                <div>
                  <AuthField
                    label={"Password"}
                    name="password"
                    value={formik.values.password}
                    type="password"
                    placeholder="Enter your password"
                    error={isError}
                    Icon={BsLock}
                  />
                </div>

                <div className="mt-[20px] flex flex-col gap-[14px]">
                  <button
                    disabled={isLoading}
                    type="submit"
                    onClick={formik.handleSubmit}
                    className="w-full h-[43px] rounded-[25px] bg-[#CA6680] text-white py-[8px] cursor-pointer flex justify-center items-center"
                  >
                    <>
                      {isLoading ? (
                        <>
                          <ThreeDots height="10" width="40" color="white" />
                        </>
                      ) : (
                        <>Login</>
                      )}
                    </>
                  </button>

                  <button
                    onClick={() => navigate("/signup")}
                    type="button"
                    className="w-full rounded-[25px] hover:bg-[#F8F8F8] transition-all duration-100  text-[#CA6680] border border-[#CA6680] py-[8px]"
                  >
                    Don&apos;t have an account ?
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

const StyleSheet = {
  colors: {
    primary: "#CA6680",
    secondary: "#5F5858",
    tertiary: "#D0C2C2", // Border
  },
  provider: `text-[14px] text-[#DOc2c2] block`,
};

export default Login;
