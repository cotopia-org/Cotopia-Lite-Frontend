import { ReactNode } from "react";
import { Input, InputProps } from "../../ui/input";

export type CotopiaInputProps = InputProps & {
  label?: string;
  helperText?: string | boolean;
  hasError?: boolean;
  renderInput?: (input: ReactNode) => ReactNode;
};

export default function CotopiaInput({
  label,
  helperText,
  hasError,
  renderInput,
  ...rest
}: CotopiaInputProps) {
  let inputClasss = rest?.className ?? "";
  let helperTextClss = "text-sm font-normal text-black/60";

  if (hasError) {
    inputClasss += ` border !ring-red-600 border-red-600`;
    helperTextClss += ` text-red-600`;
  }

  const contentInput = <Input {...rest} className={inputClasss} />;

  return (
    <div className='flex flex-col items-start gap-y-2 w-full'>
      {label && (
        <strong className='font-semibold text-black/[.87] text-base'>
          {label}
        </strong>
      )}
      {renderInput ? renderInput(contentInput) : contentInput}
      {helperText && (
        <span data-testid='hint-text' className={helperTextClss}>
          {helperText}
        </span>
      )}
    </div>
  );
}
