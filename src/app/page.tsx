import SmartBanner from "@/components/SmartAppBanner";
import { getCountryCode } from "@/lib/location";

export default async function HomePage() {
  const countryCode = await getCountryCode();
  const iframeSrc =
    countryCode === "BR" ? "/homepage-br.html" : "/homepage.html";

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <iframe
        src={iframeSrc}
        style={{ width: "100%", height: "100%", border: "none" }}
      />
    </div>
  );
}
