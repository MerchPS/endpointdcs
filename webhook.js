export default async function handler(req, res) {
  const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1364896709079203880/PJViC4-JrF2rTcUf2MU5bOaiwfatq0bA_YZL29277cHlhq2ArHdvBt155CY7U9BpLocb"; // Ganti dengan webhook aslimu

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const result = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    if (!result.ok) {
      const error = await result.text();
      console.error("Discord Error:", error);
      return res.status(500).json({ error: "Failed to forward to Discord" });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Proxy Error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
