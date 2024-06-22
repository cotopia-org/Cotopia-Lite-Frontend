import { ReactNode } from "react";

type Props = {
  icon?: ReactNode;
  title: string;
  desc?: string;
  afterDesc?: ReactNode;
  className?: string;
};
export default function NotFound({
  icon,
  title,
  desc,
  afterDesc,
  className,
}: Props) {
  return (
    <div className={`items-center flex flex-col gap-y-4 ${className ?? ""}`}>
      {!!icon && icon}
      <strong className='text-base font-normal text-black/[.60]'>
        {title}
      </strong>
      {!!desc && <p className='text-sm text-black/60'>{desc}</p>}
      {!!afterDesc && afterDesc}
    </div>
  );
}
