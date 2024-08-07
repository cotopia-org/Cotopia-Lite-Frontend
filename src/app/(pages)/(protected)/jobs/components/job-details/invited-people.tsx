import CotopiaButton from "@/components/shared-ui/c-button";
import DetailsSection from "./detail-section";
import { User } from "lucide-react";
import InviteList from "./invite-list";

function InvitedPeople() {
  return (
    <DetailsSection
      title="Invited People"
      actions={
        <CotopiaButton className="flex bg-transparent hover:bg-blue-50 transition-colors text-blue-600">
          <span>
            <User size={16} />
          </span>
          <p className="text-sm">Invite People </p>
        </CotopiaButton>
      }
      content={
        <InviteList
          list={[
            { status: "pendig" },
            { status: "in progress" },
            { status: "rejected" },
          ]}
        />
      }
    />
  );
}

export default InvitedPeople;
