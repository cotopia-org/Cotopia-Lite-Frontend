import CTabs from "@/components/shared-ui/c-tabs";
import { Cog, UserCog } from "lucide-react";
import AdditionalInformation from "./additional-information";
import GlobalSettings from "./global";
import AccountLogout from "@/components/shared/account-logout";

export default function UserSettings() {
  return (
    <div className='p-6 flex flex-col gap-y-4'>
      <CTabs
        title={<AccountLogout />}
        dividerBetweenContentAndTabs
        defaultValue={"additional-information"}
        items={[
          {
            icon: <UserCog />,
            content: <AdditionalInformation />,
            value: "additional-information",
          },
          {
            icon: <Cog />,
            content: <GlobalSettings />,
            value: "global-settings",
          },
        ]}
      />
    </div>
  );
}
