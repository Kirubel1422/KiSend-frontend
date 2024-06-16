import { googleIcon, twitterIcon } from "../assets";
import { Formik, Form } from "formik";
import { signUpSchema } from "../constants/validations";
import { AuthField } from "../components/Input/Form";
import { HiOutlineUser } from "react-icons/hi";
import { AiOutlineMail } from "react-icons/ai";
import { BsLock } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AlertError, AlertSuccess } from "../utils/alert";
import { useSignupMutation } from "../api/authSlice";
import { ThreeDots } from "react-loader-spinner";

function Signup() {
  const navigate = useNavigate(); // for navigation

  // Extracting mutation actions
  const [signup, { isLoading }] = useSignupMutation();

  // handle sign-up
  const handleSignUp = async (values) => {
    try {
      const response = await signup(values);
      AlertSuccess(response.data.message);
      navigate("/login");
    } catch (error) {
      AlertError(error?.data.message || null);
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
              Signup
            </span>
          </h1>

          <div className="auth-providers-wrapper flex flex-col gap-[9px]">
            <button
              className={`py-[10px] hover:bg-[#F8F8F8] transition-all duration-100 ease-in mb-[3px] px-[20px] flex items-center justify-between border border-[${StyleSheet.colors.tertiary}] w-full rounded-[25px]`}
            >
              <img
                src={googleIcon}
                className="w-[23px] aspect-square object-center object-cover"
              />
              <span className={StyleSheet.provider}>Signup with Google</span>{" "}
              <span className="block"></span>
            </button>

            <button
              className={`py-[10px] hover:bg-[#F8F8F8] transition-all duration-100 ease-in px-[20px] flex items-center justify-between border border-[${StyleSheet.colors.tertiary}] w-full rounded-[25px]`}
            >
              <img
                src={twitterIcon}
                className="w-[23px] aspect-square object-center object-cover"
              />
              <span className={StyleSheet.provider}>Signup with Twitter</span>{" "}
              <span></span>
            </button>
          </div>

          <hr color={StyleSheet.colors.secondary} className="my-[24px]" />

          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassord: "",
            }}
            validationSchema={signUpSchema}
            onSubmit={handleSignUp}
          >
            {(formik) => (
              <Form className="flex flex-col gap-[23px]">
                <div className="flex md:gap-[10px] items-start">
                  <AuthField
                    name="firstName"
                    label={"First name"}
                    value={formik.values.firstName}
                    type="text"
                    placeholder="Enter first name"
                    Icon={HiOutlineUser}
                  />
                  <AuthField
                    label={"Last name"}
                    name="lastName"
                    value={formik.values.lastName}
                    type="text"
                    placeholder="Enter last name"
                    Icon={HiOutlineUser}
                  />
                </div>

                <div>
                  <AuthField
                    label={"Email"}
                    name="email"
                    value={formik.values.email}
                    type="email"
                    placeholder="Enter email address"
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
                    Icon={BsLock}
                  />
                </div>

                <div>
                  <AuthField
                    label={"Confirm Password"}
                    name="confirmPassword"
                    value={formik.values.confirmPassord}
                    type="password"
                    placeholder="Repeat your password"
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
                        <> Sign up</>
                      )}
                    </>
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="w-full h-[43px]  rounded-[25px] hover:bg-[#F8F8F8] transition-all duration-100 text-[#CA6680] border border-[#CA6680] py-[8px]"
                  >
                    Already have an account ?
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

export default Signup;
