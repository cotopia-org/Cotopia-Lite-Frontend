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
      onSubmit: async (values, actions) => { },
    });
  const submitDisabled = !values.link;

  return (
    <div className='flex flex-col gap-y-2 md:flex-row items-start gap-x-4 w-full'>
      <CotopiaInput
        {...getFieldProps("link")}
        hasError={!!touched.link && !!errors.link}
        helperText={!!touched.link && !!errors.link && errors.link}
        placeholder='Enter link'
        className="flex-1 py-4 px-4 2xs:w-auto xs:w-full"
      />

      {/* h-3.2 => 3.125rem = 50px , w-10.4 => 10.25rem => 164px */}
      <CotopiaButton
        className="h-3.25 md:w-10.5 w-full"
        disabled={submitDisabled}
        variant={submitDisabled ? "outline" : "default"}
        size={"sm"}
      >
        Join with link
      </CotopiaButton>
    </div>
  );
}