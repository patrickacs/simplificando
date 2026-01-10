'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const mentors = [
    {
        name: 'Jimmy Hanyu',
        turma: 'Makers',
        role: 'TOP 1 Makers 2023',
        bio: 'Ex-estudante Biotecnologia USP, Ex-Brand Ambassador Link, Co-Founder @theSix',
        interests: ['Criação de Conteúdo', 'Marketing', 'Startups'],
        specialties: ['Roteirização', 'Storytelling', 'Resolução de cases'],
        emoji: '🍳',
    },
    {
        name: 'João De Castro',
        turma: 'Makers',
        role: 'TOP 2 Makers',
        bio: 'Ex-estudante de Engenharia de Produção, Passou 2x na Jornada Link',
        interests: ['Vendas', 'Consumer Goods', 'Neurociência'],
        specialties: ['Resolução de Cases', 'Entrevista', 'Group Session'],
        emoji: '💼',
    },
    {
        name: 'Thales Akimoto',
        turma: 'Makers',
        role: 'TOP 3 Makers',
        bio: 'Engenheiro Elétrico pela FURB, Serial Entrepreneur - já realizou 1 Exit',
        interests: ['Inovação', 'Startups', 'Economia'],
        specialties: ['Cases', 'Entrevista', 'Pensamento Sistêmico'],
        emoji: '⚡',
    },
    {
        name: 'Lucas Eing',
        turma: 'Makers',
        role: 'Ex-Brand Ambassador Link',
        bio: '2 vezes aprovado na Jornada Link, Mentor de pitch em Stanford',
        interests: ['Finanças', 'Comunicação', 'Esportes Radicais'],
        specialties: ['Entrevista', 'Google Sheets', 'Matemática'],
        emoji: '📊',
    },
    {
        name: 'Enzo Agostini',
        turma: 'Dreamers',
        role: 'Pitch de Ouro',
        bio: 'Campeão do Onboarding, Desenvolveu software para a Minerva Foods',
        interests: ['Arte', 'Spacetech', 'Design'],
        specialties: ['Redação', 'Group Session', 'Pitch'],
        emoji: '🚀',
    },
    {
        name: 'Prof. Bia',
        turma: 'Professora',
        role: 'Matemática e Física',
        bio: 'Já ajudou +100 alunos na Jornada Link, Mathematics for SAT',
        interests: ['Matemática', 'Física', 'Processos Seletivos'],
        specialties: ['Matemática', 'Raciocínio Lógico'],
        emoji: '📐',
    },
];

export default function Mentors() {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeMentor, setActiveMentor] = useState<number | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.mentor-card', {
                scrollTrigger: { trigger: '.mentors-grid', start: 'top 80%' },
                y: 60, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <style jsx global>{`
        .mentors-section {
          padding: var(--space-3xl) 0;
        }
        
        .mentors-header {
          text-align: center;
          margin-bottom: var(--space-2xl);
        }
        
        .mentors-header h2 {
          margin-bottom: 1rem;
        }
        
        .mentors-header p {
          max-width: 700px;
          margin: 0 auto;
          color: var(--color-text-light);
        }
        
        .mentors-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        
        .mentor-card {
          background: white;
          border-radius: var(--radius-lg);
          padding: var(--space-lg);
          box-shadow: var(--shadow-md);
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .mentor-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-xl);
        }
        
        .mentor-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        
        .mentor-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--gradient-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          flex-shrink: 0;
        }
        
        .mentor-info h4 {
          font-size: 1rem;
          margin-bottom: 0.15rem;
        }
        
        .mentor-info p {
          font-size: 0.8rem;
          color: var(--color-primary);
          font-weight: 500;
        }
        
        .mentor-bio {
          font-size: 0.85rem;
          color: var(--color-text-light);
          line-height: 1.5;
          margin-bottom: 0.75rem;
        }
        
        .mentor-expand {
          text-align: center;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(0,0,0,0.05);
          font-size: 0.75rem;
          color: var(--color-text-muted);
        }
        
        .mentor-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 0.75rem;
        }
        
        .mentor-tag {
          font-size: 0.7rem;
          padding: 0.2rem 0.6rem;
          border-radius: 9999px;
        }
        
        .mentor-tag-specialty {
          background: var(--color-primary);
          color: white;
        }
        
        .mentor-tag-interest {
          background: rgba(121, 153, 217, 0.1);
          color: var(--color-primary);
        }
        
        @media (max-width: 1024px) {
          .mentors-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 768px) {
          .mentors-section {
            padding: var(--space-2xl) 0;
          }
          
          .mentors-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .mentor-card {
            padding: var(--space-md);
          }
        }
      `}</style>

            <section ref={sectionRef} className="mentors-section">
                <div className="container">
                    <motion.div
                        className="mentors-header"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2>Nossos <span className="text-gradient">Mentores</span></h2>
                        <p>Os faixa-pretas da Link prontos para te ajudar 🥋</p>
                    </motion.div>

                    <div className="mentors-grid">
                        {mentors.map((mentor, index) => (
                            <motion.div
                                key={mentor.name}
                                className="mentor-card"
                                whileHover={{ y: -8 }}
                                onClick={() => setActiveMentor(activeMentor === index ? null : index)}
                            >
                                <div className="mentor-header">
                                    <div className="mentor-avatar">{mentor.emoji}</div>
                                    <div className="mentor-info">
                                        <h4>{mentor.name}</h4>
                                        <p>{mentor.turma} • {mentor.role}</p>
                                    </div>
                                </div>

                                <p className="mentor-bio">{mentor.bio}</p>

                                <AnimatePresence>
                                    {activeMentor === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="mentor-tags">
                                                {mentor.specialties.map((spec) => (
                                                    <span key={spec} className="mentor-tag mentor-tag-specialty">
                                                        {spec}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="mentor-tags">
                                                {mentor.interests.map((interest) => (
                                                    <span key={interest} className="mentor-tag mentor-tag-interest">
                                                        {interest}
                                                    </span>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="mentor-expand">
                                    {activeMentor === index ? '▲ Menos' : '▼ Ver mais'}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
