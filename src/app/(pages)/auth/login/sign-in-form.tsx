"use client";

import CotopiaButton from "@/components/shared-ui/c-button";
import CotopiaInput from "@/components/shared-ui/c-input";
import CotopiaPasswordInput from "@/components/shared-ui/c-password-input";
import { useFormik } from "formik";
import * as Yup from "yup";

//Login form wrapper
export default function SignInForm() {
  const { values, touched, errors, getFieldProps, handleSubmit } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values, actions) => {
      console.log("values", values);
    },
  });

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-y-6'>
      <div className='flex flex-col gap-y-2'>
        <strong className='text-xl'>Login to your account</strong>
        <p className='text-black/60'>
          By entering username & password of your account, you can login to your
          account.
        </p>
      </div>
      <CotopiaInput
        {...getFieldProps("username")}
        placeholder='Enter the username'
        label='Username'
        hasError={!!touched.username && !!errors.username}
        helperText={!!touched.username && !!errors.username && errors.username}
      />
      <CotopiaPasswordInput
        {...getFieldProps("password")}
        placeholder='Enter the password'
        label='Password'
        hasError={!!touched.password && !!errors.password}
        helperText={!!touched.password && !!errors.password && errors.password}
      />
      <CotopiaButton
        type='submit'
        disabled={!values.username || !values.password}
      >
        Login
      </CotopiaButton>
    </form>
  );
}
