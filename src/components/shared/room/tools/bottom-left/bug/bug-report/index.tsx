import CotopiaButton from "@/components/shared-ui/c-button";
import CotopiaTextarea from "@/components/shared-ui/c-textarea";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function BugReportForm() {
  const { isSubmitting, touched, errors, getFieldProps, handleSubmit } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        report: "",
      },
      validationSchema: Yup.object().shape({
        report: Yup.string().required("Report is required"),
      }),
      onSubmit: (values, actions) => {
        // actions.setSubmitting(true);
        // axiosInstance
        //   .put(`/users/update`, {
        //     name: values.name,
        //   })
        //   .then((res) => {
        //     actions.setSubmitting(false);
        //     toast.success("Your information has been updated.");
        //     router.refresh();
        //   })
        //   .catch((err) => {
        //     actions.setSubmitting(false);
        //   });
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
          <CotopiaTextarea
            {...getFieldProps("report")}
            placeholder="Eg: updating profile doesn't work properly ..."
            // label='Your report'
            hasError={!!touched.report && !!errors.report}
            helperText={!!touched.report && !!errors.report && errors.report}
          />
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
