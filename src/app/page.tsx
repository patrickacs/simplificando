'use client';

import { useState } from 'react';
import Hero from "@/components/sections/Hero";
import Products from "@/components/sections/Products";
import Stats from "@/components/sections/Stats";
import Mentors from "@/components/sections/Mentors";
import Founders from "@/components/sections/Founders";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";
import QuizModal from "@/components/Quiz/QuizModal";


export default function Home() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <>
      <Hero onOpenQuiz={() => setIsQuizOpen(true)} />
      <Products />
      <Stats />
      <Mentors />
      <Founders />
      <Testimonials />
      <FAQ />
      <Footer />

      <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </>
  );
}
