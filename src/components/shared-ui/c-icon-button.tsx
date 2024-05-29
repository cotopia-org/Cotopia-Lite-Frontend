import { Loader } from "lucide-react";
import { Button, ButtonProps } from "../ui/button";
import { Input, InputProps } from "../ui/input";
import CotopiaButton from "./c-button";

type Props = ButtonProps & {
  loading?: boolean;
};

export default function CotopiaIconButton({ loading, ...rest }: Props) {
  let clssName = rest?.className ?? "";
  clssName += ` bg-white rounded-full`;

  return (
    <CotopiaButton
      variant={"default"}
      size={"icon"}
      {...rest}
      className={clssName}
    >
      {rest?.children}
    </CotopiaButton>
  );
}
