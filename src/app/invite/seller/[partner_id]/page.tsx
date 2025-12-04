import AffiliateInvite from "./AffiliateInvite";
import { getCountryCode } from "@/lib/location";

interface PageProps {
    params: {
        partner_id: string;
    }
}

export default async function InviteWithPartnerPage({ params }: PageProps) {
    const { partner_id } = await params;
    const countryCode = await getCountryCode();

    return (
        <AffiliateInvite countryCode={countryCode} partnerId={partner_id} />
    )
}