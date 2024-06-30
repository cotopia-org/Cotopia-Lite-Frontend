"use client";

import CotopiaButton from "@/components/shared-ui/c-button";
import CotopiaInput from "@/components/shared-ui/c-input";
import { useFormik } from "formik";
import * as Yup from "yup";

type Props = {
  onSetToken: (token: string) => void;
};

export default function GetRoomToken({ onSetToken }: Props) {
  const { values, touched, errors, getFieldProps, handleSubmit } = useFormik({
    initialValues: {
      token: "",
    },
    validationSchema: Yup.object().shape({
      token: Yup.string().required("Token is required"),
    }),
    onSubmit: (values, actions) => {
      onSetToken(values.token);
    },
  });

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-y-6'>
      <div className='flex flex-col gap-y-2'>
        <strong>Insert Room Token</strong>
        <p>
          For the trial version, creating and adding tokens will be entered
          manually.
        </p>
      </div>
      <CotopiaInput
        {...getFieldProps("token")}
        placeholder='Enter the token'
        label='Token'
        hasError={!!touched.token && !!errors.token}
        helperText={!!touched.token && !!errors.token && errors.token}
      />
      <CotopiaButton type='submit' disabled={!values.token}>
        Enter
      </CotopiaButton>
    </form>
  );
}
