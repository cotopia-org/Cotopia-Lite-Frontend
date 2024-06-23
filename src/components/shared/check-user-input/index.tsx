import CotopiaInput, {
  CotopiaInputProps,
} from "@/components/shared-ui/c-input";
import useLoading from "@/hooks/use-loading";
import axiosInstance from "@/lib/axios";
import { useEffect, useState } from "react";
import Loading from "./loading";
import Valid from "./valid";
import NotValid from "./not-valid";

type Props = CotopiaInputProps & {
  onError?: () => void;
  onValid?: () => void;
  notValidText?: string;
};

let timeout: NodeJS.Timeout;
export default function CheckUserInput({
  onError,
  onValid,
  notValidText = "Input is not valid!",
  ...rest
}: Props) {
  const value = rest?.value;

  const [isValid, setIsValid] = useState(true);
  const { startLoading, stopLoading, isLoading } = useLoading();

  useEffect(() => {
    if (!value) return;

    clearTimeout(timeout);

    startLoading();

    // Set a new timeout
    timeout = setTimeout(async () => {
      try {
        const res = await axiosInstance.post<{ data: boolean }>(
          `/auth/checkUsername`,
          {
            username: value,
          }
        );

        const isValid = res?.data?.data;

        if (isValid) {
          if (onValid) onValid();
        } else {
          if (onError) onError();
        }

        setIsValid(isValid);
      } catch (e) {
      } finally {
        stopLoading();
      }
    }, 500);

    // Cleanup timeout if component unmounts or value changes
    return () => {
      clearTimeout(timeout);
    };
  }, [value]);

  let metaShow = null;

  if (isValid) metaShow = <Valid />;

  if (!isValid) metaShow = <NotValid />;

  if (isLoading) metaShow = <Loading />;

  if (!value) metaShow = null;

  let helperText = rest?.helperText;

  if (!isValid) helperText = notValidText;

  return (
    <CotopiaInput
      {...rest}
      helperText={helperText}
      renderInput={(input) => (
        <div className='relative'>
          {input}
          {metaShow}
        </div>
      )}
    />
  );
}
