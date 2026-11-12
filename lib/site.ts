// Company details used across the site, the WhatsApp button and the emails.
// Replace the placeholders with the real details.
export const site = {
  name: "Neshell Developers",
  tagline: "Building Today, Creating Tomorrow",
  phone: { display: "024 854 5088", href: "tel:+233248545088" },
  // Digits only, including the country code (233) and without the leading 0
  whatsapp: "233248545088",
  whatsappMessage: "Hello Neshell Developers, I'd like to enquire about building with you.",
  email: "neshelldevelopers5450@gmail.com",
  address: "Office address, Accra, Ghana",
  hours: "Mon – Fri 8:00 – 17:00, Sat 9:00 – 13:00",
};

export const whatsappLink = (message = site.whatsappMessage) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
