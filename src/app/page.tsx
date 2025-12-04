import SmartBanner from "@/components/SmartAppBanner";
import { getCountryCode } from "@/lib/location";

export default async function HomePage() {
  const countryCode = await getCountryCode();
  const iframeSrc =
    countryCode === "BR" ? "/homepage-br.html" : "/homepage.html";

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <a
        href="https://lestudioslingshot.fr/"
        className="w-full h-12 rounded-full text-xl bg-[#7E53F8] text-white flex justify-center items-center"
      >
        "alreadyClaimedButton"
      </a>
      <iframe
        src={iframeSrc}
        style={{ width: "100%", height: "100%", border: "none" }}
      />
    </div>
  );
}
