// ---------------------------------------------------------------------------
// All editable clinic content lives here. Change text/numbers in this file
// only — none of the page or component files need to be touched.
// ---------------------------------------------------------------------------

export const CLINIC = {
  name: "Anupama Dental Clinic By Dr. Kamal Mohapatra",
  doctor: "Dr. Kamal Mohapatra",
  tagline: "Painless wisdom tooth removal, done with a curved-root technique",
  phones: ["7606919322", "8895600706"],
  whatsapp: "7606919322",
  email: "kamalmohapatra5546@gmail.com",
  address: "Udala, Ward No. 03 (Near Indian Oil), Mayurbhanj, Odisha",
};

export interface Service {
  en: string;
  od: string;
  slug: string;
}

export const SERVICES: Service[] = [
  { en: "Tooth Extraction", od: "ଦାନ୍ତ ଉପାଡ଼ିବା", slug: "wisdom-tooth-extraction" },
  { en: "Dental Check-up", od: "ଦାନ୍ତ ପରୀକ୍ଷା", slug: "general-checkup-cleaning" },
  { en: "Root Canal Treatment (RCT)", od: "ରୁଟ୍‌ କେନାଲ୍‌", slug: "root-canal-treatment" },
  { en: "Dental X-Ray", od: "ଦାନ୍ତ ଏକ୍ସ-ରେ", slug: "dental-xray" },
  { en: "Orthodontic Treatment", od: "ବାଙ୍କାଟେଢ଼ା ଦାନ୍ତ ଠିକ୍‌ କରିବା", slug: "braces-orthodontics" },
  { en: "Scaling & Bleaching", od: "ଦାନ୍ତ ସଫା କରିବା", slug: "teeth-whitening" },
  { en: "Crown, Bridge & Implant", od: "କୃତ୍ରିମ ଦାନ୍ତ ଲଗାଇବା", slug: "crowns-bridges" },
  { en: "Tooth Filling (Normal, Cosmetic)", od: "ଦାନ୍ତ ପିଙ୍ଗ", slug: "dental-fillings" },
];

export const STATS: { value: string; label: string }[] = [
  { value: "3,000+", label: "patients treated" },
  { value: "8", label: "services under one roof" },
  { value: "0", label: "avoidable pain, by design" },
];

export const WISDOM_POINTS: string[] = [
  "Digital X-ray mapping before every extraction",
  "Local anaesthesia tuned to the individual patient",
  "Clear aftercare instructions, in Odia or English",
];


export const HOURS: { day: string; time: string }[] = [
  { day: "Mon – Sat", time: "8:30 AM – 8:30 PM" },
  { day: "Sunday", time: "By appointment" },
];

export const NAV_LINKS: { to: string; label: string }[] = [
  { to: "/", label: "Home" },
  { to: "/about-us", label: "About Us" },
  { to: "/Treatments", label: "Treatments" },
  { to: "/Gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

export const whatsappLink = (message?: string) =>
  `https://wa.me/91${CLINIC.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

export const telLink = (phone: string) => `tel:+91${phone}`;
export interface FAQ {
  question: string;
  answer: string;
}

export const FAQS: FAQ[] = [
  {
    question: "What treatments do you offer at Anupama Dental Clinic?",
    answer:
      "We offer eight core services under one roof — tooth extraction, dental check-ups, root canal treatment, digital X-rays, orthodontic treatment, scaling & bleaching, crowns/bridges/implants, and tooth filling (including cosmetic).",
  },
  {
    question: "Is wisdom tooth removal really painless?",
    answer:
      "We use a curved-root extraction technique paired with digital X-ray mapping and anaesthesia tuned to each patient, so most patients report minimal discomfort during and after the procedure.",
  },
  {
    question: "How often should I come in for a check-up?",
    answer:
      "We recommend a dental check-up every six months. Regular visits catch issues early and keep cleanings on schedule.",
  },
  {
    question: "Do you explain treatment in Odia or English?",
    answer:
      "Both. Every treatment plan and aftercare instruction is explained clearly in Odia or English, whichever you're comfortable with.",
  },
  {
    question: "How do I book an appointment?",
    answer:
      `Call us at +91 ${CLINIC.phones[0]} or +91 ${CLINIC.phones[1]}, or message us directly on WhatsApp and our team will confirm a slot.`,
  },
  {
    question: "What are your clinic hours?",
    answer:
      "We're open Monday to Saturday, 8:30 AM to 8:30 PM. Sunday visits are available by appointment only.",
  },
];
// FAQs specific to the Treatments page — one per service, plus a few
// clinic-wide questions. Kept separate from FAQS so other pages are unaffected.
export const TREATMENT_FAQS: FAQ[] = [
  // --- One FAQ per service, in the same order as SERVICES -----------------
  {
    question: "When is a tooth extraction really necessary?",
    answer:
      "We only recommend extraction when a tooth is too damaged, infected, or crowded to save — for example with severe decay, advanced gum disease, or an impacted wisdom tooth. Wherever possible, we look at a root canal or filling first.",
  },
  {
    question: "What happens during a routine dental check-up?",
    answer:
      "A check-up covers a full oral examination, a plaque and tartar assessment, and a digital X-ray if needed — so cavities, gum issues, or bite problems get caught early, before they turn into bigger treatment.",
  },
  {
    question: "Is root canal treatment as painful as people say?",
    answer:
      "Not with the technique we use. The area is fully numbed before we start, so most patients feel mild pressure at most — the procedure actually removes the source of the pain rather than causing it.",
  },
  {
    question: "Why do I need an X-ray before treatment?",
    answer:
      "A digital X-ray lets us see what's happening below the gumline — bone level, root position, hidden decay — so extractions, root canals, and implants are planned precisely instead of guessed at.",
  },
  {
    question: "Can crooked or misaligned teeth be fixed at any age?",
    answer:
      "Yes. We assess bite and spacing for both children and adults, then recommend the right orthodontic option — braces or aligners — based on how the teeth and jaw are set.",
  },
  {
    question: "What's the difference between scaling and bleaching?",
    answer:
      "Scaling removes hardened plaque and tartar buildup below the gumline for healthier gums. Bleaching is a separate cosmetic step that lightens surface staining. Many patients do both in the same visit.",
  },
  {
    question: "How do I know if I need a crown, bridge, or implant?",
    answer:
      "It depends on the tooth: a crown caps a weakened tooth, a bridge replaces one or two missing teeth using the neighbouring teeth as anchors, and an implant replaces a missing tooth root entirely. We'll recommend the right fit after an exam.",
  },
  {
    question: "Do you offer tooth-colored fillings, or only silver ones?",
    answer:
      "Both — standard fillings as well as cosmetic, tooth-colored composite fillings that blend naturally with the rest of your smile. The choice is yours.",
  },

  // --- Clinic-wide questions that don't map to a single service -----------
  {
    question: "Is wisdom tooth removal really painless?",
    answer:
      "We use a curved-root extraction technique paired with digital X-ray mapping and anaesthesia tuned to each patient, so most people report minimal discomfort during and after the procedure.",
  },
  {
    question: "Do you explain treatment in Odia or English?",
    answer:
      "Both. Every treatment plan and aftercare instruction is explained clearly in Odia or English, whichever you're comfortable with.",
  },
  {
    question: "How do I book an appointment?",
    answer:
      `Call us at +91 ${CLINIC.phones[0]} or +91 ${CLINIC.phones[1]}, or message us directly on WhatsApp and our team will confirm a slot.`,
  },
  {
    question: "What are your clinic hours?",
    answer:
      "We're open Monday to Saturday, 8:30 AM to 8:30 PM. Sunday visits are available by appointment only.",
  },
];