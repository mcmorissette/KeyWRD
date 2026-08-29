type ContactRequest = {
  name?: string;
  reason?: string;
  email?: string;
  company?: string;
  website?: string;
  budget?: string;
  message?: string;
  companyFax?: string;
  conversationSummary?: string;
  turnstileToken?: string;
};

const contactRequestsByIp = new Map<string, { count: number; resetAt: number }>();

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" };
    return entities[character];
  });
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const current = contactRequestsByIp.get(ip);
  if (!current || current.resetAt < now) {
    contactRequestsByIp.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return false;
  }
  current.count += 1;
  return current.count > 5;
}

async function verifyTurnstile(token: string, ip: string) {
  const secret =
    process.env.TURNSTILE_SECRET_KEY ||
    (process.env.NODE_ENV !== "production" ? "1x0000000000000000000000000000000AA" : undefined);
  if (!secret) return false;
  if (!token) return false;

  const formData = new FormData();
  formData.set("secret", secret);
  formData.set("response", token);
  if (ip !== "local") formData.set("remoteip", ip);

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: formData,
  });
  const result = (await response.json()) as { success?: boolean };
  return Boolean(result.success);
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (isRateLimited(ip)) {
    return Response.json({ error: "Too many requests were sent. Please try again later." }, { status: 429 });
  }

  try {
    const body = (await request.json()) as ContactRequest;
    if (body.companyFax) return Response.json({ ok: true });

    const name = body.name?.trim().slice(0, 100) || "";
    const reason = body.reason?.trim().slice(0, 100) || "General inquiry";
    const email = body.email?.trim().slice(0, 180) || "";
    const company = body.company?.trim().slice(0, 140) || "Not provided";
    const website = body.website?.trim().slice(0, 240) || "Not provided";
    const budget = body.budget?.trim().slice(0, 100) || "Not provided";
    const message = body.message?.trim().slice(0, 2000) || "";
    const summary = body.conversationSummary?.trim().slice(0, 6000) || "No chat history provided.";

    if (!name || !isValidEmail(email) || !message) {
      return Response.json({ error: "Please complete the required fields with a valid email address." }, { status: 400 });
    }

    if (!(await verifyTurnstile(body.turnstileToken || "", ip))) {
      return Response.json({ error: "Spam protection could not be verified. Please try again." }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;
    const toEmail = process.env.CONTACT_TO_EMAIL || "mc@keywrd.ca";
    if (!resendApiKey || !fromEmail) {
      return Response.json({ error: "The follow-up form is being connected. Please try again soon." }, { status: 503 });
    }

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `KeyWRD Website <${fromEmail}>`,
        to: [toEmail],
        reply_to: email,
        subject: `${reason} — ${name}`,
        html: `
          <h2>New KeyWRD follow-up request</h2>
          <p><strong>Reason:</strong> ${escapeHtml(reason)}</p>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Company:</strong> ${escapeHtml(company)}</p>
          <p><strong>Website:</strong> ${escapeHtml(website)}</p>
          <p><strong>Monthly advertising budget:</strong> ${escapeHtml(budget)}</p>
          <h3>What they would like to discuss</h3>
          <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
          <h3>Recent conversation</h3>
          <p>${escapeHtml(summary).replace(/\n/g, "<br>")}</p>
        `,
      }),
    });

    if (!resendResponse.ok) {
      console.error("Contact email request failed", resendResponse.status);
      return Response.json({ error: "Your request could not be sent right now. Please try again." }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Your request could not be processed." }, { status: 400 });
  }
}
