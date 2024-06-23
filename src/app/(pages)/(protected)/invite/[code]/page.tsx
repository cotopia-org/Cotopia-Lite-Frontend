import Wrapper from "./wrapper";

type Props = {
  params: {
    code: string;
  };
};

export const metadata = {
  title: "Invite Code",
};

export default function InviteCodePage({ params }: Props) {
  return <Wrapper inviteCode={params.code} />;
}
