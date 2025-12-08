import AffiliateInvite from "./AffiliateInvite";
import { getCountryCode } from "@/lib/location";
import { cookies } from "next/headers";

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

    const cookieStore = await cookies();
    const dubId = cookieStore.get("dub_id")?.value;

    console.log("Country Code: ", countryCode)
    console.log("partnerId: ", partner_id)
    console.log("Dub ID: ", dubId);


    return (
        <AffiliateInvite 
            countryCode={countryCode} 
            partnerId={partner_id} 
            utmCampaign={utmCampaign}
            dubId={dubId}
        />
    );
}