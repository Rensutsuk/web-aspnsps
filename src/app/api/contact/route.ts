import { NextResponse } from "next/server";

type ContactRequestBody = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const body = (await request.json()) as ContactRequestBody;

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const subject = body.subject?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ success: false, error: "All required fields must be completed." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ success: false, error: "Please provide a valid email address." }, { status: 400 });
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    return NextResponse.json(
      { success: false, error: "Contact form is not configured yet. Please try again later." },
      { status: 500 },
    );
  }

  const upstreamResponse = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      access_key: accessKey,
      name,
      email,
      subject,
      message,
    }),
  });

  const upstreamResult = (await upstreamResponse.json().catch(() => null)) as
    | { success?: boolean; message?: string }
    | null;

  if (!upstreamResponse.ok || !upstreamResult?.success) {
    return NextResponse.json(
      {
        success: false,
        error: upstreamResult?.message || "Unable to send your message right now. Please try again later.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    success: true,
    data: {
      message: "Your message has been sent successfully.",
    },
  });
}

