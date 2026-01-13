'use client';

import { useState } from 'react';
import Hero from "@/components/sections/Hero";
import Products from "@/components/sections/Products";
import NumbersSection from "@/components/sections/NumbersSection";
import Stats from "@/components/sections/Stats";
import SkillsSection from "@/components/sections/SkillsSection";
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
      {/* 1. Hero - Primeira impressão */}
      <Hero onOpenQuiz={() => setIsQuizOpen(true)} />

      {/* 2. Números - Credibilidade */}
      <NumbersSection />

      {/* 3. Stats - Mais prova social */}
      <Stats />

      {/* 4. Skills - O que vai aprender */}
      <SkillsSection />

      {/* 5. Founders - Quem somos */}
      <Founders />

      {/* 6. Mentores - A equipe */}
      <Mentors />

      {/* 7. Depoimentos - Prova social */}
      <Testimonials />

      {/* 8. Produtos/Preços - Decisão de compra (final) */}
      <Products />

      {/* 9. FAQ - Dúvidas */}
      <FAQ />

      {/* 10. Footer */}
      <Footer />

      <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </>
  );
}

