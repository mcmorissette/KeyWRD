"use client";

import Link from "next/link";
import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      callback: (token: string) => void;
      "expired-callback": () => void;
      theme: "light";
    },
  ) => string;
  remove?: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export function OpenContactButton({
  className,
  children,
  reason = "",
}: {
  className?: string;
  children: ReactNode;
  reason?: string;
}) {
  return (
    <button
      className={className}
      type="button"
      onClick={() =>
        window.dispatchEvent(
          new CustomEvent("keywrd:open-contact", { detail: { reason } }),
        )
      }
    >
      {children}
    </button>
  );
}

export function OpenContactLink({
  className,
  children,
  ariaLabel,
}: {
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  return (
    <a
      className={className}
      href="#contact"
      aria-label={ariaLabel}
      onClick={() =>
        window.dispatchEvent(
          new CustomEvent("keywrd:open-contact", { detail: { reason: "" } }),
        )
      }
    >
      {children}
    </a>
  );
}

export default function ContactForm() {
  const [selectedReason, setSelectedReason] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstileRendered = useRef(false);
  const turnstileSiteKey =
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
    (process.env.NODE_ENV === "development" ? "1x00000000000000000000AA" : undefined);

  useEffect(() => {
    const openContact = (event: Event) => {
      const detail = (event as CustomEvent<{ reason?: string }>).detail;
      setSelectedReason(detail?.reason || "");
      setStatus("idle");
      setError("");
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => document.getElementById("contact-name")?.focus(), 500);
    };
    window.addEventListener("keywrd:open-contact", openContact);
    return () => window.removeEventListener("keywrd:open-contact", openContact);
  }, []);

  useEffect(() => {
    if (!turnstileSiteKey || turnstileRendered.current) return;

    const renderTurnstile = () => {
      if (!window.turnstile || !turnstileRef.current || turnstileRendered.current) return;
      window.turnstile.render(turnstileRef.current, {
        sitekey: turnstileSiteKey,
        theme: "light",
        callback: setTurnstileToken,
        "expired-callback": () => setTurnstileToken(""),
      });
      turnstileRendered.current = true;
    };

    if (window.turnstile) {
      renderTurnstile();
      return;
    }

    const existingScript = document.getElementById("cloudflare-turnstile");
    if (existingScript) {
      existingScript.addEventListener("load", renderTurnstile, { once: true });
      return () => existingScript.removeEventListener("load", renderTurnstile);
    }

    const script = document.createElement("script");
    script.id = "cloudflare-turnstile";
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.addEventListener("load", renderTurnstile, { once: true });
    document.head.appendChild(script);
  }, [turnstileSiteKey]);

  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, turnstileToken }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || "Unable to send your request.");
      form.reset();
      setStatus("sent");
    } catch (requestError) {
      setStatus("error");
      setError(requestError instanceof Error ? requestError.message : "Unable to send your request.");
    }
  }

  return (
    <section className="contact-section" id="contact">
      <div className="container contact-layout">
        <div className="contact-intro">
          <p className="eyebrow">Your next step</p>
          <h2>Ready to take your advertising performance to the next level?</h2>
          <p>Tell us what you need. KeyWRD will review your message and follow up directly—no email application required.</p>
          <div className="contact-points">
            <span>✓ No commitment required</span>
            <span>✓ Clear, direct recommendations</span>
            <span>✓ Your information stays private</span>
          </div>
        </div>

        <div className="contact-card">
          {status === "sent" ? (
            <div className="follow-up-success">
              <span>✓</span>
              <h3>Request received</h3>
              <p>Thank you. KeyWRD will follow up at the email address you provided.</p>
              <button className="button" type="button" onClick={() => setStatus("idle")}>Send another message</button>
            </div>
          ) : (
            <>
              <p className="contact-card-kicker">Contact KeyWRD</p>
              <h3>Tell us how we can help</h3>
              <form className="follow-up-form" onSubmit={submitContact}>
                <label><span className="field-label">Reason for contacting us <b>*</b></span>
                  <select name="reason" value={selectedReason} onChange={(event) => setSelectedReason(event.target.value)} required>
                    <option value="" disabled>Select a reason</option>
                    <option value="General inquiry">General inquiry</option>
                    <option value="Free Performance Audit">Free Performance Audit</option>
                    <option value="Campaign management">Campaign management</option>
                    <option value="ClickSensei">ClickSensei</option>
                  </select>
                </label>
                <div className="follow-up-row">
                  <label><span className="field-label">Name <b>*</b></span><input id="contact-name" name="name" required maxLength={100} autoComplete="name" /></label>
                  <label><span className="field-label">Email <b>*</b></span><input name="email" type="email" required maxLength={180} autoComplete="email" /></label>
                </div>
                <div className="follow-up-row">
                  <label><span className="field-label">Company</span><input name="company" maxLength={140} autoComplete="organization" /></label>
                  <label><span className="field-label">Website</span><input name="website" type="url" maxLength={240} placeholder="https://" /></label>
                </div>
                <label><span className="field-label">Current monthly advertising budget</span>
                  <select name="budget" defaultValue="">
                    <option value="">Select a range</option>
                    <option value="Under $2,500">Under $2,500</option>
                    <option value="$2,500–$5,000">$2,500–$5,000</option>
                    <option value="$5,000–$10,000">$5,000–$10,000</option>
                    <option value="$10,000–$25,000">$10,000–$25,000</option>
                    <option value="$25,000+">$25,000+</option>
                  </select>
                </label>
                <label><span className="field-label">What would you like to discuss? <b>*</b></span>
                  <textarea name="message" required maxLength={2000} rows={4}></textarea>
                </label>
                <label className="follow-up-honeypot" aria-hidden="true">Fax<input name="companyFax" tabIndex={-1} autoComplete="off" /></label>
                {turnstileSiteKey ? <div className="turnstile-box" ref={turnstileRef}></div> : <p className="turnstile-note">Spam protection will be enabled for launch.</p>}
                {status === "error" && <p className="form-error" role="alert">{error}</p>}
                <p className="follow-up-consent">By sending this form, you agree that KeyWRD may use these details to respond. See our <Link href="/privacy" scroll>Privacy Policy</Link>.</p>
                <button className="button contact-submit" type="submit" disabled={status === "sending" || Boolean(turnstileSiteKey && !turnstileToken)}>
                  {status === "sending" ? "Sending…" : "Send message"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
