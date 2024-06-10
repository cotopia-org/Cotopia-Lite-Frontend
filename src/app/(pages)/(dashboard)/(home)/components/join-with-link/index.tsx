"use client";

import CotopiaButton from "@/components/shared-ui/c-button";
import CotopiaInput from "@/components/shared-ui/c-input";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function JoinWorkspaceWithLink() {
  const { values, touched, errors, isSubmitting, getFieldProps, handleSubmit } =
    useFormik({
      initialValues: {
        link: "",
      },
      validationSchema: Yup.object().shape({
        link: Yup.string().required("Link is required"),
      }),
      onSubmit: async (values, actions) => {},
    });

  const submitDisabled = !values.link;

  return (
    <div className='flex flex-row items-start gap-x-4 w-full'>
      <CotopiaInput
        {...getFieldProps("link")}
        hasError={!!touched.link && !!errors.link}
        helperText={!!touched.link && !!errors.link && errors.link}
        placeholder='Enter link'
        className='flex-1 py-4 px-4'
      />
      <CotopiaButton
        className='w-[164px] h-[50px] max-w-full'
        disabled={submitDisabled}
        variant={submitDisabled ? "outline" : "default"}
        size={"sm"}
      >
        Join with link
      </CotopiaButton>
    </div>
  );
}
