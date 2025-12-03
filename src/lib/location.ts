export async function getCountryCode() {
  try {
    const res = await fetch("https://ipapi.co/json/", {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed");
    const data = await res.json();

    return data.country_code || "US";
  } catch (error) {
    console.error("Error fetching country code:", error);
    return "US";
  }
}


