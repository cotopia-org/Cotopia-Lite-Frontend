import CotopiaButton from "@/components/shared-ui/c-button";
import CotopiaInput from "@/components/shared-ui/c-input";
import useLoading from "@/hooks/use-loading";
import axiosInstance from "@/lib/axios";
import { useFormik } from "formik";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import * as Yup from "yup";

type Props = {
  workspace_id: string | number;
  onSubmit: () => void;
};

export default function AddChannelForm({ workspace_id, onSubmit }: Props) {
  const { isLoading, startLoading, stopLoading } = useLoading();

  const { touched, errors, getFieldProps, handleSubmit } = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required("Title is required"),
    }),
    onSubmit: async (values, actions) => {
      startLoading();
      axiosInstance
        .post(`/chats`, {
          type: "group",
          title: values.title,
          workspace_id,
        })
        .then((res) => {
          if (onSubmit) onSubmit();
          stopLoading();
          toast.success("Channel created.");
        })
        .catch((err) => {
          stopLoading();
        });
    },
  });

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-y-4 items-start w-full'
    >
      <CotopiaInput
        {...getFieldProps("title")}
        hasError={!!touched.title && !!errors.title}
        helperText={!!touched.title && !!errors.title && errors.title}
        placeholder='Title'
      />
      <CotopiaButton
        loading={isLoading}
        type='submit'
        className='!px-4'
        startIcon={<Plus size={20} />}
      >
        Create Channel
      </CotopiaButton>
    </form>
  );
}
