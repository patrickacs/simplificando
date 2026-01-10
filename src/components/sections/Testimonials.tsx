'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        name: 'Alice Devens',
        achievement: '1º lugar na Jornada Link 2024.2',
        quote: 'Só queria agradecer por todo o ensinamento que vocês trouxeram para mim durante esse ano. Foi um baita processo, e vocês foram essenciais. Não só para o vestibular, mas também para a vida. Vocês são os melhores!',
        emoji: '🥇',
    },
    {
        name: 'Lucas Moreira',
        achievement: 'Aprovado na Jornada Link',
        quote: 'Nunca achei que eu fosse realmente gostar de estudar algo kkkk. Obrigado por me ajudar a realizar esse sonho de me mudar pra SP e fazer parte dessa faculdade tão foda.',
        emoji: '🎓',
    },
    {
        name: 'Daniel Arnhold',
        achievement: 'Aprovado na Link',
        quote: 'Vocês são demais, gratidão eterna pela ajuda de vocês dentro e fora das aulas. Não teria tido mentoria melhor nem se eu escolhesse quem ia me dar aula!',
        emoji: '💜',
    },
    {
        name: 'Valentina Andrada',
        achievement: 'Aprovada na Link',
        quote: 'Agradecer vocês, com certeza fizeram a diferença tanto em aspectos da minha vida quanto para jornada. Todos antes de entrarem para Link deveriam passar por vocês!',
        emoji: '💚',
    },
    {
        name: 'João Wetters',
        achievement: 'Aprovado na Link',
        quote: 'Só agradecer à todos do Simplificando pelo excelente trabalho que vem fazendo, preparando seus alunos tão bem para a Jornada Link!',
        emoji: '🚀',
    },
];

export default function Testimonials() {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.testimonials-header', {
                scrollTrigger: { trigger: '.testimonials-header', start: 'top 80%' },
                y: 60, opacity: 0, duration: 0.8,
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <>
            <style jsx global>{`
        .testimonials-section {
          padding: var(--space-3xl) 0;
        }
        
        .testimonials-header {
          text-align: center;
          margin-bottom: var(--space-2xl);
        }
        
        .testimonials-header h2 {
          margin-bottom: 1rem;
        }
        
        .main-testimonial {
          max-width: 900px;
          margin: 0 auto;
          min-height: 280px;
        }
        
        .testimonial-card {
          background: white;
          border-radius: var(--radius-xl);
          padding: var(--space-xl);
          box-shadow: var(--shadow-lg);
          text-align: center;
        }
        
        .testimonial-quote-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          opacity: 0.2;
        }
        
        .testimonial-text {
          font-size: clamp(0.95rem, 1.5vw, 1.15rem);
          color: var(--color-text);
          line-height: 1.75;
          margin-bottom: 1.5rem;
          font-style: italic;
        }
        
        .testimonial-author {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
        }
        
        .testimonial-avatar {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: var(--gradient-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
        }
        
        .testimonial-info {
          text-align: left;
        }
        
        .testimonial-name {
          font-weight: 700;
          font-size: 1rem;
        }
        
        .testimonial-achievement {
          font-size: 0.85rem;
          color: var(--color-primary);
          font-weight: 500;
        }
        
        .testimonial-dots {
          display: flex;
          justify-content: center;
          gap: 0.6rem;
          margin-top: var(--space-lg);
        }
        
        .testimonial-dot {
          height: 10px;
          border-radius: 9999px;
          cursor: pointer;
          border: none;
          transition: all 0.3s ease;
        }
        
        .testimonial-dot.active {
          width: 30px;
          background: var(--color-primary);
        }
        
        .testimonial-dot:not(.active) {
          width: 10px;
          background: rgba(121, 153, 217, 0.3);
        }
        
        .testimonials-mini {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-top: var(--space-2xl);
        }
        
        .testimonial-mini-card {
          background: white;
          border-radius: var(--radius-lg);
          padding: 1.25rem;
          box-shadow: var(--shadow-md);
        }
        
        .testimonial-mini-header {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 0.6rem;
        }
        
        .testimonial-mini-emoji {
          font-size: 1.25rem;
        }
        
        .testimonial-mini-name {
          font-weight: 600;
          font-size: 0.9rem;
        }
        
        .testimonial-mini-ach {
          font-size: 0.75rem;
          color: var(--color-text-muted);
        }
        
        .testimonial-mini-text {
          font-size: 0.85rem;
          color: var(--color-text-light);
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        @media (max-width: 900px) {
          .testimonials-mini {
            grid-template-columns: 1fr;
          }
        }
        
        @media (max-width: 768px) {
          .testimonials-section {
            padding: var(--space-2xl) 0;
          }
          
          .testimonial-card {
            padding: var(--space-lg);
          }
          
          .main-testimonial {
            min-height: auto;
          }
        }
      `}</style>

            <section ref={sectionRef} className="testimonials-section">
                <div className="container">
                    <div className="testimonials-header">
                        <h2>Feedbacks dos <span className="text-gradient">Alunos</span></h2>
                        <p style={{ color: 'var(--color-text-light)' }}>Que viraram nossos colegas na Link! 🎉</p>
                    </div>

                    <div className="main-testimonial">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="testimonial-card"
                            >
                                <div className="testimonial-quote-icon">"</div>
                                <p className="testimonial-text">"{testimonials[activeIndex].quote}"</p>
                                <div className="testimonial-author">
                                    <div className="testimonial-avatar">{testimonials[activeIndex].emoji}</div>
                                    <div className="testimonial-info">
                                        <p className="testimonial-name">{testimonials[activeIndex].name}</p>
                                        <p className="testimonial-achievement">{testimonials[activeIndex].achievement}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="testimonial-dots">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`testimonial-dot ${index === activeIndex ? 'active' : ''}`}
                            />
                        ))}
                    </div>

                    <div className="testimonials-mini">
                        {testimonials.slice(0, 3).map((t, i) => (
                            <motion.div
                                key={t.name}
                                className="testimonial-mini-card"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="testimonial-mini-header">
                                    <span className="testimonial-mini-emoji">{t.emoji}</span>
                                    <div>
                                        <p className="testimonial-mini-name">{t.name}</p>
                                        <p className="testimonial-mini-ach">{t.achievement}</p>
                                    </div>
                                </div>
                                <p className="testimonial-mini-text">"{t.quote}"</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
