import { Form, Formik, useField } from "formik";
import { useEffect, useState } from "react";
import { maleAvatar, femaleAvatar } from "../assets";
import { BiEdit } from "react-icons/bi";
import { CancelBtn, UpdateBtn } from "../components/Buttons/Buttons";
import { Loading } from "../components/State";

function Profile() {
  const [imgUrl, setImgUrl] = useState(null);
  const [profileData, setProfileData] = useState({});

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        city: user?.city,
        phone: user?.phone,
        country: user?.country,
        birthDate: user?.birthDate,
        gender: user?.gender,
        profilePicture: user?.profilePicture,
      });
    }
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
          <span className="text-[#5F5858] text-lg ">{label}</span>
        </th>
        <td>
          <input
            className="outline-none  w-full  h-[47px] ml-[25px] rounded-[21px] text-[#5f5858] border border-[#5f5858] text-lg placeholder:text-[#5f5858] py-[12px] pl-[22px]"
            {...props}
            {...field}
          />
        </td>

        {meta.error && meta.touched && <div>{meta.error}</div>}
      </tr>
    );
  };

  // For profile picture select
  function handleProfilePicture(event, setFieldValue) {
    const file = event.target.files[0];

    if (file) {
      setImgUrl(URL.createObjectURL(file));
      setFieldValue("profilePicture", file);
    }
  }

  return (
    <div className="my-[100px]">
      <div className="max-w-3xl mx-auto flex items-center gap-[43px] mb-[45px]">
        {imgUrl === null ? (
          profileData?.gender === "female" ? (
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
          className="relative border text-[#5F5858] text-lg rounded-[25px] py-[17px] px-[16px] border-[#CA6680]"
        >
          <span className="flex items-center gap-[5px] w-full cursor-pointer z-50">
            <BiEdit size={22} color="#5F5858" className="cursor-pointer" />
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
        <Formik initialValues={profileData}>
          {(formik) => (
            <Form className="grid grid-cols-2 gap-x-[38px]">
              <table className="flex flex-col items-end gap-[23px]">
                <Field
                  name="firstName"
                  type="text"
                  label={"First name:"}
                  value={formik.values.firstName}
                />

                <Field
                  name="email"
                  type="email"
                  label={"Email:"}
                  value={formik.values.email}
                />

                <Field
                  name="phone"
                  type="tel"
                  label={"Phone:"}
                  value={formik.values.phone}
                />

                <Field
                  name="birthDate"
                  type="text"
                  label={"Date of Birth:"}
                  value={formik.values.birthDate}
                />
              </table>

              <table className="flex flex-col items-end gap-[23px]">
                <Field
                  name="lastName"
                  type="text"
                  label={"Last name:"}
                  value={formik.values.lastName}
                />

                <Field
                  name="city"
                  type="textimage"
                  label={"City:"}
                  value={formik.values.city}
                />

                <Field
                  name="country"
                  type="text"
                  label={"Country:"}
                  value={formik.values.country}
                />

                <tr>
                  <th align="left">
                    <span className="text-[#5F5858] text-lg">Gender</span>
                  </th>

                  <td>
                    <select
                      className="outline-none h-[47px] w-full bg-white ml-[25px] rounded-[21px] text-[#5f5858] border border-[#5f5858] text-lg placeholder:text-[#5f5858] py-[12px] pl-[22px]"
                      name="gender"
                    >
                      <option value="">Choose</option>
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                    </select>
                  </td>
                </tr>
              </table>

              <div className="flex items-center gap-x-[20px] mt-[68px]">
                <CancelBtn onClick={() => {}} />
                <UpdateBtn onClick={() => {}} buttonName="Update" />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Profile;
