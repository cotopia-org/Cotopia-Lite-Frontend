import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import copy from "copy-to-clipboard";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

type Props = {
  code: string;
};

let timeout: NodeJS.Timeout;

export default function CopyBtn({ code }: Props) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    copy(code);
    setIsCopied(true);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <CotopiaIconButton
      onClick={handleCopy}
      className='text-white !bg-black !rounded-md'
    >
      {!isCopied ? <Copy size={16} /> : <Check size={16} />}
    </CotopiaIconButton>
  );
}
