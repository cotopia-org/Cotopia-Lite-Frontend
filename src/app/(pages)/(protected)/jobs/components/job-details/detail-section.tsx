import { ReactNode } from "react";

type Props = {
  title: string;
  content: ReactNode;
  actions?: ReactNode | null;
};

function DetailsSection({ title, content, actions = null }: Props) {
  return (
    <>
      <div className="flex justify-between items-center">
        <p className="mb-2">{title}</p>
        {actions}
      </div>
      {content}
    </>
  );
}

export default DetailsSection;
