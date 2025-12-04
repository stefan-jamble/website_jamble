import AffiliateInvite from "./AffiliateInvite";
import { getCountryCode } from "@/lib/location";

interface PageProps {
    params: {
        partner_id: string;
    };
    searchParams?: {
        [key: string]: string | string[] | undefined;
    };
}

export default async function InviteWithPartnerPage({ params, searchParams }: PageProps) {
    const { partner_id } = params;
    const countryCode = await getCountryCode();
    const utmCampaign = (searchParams?.utm_campaign ?? undefined) as string | undefined;

    return (
        <AffiliateInvite 
            countryCode={countryCode} 
        />
    );
}