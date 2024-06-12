import { ButtonProps } from "../ui/button";
import CotopiaButton from "./c-button";

type Props = ButtonProps & {
  loading?: boolean;
};

export default function CotopiaIconButton({ loading, ...rest }: Props) {
  let clssName = rest?.className ?? "";
  clssName += ` bg-white rounded-full hover:bg-gray-100`;

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
