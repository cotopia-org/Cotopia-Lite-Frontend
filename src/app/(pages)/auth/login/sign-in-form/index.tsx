"use client";

import { __VARS } from "@/app/const/vars";
import CotopiaButton from "@/components/shared-ui/c-button";
import CotopiaInput from "@/components/shared-ui/c-input";
import CotopiaPasswordInput from "@/components/shared-ui/c-password-input";
import { buttonVariants } from "@/components/ui/button";
import axiosInstance from "@/lib/axios";
import { AuthenticateType } from "@/types/authenticate";
import { useFormik } from "formik";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import * as Yup from "yup";

//Login form wrapper
type Props = {
  onLoggedIn?: (res: AuthenticateType) => void;
};
export default function SignInForm({ onLoggedIn }: Props) {
  const { values, touched, errors, isSubmitting, getFieldProps, handleSubmit } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: Yup.object().shape({
        username: Yup.string().required("Username is required"),
        password: Yup.string().required("Password is required"),
      }),
      onSubmit: async (values, actions) => {
        //Register user here
        actions.setSubmitting(true);
        try {
          const res = await axiosInstance.post<AuthenticateType>(
            `/auth/login`,
            {
              username: values.username,
              password: values.password,
            }
          );
          actions.setSubmitting(false);
          toast.success("You logged in successfully.");
          if (onLoggedIn) onLoggedIn(res.data);
        } catch (e) {
          actions.setSubmitting(false);
        }
      },
    });

  return (
    <div className='flex flex-col gap-y-8 items-start px-6 md:px-0'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-y-6'>
        <div className='flex flex-col gap-y-2'>
          <strong className='text-xl'>Login to your account</strong>
          <p className='text-black/60'>
            By entering username & password of your account, you can login to
            your account.
          </p>
        </div>
        <CotopiaInput
          {...getFieldProps("username")}
          placeholder='Enter the username'
          label='Username'
          hasError={!!touched.username && !!errors.username}
          helperText={
            !!touched.username && !!errors.username && errors.username
          }
        />
        <CotopiaPasswordInput
          {...getFieldProps("password")}
          placeholder='Enter the password'
          label='Password'
          hasError={!!touched.password && !!errors.password}
          helperText={
            !!touched.password && !!errors.password && errors.password
          }
        />
        <CotopiaButton
          type='submit'
          disabled={!values.username || !values.password}
          loading={isSubmitting}
        >
          Login
        </CotopiaButton>
      </form>
      <hr className='w-full' />
      <div className='flex flex-col gap-y-4 items-start'>
        <Link
          href={__VARS.registerPage}
          className={buttonVariants({
            variant: "link",
            className: "!px-0 !py-0 h-auto",
          })}
        >
          Register
          <MoveRight className='ml-2' size={12} />
        </Link>
        <Link
          href={__VARS.forgetPasswordPage}
          className={buttonVariants({
            variant: "link",
            className: "!px-0 !py-0 h-auto",
          })}
        >
          I don't remember my password
          <MoveRight className='ml-2' size={12} />
        </Link>
      </div>
    </div>
  );
}
