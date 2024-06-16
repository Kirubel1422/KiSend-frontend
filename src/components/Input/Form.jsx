import { useField } from "formik";
import PropTypes from "prop-types";

export const AuthField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="w-full">
      <label className={StyleSheet.label} htmlFor={props.name}>
        {label}
      </label>

      <div className="relative">
        <input
          className={
            StyleSheet.input +
            ` ${
              props.error
                ? " border-red-500 text-red-500 bg-red-50"
                : " border-[#D0C2C2] text-[#5F5858] bg-white"
            } `
          }
          {...props}
          {...field}
        />
        <props.Icon className={StyleSheet.icon} />
      </div>

      {meta.error && meta.touched && (
        <div className={StyleSheet.error}>{meta.error}</div>
      )}
    </div>
  );
};

const StyleSheet = {
  label: "font-semibold text-[12px] text-[#5F5858] mb-[6px] ",
  input:
    "w-full border  rounded-[25px] placeholder:text-[#B0A9A9] text-[14px] py-[10px] pl-[32px] outline-none",
  icon: "absolute left-0 top-[30%] ml-[10px] opacity-70",
  error: "text-xs text-red-500 mt-[4px]",
};
AuthField.propTypes = {
  label: PropTypes.string,
};
