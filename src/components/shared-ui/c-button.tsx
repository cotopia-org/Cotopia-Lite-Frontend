import { Loader } from "lucide-react";
import { Button, ButtonProps } from "../ui/button";
import { Input, InputProps } from "../ui/input";
import { ReactNode } from "react";

type Props = ButtonProps & {
  loading?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
};

export default function CotopiaButton({
  loading,
  startIcon,
  endIcon,
  ...rest
}: Props) {
  const isDisabled = rest?.disabled ?? loading ?? false;
  let clss = rest?.className ?? "";
  clss += ` gap-x-2 px-2 rounded-xl`;

  return (
    <Button {...rest} className={clss} disabled={isDisabled}>
      {loading ? (
        <Loader className='animate-spin' />
      ) : (
        <>
          {!!startIcon && startIcon}
          {rest?.children}
          {!!endIcon && endIcon}
        </>
      )}
    </Button>
  );
}
