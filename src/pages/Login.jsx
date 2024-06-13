import { LuSend } from "react-icons/lu";
import { googleIcon, twitterIcon } from "../assets";
import { Formik, Form } from "formik";
import { login } from "../constants/validations";
import { AuthField } from "../components/Input/Form";
import { AiOutlineMail } from "react-icons/ai";
import { BsLock } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate(); // for routing purposes
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
            validationSchema={login}
            onSubmit={(values) => alert(JSON.stringify(values))}
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

                <div className="mt-[20px] flex flex-col gap-[14px]">
                  <input
                    type="submit"
                    value={"Login"}
                    className="w-full rounded-[25px] bg-[#CA6680] text-white py-[8px] cursor-pointer"
                  />

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
