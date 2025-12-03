import SmartBanner from "@/components/SmartAppBanner";

export default function HomePage() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <SmartBanner
        appName="Jamble"
        appStoreUrl="https://apps.apple.com/app/id123456789"
        playStoreUrl="https://play.google.com/store/apps/details?id=com.example.app"
        delay={500}
      />
      
      <iframe
        src="/homepage.html"
        style={{ width: "100%", height: "100%", border: "none" }}
      />
    </div>
  );
}
