import CotopiaButton from "@/components/shared-ui/c-button";
import CotopiaDropdown from "@/components/shared-ui/c-dropdown";
import CotopiaInput from "@/components/shared-ui/c-input";
import CotopiaTextarea from "@/components/shared-ui/c-textarea";
import TitleEl from "@/components/shared/title-el";
import useLoading from "@/hooks/use-loading";
import axiosInstance from "@/lib/axios";
import { JobType } from "@/types/job";
import { useFormik } from "formik";
import { Save } from "lucide-react";
import moment from "moment";
import { toast } from "sonner";
import * as Yup from "yup";
import DeleteJobHandler from "../delete-job";
import { useEffect } from "react";

interface Props {
  onClose: () => void;
  defaultValue?: JobType;
  onDelete?: () => void;
  onCreated?: () => void;
  workspaceId?: string;
}

const dropdownItems = [
  { title: "In Progress", value: "in_progress" },
  { title: "Completed", value: "completed" },
  { title: "Paused", value: "paused" },
  { title: "Started", value: "started" },
];

const ManageJobContent = ({
  defaultValue,
  workspaceId,
  onCreated,
  onDelete,
  onClose,
}: Props) => {
  const isEdit = defaultValue !== undefined;
  const { isLoading, stopLoading, startLoading } = useLoading();
  const {
    errors,
    getFieldProps,
    handleSubmit,
    values,
    setFieldValue,
    touched,
  } = useFormik<{
    title: string;
    description: string;
    status: string;
    estimate?: number;
  }>({
    enableReinitialize: true,
    initialValues: {
      title: defaultValue ? defaultValue.title : "",
      description: defaultValue ? defaultValue.description : "",
      status: defaultValue ? defaultValue.status : "",
      estimate: defaultValue ? defaultValue.estimate : undefined,
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required("please enter job title"),
    }),
    onSubmit: async (values) => {
      const { ...rest } = values;

      try {
        let payload: { [key: string]: string | number | undefined } = {
          ...rest,
          workspace_id: workspaceId,
        };

        if (!isEdit) payload["status"] = "in_progress";
        startLoading();
        await axiosInstance({
          url: isEdit ? `/jobs/${defaultValue.id}` : `/jobs`,
          method: isEdit ? "PUT" : "POST",
          data: payload,
        });
        toast.success(
          isEdit
            ? "Job has been updated successfully"
            : "Job has been created successfully"
        );
        if (onCreated) onCreated();
        stopLoading();
      } catch (error) {
        stopLoading();
      }
    },
  });

  const isSubmitDisabled = !values.title;

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-y-5 px-4'>
      <TitleEl title='Title'>
        <CotopiaInput
          {...getFieldProps("title")}
          hasError={!!touched.title && !!errors.title}
          helperText={!!touched.title && errors.title}
          placeholder='Enter Job Title'
        />
      </TitleEl>
      <TitleEl title='Estimate Time (Hours)'>
        <div className='flex items-center gap-x-4 justify-between'>
          <CotopiaInput
            {...getFieldProps("estimate")}
            hasError={!!touched.estimate && !!errors.estimate}
            helperText={!!touched.estimate && errors.estimate}
            placeholder='Estimate time'
          />
        </div>
      </TitleEl>

      {isEdit && (
        <TitleEl title='Status'>
          <CotopiaDropdown
            onSelect={(item) => setFieldValue("status", item.value)}
            defaultValue={
              dropdownItems.find((x) => x.value === values?.status)?.title
            }
            items={dropdownItems}
          />
        </TitleEl>
      )}

      <TitleEl title='Description'>
        <CotopiaTextarea
          {...getFieldProps("description")}
          placeholder='Enter job Description'
          rows={5}
          className='resize-none'
        />
      </TitleEl>
      <div className='flex flex-row justify-end gap-x-2'>
        <CotopiaButton variant={"outline"} className='w-full' onClick={onClose}>
          Close
        </CotopiaButton>
        {isEdit && (
          <DeleteJobHandler jobId={defaultValue.id} onDelete={onDelete} />
        )}
        <CotopiaButton
          type='submit'
          className='w-full'
          startIcon={<Save size={16} />}
          loading={isLoading}
          disabled={isSubmitDisabled}
        >
          {`${isEdit ? "Update" : "Create"} Job`}
        </CotopiaButton>
      </div>
    </form>
  );
};

export default ManageJobContent;
