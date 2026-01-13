'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const mentors = [
    {
        id: '001',
        name: 'Jimmy Hanyu',
        turma: 'Makers',
        role: 'TOP 1 Makers 2023',
        bio: 'Ex-estudante Biotecnologia USP, Ex-Brand Ambassador Link, Co-Founder @theSix',
        specialties: ['Roteirização', 'Storytelling', 'Cases'],
        image: '/home/mentores/jimmy-fofinho.jpeg',
    },
    {
        id: '002',
        name: 'João De Castro',
        turma: 'Makers',
        role: 'TOP 2 Makers',
        bio: 'Ex-estudante de Engenharia de Produção, Passou 2x na Jornada Link',
        specialties: ['Cases', 'Entrevista', 'Group Session'],
        image: '/home/mentores/joao-de-castro.jpeg',
    },
    {
        id: '003',
        name: 'Thales Akimoto',
        turma: 'Makers',
        role: 'TOP 3 Makers',
        bio: 'Engenheiro Elétrico pela FURB, Serial Entrepreneur - já realizou 1 Exit',
        specialties: ['Cases', 'Entrevista', 'Pensamento Sistêmico'],
        image: '/home/mentores/akimoto.jpeg',
    },
    {
        id: '004',
        name: 'Lucas Eing',
        turma: 'Makers',
        role: 'Ex-Ambassador Link',
        bio: '2 vezes aprovado na Jornada Link, Mentor de pitch em Stanford',
        specialties: ['Entrevista', 'Sheets', 'Matemática'],
        image: '/home/mentores/lucas-eing.jpeg',
    },
    {
        id: '005',
        name: 'Enzo Agostini',
        turma: 'Dreamers',
        role: 'Pitch de Ouro',
        bio: 'Campeão do Onboarding, Desenvolveu software para a Minerva Foods',
        specialties: ['Redação', 'Group Session', 'Pitch'],
        image: '/home/mentores/enzo-agostini.jpeg',
    },
    {
        id: '006',
        name: 'Prof. Bia',
        turma: 'Professora',
        role: 'Matemática & Física',
        bio: 'Já ajudou +100 alunos na Jornada Link, Mathematics for SAT',
        specialties: ['Matemática', 'Raciocínio Lógico'],
        image: '/home/mentores/profbia.png',
    },
];

export default function Mentors() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <>
            <style jsx global>{`
        .mentors-accordion-section {
          background: #0a0a0a;
          min-height: 100vh;
          padding: 60px 0;
          overflow: hidden;
        }

        .mentors-accordion-header {
          max-width: 1400px;
          margin: 0 auto 40px;
          padding: 0 2rem;
        }

        .mentors-accordion-header h2 {
          font-size: clamp(2rem, 4vw, 3rem);
          color: white;
          font-weight: 700;
        }

        .mentors-accordion-header h2 span {
          color: #00B0FF;
        }

        .mentors-accordion-header p {
          color: rgba(255, 255, 255, 0.5);
          font-size: 1rem;
          margin-top: 0.5rem;
        }

        /* Container do accordion */
        .mentors-accordion {
          display: flex;
          height: 600px;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        /* Cada coluna */
        .mentor-column {
          position: relative;
          height: 100%;
          border-left: 1px solid rgba(255, 255, 255, 0.1);
          cursor: pointer;
          overflow: hidden;
          transition: flex 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .mentor-column:last-child {
          border-right: 1px solid rgba(255, 255, 255, 0.1);
        }

        .mentor-column.collapsed {
          flex: 1;
        }

        .mentor-column.expanded {
          flex: 6;
        }

        /* Header da coluna (número + nome rotacionado) */
        .column-header {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 1.5rem 1rem;
        }

        .column-number {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.4);
          font-family: monospace;
          letter-spacing: 0.1em;
          margin-bottom: 2rem;
        }

        .column-title-wrapper {
          flex: 1;
          display: flex;
          align-items: flex-end;
          justify-content: flex-start;
        }

        .column-title {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: white;
          white-space: nowrap;
          transition: opacity 0.3s ease;
        }

        .mentor-column.expanded .column-title {
          opacity: 0;
        }

        .mentor-column:hover .column-title {
          color: #00B0FF;
        }

        /* Conteúdo expandido */
        .expanded-content {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 2rem;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.4s ease 0.2s;
        }

        .mentor-column.expanded .expanded-content {
          opacity: 1;
          pointer-events: auto;
        }

        .expanded-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
        }

        .expanded-number {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.4);
          font-family: monospace;
          letter-spacing: 0.1em;
        }

        .expanded-main-title {
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          font-weight: 700;
          color: white;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .expanded-main-title::before {
          content: '// ';
          color: #00B0FF;
        }

        .expanded-body {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 3rem;
          flex: 1;
        }

        .expanded-image {
          width: 280px;
          height: 350px;
          border-radius: 8px;
          overflow: hidden;
          position: relative;
          background: rgba(255, 255, 255, 0.05);
        }

        .expanded-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .expanded-specialties {
          margin-bottom: 1.5rem;
        }

        .expanded-specialty {
          font-size: 0.9rem;
          color: white;
          margin-bottom: 0.5rem;
          opacity: 0.9;
        }

        .expanded-specialty::before {
          content: '/ ';
          color: #00B0FF;
          font-weight: 600;
        }

        .expanded-bio {
          font-size: 0.9rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.6);
          max-width: 450px;
        }

        .expanded-role {
          margin-top: 1.5rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .role-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #00B0FF;
        }

        .role-dot.outline {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        /* Hover effect */
        .mentor-column:not(.expanded):hover {
          background: rgba(255, 255, 255, 0.02);
        }

        /* Responsivo */
        @media (max-width: 1024px) {
          .mentors-accordion {
            height: auto;
            flex-direction: column;
          }

          .mentor-column {
            border-left: none;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            height: auto;
            min-height: 80px;
          }

          .mentor-column:last-child {
            border-right: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }

          .column-header {
            position: relative;
            flex-direction: row;
            align-items: center;
            height: 80px;
            padding: 1rem 1.5rem;
          }

          .column-number {
            margin-bottom: 0;
            margin-right: 2rem;
          }

          .column-title-wrapper {
            align-items: center;
            justify-content: flex-start;
          }

          .column-title {
            writing-mode: horizontal-tb;
            transform: none;
          }

          .mentor-column.expanded {
            min-height: 500px;
          }

          .expanded-content {
            position: relative;
            padding: 1.5rem;
          }

          .expanded-body {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .expanded-image {
            width: 100%;
            max-width: 300px;
            height: 300px;
            margin: 0 auto;
          }
        }

        @media (max-width: 600px) {
          .mentors-accordion-section {
            padding: 40px 0;
          }

          .mentor-column {
            min-height: 60px;
          }

          .column-header {
            height: 60px;
            padding: 0.75rem 1rem;
          }

          .expanded-image {
            max-width: 200px;
            height: 250px;
          }
        }
      `}</style>

            <section className="mentors-accordion-section">
                <motion.div
                    className="mentors-accordion-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2>Nossos <span>Mentores</span></h2>
                    <p>Os faixa-pretas da Link prontos para te ajudar 🥋</p>
                </motion.div>

                <div className="mentors-accordion">
                    {mentors.map((mentor, index) => (
                        <motion.div
                            key={mentor.id}
                            className={`mentor-column ${activeIndex === index ? 'expanded' : 'collapsed'}`}
                            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            {/* Header collapse */}
                            <div className="column-header">
                                <span className="column-number">{mentor.id}</span>
                                <div className="column-title-wrapper">
                                    <span className="column-title">{mentor.name.toUpperCase()}</span>
                                </div>
                            </div>

                            {/* Conteúdo expandido */}
                            <div className="expanded-content">
                                <div className="expanded-top">
                                    <span className="expanded-number">{mentor.id}</span>
                                </div>

                                <h3 className="expanded-main-title">{mentor.name}</h3>

                                <div className="expanded-body">
                                    <div className="expanded-image">
                                        <Image
                                            src={mentor.image}
                                            alt={mentor.name}
                                            fill
                                            sizes="280px"
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>

                                    <div className="expanded-info">
                                        <div className="expanded-specialties">
                                            {mentor.specialties.map((spec) => (
                                                <p key={spec} className="expanded-specialty">{spec.toUpperCase()}</p>
                                            ))}
                                        </div>

                                        <p className="expanded-bio">{mentor.bio}</p>

                                        <div className="expanded-role">
                                            <span className="role-dot"></span>
                                            <span className="role-dot outline"></span>
                                            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginLeft: '0.5rem' }}>
                                                {mentor.turma} • {mentor.role}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </>
    );
}
