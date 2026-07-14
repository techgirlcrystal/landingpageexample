import { useState, type CSSProperties, type FormEvent } from "react";

const GHL_WEBHOOK =
  "https://services.leadconnectorhq.com/hooks/SExrCpOt0a5qhRgOfcA2/webhook-trigger/153de2c2-f476-429c-a49a-7dda97ed7067";

const NAVY = "#071A52";
const ORANGE = "#F26A21";
const PLUM = "#6B2D5C";
const CREAM = "#FAF5EE";
const PINK = "#E96C9A";
const SANS = "'Inter', 'Helvetica Neue', Arial, system-ui, sans-serif";

export default function SassySignupForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim()) {
      setErrorMsg("Please fill in every field so we can send you your skill.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch(GHL_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          full_name: `${firstName.trim()} ${lastName.trim()}`,
          email: email.trim(),
          phone: phone.trim(),
          source: "Sassy Skill Landing Page",
        }),
      });
      if (!res.ok) throw new Error(`Webhook failed (${res.status})`);
      setStatus("success");
      setFirstName(""); setLastName(""); setEmail(""); setPhone("");
    } catch (err) {
      console.error(err);
      setErrorMsg("Something didn't send. Check your connection and try again.");
      setStatus("error");
    }
  }

  const label: CSSProperties = {
    display: "block", fontFamily: SANS, fontSize: "0.75rem", fontWeight: 700,
    letterSpacing: "0.18em", textTransform: "uppercase", color: PLUM, marginBottom: "0.4rem",
  };
  const input: CSSProperties = {
    width: "100%", padding: "0.85rem 1rem", fontFamily: SANS, fontSize: "1rem",
    color: NAVY, background: "#fff", border: `1.5px solid rgba(107,45,92,0.25)`,
    borderRadius: "10px", outline: "none", boxSizing: "border-box",
  };
  const field: CSSProperties = { marginBottom: "1.1rem" };

  return (
    <section
      id="sassy-signup"
      style={{
        background: `radial-gradient(120% 100% at 50% 0%, ${CREAM} 0%, #F3ECF7 60%, #E8DCF0 100%)`,
        padding: "6rem 1.5rem", fontFamily: SANS,
      }}
    >
      <div style={{ maxWidth: "480px", margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.24em",
          textTransform: "uppercase", color: ORANGE, margin: "0 0 1rem" }}>
          Free Sassy Skill
        </p>
        <h2 style={{ fontFamily: SANS, fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
          fontWeight: 900, lineHeight: 1.15, color: PLUM, margin: "0 0 0.75rem",
          letterSpacing: "-0.01em" }}>
          Download My Sassy Skill
        </h2>
        <p style={{ color: NAVY, opacity: 0.75, fontSize: "1rem", lineHeight: 1.6, margin: "0 0 2rem" }}>
          Drop your info below and we'll send it straight to your inbox.
        </p>

        {status === "success" ? (
          <div style={{ background: "#fff", border: `1.5px solid ${ORANGE}`,
            borderRadius: "14px", padding: "2rem 1.5rem", color: PLUM,
            fontSize: "1.05rem", lineHeight: 1.6, fontWeight: 600 }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>✨</div>
            You're in! Check your email in the next few minutes — your Sassy Skill is on the way.
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
            <div style={field}>
              <label htmlFor="firstName" style={label}>First Name</label>
              <input id="firstName" type="text" required autoComplete="given-name"
                value={firstName} onChange={(e) => setFirstName(e.target.value)} style={input} />
            </div>
            <div style={field}>
              <label htmlFor="lastName" style={label}>Last Name</label>
              <input id="lastName" type="text" required autoComplete="family-name"
                value={lastName} onChange={(e) => setLastName(e.target.value)} style={input} />
            </div>
            <div style={field}>
              <label htmlFor="email" style={label}>Email</label>
              <input id="email" type="email" required autoComplete="email"
                value={email} onChange={(e) => setEmail(e.target.value)} style={input} />
            </div>
            <div style={field}>
              <label htmlFor="phone" style={label}>Phone (required)</label>
              <input id="phone" type="tel" required autoComplete="tel"
                placeholder="(555) 555-5555"
                value={phone} onChange={(e) => setPhone(e.target.value)} style={input} />
            </div>
            {status === "error" && (
              <p style={{ color: PINK, fontSize: "0.9rem", margin: "0 0 1rem", fontWeight: 600 }}>
                {errorMsg}
              </p>
            )}
            <button type="submit" disabled={status === "loading"}
              style={{
                width: "100%", padding: "1.1rem 1.5rem",
                background: status === "loading" ? "#c5865f" : ORANGE,
                color: "#fff", fontFamily: SANS, fontSize: "1rem", fontWeight: 800,
                letterSpacing: "0.14em", textTransform: "uppercase", border: "none",
                borderRadius: "12px", cursor: status === "loading" ? "wait" : "pointer",
                boxShadow: "0 8px 24px rgba(242,106,33,0.35)",
              }}>
              {status === "loading" ? "Sending..." : "Download My Sassy Skill"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}