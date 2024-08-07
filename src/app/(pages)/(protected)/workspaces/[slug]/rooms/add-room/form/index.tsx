import CotopiaButton from "@/components/shared-ui/c-button";
import CotopiaInput from "@/components/shared-ui/c-input";
import axiosInstance, { FetchDataType } from "@/lib/axios";
import { WorkspaceRoomShortType, WorkspaceRoomType } from "@/types/room";
import { useFormik } from "formik";
import { toast } from "sonner";
import * as Yup from "yup";

type Props = {
  workspace_id: string;
  onSubmit: () => void;
  onCreated: (room: WorkspaceRoomShortType) => void;
};
export default function AddRoomForm({
  workspace_id,
  onSubmit,
  onCreated,
}: Props) {
  const { values, touched, errors, isSubmitting, getFieldProps, handleSubmit } =
    useFormik({
      initialValues: {
        title: "",
      },
      validationSchema: Yup.object().shape({
        title: Yup.string().required("Title is required"),
      }),
      onSubmit: async (values, actions) => {
        actions.setSubmitting(true);
        try {
          const res = await axiosInstance.post<
            FetchDataType<WorkspaceRoomShortType>
          >(`/rooms`, {
            workspace_id,
            title: values.title,
          });
          toast.success("Room has been created in your workspace.");
          if (onCreated) onCreated(res.data.data);
          actions.setSubmitting(false);
          if (onSubmit) onSubmit();
        } catch (e) {
          actions.setSubmitting(false);
        }
      },
    });

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-y-6'>
      <CotopiaInput
        {...getFieldProps("title")}
        placeholder='Enter the room title'
        label='Room title'
        hasError={!!touched.title && !!errors.title}
        helperText={!!touched.title && !!errors.title && errors.title}
      />
      <CotopiaButton
        type='submit'
        disabled={!values.title}
        loading={isSubmitting}
      >
        Create
      </CotopiaButton>
    </form>
  );
}
