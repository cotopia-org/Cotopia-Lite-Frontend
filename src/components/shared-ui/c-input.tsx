import { Input, InputProps } from "../ui/input";

type Props = InputProps & {
  label?: string;
  helperText?: string | boolean;
  hasError?: boolean;
};

export default function CotopiaInput({
  label,
  helperText,
  hasError,
  ...rest
}: Props) {
  let inputClasss = rest?.className ?? "";
  let helperTextClss = "text-sm font-normal text-black/60";

  if (hasError) {
    inputClasss += ` border !ring-red-600 border-red-600`;
    helperTextClss += ` text-red-600`;
  }

  return (
    <div className='flex flex-col gap-y-2'>
      {label && (
        <strong className='font-semibold text-black/[.87] text-base'>
          {label}
        </strong>
      )}
      <Input {...rest} className={inputClasss} />
      {helperText && <span className={helperTextClss}>{helperText}</span>}
    </div>
  );
}
