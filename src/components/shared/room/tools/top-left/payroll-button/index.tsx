import CotopiaButton from "@/components/shared-ui/c-button"
import PopupBox from "@/components/shared/popup-box"
import PopupBoxChild from "@/components/shared/popup-box/child"
import { Wallet } from "lucide-react"

export default function PayrollButton() {

  function handleSendData() {
    const data = localStorage.getItem("persist:cotopia-lite");
    const parsedData = data && JSON.parse(data);
    const authSlice = parsedData?.authSlice;
    const targetWindow = window.open("http://localhost:3000"); 
    if (targetWindow && authSlice) {
      targetWindow.postMessage(authSlice, "http://localhost:3000");
    } else {
      console.error("Failed to open window or authSlice is undefined.");
    }
  }

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
          <CotopiaButton onClick={handleSendData} className="bg-black text-black rounded-xl">
            More
          </CotopiaButton>
        </PopupBoxChild>
      )}
    </PopupBox>
  )
}
