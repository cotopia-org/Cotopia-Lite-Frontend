import CotopiaButton from "@/components/shared-ui/c-button";
import CDateInput from "@/components/shared-ui/c-date-input";
import CotopiaDropdown from "@/components/shared-ui/c-dropdown";
import CotopiaInput from "@/components/shared-ui/c-input";
import CotopiaTextarea from "@/components/shared-ui/c-textarea";
import TitleEl from "@/components/shared/title-el";
import useLoading from "@/hooks/use-loading";
import axiosInstance from "@/lib/axios";
import { JobStatuType, JobType } from "@/types/job";
import { useFormik } from "formik";
import { Save } from "lucide-react";
import moment from "moment";
import { toast } from "sonner";
import * as Yup from "yup";
import DeleteJobHandler from "../delete-job";
import TimePicker from "../../../../schedule-button/shapes/add-schedule/content/day/time-picker";
import { useCallback, useEffect } from "react";

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
  useEffect(() => {
    if (defaultValue?.end_at === undefined) {
      setFieldValue(
        "date",
        moment().set({
          hours: 8,
          minutes: 0,
        })
      );
      return;
    }

    const endAtMoment = moment(defaultValue.end_at);

    setFieldValue("date", endAtMoment);
  }, [defaultValue?.end_at]);

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
    date?: moment.Moment;
  }>({
    enableReinitialize: true,
    initialValues: {
      title: defaultValue ? defaultValue.title : "",
      description: defaultValue ? defaultValue.description : "",
      status: defaultValue ? defaultValue.status : "",
      date: undefined,
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required("please enter job title"),
    }),
    onSubmit: async (values) => {
      const { date, ...rest } = values;

      try {
        let payload: { [key: string]: string | number | undefined } = {
          ...rest,
          workspace_id: workspaceId,
        };

        if (date) payload["end_at"] = date?.unix();

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

  const selectTimeHandler = useCallback(
    (time: string) => {
      if (!!!time) return;

      const date = values.date
        ? values.date
        : moment().set({
            hours: 8,
            minutes: 0,
          });

      const [hours, minutes] = time.split(":").map(Number);

      const newDate = date.set({ hours, minutes });

      setFieldValue("date", newDate);
    },
    [values.date]
  );

  const changeDateHandler = useCallback(
    (date: Date) => {
      if (values.date === undefined) return;

      const newDate = values.date.set({
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
      });

      setFieldValue("date", newDate);
    },
    [values.date]
  );

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
        <div className='flex items-center gap-x-4 justify-between'>
          <CDateInput
            className='w-full'
            inputProps={{
              placeholder: "Select Due Date",
              hasError: !!errors.date && !!touched.date,
              helperText: !!touched.date && errors.date,
            }}
            defaultDate={values.date ? values.date?.toDate() : undefined}
            onChange={changeDateHandler}
          />

          <TimePicker
            defaultValue={values?.date?.format("HH:mm")}
            className='!w-auto'
            onChange={selectTimeHandler}
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
