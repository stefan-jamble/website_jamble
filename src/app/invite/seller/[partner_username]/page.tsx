import AffiliateInvite from "./AffiliateInvite";
import { headers, cookies } from "next/headers";

interface PageProps {
    params: {
        partner_username: string;
    };
    searchParams?: {
        [key: string]: string | string[] | undefined;
    };
}

interface PartnerProfileData {
    id: string;
    username: string;
}

async function fetchPartnerProfile(partner_username: string) {
    const headers = {
        Authorization: "Bearer ca9d3151-ebdd-4902-8a61-63a2564838ce",
        "Content-Type": "application/json"
    }

    const res = await fetch(
        "https://jamble-backend-test-us-576189464787.us-central1.run.app/profile/get_profile_from_username",
        {
            method: "POST",
            headers,
            body: JSON.stringify({ username: partner_username }),
            cache: "no-store",
        }
    );

    const data = await res.json();
    console.log("data.success: ", data.success)

    if (!data.success) {
        throw new Error("Failed to fetch partner profile");
    }

    return data.payload.profile as PartnerProfileData;

}


export default async function InviteWithPartnerPage({ params, searchParams }: PageProps) {
    const { partner_username } = await params;
    const incomingHeaders = await headers();
    const countryCode = incomingHeaders.get("x-vercel-ip-country") || "Unknown";
    const resolvedSearchParams = await searchParams;
    const utmCampaign = (resolvedSearchParams?.utm_campaign ?? undefined) as string | undefined;

    const cookieStore = await cookies();
    const dubId = cookieStore.get("dub_id")?.value;

    const partner = await fetchPartnerProfile(partner_username)

    console.log("countryCode: ", countryCode)


    return (
        <AffiliateInvite 
            countryCode={countryCode} 
            partnerId={partner.id} 
            utmCampaign={utmCampaign}
            dubId={dubId}
        />
    );
}