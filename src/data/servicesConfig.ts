export interface ServiceConfig {
  slug: string;
  title: string;
  tagline: string;
  heroDescription: string;
  image: string;
  bullets: string[];

  /** "What is [Service]" section */
  whatIs: {
    description: string;
    image: string;
    stats: { value: string; label: string }[];
  };

  /** "Types of [Service]" section */
  types: { title: string }[];

  whatsIncluded: { title: string; description: string }[];

  /** "Benefits of Choosing [Service] In Our Clinic" (dark section) */
  benefits: {
    intro: string;
    image: string;
    items: { title: string; description: string }[];
  };

  /** "Process of [Service]" — numbered steps (dark section) */
  process: { title: string; description: string }[];

  forWhom: { title: string; description: string }[];

  /** Reassurance / concern-specific checklist section */
  checklist: {
    title: string;
    description: string;
    image: string;
    points: string[];
  };

  faqs: { question: string; answer: string }[];
}

export const servicesConfig: ServiceConfig[] = [
  {
    slug: "general-checkup-cleaning",
    title: "General Checkup & Cleaning",
    tagline: "Routine care that catches problems before they start",
    heroDescription:
      "A thorough checkup and professional cleaning, recommended every six months, to keep your teeth and gums healthy and catch early signs of decay or gum disease.",
    image: "/dental-checkup.jpg",
    bullets: [
      "Full mouth examination with digital X-ray review",
      "Professional scaling and polishing",
      "Early detection of cavities and gum issues",
      "Personalised home-care advice",
    ],
    whatIs: {
      description:
        "A general checkup and cleaning is a routine dental visit that combines a full examination of your teeth, gums, and bite with a professional scaling and polishing session. Dr. Kamal reviews your oral health, checks for early signs of decay or gum disease, and removes plaque and tartar that brushing alone can't reach. It's the simplest, most effective way to keep small issues from becoming big ones, and to keep your smile feeling genuinely clean.",
      image: "/checkup.jpg",
      stats: [
        { value: "1000+", label: "Checkups Completed" },
        { value: "96%", label: "Patient Satisfaction Rate" },
      ],
    },
    types: [
      { title: "Routine Checkup" },
      { title: "Scaling & Polishing" },
      { title: "Gum Health Screening" },
      { title: "Digital X-ray Review" },
      { title: "Child Dental Checkup" },
    ],
    whatsIncluded: [
      { title: "Oral Examination", description: "A complete check of teeth, gums, and bite before any treatment begins." },
      { title: "Scaling & Polishing", description: "Removal of plaque and tartar build-up, followed by a smooth polish." },
      { title: "X-ray Review", description: "Digital X-rays checked where needed to spot issues not visible to the eye." },
      { title: "Care Guidance", description: "Simple, practical advice on brushing, flossing, and diet for your specific teeth." },
    ],
    benefits: {
      intro:
        "Choosing us for your routine checkup means your teeth are examined by an experienced dentist using modern diagnostic tools, not rushed through. We focus on prevention first, catching issues while they're still simple and inexpensive to treat.",
      image: "/treatment-room-2.jpeg",
      items: [
        { title: "Expertise & Advanced Technology", description: "Digital X-rays and modern equipment for an accurate, comfortable exam." },
        { title: "Gentle, Thorough Cleaning", description: "Scaling and polishing done carefully, without unnecessary discomfort." },
        { title: "Personalised Care & Affordable Pricing", description: "Advice tailored to your teeth, with transparent and fair pricing." },
      ],
    },
    process: [
      { title: "Book a Slot", description: "Message us on WhatsApp or call to pick a convenient time." },
      { title: "Examination", description: "Dr. Kamal reviews your teeth and gums and explains any findings." },
      { title: "Cleaning", description: "A full scaling and polishing is done to remove plaque and tartar." },
      { title: "Care Plan", description: "You leave with clear next steps and home-care guidance." },
    ],
    forWhom: [
      { title: "Due for a Routine Visit", description: "It's been six months or more since your last checkup and cleaning." },
      { title: "Noticing Sensitivity", description: "Mild sensitivity or bleeding gums are worth checking before they progress." },
      { title: "First-Time Patients", description: "New to the clinic and want a baseline check of your current dental health." },
    ],
    checklist: {
      title: "Is a Checkup & Cleaning Uncomfortable?",
      description:
        "Most patients find routine checkups and cleaning straightforward and manageable, especially with regular six-month visits that prevent heavier build-up from forming.",
      image: "/checkupp.jpg",
      points: [
        "Gentle Technique: Modern ultrasonic scalers make cleaning faster and more comfortable.",
        "Minimal Sensitivity: Any tenderness afterward is mild and settles within a day.",
        "Quick Visit: Most checkups and cleanings are done in under 45 minutes.",
      ],
    },
    faqs: [
      { question: "How long does a checkup and cleaning take?", answer: "Usually 30–45 minutes, depending on how much build-up needs to be cleaned." },
      { question: "Is the cleaning painful?", answer: "No, it's generally comfortable. Mild sensitivity afterward is normal and settles quickly." },
      { question: "How often should I come in?", answer: "Every six months is recommended for most patients, though your dentist may suggest a different interval based on your gum health." },
      { question: "Will I need X-rays every visit?", answer: "Not necessarily. X-rays are usually taken once a year or when a specific concern needs closer inspection." },
      { question: "Can a checkup catch cavities before they hurt?", answer: "Yes, that's one of its main benefits — small cavities are often found and treated before they ever cause pain." },
      { question: "What should I do before my visit?", answer: "Just brush and floss as usual, and bring any previous X-rays or reports if you have them." },
    ],
  },
  {
    slug: "root-canal-treatment",
    title: "Root Canal Treatment",
    tagline: "Save the natural tooth, remove the pain",
    heroDescription:
      "When decay or infection reaches the nerve, root canal treatment removes the source of pain and preserves your natural tooth instead of extracting it.",
    image: "/root-canal.jpg",
    bullets: [
      "Digital X-ray mapping before treatment",
      "Local anaesthesia for a pain-free procedure",
      "Modern rotary instruments for precision",
      "Crown placement to restore full function",
    ],
    whatIs: {
      description:
        "Root canal treatment removes infected or inflamed pulp from inside a tooth, cleans and shapes the canal, and seals it to stop the infection from spreading. It relieves the deep, throbbing pain caused by nerve infection and allows you to keep your natural tooth instead of having it extracted. With modern rotary instruments and local anaesthesia, the procedure is far more comfortable than its reputation suggests.",
      image: "/canal.jpg",
      stats: [
        { value: "500+", label: "Root Canals Completed" },
        { value: "97%", label: "Long-Term Success Rate" },
      ],
    },
    types: [
      { title: "Single-Visit RCT" },
      { title: "Multi-Visit RCT" },
      { title: "Anterior Tooth RCT" },
      { title: "Molar (Multi-Canal) RCT" },
      { title: "Re-Treatment RCT" },
    ],
    whatsIncluded: [
      { title: "Diagnosis & X-ray", description: "Precise imaging to confirm the extent of infection before starting." },
      { title: "Pain-Free Procedure", description: "Local anaesthesia ensures the treatment itself is comfortable throughout." },
      { title: "Canal Cleaning & Sealing", description: "Infected tissue is removed and the canal is cleaned and sealed." },
      { title: "Crown Recommendation", description: "Guidance on protecting the treated tooth with a crown afterward." },
    ],
    benefits: {
      intro:
        "We combine precise digital X-ray mapping with modern rotary instruments, so canals are cleaned thoroughly with less time in the chair. The goal is always to save your natural tooth wherever possible.",
      image: "/treatment-room-2.jpeg",
      items: [
        { title: "Expertise & Advanced Technology", description: "Rotary instruments and X-ray mapping for precise, efficient treatment." },
        { title: "Pain-Managed Procedure", description: "Local anaesthesia tuned to keep you comfortable throughout." },
        { title: "Tooth-Saving Focus", description: "Every effort is made to preserve your natural tooth over extraction." },
      ],
    },
    process: [
      { title: "Consultation", description: "Examination and X-ray to confirm root canal treatment is needed." },
      { title: "Anaesthesia", description: "The area is numbed thoroughly so the procedure is pain-free." },
      { title: "Cleaning & Sealing", description: "The infected pulp is removed and the canal is cleaned and sealed." },
      { title: "Restoration", description: "A crown or filling restores the tooth's strength and appearance." },
    ],
    forWhom: [
      { title: "Persistent Tooth Pain", description: "Ongoing pain, especially with hot or cold foods, that doesn't settle on its own." },
      { title: "Swelling or Tenderness", description: "Gum swelling or tenderness around a specific tooth." },
      { title: "Deep Decay", description: "A cavity that has been left untreated and reached the inner nerve." },
    ],
    checklist: {
      title: "How Painful Is Root Canal Treatment?",
      description:
        "Root canal treatment has a reputation that doesn't match reality. With local anaesthesia and modern technique, most patients describe it as no worse than getting a filling.",
      image: "/painful.jpg",
      points: [
        "Numbed Throughout: Local anaesthesia keeps the treated area pain-free during the procedure.",
        "Modern Instruments: Rotary tools clean canals faster and more precisely than older methods.",
        "Manageable Aftercare: Mild soreness for a day or two, easily managed with basic pain relief.",
      ],
    },
    faqs: [
      { question: "Is root canal treatment painful?", answer: "The procedure itself is done under local anaesthesia, so it's generally pain-free. Some mild soreness afterward is normal." },
      { question: "How many visits does it take?", answer: "Most cases are completed in 1–2 visits, depending on the tooth and extent of infection." },
      { question: "Do I need a crown afterward?", answer: "Yes, in most cases a crown is recommended to protect the tooth from fracture after treatment." },
      { question: "What happens if I skip the crown?", answer: "The tooth is left more brittle and at higher risk of cracking, so it's strongly recommended not to delay." },
      { question: "Can the infection come back?", answer: "It's uncommon with proper sealing, but re-treatment or minor surgery can address it if it does." },
      { question: "Is root canal better than extraction?", answer: "Where possible, keeping your natural tooth preserves normal chewing and prevents shifting of neighbouring teeth, so it's usually the preferred option." },
    ],
  },
  {
    slug: "dental-xray",
    title: "Dental X-Ray",
    tagline: "See what's beneath the surface before we treat it",
    heroDescription:
      "Digital dental X-rays reveal decay, bone loss, and root issues that aren't visible during a normal exam, giving Dr. Kamal an accurate picture before any treatment is planned.",
    image: "/dental-xray.jpg",
    bullets: [
      "Low-radiation digital imaging",
      "Instant, high-resolution images",
      "Reveals decay, infection, and bone loss early",
      "Essential before extractions, RCT, and implants",
    ],
    whatIs: {
      description:
        "A dental X-ray is a quick digital scan that shows what's happening beneath your gums and inside your teeth — things a visual exam alone can't catch, like decay between teeth, infection at the root tip, or bone loss around the jaw. Using digital sensors instead of traditional film means lower radiation exposure and an image ready to view within seconds, so Dr. Kamal can explain findings to you right away.",
      image: "/xray.jpeg",
      stats: [
        { value: "2000+", label: "X-Rays Taken" },
        { value: "<10 sec", label: "Image Ready Time" },
      ],
    },
    types: [
      { title: "Bitewing X-ray" },
      { title: "Periapical X-ray" },
      { title: "Panoramic X-ray" },
      { title: "Occlusal X-ray" },
      { title: "Pre-Treatment Scan" },
    ],
    whatsIncluded: [
      { title: "Digital Sensor Scan", description: "A quick, low-radiation scan using a digital sensor placed in or around the mouth." },
      { title: "Instant Image Review", description: "Images appear on screen within seconds for immediate review." },
      { title: "Dentist Explanation", description: "Dr. Kamal walks you through what the X-ray shows and what it means for treatment." },
      { title: "Treatment Planning", description: "Findings are used to plan extractions, root canals, implants, or other next steps accurately." },
    ],
    benefits: {
      intro:
        "Digital X-rays use significantly less radiation than older film methods and give an instant, high-resolution image, so treatment decisions are based on precise information from the very first visit.",
      image: "/treatment-room-2.jpeg",
      items: [
        { title: "Low-Radiation Digital Technology", description: "Modern digital sensors expose you to far less radiation than film X-rays." },
        { title: "Instant, Accurate Diagnosis", description: "See exactly what's happening beneath the surface before any treatment starts." },
        { title: "Better Treatment Planning", description: "Extractions, root canals, and implants are planned precisely, not guessed at." },
      ],
    },
    process: [
      { title: "Positioning", description: "A small sensor is placed comfortably in or around your mouth." },
      { title: "Capture", description: "The digital scan is taken in seconds with minimal radiation exposure." },
      { title: "Instant Review", description: "The image appears on screen immediately for review." },
      { title: "Explanation", description: "Dr. Kamal explains the findings and what they mean for your treatment." },
    ],
    forWhom: [
      { title: "Before Extractions or RCT", description: "Root position and infection need to be mapped before treatment begins." },
      { title: "Unexplained Tooth Pain", description: "Pain with no visible cause on the surface often shows up clearly on an X-ray." },
      { title: "Annual Diagnostic Check", description: "Periodic X-rays catch decay and bone changes not visible during a regular exam." },
    ],
    checklist: {
      title: "Is a Dental X-Ray Safe?",
      description:
        "Digital dental X-rays involve a very small, well-regulated dose of radiation, similar to everyday background exposure, and are considered safe for routine use.",
      image: "/ray.jpg",
      points: [
        "Minimal Radiation: Digital sensors use significantly less radiation than older film X-rays.",
        "Quick & Painless: The scan itself takes only a few seconds and involves no discomfort.",
        "Protective Precautions: A lead apron is used where appropriate for added safety.",
      ],
    },
    faqs: [
      { question: "Is a dental X-ray safe?", answer: "Yes, digital X-rays use a very small, well-regulated dose of radiation and are considered safe for routine dental use." },
      { question: "How long does an X-ray take?", answer: "The scan itself takes just a few seconds; the whole visit is usually done within a few minutes." },
      { question: "Do I need an X-ray at every visit?", answer: "Not necessarily. X-rays are typically taken once a year, or when a specific concern like pain or planned treatment requires closer inspection." },
      { question: "Is it painful?", answer: "No, the sensor is simply placed in or around the mouth and there's no discomfort during the scan." },
      { question: "Can X-rays detect problems I can't see or feel?", answer: "Yes — that's their main value. Decay between teeth, infection at a root tip, and bone loss often show no visible symptoms until an X-ray reveals them." },
      { question: "Do I need an X-ray before an implant or root canal?", answer: "Yes, an X-ray is essential beforehand to map root position, bone density, and infection so the procedure can be planned accurately." },
    ],
  },
  {
    slug: "wisdom-tooth-extraction",
    title: "Wisdom Tooth Extraction",
    tagline: "Painless removal, even for curved and impacted roots",
    heroDescription:
      "Dr. Kamal is known locally for his curved-root extraction technique, making even complex wisdom tooth removals smooth and comfortable.",
    image: "/extraction.jpg",
    bullets: [
      "Digital X-ray mapping before every extraction",
      "Specialised technique for curved and impacted roots",
      "Local anaesthesia tuned to the individual patient",
      "Clear aftercare instructions for fast healing",
    ],
    whatIs: {
      description:
        "Wisdom tooth extraction is the removal of the third molars at the back of the mouth, most often needed when they're impacted, growing at an angle, or crowding neighbouring teeth. Dr. Kamal is known locally for his technique with curved and difficult root shapes, which keeps even complex extractions smooth. The procedure is done under local anaesthesia with a clear aftercare plan for fast, comfortable healing.",
      image: "/extractionn.jpeg",
      stats: [
        { value: "700+", label: "Extractions Performed" },
        { value: "95%", label: "Smooth Recovery Rate" },
      ],
    },
    types: [
      { title: "Simple Extraction" },
      { title: "Impacted Tooth Removal" },
      { title: "Curved-Root Extraction" },
      { title: "Soft Tissue Impaction" },
      { title: "Bony Impaction" },
    ],
    whatsIncluded: [
      { title: "X-ray Assessment", description: "Imaging to understand root shape and position before any procedure." },
      { title: "Curved-Root Technique", description: "A specialised approach for teeth with difficult or curved root anatomy." },
      { title: "Comfortable Extraction", description: "Local anaesthesia tailored to minimise discomfort during removal." },
      { title: "Aftercare Guidance", description: "Clear instructions on food, hygiene, and healing for the days after." },
    ],
    benefits: {
      intro:
        "Curved and impacted roots are one of the trickiest parts of wisdom tooth removal, and it's exactly where Dr. Kamal's technique makes the biggest difference — a calmer procedure and a smoother recovery.",
      image: "/clinic-front.jpeg",
      items: [
        { title: "Specialised Curved-Root Technique", description: "A locally-known approach for difficult root anatomy, done with precision." },
        { title: "Careful Pain Management", description: "Anaesthesia tuned to your comfort level throughout the procedure." },
        { title: "Fast-Healing Aftercare", description: "Clear, practical guidance to reduce swelling and speed up recovery." },
      ],
    },
    process: [
      { title: "X-ray & Assessment", description: "Root position and impaction level are reviewed before deciding on the approach." },
      { title: "Anaesthesia", description: "The area is numbed to keep the extraction comfortable." },
      { title: "Extraction", description: "The tooth is removed using the appropriate technique for its root shape." },
      { title: "Aftercare Follow-up", description: "Guidance and a follow-up check to ensure smooth healing." },
    ],
    forWhom: [
      { title: "Recurring Pain at the Back", description: "Pain, swelling, or difficulty opening your mouth near the back molars." },
      { title: "Impacted or Curved Roots", description: "A wisdom tooth that's growing at an angle or has complex root shape." },
      { title: "Crowding Concerns", description: "Your dentist has flagged wisdom teeth as a risk to nearby teeth alignment." },
    ],
    checklist: {
      title: "How Painful Is Wisdom Tooth Removal?",
      description:
        "Wisdom tooth removal is generally less painful than people expect, particularly with a technique suited to your specific root shape and modern local anaesthesia.",
      image: "/extractiono.jpeg",
      points: [
        "Numbed Procedure: Local anaesthesia means you won't feel pain during the extraction.",
        "Technique-Matched: Curved and impacted roots are handled with a suited approach to reduce trauma.",
        "Guided Recovery: Clear aftercare instructions keep swelling and discomfort to a minimum.",
      ],
    },
    faqs: [
      { question: "Will the extraction hurt?", answer: "The procedure is done under local anaesthesia, so you won't feel pain during removal. Mild discomfort afterward is normal and manageable." },
      { question: "How long is recovery?", answer: "Most patients recover within 3–7 days with proper aftercare." },
      { question: "What about curved roots?", answer: "Dr. Kamal specialises in curved-root extractions, which are handled with the same care as straightforward cases." },
      { question: "What can I eat after extraction?", answer: "Soft, cool foods for the first day or two, gradually returning to normal eating as healing progresses." },
      { question: "Do all wisdom teeth need to come out?", answer: "No, only those that are impacted, causing pain, or putting nearby teeth at risk are typically recommended for removal." },
      { question: "Is there swelling afterward?", answer: "Some swelling is common for a day or two and can be managed with cold compresses as advised." },
    ],
  },
  {
    slug: "dental-fillings",
    title: "Dental Fillings",
    tagline: "Stop decay early with a simple, lasting filling",
    heroDescription:
      "Tooth-coloured fillings that restore cavities quickly and blend naturally with your smile, stopping decay before it spreads further.",
    image: "/tooth-filling.jpg",
    bullets: [
      "Tooth-coloured, natural-looking material",
      "Minimal removal of healthy tooth structure",
      "Completed in a single visit",
      "Long-lasting and easy to maintain",
    ],
    whatIs: {
      description:
        "A dental filling restores a tooth that's been affected by decay or a minor chip. After removing the decayed material, the cavity is filled with a tooth-coloured composite resin that's shaped and polished to blend naturally with the rest of your tooth. It's one of the fastest, most conservative ways to stop a cavity from spreading, usually completed in a single visit.",
      image: "/fillings.jpg",
      stats: [
        { value: "1200+", label: "Fillings Placed" },
        { value: "96%", label: "Patient Satisfaction Rate" },
      ],
    },
    types: [
      { title: "Composite Filling" },
      { title: "Class I Filling" },
      { title: "Class II Filling" },
      { title: "Class V Filling" },
      { title: "Chip Repair Filling" },
    ],
    whatsIncluded: [
      { title: "Cavity Assessment", description: "Checking the extent of decay before deciding on the filling approach." },
      { title: "Decay Removal", description: "Careful removal of decayed material while preserving healthy tooth structure." },
      { title: "Tooth-Coloured Filling", description: "A filling that matches your natural tooth shade for a seamless look." },
      { title: "Bite Check", description: "A final check to make sure the filling feels natural when you bite down." },
    ],
    benefits: {
      intro:
        "Our tooth-coloured fillings are placed with a focus on preserving as much of your natural tooth as possible, so the repair looks and feels like it was never there.",
      image: "/treatment-room-1.jpeg",
      items: [
        { title: "Natural Shade-Matching", description: "Composite material blended to match your surrounding teeth precisely." },
        { title: "Minimally Invasive", description: "Only the decayed portion of the tooth is removed, preserving healthy structure." },
        { title: "Single-Visit Convenience", description: "Most fillings are completed start to finish in one appointment." },
      ],
    },
    process: [
      { title: "Examination", description: "The cavity is assessed and X-rayed if needed." },
      { title: "Numbing", description: "Local anaesthesia is applied if the cavity is deep or sensitive." },
      { title: "Filling Placement", description: "Decay is removed and the tooth-coloured filling is placed and shaped." },
      { title: "Final Polish", description: "The filling is polished and your bite is checked for comfort." },
    ],
    forWhom: [
      { title: "Visible Cavity", description: "A cavity has been spotted during a checkup or is visibly noticeable." },
      { title: "Sensitivity to Sweets", description: "Sharp sensitivity when eating sweet or cold foods." },
      { title: "Small Chips or Cracks", description: "A minor chip that needs restoring before it worsens." },
    ],
    checklist: {
      title: "Is Getting a Filling Painful?",
      description:
        "Most fillings are straightforward and quick, with any discomfort limited to the numbing injection itself.",
      image: "/hurt.jpg",
      points: [
        "Numbed Area: Local anaesthesia is used for deeper cavities so you feel no pain.",
        "Quick Procedure: Most fillings take 20–40 minutes from start to finish.",
        "Minimal Aftercare: Any sensitivity afterward is mild and fades within a day or two.",
      ],
    },
    faqs: [
      { question: "Will the filling match my tooth colour?", answer: "Yes, we use tooth-coloured composite material that blends naturally with your surrounding teeth." },
      { question: "How long does a filling take?", answer: "Most fillings are completed in a single visit, typically 20–40 minutes." },
      { question: "How long do fillings last?", answer: "With good oral care, composite fillings typically last several years before needing a review." },
      { question: "Will I need anaesthesia?", answer: "For shallow cavities it's often not needed; for deeper ones, local anaesthesia keeps the procedure comfortable." },
      { question: "Can old metal fillings be replaced?", answer: "Yes, older fillings can be replaced with tooth-coloured composite for a more natural appearance." },
      { question: "What should I avoid after a filling?", answer: "It's best to avoid very hard or sticky foods on that tooth for the first day while the filling fully sets." },
    ],
  },
  {
    slug: "crowns-bridges",
    title: "Crowns & Bridges",
    tagline: "Restore strength and appearance to damaged teeth",
    heroDescription:
      "Custom-fitted crowns and bridges that rebuild broken or weakened teeth, restoring both function and a natural appearance.",
    image: "/crown-bridge-implant.jpg",
    bullets: [
      "Precise digital impressions for a perfect fit",
      "Durable materials built to last",
      "Natural shade-matching",
      "Restores full chewing function",
    ],
    whatIs: {
      description:
        "Crowns and bridges are custom-made restorations that rebuild teeth damaged by decay, fracture, or root canal treatment, or replace one or more missing teeth entirely. A crown caps a weakened tooth to restore its strength and shape, while a bridge spans a gap by anchoring to neighbouring teeth. Both are made to match your natural tooth shade so the result looks and functions like your own teeth.",
      image: "/badge.jpg",
      stats: [
        { value: "600+", label: "Crowns & Bridges Placed" },
        { value: "10-15 yrs", label: "Typical Lifespan" },
      ],
    },
    types: [
      { title: "Ceramic Crown" },
      { title: "Zirconia Crown" },
      { title: "Metal-Ceramic Crown" },
      { title: "Fixed Bridge" },
      { title: "Cantilever Bridge" },
    ],
    whatsIncluded: [
      { title: "Tooth Preparation", description: "The damaged tooth is carefully shaped to receive the crown or bridge." },
      { title: "Precise Impressions", description: "Accurate measurements taken to ensure a comfortable, well-fitting restoration." },
      { title: "Custom Fabrication", description: "Your crown or bridge is made to match your natural tooth shade and shape." },
      { title: "Fitting & Adjustment", description: "Final placement with adjustments so your bite feels completely natural." },
    ],
    benefits: {
      intro:
        "Precise impressions and careful shade-matching mean your crown or bridge is built to fit comfortably and disappear into your smile, not stand out from it.",
      image: "/treatment-room-2.jpeg",
      items: [
        { title: "Precise Digital Impressions", description: "Accurate measurements for a restoration that fits comfortably first time." },
        { title: "Durable, Long-Lasting Materials", description: "Crowns and bridges built to withstand years of everyday use." },
        { title: "Natural Shade-Matching", description: "Custom-matched to blend seamlessly with your surrounding teeth." },
      ],
    },
    process: [
      { title: "Consultation", description: "The tooth is examined and the right restoration type is discussed." },
      { title: "Preparation", description: "The tooth is gently shaped to receive the crown or bridge." },
      { title: "Impression & Temporary", description: "Impressions are taken and a temporary restoration is placed if needed." },
      { title: "Final Fitting", description: "The custom crown or bridge is fitted, checked, and adjusted for comfort." },
    ],
    forWhom: [
      { title: "Broken or Cracked Tooth", description: "A tooth that's significantly broken and needs more than a filling." },
      { title: "Missing One or More Teeth", description: "A bridge can replace a gap without needing implant surgery." },
      { title: "Post-Root-Canal Protection", description: "A crown is often needed after root canal treatment to protect the tooth." },
    ],
    checklist: {
      title: "Is Getting a Crown or Bridge Uncomfortable?",
      description:
        "Tooth preparation is done under local anaesthesia, and a temporary restoration keeps you comfortable while your custom piece is made.",
      image: "/crown.jpg",
      points: [
        "Numbed Preparation: Local anaesthesia is used while the tooth is shaped.",
        "Protected in the Meantime: A temporary crown or bridge protects the tooth between visits.",
        "Adjusted for Comfort: The final piece is fine-tuned until your bite feels natural.",
      ],
    },
    faqs: [
      { question: "How many visits are needed?", answer: "Typically 2 visits — one for preparation and impressions, one for final fitting." },
      { question: "How long do crowns and bridges last?", answer: "With proper care, they commonly last 10–15 years or longer." },
      { question: "Will it look natural?", answer: "Yes, materials are shade-matched to blend in with your surrounding teeth." },
      { question: "Does the procedure hurt?", answer: "Tooth preparation is done under local anaesthesia, so it's generally pain-free at the time." },
      { question: "What's the difference between a crown and a bridge?", answer: "A crown covers a single damaged tooth, while a bridge replaces one or more missing teeth by anchoring to the teeth on either side of the gap." },
      { question: "How do I care for a crown or bridge?", answer: "Brush and floss as normal, paying extra attention around the edges, and keep up with regular checkups." },
    ],
  },
  {
    slug: "teeth-whitening",
    title: "Teeth Whitening",
    tagline: "A brighter smile, safely done in-clinic",
    heroDescription:
      "Professional teeth whitening that lifts stains and discolouration safely, giving noticeably brighter results in a single visit.",
    image: "/scaling-bleaching.jpg",
    bullets: [
      "Safe, dentist-supervised whitening",
      "Noticeable results in one session",
      "Minimal sensitivity with proper technique",
      "Long-lasting with good aftercare",
    ],
    whatIs: {
      description:
        "Professional teeth whitening uses a dentist-supervised bleaching gel to lift stains and discolouration from the enamel, brightening your smile safely and noticeably in a single visit. Unlike over-the-counter kits, the concentration and application are controlled precisely, with your gums protected throughout, giving more reliable and even results.",
      image: "/white.jpg",
      stats: [
        { value: "800+", label: "Smiles Brightened" },
        { value: "1 Visit", label: "For Noticeable Results" },
      ],
    },
    types: [
      { title: "In-Clinic Whitening" },
      { title: "Single-Session Whitening" },
      { title: "Touch-Up Whitening" },
      { title: "Stain-Focused Whitening" },
      { title: "Take-Home Maintenance" },
    ],
    whatsIncluded: [
      { title: "Shade Assessment", description: "Your current tooth shade is checked to set realistic expectations." },
      { title: "Gum Protection", description: "Gums are shielded before the whitening gel is applied." },
      { title: "In-Clinic Whitening", description: "Professional-grade whitening applied and monitored throughout the session." },
      { title: "Aftercare Tips", description: "Guidance on foods and habits to maintain your results for longer." },
    ],
    benefits: {
      intro:
        "Whitening done under supervision is safer and more predictable than at-home kits — your gums are protected and the process is monitored throughout for an even, natural result.",
      image: "/waiting-area.jpeg",
      items: [
        { title: "Dentist-Supervised Safety", description: "Correct concentration and timing, monitored throughout the session." },
        { title: "Noticeable Same-Day Results", description: "Most patients see a visible difference after a single session." },
        { title: "Minimal Sensitivity", description: "Careful technique keeps discomfort to a minimum during and after." },
      ],
    },
    process: [
      { title: "Consultation", description: "Your teeth are assessed to confirm whitening is suitable for you." },
      { title: "Gum Protection", description: "Gums are shielded to keep the whitening gel on the teeth only." },
      { title: "Whitening Session", description: "The whitening treatment is applied under supervision in a single visit." },
      { title: "Aftercare Guidance", description: "Tips shared to help maintain your brighter smile for longer." },
    ],
    forWhom: [
      { title: "Yellowing from Coffee or Tea", description: "Everyday staining that's built up over time." },
      { title: "Before a Special Occasion", description: "Want a brighter smile for a wedding, event, or photos." },
      { title: "General Confidence Boost", description: "Simply want a fresher, brighter smile for everyday confidence." },
    ],
    checklist: {
      title: "Is Teeth Whitening Safe for My Enamel?",
      description:
        "When done under dental supervision with the correct concentration and timing, whitening is safe and doesn't damage your enamel.",
      image: "/enamel.jpg",
      points: [
        "Controlled Application: Gel concentration and exposure time are managed by the dentist.",
        "Gum Protected: A barrier keeps the whitening gel off soft tissue during treatment.",
        "Temporary Sensitivity Only: Any sensitivity afterward is mild and typically settles within a day or two.",
      ],
    },
    faqs: [
      { question: "Is whitening safe for my teeth?", answer: "Yes, when done under dental supervision with the correct concentration and timing." },
      { question: "How much brighter will my teeth get?", answer: "Results vary by starting shade, but most patients see a noticeable improvement in one session." },
      { question: "Will my teeth be sensitive afterward?", answer: "Mild, temporary sensitivity is common and typically settles within a day or two." },
      { question: "How long do results last?", answer: "With good habits and occasional touch-ups, results commonly last from several months up to a couple of years." },
      { question: "Can I get whitening with fillings or crowns?", answer: "Whitening only affects natural enamel, so existing fillings or crowns won't change shade — this is worth discussing beforehand." },
      { question: "What should I avoid after whitening?", answer: "Staining foods and drinks like coffee, tea, and red wine are best limited for the first couple of days." },
    ],
  },
  {
    slug: "braces-orthodontics",
    title: "Braces & Orthodontics",
    tagline: "Straighter teeth, a healthier bite",
    heroDescription:
      "Orthodontic treatment to correct crooked or crowded teeth and improve your bite, with a treatment plan tailored to your specific case.",
    image: "/orthodontic.jpg",
    bullets: [
      "Personalised treatment plan and timeline",
      "Regular progress monitoring",
      "Suitable for teens and adults",
      "Improves both appearance and bite function",
    ],
    whatIs: {
      description:
        "Braces and orthodontic treatment gradually move crooked, crowded, or misaligned teeth into a straighter, healthier position, while also correcting bite issues like overbite or underbite. A custom plan is built around your specific alignment, with regular adjustment visits to track progress until you reach the result you and Dr. Kamal agreed on.",
      image: "/brac.jpg",
      stats: [
        { value: "300+", label: "Smile Make-Overs" },
        { value: "12-24 mo", label: "Typical Treatment Time" },
      ],
    },
    types: [
      { title: "Metal Braces" },
      { title: "Ceramic Braces" },
      { title: "Self-Ligating Braces" },
      { title: "Bite-Correction Orthodontics" },
      { title: "Adult Orthodontics" },
    ],
    whatsIncluded: [
      { title: "Bite & Alignment Assessment", description: "A full review of tooth alignment and bite to plan the right approach." },
      { title: "Custom Treatment Plan", description: "A timeline and plan tailored to your specific alignment concerns." },
      { title: "Regular Adjustments", description: "Scheduled visits to adjust braces and track progress over time." },
      { title: "Retention Guidance", description: "Advice on maintaining results once active treatment is complete." },
    ],
    benefits: {
      intro:
        "Every orthodontic plan is built around your specific bite and alignment, with regular monitoring so adjustments are made exactly when they're needed, not on a generic schedule.",
      image: "/clinic-front.jpeg",
      items: [
        { title: "Personalised Treatment Plan", description: "A timeline and approach designed around your specific case." },
        { title: "Regular Progress Monitoring", description: "Scheduled adjustments so treatment stays on track." },
        { title: "Suitable for Teens & Adults", description: "Effective orthodontic options across a wide range of ages." },
      ],
    },
    process: [
      { title: "Initial Consultation", description: "Alignment and bite are assessed to determine the right treatment plan." },
      { title: "Braces Fitted", description: "Braces are placed and an adjustment schedule is set." },
      { title: "Ongoing Adjustments", description: "Regular visits to adjust and track progress until treatment is complete." },
      { title: "Retention", description: "A retainer plan is set to maintain your new alignment." },
    ],
    forWhom: [
      { title: "Crooked or Crowded Teeth", description: "Noticeably misaligned or overlapping teeth." },
      { title: "Bite Issues", description: "Overbite, underbite, or difficulty biting and chewing comfortably." },
      { title: "Teens & Adults", description: "Orthodontic treatment works for a wide age range, not just children." },
    ],
    checklist: {
      title: "Is Wearing Braces Painful?",
      description:
        "Braces are generally comfortable day-to-day, with only brief tenderness after adjustment visits as teeth begin to shift.",
      image: "/bracc.webp",
      points: [
        "Mild Adjustment Discomfort: Some tenderness for a day or two after each adjustment, which settles quickly.",
        "No Pain During Fitting: Placing braces itself is not painful.",
        "Manageable Long-Term: Most patients adapt within the first couple of weeks and barely notice them after.",
      ],
    },
    faqs: [
      { question: "How long does orthodontic treatment take?", answer: "Typically 12–24 months, depending on the complexity of your case." },
      { question: "Is it too late for braces as an adult?", answer: "No, orthodontic treatment is effective for adults as well as teens." },
      { question: "How often are adjustment visits?", answer: "Usually every 4–6 weeks, depending on your treatment plan." },
      { question: "Do braces hurt?", answer: "Fitting itself isn't painful, though you may feel mild tenderness for a day or two after adjustments." },
      { question: "Will I need a retainer afterward?", answer: "Yes, a retainer is typically recommended to hold your new alignment in place after active treatment ends." },
      { question: "Can I eat normally with braces?", answer: "Most foods are fine, though very hard, sticky, or chewy foods are best avoided to protect the brackets and wires." },
    ],
  },
  {
    slug: "dentures",
    title: "Dentures",
    tagline: "Comfortable, natural-looking tooth replacement",
    heroDescription:
      "Custom-made dentures that restore your ability to eat and speak comfortably, with a natural appearance fitted to your mouth.",
    image: "/treatment-room-1.jpeg",
    bullets: [
      "Custom fit for comfort and stability",
      "Natural-looking materials",
      "Options for partial or complete dentures",
      "Guidance on care and adjustment",
    ],
    whatIs: {
      description:
        "Dentures are custom-made, removable appliances that replace missing teeth, restoring your ability to chew, speak, and smile comfortably. Whether you need to replace a few teeth or a full arch, impressions of your mouth are used to craft a denture that fits your gums and matches your natural tooth and gum shade, so it looks and feels like your own smile.",
      image: "/waiting-area.jpeg",
      stats: [
        { value: "400+", label: "Dentures Fitted" },
        { value: "95%", label: "Comfortable Fit Rate" },
      ],
    },
    types: [
      { title: "Complete Dentures" },
      { title: "Partial Dentures" },
      { title: "Immediate Dentures" },
      { title: "Flexible Dentures" },
      { title: "Denture Relines & Repairs" },
    ],
    whatsIncluded: [
      { title: "Assessment & Impressions", description: "A full assessment and precise impressions of your mouth are taken." },
      { title: "Custom Fabrication", description: "Dentures are custom-made to fit comfortably and look natural." },
      { title: "Fitting & Adjustment", description: "Fine adjustments made until the fit feels right for daily use." },
      { title: "Care Instructions", description: "Guidance on cleaning, storage, and getting used to your new dentures." },
    ],
    benefits: {
      intro:
        "Every denture is custom-fabricated from precise impressions of your mouth, then fine-tuned over your fitting visits until the fit feels natural for everyday eating and speaking.",
      image: "/treatment-room-1.jpeg",
      items: [
        { title: "Custom Fit for Comfort", description: "Impressions taken specifically for your mouth, not a generic mould." },
        { title: "Natural-Looking Materials", description: "Shading chosen to match your gums and remaining teeth closely." },
        { title: "Ongoing Adjustment Support", description: "Follow-up visits to fine-tune fit as you get used to them." },
      ],
    },
    process: [
      { title: "Consultation & Impressions", description: "Your mouth is assessed and impressions taken for a custom fit." },
      { title: "Try-In", description: "A trial fitting checks shape, shade, and bite before finalising." },
      { title: "Fabrication", description: "Dentures are custom-made to match your bite and facial structure." },
      { title: "Fitting & Follow-Up", description: "Final placement with adjustments and a follow-up to ensure comfort." },
    ],
    forWhom: [
      { title: "Missing Multiple Teeth", description: "Several missing teeth affecting chewing, speech, or confidence." },
      { title: "Considering Alternatives to Implants", description: "Want a non-surgical option for replacing missing teeth." },
      { title: "Existing Dentures Need Replacing", description: "Current dentures are loose, worn, or uncomfortable." },
    ],
    checklist: {
      title: "Are Dentures Uncomfortable to Wear?",
      description:
        "New dentures can feel unfamiliar at first, but with a proper custom fit and a short adjustment period, most patients wear them comfortably for everyday use.",
      image: "/doctor-desk.jpeg",
      points: [
        "Custom-Fitted: Made from impressions of your own mouth, not a generic size.",
        "Adjustment Period: A few weeks of practice with eating and speaking is normal.",
        "Fine-Tuned Over Time: Follow-up visits address any pressure points or looseness.",
      ],
    },
    faqs: [
      { question: "Will dentures look natural?", answer: "Yes, materials and shading are chosen to match your natural gums and teeth as closely as possible." },
      { question: "How long does it take to get used to dentures?", answer: "Most patients adjust within a few weeks with some practice eating and speaking." },
      { question: "Can dentures be adjusted later?", answer: "Yes, minor adjustments can be made after fitting if anything feels uncomfortable." },
      { question: "How do I clean my dentures?", answer: "Rinse after meals and brush daily with a denture-specific cleaner, avoiding regular toothpaste which can be too abrasive." },
      { question: "Can I sleep with my dentures in?", answer: "It's generally better to remove them at night to let your gums rest, unless your dentist advises otherwise." },
      { question: "What's the difference between partial and complete dentures?", answer: "Partial dentures replace a few missing teeth and clip onto remaining teeth, while complete dentures replace an entire arch when no natural teeth remain." },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceConfig | undefined {
  return servicesConfig.find((s) => s.slug === slug);
}