import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../../lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Neshell Developers",
  description: "How Neshell Developers collects, uses and protects your information.",
};

// AdSense requires a privacy policy that explains its cookies (see "Advertising" below)
const sections: { title: string; body: React.ReactNode }[] = [
  {
    title: "Information we collect",
    body: (
      <p>
        When you send an enquiry through our contact form, we collect the details you give us: your
        name, email address, phone number (if provided), the service or house design you are
        interested in and your message. If you message us on WhatsApp, WhatsApp&apos;s own privacy
        policy applies to that conversation.
      </p>
    ),
  },
  {
    title: "How we use it",
    body: (
      <p>
        We use your details only to reply to your enquiry, send you a confirmation email and discuss
        your project. We do not sell or rent your personal information to anyone.
      </p>
    ),
  },
  {
    title: "Cookies and local storage",
    body: (
      <p>
        Our website stores a small note in your browser so the welcome animation only plays on your
        first visit. Our advertising partner, Google, also uses cookies as described below.
      </p>
    ),
  },
  {
    title: "Advertising",
    body: (
      <>
        <p>
          We use Google AdSense to show advertisements. Third-party vendors, including Google, use
          cookies to serve ads based on your previous visits to this website or other websites.
          Google&apos;s use of advertising cookies enables it and its partners to serve ads to you
          based on your visits to this and other sites on the Internet.
        </p>
        <p>
          You can opt out of personalised advertising by visiting{" "}
          <a href="https://adssettings.google.com" className="text-orange underline" target="_blank" rel="noreferrer">
            Google Ads Settings
          </a>{" "}
          or{" "}
          <a href="https://www.aboutads.info/choices" className="text-orange underline" target="_blank" rel="noreferrer">
            www.aboutads.info
          </a>
          . Learn more in{" "}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            className="text-orange underline"
            target="_blank"
            rel="noreferrer"
          >
            how Google uses information from sites that use its services
          </a>
          .
        </p>
      </>
    ),
  },
  {
    title: "Contact us",
    body: (
      <p>
        If you have any questions about this policy or want us to delete your details, email{" "}
        <a href={`mailto:${site.email}`} className="text-orange underline">
          {site.email}
        </a>{" "}
        or call <a href={site.phone.href} className="text-orange underline">{site.phone.display}</a>.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <main className="flex-1 bg-white text-zinc-900">
      <section className="bg-zinc-950 pb-16 pt-36 text-white">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-5 text-sm text-white/70">
            <Link href="/" className="transition-colors hover:text-orange">
              Home
            </Link>{" "}
            / <span className="text-white">Privacy Policy</span>
          </nav>
          <h1 className="text-4xl font-bold sm:text-5xl">Privacy Policy</h1>
          <span className="mt-6 block h-1 w-24 bg-orange" />
        </div>
      </section>

      <div className="mx-auto max-w-3xl space-y-12 px-6 py-20 leading-relaxed text-zinc-600 lg:px-8">
        {sections.map(({ title, body }) => (
          <section key={title} className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-900">{title}</h2>
            {body}
          </section>
        ))}
      </div>
    </main>
  );
}
