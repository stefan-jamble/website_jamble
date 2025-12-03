import FriendInvite from "./FriendInvite";
import { getCountryCode } from "@/lib/location";

interface PageProps {
  params: {
    referrer_id: string;
  };
}

export default async function InviteWithReferrerPage({ params }: PageProps) {
  const { referrer_id } = await params;
  const countryCode = await getCountryCode();

  return (
    <FriendInvite countryCode={countryCode} referrerId={referrer_id} />
  );
}


