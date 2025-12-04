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
    const { partner_id } = await params;
    const countryCode = await getCountryCode();
    const resolvedSearchParams = await searchParams;
    const utmCampaign = (resolvedSearchParams?.utm_campaign ?? undefined) as string | undefined;


    return (
        <AffiliateInvite 
            countryCode={countryCode} 
            partnerId={partner_id} 
            utmCampaign={utmCampaign}
        />
    );
}