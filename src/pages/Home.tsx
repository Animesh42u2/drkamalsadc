import type { FC } from "react";
import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import WhatWeOffer from "../components/Whatweoffer";
import Testimonials from "../components/Testimonials";
import WhatSetsUsApart from "../components/Whatsetsusapart";
import WhyChooseUs from "../components/Whychooseus";
import OurProcess from "../components/Ourprocess";
import SuccessStories from "../components/Successstories";
import FAQSection from "../components/FAQSection";

const Home: FC = () => {
  return (
    <>
      <Hero />
      <AboutSection />
      <WhatWeOffer />
      <WhatSetsUsApart />
      <WhyChooseUs />
      <OurProcess />
      <SuccessStories />
      <Testimonials />
      <FAQSection />
    </>
  );
};

export default Home;