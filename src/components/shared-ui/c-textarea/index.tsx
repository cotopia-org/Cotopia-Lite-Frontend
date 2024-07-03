import { Textarea, TextareaProps } from "@/components/ui/textarea";

type Props = TextareaProps & {
  label?: string;
  helperText?: string | boolean;
  hasError?: boolean;
  required?: boolean;
};

export default function CotopiaTextarea({
  label,
  helperText,
  hasError,
  required = false,
  ...rest
}: Props) {
  let inputClasss = rest?.className ?? "";
  let helperTextClss = "text-sm font-normal text-black/60";

  if (hasError) {
    inputClasss += ` border !ring-red-600 border-red-600`;
    helperTextClss += ` text-red-600`;
  }

  return (
    <div className='flex flex-col gap-y-2 w-full'>
      {label && (
        <div className='flex flex-row items-center gap-x-1'>
          <strong className='font-semibold text-black/[.87] text-base'>
            {label}
          </strong>
          {!!required && <span className='text-red-500'>*</span>}
        </div>
      )}
      <Textarea {...rest} className={inputClasss} />
      {helperText && (
        <span data-testid='hint-text' className={helperTextClss}>
          {helperText}
        </span>
      )}
    </div>
  );
}
