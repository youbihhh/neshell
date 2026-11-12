"use client";

import { useActionState, useState } from "react";
import { useSearchParams } from "next/navigation";
import { sendEnquiry, type ContactState } from "../../app/contact/actions";
import { enquiryOptions, HOUSE_DESIGN } from "../../lib/services";
import Icon from "../Icon";

type DesignOption = { slug: string; name: string };
type Defaults = { service?: string; design?: string };

const serviceOptions = enquiryOptions();

const initialState: ContactState = { status: "idle" };

const inputClass =
  "w-full border border-zinc-300 bg-white px-4 py-3.5 text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-orange focus:ring-2 focus:ring-orange/20";

function Field({
  label,
  htmlFor,
  required,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold text-zinc-800">
        {label}
        {required && <span className="text-orange"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm({ designs, defaults }: { designs: DesignOption[]; defaults: Defaults }) {
  const [state, formAction, pending] = useActionState(sendEnquiry, initialState);
  const knownDesign = designs.some((d) => d.slug === defaults.design);
  const [service, setService] = useState(
    knownDesign ? HOUSE_DESIGN : (defaults.service ?? ""),
  );
  const errors = state.errors ?? {};

  return (
    <form action={formAction} noValidate className="space-y-6">
      {state.status !== "idle" && (
        <p
          role="status"
          className={`flex items-start gap-3 border px-5 py-4 ${
            state.status === "success"
              ? "border-green-600/30 bg-green-50 text-green-800"
              : "border-red-600/30 bg-red-50 text-red-800"
          }`}
        >
          <Icon name={state.status === "success" ? "check" : "alert"} className="mt-0.5 h-5 w-5 shrink-0" />
          {state.message}
        </p>
      )}

      {/* Honeypot for spam bots — hidden from people and screen readers */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Full name" htmlFor="name" required error={errors.name}>
          <input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Your full name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputClass}
          />
        </Field>
        <Field label="Email" htmlFor="email" required error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClass}
          />
        </Field>
        <Field label="Phone / WhatsApp" htmlFor="phone">
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+233 ..."
            className={inputClass}
          />
        </Field>
        <Field label="Country you live in" htmlFor="country">
          <input
            id="country"
            name="country"
            autoComplete="country-name"
            placeholder="e.g. Ghana, UK, USA"
            className={inputClass}
          />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="What are you interested in?" htmlFor="service">
          <select
            id="service"
            name="service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className={inputClass}
          >
            <option value="">Choose an option</option>
            {serviceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        {service === HOUSE_DESIGN && (
          <Field label="Which design?" htmlFor="design">
            <select
              id="design"
              name="design"
              defaultValue={knownDesign ? defaults.design : ""}
              className={inputClass}
            >
              <option value="">Not sure yet</option>
              {designs.map((design) => (
                <option key={design.slug} value={design.slug}>
                  {design.name}
                </option>
              ))}
            </select>
          </Field>
        )}
      </div>

      <Field label="Tell us about your project" htmlFor="message" required error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder="Where is your land, what would you like to build, and when would you like to start?"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${inputClass} resize-y`}
        />
      </Field>

      <button
        type="submit"
        disabled={pending}
        className="group inline-flex w-full items-center justify-center gap-3 bg-orange px-8 py-4 font-semibold text-white transition-colors hover:bg-orange-dim disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {pending ? "Sending..." : "Send enquiry"}
        <Icon name="send" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
      </button>
    </form>
  );
}

// Reads ?service= and ?design= so "Enquire" buttons across the site pre-fill the form
export function PrefilledContactForm({ designs }: { designs: DesignOption[] }) {
  const params = useSearchParams();
  return (
    <ContactForm
      designs={designs}
      defaults={{
        service: params.get("service") ?? undefined,
        design: params.get("design") ?? undefined,
      }}
    />
  );
}
