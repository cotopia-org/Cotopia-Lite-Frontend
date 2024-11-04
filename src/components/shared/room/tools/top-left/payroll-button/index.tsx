import CotopiaButton from "@/components/shared-ui/c-button"
import PopupBox from "@/components/shared/popup-box"
import PopupBoxChild from "@/components/shared/popup-box/child"
import { Wallet } from "lucide-react"
import Link from "next/link"
import React from "react"

export default function PayrollButton() {
  return (
    <PopupBox
      trigger={(open) => (
        <CotopiaButton
          onClick={open}
          startIcon={<Wallet size={22} />}
          className="bg-white hover:bg-white text-black rounded-xl"
        >
          Payroll
        </CotopiaButton>
      )}
    >
      {(triggerPosition, open, close) => (
        <PopupBoxChild
          onClose={close}
          title="Cotopia Payroll"
          width={400}
          zIndex={triggerPosition.zIndex}
          top={triggerPosition.top}
          left={triggerPosition.left}
        >
          <Link href="http://localhost:3000">
            <CotopiaButton>More</CotopiaButton>
          </Link>
        </PopupBoxChild>
      )}
    </PopupBox>
  )
}
