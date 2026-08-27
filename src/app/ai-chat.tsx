"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";

type ChatMessage = { role: "user" | "assistant"; content: string; offerContact?: boolean };
type DailyUsage = { count: number; resetAt: number };

const AI_DAILY_LIMIT = 10;
const DAY_IN_MS = 24 * 60 * 60 * 1000;
const USAGE_KEY = "keywrd-ai-usage-v1";
const VISITOR_KEY = "keywrd-ai-visitor-v1";

const welcomeMessage: ChatMessage = {
  role: "assistant",
  content: "Hi, I’m the KeyWRD AI assistant. I can answer questions about our advertising services, process, performance audits, and ClickSensei. What would you like to know?",
};

const storedAnswers: Record<string, string> = {
  "What services does KeyWRD offer?": "KeyWRD provides paid search and paid social advertising, campaign management, audience and channel strategy, conversion tracking and analytics, plus remarketing and video advertising. Every recommendation is shaped around your audience, offer, market, and business goals.",
  "How does the free performance audit work?": "KeyWRD reviews your current advertising account, market, competitors, and opportunities to identify where performance can improve. You receive clear initial recommendations with no commitment. Use the contact form to share your website and current situation so the review can be tailored to your business.",
  "What is the ClickSensei advantage?": "ClickSensei is the performance technology used in the KeyWRD workflow. It creates a clearer view of campaign performance, identifies optimization opportunities faster, and helps turn data into stronger priorities. It supports expert strategy rather than replacing human judgment.",
  "Which advertising platforms can you manage?": "KeyWRD can build strategies across search, social, display, remarketing, and video advertising. The right platform mix depends on where your audience is, how customers buy, and which channels are most likely to support your goals.",
};

const starters = Object.keys(storedAnswers);

function newVisitorId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
}

function currentTimestamp() {
  return Date.now();
}

function loadUsage(): DailyUsage {
  const fallback = { count: 0, resetAt: Date.now() + DAY_IN_MS };
  try {
    const saved = JSON.parse(localStorage.getItem(USAGE_KEY) || "null") as DailyUsage | null;
    if (!saved || typeof saved.count !== "number" || typeof saved.resetAt !== "number") return fallback;
    return saved.resetAt <= Date.now() ? fallback : saved;
  } catch {
    return fallback;
  }
}

function ChatContactForm({ onBack }: { onBack: () => void }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || (process.env.NODE_ENV === "development" ? "1x00000000000000000000AA" : undefined);

  useEffect(() => {
    if (!turnstileSiteKey) return;
    const renderTurnstile = () => {
      if (!window.turnstile || !turnstileRef.current || widgetIdRef.current) return;
      widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
        sitekey: turnstileSiteKey,
        theme: "light",
        callback: setTurnstileToken,
        "expired-callback": () => setTurnstileToken(""),
      });
    };
    if (window.turnstile) renderTurnstile();
    else {
      const script = document.getElementById("cloudflare-turnstile");
      script?.addEventListener("load", renderTurnstile, { once: true });
      return () => script?.removeEventListener("load", renderTurnstile);
    }
    return () => {
      if (widgetIdRef.current) window.turnstile?.remove?.(widgetIdRef.current);
      widgetIdRef.current = null;
    };
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
    <div className="follow-up-view">
      <button className="chat-back" type="button" onClick={onBack}>← Back to chat</button>
      {status === "sent" ? (
        <div className="follow-up-success">
          <span>✓</span><h3>Message received</h3>
          <p>Thank you. KeyWRD will follow up at the email address you provided.</p>
          <button className="button" type="button" onClick={onBack}>Return to chat</button>
        </div>
      ) : (
        <>
          <h3>Contact KeyWRD</h3><p>Tell us how we can help.</p>
          <form className="follow-up-form" onSubmit={submitContact}>
            <label><span className="field-label">Reason for contacting us <b>*</b></span><select name="reason" defaultValue="" required><option value="" disabled>Select a reason</option><option value="General inquiry">General inquiry</option><option value="Free Performance Audit">Free Performance Audit</option><option value="Campaign management">Campaign management</option><option value="ClickSensei">ClickSensei</option></select></label>
            <div className="follow-up-row">
              <label><span className="field-label">Name <b>*</b></span><input name="name" required maxLength={100} autoComplete="name" /></label>
              <label><span className="field-label">Email <b>*</b></span><input name="email" type="email" required maxLength={180} autoComplete="email" /></label>
            </div>
            <div className="follow-up-row">
              <label><span className="field-label">Company</span><input name="company" maxLength={140} autoComplete="organization" /></label>
              <label><span className="field-label">Website</span><input name="website" type="url" maxLength={240} placeholder="https://" /></label>
            </div>
            <label><span className="field-label">Current monthly advertising budget</span><select name="budget" defaultValue=""><option value="">Select a range</option><option value="Under $2,500">Under $2,500</option><option value="$2,500–$5,000">$2,500–$5,000</option><option value="$5,000–$10,000">$5,000–$10,000</option><option value="$10,000–$25,000">$10,000–$25,000</option><option value="$25,000+">$25,000+</option></select></label>
            <label><span className="field-label">What would you like to discuss? <b>*</b></span><textarea name="message" required maxLength={2000} rows={4}></textarea></label>
            <label className="follow-up-honeypot" aria-hidden="true">Fax<input name="companyFax" tabIndex={-1} autoComplete="off" /></label>
            {turnstileSiteKey ? <div className="turnstile-box" ref={turnstileRef}></div> : <p className="turnstile-note">Spam protection will be enabled for launch.</p>}
            {status === "error" && <p className="form-error" role="alert">{error}</p>}
            <p className="follow-up-consent">By sending this form, you agree that KeyWRD may use these details to respond. See our <Link href="/privacy" scroll>Privacy Policy</Link>.</p>
            <div className="follow-up-actions"><button className="button" type="submit" disabled={status === "sending" || Boolean(turnstileSiteKey && !turnstileToken)}>{status === "sending" ? "Sending…" : "Send message"}</button><button type="button" onClick={onBack}>Cancel</button></div>
          </form>
        </>
      )}
    </div>
  );
}

export default function AiChat() {
  const [open, setOpen] = useState(false);
  const [invitationVisible, setInvitationVisible] = useState(true);
  const [view, setView] = useState<"chat" | "contact">("chat");
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [visitorId, setVisitorId] = useState("");
  const [usage, setUsage] = useState<DailyUsage>({ count: 0, resetAt: 0 });
  const messagesRef = useRef<HTMLDivElement>(null);
  const limitReached = usage.count >= AI_DAILY_LIMIT;

  useEffect(() => {
    const initialization = window.setTimeout(() => {
      let id = localStorage.getItem(VISITOR_KEY);
      if (!id) {
        id = newVisitorId();
        localStorage.setItem(VISITOR_KEY, id);
      }
      const currentUsage = loadUsage();
      localStorage.setItem(USAGE_KEY, JSON.stringify(currentUsage));
      setVisitorId(id);
      setUsage(currentUsage);
    }, 0);
    return () => window.clearTimeout(initialization);
  }, []);

  useEffect(() => {
    if (!open || view !== "chat") return;
    messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open, sending, view, limitReached]);

  useEffect(() => {
    if (!usage.resetAt || usage.resetAt <= currentTimestamp()) return;
    const reset = window.setTimeout(() => {
      const refreshed = { count: 0, resetAt: currentTimestamp() + DAY_IN_MS };
      localStorage.setItem(USAGE_KEY, JSON.stringify(refreshed));
      setUsage(refreshed);
    }, usage.resetAt - currentTimestamp());
    return () => window.clearTimeout(reset);
  }, [usage.resetAt]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  async function sendMessage(content: string) {
    const trimmed = content.trim();
    if (!trimmed || sending) return;
    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setInput("");
    setError("");
    const storedAnswer = storedAnswers[trimmed];
    if (storedAnswer) {
      setMessages([...nextMessages, { role: "assistant", content: storedAnswer }]);
      return;
    }
    if (limitReached || !visitorId) return;
    setMessages(nextMessages);
    setSending(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(-10), visitorId }),
      });
      const data = (await response.json()) as { message?: string; error?: string; code?: string; offerContact?: boolean };
      if (data.code === "daily_limit") {
        const reached = { count: AI_DAILY_LIMIT, resetAt: usage.resetAt || currentTimestamp() + DAY_IN_MS };
        setUsage(reached);
        localStorage.setItem(USAGE_KEY, JSON.stringify(reached));
        return;
      }
      if (!response.ok) throw new Error(data.error || "The assistant is unavailable right now.");
      setMessages((current) => [...current, { role: "assistant", content: data.message || "How else can I help?", offerContact: data.offerContact }]);
      const now = currentTimestamp();
      const updated = { count: usage.count + 1, resetAt: usage.resetAt > now ? usage.resetAt : now + DAY_IN_MS };
      setUsage(updated);
      localStorage.setItem(USAGE_KEY, JSON.stringify(updated));
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "The assistant is unavailable right now.");
    } finally {
      setSending(false);
    }
  }

  function submitMessage(event: FormEvent<HTMLFormElement>) { event.preventDefault(); void sendMessage(input); }

  return (
    <>
      {!open && invitationVisible && (
        <aside className="chat-invitation" aria-label="Ask KeyWRD invitation">
          <button className="chat-invitation-dismiss" type="button" aria-label="Dismiss chat invitation" onClick={() => setInvitationVisible(false)}>×</button>
          <strong>Ask KeyWRD</strong><p>Questions about advertising, audits, or ClickSensei? Ask our AI assistant.</p>
          <button className="chat-invitation-open" type="button" onClick={() => { setOpen(true); setInvitationVisible(false); }}>Start a conversation <span aria-hidden="true">→</span></button>
        </aside>
      )}
      {open && (
        <section className="chat-panel" aria-label={view === "chat" ? "Ask KeyWRD" : "Contact KeyWRD"}>
          <header className="chat-header"><div><strong>{view === "chat" ? "Ask KeyWRD" : "Contact KeyWRD"}</strong><span>{view === "chat" ? "AI assistant · Public information" : "Send us a message"}</span></div><button type="button" aria-label="Close chat" onClick={() => setOpen(false)}>×</button></header>
          {view === "contact" ? <ChatContactForm onBack={() => setView("chat")} /> : (
            <>
              <div className="chat-messages" ref={messagesRef} aria-live="polite">
                {messages.map((message, index) => (
                  <div className={`chat-message ${message.role}`} key={`${message.role}-${index}`}>
                    {message.content}
                    {message.offerContact && <button className="chat-contact-option" type="button" onClick={() => setView("contact")}>Contact KeyWRD →</button>}
                  </div>
                ))}
                {messages.length === 1 && <div className="chat-starters" aria-label="Suggested questions">{starters.map((starter) => <button type="button" key={starter} onClick={() => void sendMessage(starter)}>{starter}</button>)}</div>}
                {sending && <div className="chat-message chat-typing">KeyWRD is thinking…</div>}
                {error && <p className="form-error" role="alert">{error}</p>}
                {limitReached && <div className="chat-limit-card" role="status"><strong>You’ve reached today’s AI-question limit.</strong><p>Please continue through the contact form and KeyWRD will follow up directly.</p><button type="button" onClick={() => setView("contact")}>Contact KeyWRD →</button></div>}
              </div>
              <form className="chat-composer" onSubmit={submitMessage}><label className="sr-only" htmlFor="keywrd-chat-input">Ask KeyWRD a question</label><input id="keywrd-chat-input" value={input} maxLength={800} placeholder={limitReached ? "Daily limit reached" : "Ask a question…"} autoComplete="off" disabled={limitReached} onChange={(event) => setInput(event.target.value)} /><button type="submit" aria-label="Send question" disabled={!input.trim() || sending || limitReached}>↑</button></form>
              {!limitReached && <p className="chat-usage">{AI_DAILY_LIMIT - usage.count} custom AI {AI_DAILY_LIMIT - usage.count === 1 ? "question" : "questions"} remaining in this 24-hour period</p>}
              <p className="chat-disclaimer">AI can make mistakes. For general information only. <a href="/privacy">Privacy</a></p>
            </>
          )}
        </section>
      )}
      <button className="chat-launcher" type="button" aria-label={open ? "Close Ask KeyWRD" : "Open Ask KeyWRD"} aria-expanded={open} onClick={() => { setOpen((current) => !current); setInvitationVisible(false); }}><span className="chat-launcher-icon" aria-hidden="true">✦</span><span>{open ? "Close" : "Ask KeyWRD"}</span></button>
    </>
  );
}
