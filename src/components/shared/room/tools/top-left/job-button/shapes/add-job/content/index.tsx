import CotopiaButton from "@/components/shared-ui/c-button";
import CDateInput from "@/components/shared-ui/c-date-input";
import CotopiaDropdown from "@/components/shared-ui/c-dropdown";
import CotopiaInput from "@/components/shared-ui/c-input";
import CotopiaTextarea from "@/components/shared-ui/c-textarea";
import TitleEl from "@/components/shared/title-el";
import useLoading from "@/hooks/use-loading";
import axiosInstance from "@/lib/axios";
import { JobStatuType } from "@/types/job";
import { useFormik } from "formik";
import { Save } from "lucide-react";
import moment from "moment";
import { toast } from "sonner";
import * as Yup from "yup";
import DeleteJobHandler from "../delete-job";

interface Props {
  onClose: () => void;
  defaultId?: number;
  defaultValue?: {
    title: string;
    description: string;
    end_at: number;
    status: JobStatuType;
  };
  onDelete?: () => void;
  onCreated?: () => void;
  workspaceId?: string;
}

const dropdownItems = [
  { title: "In Progress", value: "in_progress" },
  { title: "Completed", value: "completed" },
  { title: "Paused", value: "paused" },
];

const ManageJobContent = ({
  defaultId,
  defaultValue,
  workspaceId,
  onCreated,
  onDelete,
  onClose,
}: Props) => {
  const isEdit = defaultValue !== undefined && defaultId !== undefined;
  const { isLoading, stopLoading, startLoading } = useLoading();
  const {
    errors,
    getFieldProps,
    handleSubmit,
    values,
    setFieldValue,
    touched,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: defaultValue ? defaultValue.title : "",
      description: defaultValue ? defaultValue.description : "",
      status: defaultValue ? defaultValue.status : "",
      end_at: defaultValue ? defaultValue.end_at : null,
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required("please enter job title"),
      end_at: Yup.number().required("Please enter Job due date"),
    }),
    onSubmit: async (values) => {
      try {
        let payload = { ...values, workspace_id: workspaceId };
        if (!isEdit) payload["status"] = "in_progress";
        startLoading();
        await axiosInstance({
          url: isEdit ? `/jobs/${defaultId}` : `/jobs`,
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

  const isSubmitDisabled = !values.title || !values?.end_at;

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
      <TitleEl title='Due date'>
        <CDateInput
          inputProps={{
            hasError: !!errors.end_at && !!touched.end_at,
            helperText: !!touched.end_at && errors.end_at,
          }}
          defaultDate={
            values?.end_at ? moment(values?.end_at * 1000).toDate() : undefined
          }
          onChange={(date) =>
            setFieldValue("end_at", moment(date).valueOf() / 1000)
          }
        />
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
        {isEdit && <DeleteJobHandler jobId={defaultId} onDelete={onDelete} />}
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
