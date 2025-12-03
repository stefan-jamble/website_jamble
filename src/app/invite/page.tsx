import FriendInvite from "./FriendInvite";
import { getCountryCode } from "@/lib/location";

export default async function InvitePage() {
  const countryCode = await getCountryCode();
  return <FriendInvite countryCode={countryCode} />;
}