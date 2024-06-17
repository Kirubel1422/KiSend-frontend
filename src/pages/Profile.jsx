import { Form, Formik, useField } from "formik";
import { useEffect, useState } from "react";
import { maleAvatar, femaleAvatar } from "../assets";
import { BiEdit } from "react-icons/bi";
import { CancelBtn, UpdateBtn } from "../components/Buttons/Buttons";
import { Loading } from "../components/State";
import { profileSchema } from "../constants/validations";
import { Country, City } from "country-state-city";
import MuiPhoneNumber from "material-ui-phone-number";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { formatStandard } from "../utils/timeData";
import { useUpdateProfileMutation } from "../api/apiSlice";
import { useDispatch } from "react-redux";
import { AlertError, AlertInfo, AlertSuccess } from "../utils/alert";
import { updateProfileAction } from "../app/features/authFeature";

function Profile() {
  const dispatch = useDispatch();
  const [countries, setCountries] = useState([]);
  const [imgUrl, setImgUrl] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  // Handle Country options
  useEffect(() => {
    // Fetch countries
    const fetchedCountries = Country.getAllCountries();

    // Form a custom array which is managable by SelectFields component
    const tempCountries = fetchedCountries.map((item) => ({
      label: item.name,
      value: item.name.toLowerCase(),
      isoCode: item.isoCode,
    }));

    // For good ux show no country initially
    tempCountries.unshift({ label: "", value: "", isoCode: "" });

    // Set to countries state
    setCountries(tempCountries);
  }, []);

  // Show loading
  if (!user.email && !!user) {
    return <Loading />;
  }

  const Field = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
      <tr>
        <th align="left" htmlFor={props.name}>
          <label htmlFor={props.name} className="text-[#858585] text-lg ">
            {label}
          </label>
        </th>
        <td>
          <input
            className="outline-none focus:border-[#BBBBBB] placeholder:text-[#969494]  md:w-[260px]  h-[47px] ml-[25px] rounded-[8px] text-[#5f5858] border border-[#E6E6E6] text-lg py-[12px] pl-[22px]"
            {...props}
            {...field}
          />
        </td>

        {meta.error && meta.touched && (
          <div className="text-sm text-red-500">{meta.error}</div>
        )}
      </tr>
    );
  };

  const SelectFields = ({ label, options, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <tr>
        <th>
          <label htmlFor={props.name} className="text-[#858585] text-lg ">
            {label}
          </label>
        </th>

        <td>
          <select
            className="outline-none md:w-[260px]  h-[47px] rounded-[8px] text-[#5f5858] bg-white ml-[25px]  border border-[#E6E6E6] text-lg py-[12px] pl-[10px]"
            {...props}
            {...field}
          >
            {Array.isArray(options) &&
              options.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              ))}
          </select>
          {meta.error && meta.touched && (
            <div className="text-sm text-red-500">{meta.error}</div>
          )}
        </td>
      </tr>
    );
  };

  // For profile picture select
  function handleProfilePicture(event) {
    const file = event.target.files[0];

    if (file) {
      setImgUrl(URL.createObjectURL(file));
    }
  }

  // Handle City Options
  function handleCity(value) {
    // If isoCode not specified return empty array
    if (!value) return [];

    // Extract iso-code
    const isoCode = countries.find((country) => country.value == value).isoCode;

    // Fetch cities
    const fetchedCities = City.getCitiesOfCountry(isoCode);

    // Make a custom array
    const tempCities = fetchedCities.map((item) => ({
      label: item.name,
      value: item.name.toLowerCase(),
    }));

    // Add empty item to make the user to choose instead of automatically displaying a city as an option
    tempCities.unshift({ label: "", value: "" });

    return tempCities;
  }

  // For handling birthdate input
  function handleBirthDate(event, formik) {
    const dateObj = event.$d;
    // Set value to standard date format for api calls
    formik.setFieldValue("birthDate", formatStandard(dateObj));
  }

  // For handling phone number input
  function handlePhone(value, formik) {
    formik.setFieldValue("phone", value);
  }

  // For handling gender
  function handleGender(e, formik) {
    e.preventDefault();
    const { value } = e.target;

    formik.setFieldValue("gender", value);
  }

  const [updateProfile, { isLoading, isSuccess }] = useUpdateProfileMutation();
  // For profile update
  async function handleProfileUpdate(values) {
    const formData = new FormData();
    // Add image to values
    if (imgUrl != null) {
      const response = await fetch(imgUrl);
      const blob = await response.blob();
      const imgFile = new File([blob], "img." + blob.type?.split("/")[1], {
        type: blob.type,
      });
      formData.append("profilePicture", imgFile);
    }
    // Populate formData
    Object.keys(values).forEach((key) => {
      if (values[key] != "" || values[key] != null)
        formData.append(key, values[key]);
    });

    try {
      const response = await updateProfile(formData);

      if (isSuccess) {
        AlertSuccess("Successfully Updated Profile!");
        // dispatch action
        dispatch(updateProfileAction(response.data.user));
      }

      if (response.error.status === "FETCH_ERROR") {
        AlertInfo("Make sure you are connected to internet.");
      }
    } catch (error) {
      console.log("error while updating profile \n", error);
      AlertError(error.response.data.message || "Something went wrong!");
    }
  }

  return (
    <div className="my-[100px]">
      <div className="max-w-3xl mx-auto flex items-center gap-[43px] mb-[45px]">
        {imgUrl === null ? (
          user.gender === "female" ? (
            <img
              className="w-[102px] aspect-square rounded-full border border-[#CA6680]"
              src={femaleAvatar}
            />
          ) : (
            <img
              className="w-[102px] aspect-square rounded-full border border-[#CA6680]"
              src={maleAvatar}
            />
          )
        ) : (
          <img
            className="w-[102px] aspect-square rounded-full object-center object-cover objet-fixed border border-[#CA6680]"
            src={imgUrl}
          />
        )}

        <button
          type="button"
          className="relative border text-[#5F5858] text-lg rounded-[5px] py-[7px] px-[10px] border-[#CCC2C2]"
        >
          <span className="flex items-center gap-[5px] text-[#858585] w-full cursor-pointer z-50">
            <BiEdit size={22} color="#858585" className="cursor-pointer" />
            Change Profile Picture
          </span>

          <input
            name="image"
            type="file"
            onChange={handleProfilePicture}
            className="opacity-0 absolute top-0 left-0 w-full cursor-pointer"
          />
        </button>
      </div>

      <div className="flex flex-col items-center">
        <Formik
          initialValues={{
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            city: user?.city,
            phone: user?.phone,
            country: user?.country,
            birthDate: user?.birthDate,
            gender: user?.gender,
          }}
          validationSchema={profileSchema}
          onSubmit={handleProfileUpdate}
        >
          {(formik) => (
            <Form className="grid grid-cols-2 gap-x-[38px]">
              <table className="flex flex-col items-end gap-[23px]">
                <Field
                  name="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  label={"First name:"}
                  value={formik.values.firstName}
                />

                <Field
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  label={"Email:"}
                  value={formik.values.email}
                />

                <div className="flex items-center gap-[25px]">
                  <label
                    htmlFor={"phone"}
                    className="text-[#858585] text-lg font-bold"
                  >
                    Phone:
                  </label>
                  <div className=" flex flex-col items-start">
                    <MuiPhoneNumber
                      defaultCountry={"us"}
                      placeholder="Phone"
                      inputClass=""
                      size="small"
                      name="phone"
                      value={formik.values.PhoneNumber}
                      onChange={(value) => handlePhone(value, formik)}
                      className="outline-none placeholder:text-[#969494] !hover:bg-white  md:w-[260px]  h-[47px] ml-[25px] !rounded-[8px] text-[#5f5858] !border !border-[#E6E6E6] text-lg py-[12px] pl-[22px]"
                      variant="outlined"
                      sx={StyleSheet.MUIStyle}
                    />
                    {formik.errors.phone && formik.touched.phone && (
                      <p className="text-sm text-red-500">
                        {formik.errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div className="flex items-center gap-[25px]">
                    <label
                      htmlFor={"birthDate"}
                      className="text-[#858585] text-lg font-bold"
                    >
                      Birth Date:
                    </label>
                    <div>
                      <DatePicker
                        name="birthDate"
                        className="!hover:bg-white  md:w-[260px]  h-[47px] ml-[25px] !rounded-[8px]"
                        onChange={(e) => handleBirthDate(e, formik)}
                        sx={StyleSheet.MUIStyle}
                      />
                      {formik.errors.birthDate && formik.touched.birthDate && (
                        <p className="text-sm text-red-500">
                          {formik.errors.birthDate}
                        </p>
                      )}
                    </div>
                  </div>
                </LocalizationProvider>
              </table>

              <table className="flex flex-col items-end gap-[23px]">
                <Field
                  name="lastName"
                  type="text"
                  label={"Last name:"}
                  placeholder="Enter your last name"
                  value={formik.values.lastName}
                />

                <SelectFields
                  name="city"
                  label={"City:"}
                  options={
                    formik.values.country && handleCity(formik.values.country)
                  }
                  value={formik.values.city}
                />

                <SelectFields
                  name="country"
                  label={"Country:"}
                  options={countries}
                  value={formik.values.country}
                />

                <tr>
                  <th align="left">
                    <span className="text-[#858585] text-lg">Gender</span>
                  </th>

                  <td>
                    <select
                      onChange={(e) => handleGender(e, formik)}
                      className="outline-none h-[47px] md:w-[260px] bg-white ml-[25px] rounded-[8px] text-[#5f5858] border border-[#E6E6E6] text-lg placeholder:text-[#5f5858] py-[12px] pl-[22px]"
                      name="gender"
                    >
                      <option value="">Choose</option>
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                    </select>
                  </td>

                  {formik.errors.gender && formik.touched.gender && (
                    <td>
                      <p className="text-sm text-red-500">
                        {formik.errors.gender}
                      </p>
                    </td>
                  )}
                </tr>
              </table>

              <div className="flex items-center gap-x-[20px] mt-[68px]">
                <CancelBtn onClick={formik.handleReset} />
                <UpdateBtn onClick={formik.handleSubmit} disabled={isLoading} />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

const StyleSheet = {
  MUIStyle: {
    "& .MuiInputBase-root": {
      color: "#5f5858",
      "&.MuiOutlinedInput-root": {
        "& fieldset": {
          transition: "none",
          borderRadius: "8px",
          border: "1px solid #e6e6e6",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#bbb",
        },
      },
    },
  },
};
export default Profile;
