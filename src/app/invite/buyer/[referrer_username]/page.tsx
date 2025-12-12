import BuyerInvite from "./BuyerInvite";
import { getCountryCode } from "@/lib/location";

interface PageProps {
  params: {
    referrer_username: string;
  };
}

interface ReferrerProfileData {
  id: string;
  username: string;
}

async function fetchReferrerProfile(referrer_username: string) {
  const headers = {
      Authorization: "Bearer ca9d3151-ebdd-4902-8a61-63a2564838ce",
      "Content-Type": "application/json"
  }

  const res = await fetch(
      "https://jamble-backend-test-us-576189464787.us-central1.run.app/profile/get_profile_from_username",
      {
          method: "POST",
          headers,
          body: JSON.stringify({ username: referrer_username }),
          cache: "no-store",
      }
  );

  const data = await res.json();

  if (!data.success) {
      throw new Error("Failed to fetch partner profile");
  }

  return data.payload.profile as ReferrerProfileData;

}


export default async function InviteWithReferrerPage({ params }: PageProps) {
  const { referrer_username } = await params;
  const countryCode = await getCountryCode();

  const referrer = await fetchReferrerProfile(referrer_username)

  return (
    <BuyerInvite countryCode={countryCode} referrerId={referrer.id} />
  );
}


