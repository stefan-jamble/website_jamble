import BuyerInvite from "./BuyerInvite";
import { getCountryCode } from "@/lib/location";

interface PageProps {
  params: {
    referrer_id: string;
  };
}

export default async function InviteWithReferrerPage({ params }: PageProps) {
  const { referrer_id } = await params;
  const countryCode = await getCountryCode();

  console.log("countryCode: ", countryCode)

  return (
    <BuyerInvite countryCode={countryCode} referrerId={referrer_id} />
  );
}


