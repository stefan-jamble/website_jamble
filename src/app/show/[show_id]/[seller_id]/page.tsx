import SharedShow from "./SharedShow";
import { getCountryCode } from "@/lib/location";
import { headers } from "next/headers";

interface PageProps {
    params: {
        show_id: string;
        seller_id: string;
    };
}

interface ShowData {
    id: string;
    title: string;
    description: string;
    starting_at: string;
    cover_image: { original_url: string};
    bookmark_count: number;
}

interface ProfileData {
    id: string;
    username: string;
    profile_image: { original_url: string };
}

async function fetchShowAndProfile(show_id: string, seller_id: string) {
    const headers = {
        Authorization: "Bearer ca9d3151-ebdd-4902-8a61-63a2564838ce",
        "Content-Type": "application/json",
    };
  
    const [showRes, profileRes] = await Promise.all([
        fetch(
            "https://jamble-backend-test-us-576189464787.us-central1.run.app/show/get_show",
            {
                method: "POST",
                headers,
                body: JSON.stringify({ show_id, seller_id }),
                cache: "no-store",
            }
        ).then((r) => r.json()),
        fetch(
            "https://jamble-backend-test-us-576189464787.us-central1.run.app/profile/get_profile",
            {
                method: "POST",
                headers,
                body: JSON.stringify({ profile_id: seller_id }),
                cache: "no-store",
            }
        ).then((r) => r.json()),
    ]);
  
    if (!showRes.success) throw new Error("Failed to fetch show");
    if (!profileRes.success) throw new Error("Failed to fetch profile");
  
    return {
        show: showRes.payload.show as ShowData,
        profile: profileRes.payload.profile as ProfileData,
    };
}

export default async function SharedShowPage({ params }: PageProps) {
    const { show_id, seller_id } = await params;

    let show, profile;
    try {
        ({ show, profile } = await fetchShowAndProfile(show_id, seller_id));
    } catch (err) {
        return <div>Error loading show: {(err as Error).message}</div>;
    }
  
    const incomingHeaders = await headers();
    const countryCode = incomingHeaders.get("x-vercel-ip-country") || "Unknown";
  
    return <SharedShow show={show} profile={profile} countryCode={countryCode} />;
}