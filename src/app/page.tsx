import SmartBanner from "@/components/SmartAppBanner";
import { getCountryCode } from "@/lib/location";

export default async function HomePage() {
  const countryCode = await getCountryCode();
  const iframeSrc =
    countryCode === "BR" ? "/homepage-br.html" : "/homepage-br.html";

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <SmartBanner
        appName="Jamble"
        appStoreUrl="https://apps.apple.com/app/id123456789"
        playStoreUrl="https://play.google.com/store/apps/details?id=com.example.app"
        delay={500}
      />

      <iframe
        src={iframeSrc}
        style={{ width: "100%", height: "100%", border: "none" }}
      />
    </div>
  );
}
