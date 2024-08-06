"use client";
import * as Yup from "yup";
import { useFormik } from "formik";
import CotopiaInput from "@/components/shared-ui/c-input";
import CotopiaButton from "@/components/shared-ui/c-button";
import CotopiaTextarea from "@/components/shared-ui/c-textarea";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";

type Props = {
  onClose: () => void;
};

export default function CreateWorkspace({ onClose }: Props) {
  const { values, touched, errors, isSubmitting, getFieldProps, handleSubmit } =
    useFormik({
      initialValues: {
        title: "",
        description: "",
      },
      validationSchema: Yup.object().shape({
        title: Yup.string().required("Title is required"),
      }),
      onSubmit: async (values, actions) => {
        actions.setSubmitting(true);
        axiosInstance
          .post(`/workspaces`, values)
          .then((res) => {
            toast.success("Workspace has been created successfully.");
            actions.setSubmitting(false);
            if (onClose) onClose();
          })
          .catch((err) => {
            actions.setSubmitting(false);
          });
      },
    });

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-y-6 items-start gap-x-4 w-full'
    >
      <div className='flex flex-col gap-y-2 w-full'>
        <CotopiaInput
          {...getFieldProps("title")}
          hasError={!!touched.title && !!errors.title}
          helperText={!!touched.title && !!errors.title && errors.title}
          label='Workspace title'
        />
        <CotopiaTextarea
          {...getFieldProps("description")}
          hasError={!!touched.description && !!errors.description}
          helperText={
            !!touched.description && !!errors.description && errors.description
          }
          label='Workspace description'
        />
      </div>
      <div className='flex flex-row w-full justify-end gap-x-2'>
        <CotopiaButton onClick={onClose} className='!px-4' variant={"outline"}>
          Cancel
        </CotopiaButton>
        <CotopiaButton
          loading={isSubmitting}
          className='min-w-[100px]'
          type='submit'
        >
          Create
        </CotopiaButton>
      </div>
    </form>
  );
}
