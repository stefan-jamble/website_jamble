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
        Authorization: `Bearer ${process.env.ADMIN_AUTH_KEY}`,
        "Content-Type": "application/json"
    }

    const res = await fetch(
        `${process.env.JAMBLE_API_URL}/profile/get_profile_from_username`,
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

    const JAMBLE_API_URL = process.env.JAMBLE_API_URL;

    return (
        <AffiliateInvite 
            countryCode={countryCode} 
            partnerId={partner.id} 
            utmCampaign={utmCampaign}
            dubId={dubId}
            JAMBLE_API_URL={JAMBLE_API_URL}
        />
    );
}