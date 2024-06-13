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
        <input className={StyleSheet.input} {...props} {...field} />
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
    "w-full border border-[#D0C2C2] rounded-[25px] placeholder:text-[#B0A9A9] text-[14px] text-[#5F5858] py-[10px] pl-[32px] outline-none ",
  icon: "absolute left-0 top-[30%] ml-[10px] opacity-70",
  error: "text-xs text-red-500 mt-[4px]",
};
AuthField.propTypes = {
  label: PropTypes.string,
};
