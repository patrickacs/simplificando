'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const founders = [
    {
        name: 'Jordana Medina',
        role: 'Co-fundadora',
        turma: 'Partners • Aluna nº1',
        bio: 'Responsável pela área operacional e financeira do Simplificando. Hoje trabalha com a UNIVillas, sua Assessoria Imobiliária.',
        highlight: 'Conhecedora de todas as plataformas e métodos de organização, ela é quem faz as aulas ficarem perfeitas!',
        emoji: '👩‍💼',
        color: '#E91E63',
    },
    {
        name: 'Mateus Guimarães',
        role: 'Co-fundador',
        turma: 'Makers • Campeão do Onboarding',
        bio: 'Foi aluno do Simplificando em 2022.2, tem seu canal no YouTube com +75k inscritos. Expert em produtividade, inovação e comunicação.',
        highlight: 'Tirou nota máxima na Entrevista da Link e vai te ensinar a realizar cada entrega com autenticidade!',
        emoji: '👨‍💻',
        color: '#2196F3',
    },
];

export default function Founders() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.founder-card', {
                scrollTrigger: { trigger: '.founders-container', start: 'top 75%' },
                y: 80, opacity: 0, stagger: 0.2, duration: 1, ease: 'power3.out',
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <style jsx global>{`
        .founders-section {
          padding: var(--space-3xl) 0;
          background: var(--color-background-alt);
        }
        
        .founders-header {
          text-align: center;
          margin-bottom: var(--space-2xl);
        }
        
        .founders-header p.intro {
          font-size: 1.1rem;
          color: var(--color-primary);
          margin-bottom: 0.5rem;
        }
        
        .founders-header h2 {
          margin-bottom: 1rem;
        }
        
        .founders-header p.desc {
          max-width: 700px;
          margin: 0 auto;
          color: var(--color-text-light);
        }
        
        .founders-container {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          max-width: 1000px;
          margin: 0 auto;
        }
        
        .founder-card {
          background: white;
          border-radius: var(--radius-xl);
          padding: var(--space-xl);
          box-shadow: var(--shadow-lg);
          position: relative;
          overflow: hidden;
          transition: transform 0.3s ease;
        }
        
        .founder-card:hover {
          transform: translateY(-8px);
        }
        
        .founder-accent {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
        }
        
        .founder-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }
        
        .founder-avatar {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          flex-shrink: 0;
        }
        
        .founder-info h3 {
          font-size: 1.35rem;
          margin-bottom: 0.2rem;
        }
        
        .founder-info .role {
          font-weight: 600;
          margin-bottom: 0.1rem;
        }
        
        .founder-info .turma {
          font-size: 0.8rem;
          color: var(--color-text-muted);
        }
        
        .founder-bio {
          font-size: 0.9rem;
          color: var(--color-text-light);
          line-height: 1.6;
          margin-bottom: 1rem;
        }
        
        .founder-highlight {
          padding: 1rem;
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          font-weight: 500;
          font-style: italic;
        }
        
        .founders-mission {
          margin-top: var(--space-2xl);
          text-align: center;
          padding: var(--space-xl);
          background: white;
          border-radius: var(--radius-xl);
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .founders-mission p {
          font-size: clamp(0.95rem, 1.5vw, 1.1rem);
          color: var(--color-text-light);
          line-height: 1.8;
        }
        
        @media (max-width: 900px) {
          .founders-container {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
        
        @media (max-width: 768px) {
          .founders-section {
            padding: var(--space-2xl) 0;
          }
          
          .founder-card {
            padding: var(--space-lg);
          }
          
          .founder-header {
            flex-direction: column;
            text-align: center;
          }
          
          .founder-avatar {
            width: 60px;
            height: 60px;
            font-size: 1.75rem;
          }
          
          .founder-info h3 {
            font-size: 1.2rem;
          }
          
          .founders-mission {
            padding: var(--space-md);
          }
        }
      `}</style>

            <section ref={sectionRef} className="founders-section">
                <div className="container">
                    <motion.div
                        className="founders-header"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <p className="intro">Olá! Somos</p>
                        <h2>Mateus e Jordana</h2>
                        <p className="desc">
                            Somos sócios e cofundadores do Simplificando. Também somos alunos da Link School.
                        </p>
                    </motion.div>

                    <div className="founders-container">
                        {founders.map((founder) => (
                            <motion.div
                                key={founder.name}
                                className="founder-card"
                                whileHover={{ y: -8 }}
                            >
                                <div className="founder-accent" style={{ background: founder.color }} />

                                <div className="founder-header">
                                    <div
                                        className="founder-avatar"
                                        style={{ background: `${founder.color}20` }}
                                    >
                                        {founder.emoji}
                                    </div>
                                    <div className="founder-info">
                                        <h3>{founder.name}</h3>
                                        <p className="role" style={{ color: founder.color }}>{founder.role}</p>
                                        <p className="turma">Turma: {founder.turma}</p>
                                    </div>
                                </div>

                                <p className="founder-bio">{founder.bio}</p>

                                <div
                                    className="founder-highlight"
                                    style={{ background: `${founder.color}10`, borderLeft: `3px solid ${founder.color}` }}
                                >
                                    "{founder.highlight}"
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        className="founders-mission"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <p>
                            O Simplificando surgiu em 2021, e já ajudamos mais de{' '}
                            <strong style={{ color: 'var(--color-primary)' }}>100 alunos</strong> a serem aprovados
                            em 6 Jornadas Link. Se você quer aumentar suas chances de passar na faculdade dos seus sonhos,
                            basta fazer parte do nosso cursinho!
                        </p>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
