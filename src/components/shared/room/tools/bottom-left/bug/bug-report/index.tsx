import CotopiaButton from "@/components/shared-ui/c-button";
import CotopiaInput from "@/components/shared-ui/c-input";
import CotopiaTextarea from "@/components/shared-ui/c-textarea";
import TitleEl from "@/components/shared/title-el";
import UploaderList from "@/components/shared/uploader-list";
import axiosInstance from "@/lib/axios";
import { AttachmentFileType } from "@/types/file";
import { useFormik } from "formik";
import { toast } from "sonner";
import * as Yup from "yup";

type Props = {
  onSubmitted: () => void;
  model_id: string;
  model_type: string;
};

export default function BugReportForm({
  onSubmitted,
  model_id,
  model_type,
}: Props) {
  const {
    values,
    isSubmitting,
    touched,
    errors,
    getFieldProps,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: "",
      description: "",
      files: [] as AttachmentFileType[],
    },
    validationSchema: Yup.object().shape({
      description: Yup.string().required("Report is required"),
    }),
    onSubmit: (values, actions) => {
      const { files, ...rest } = values;

      actions.setSubmitting(true);
      axiosInstance
        .post(`/reports`, {
          ...rest,
          files: files.map((x) => x.id),
          model_id,
          model_type,
        })
        .then((res) => {
          actions.setSubmitting(false);
          toast.success("Your report has been submitted.");
          if (onSubmitted) onSubmitted();
        })
        .catch((err) => {
          actions.setSubmitting(false);
        });
    },
  });

  return (
    <div className='p-6 flex flex-col gap-y-4 w-full'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-y-16 items-start w-full'
      >
        <div className='flex flex-col gap-y-4 w-full'>
          <div className='flex flex-col gap-y-2'>
            <strong>Report a bug</strong>
            <p className='text-black/60 text-base'>
              We will review your problem as soon as possible.
            </p>
          </div>
          <CotopiaInput
            {...getFieldProps("title")}
            placeholder='Subject'
            // label='Your report'
            hasError={!!touched.title && !!errors.title}
            helperText={!!touched.title && !!errors.title && errors.title}
          />
          <CotopiaTextarea
            {...getFieldProps("description")}
            placeholder="Eg: updating profile doesn't work properly ..."
            // label='Your description'
            hasError={!!touched.description && !!errors.description}
            helperText={
              !!touched.description &&
              !!errors.description &&
              errors.description
            }
          />
          <TitleEl title='Attachments'>
            <UploaderList
              isMultiple
              files={values.files}
              onChange={(files) => setFieldValue("files", files)}
            />
          </TitleEl>
        </div>
        <CotopiaButton
          loading={isSubmitting}
          type='submit'
          className='w-[100px] max-w-full'
        >
          Submit
        </CotopiaButton>
      </form>
    </div>
  );
}
