'use client';

import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

// Tags de habilidades - REDUZIDAS (menos por linha)
const row1Skills = [
  'Oratória', 'Storytelling', 'Frameworks', 'Matemática', 'Redação', 'Liderança'
];

const row2Skills = [
  'Criatividade', 'Empreendedorismo', 'Análise Crítica', 'Pitch', 'Networking'
];

const row3Skills = [
  'Pensamento Crítico', 'Inteligência Emocional', 'Persuasão', 'Planejamento', 'Foco'
];

// Cores para as tags
const colors = ['#9B59B6', '#00B0FF', '#27AE60', '#E67E22', '#E74C3C', '#1ABC9C'];

export default function SkillsSection() {
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start']
  });

  // Movimento horizontal das linhas baseado no scroll
  const x1 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-400, 0]);
  const x3 = useTransform(scrollYProgress, [0, 1], [0, -400]);

  return (
    <>
      <style jsx global>{`
        .skills-section {
          position: relative;
          background: #FEFFFA;
          padding: 100px 0;
          overflow: hidden;
        }

        .skills-header {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 60px;
          padding: 0 2rem;
        }

        .skills-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          color: #1a1a1a;
          line-height: 1.1;
          margin-bottom: 1rem;
        }

        .skills-subtitle {
          font-size: 1.1rem;
          color: #666;
          line-height: 1.6;
        }

        /* Marquee Rows */
        .skills-marquee-container {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .skills-marquee-row {
          display: flex;
          gap: 1.25rem;
          white-space: nowrap;
        }

        /* TAGS MAIORES */
        .skill-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1.25rem 2.5rem;
          background: white;
          border-radius: 50px;
          font-size: 1.25rem;
          font-weight: 600;
          color: #333;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .skill-tag:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        }

        .skill-tag-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .skills-section {
            padding: 60px 0;
          }

          .skill-tag {
            padding: 1rem 1.75rem;
            font-size: 1rem;
          }

          .skill-tag-dot {
            width: 10px;
            height: 10px;
          }

          .skills-marquee-container {
            gap: 1.25rem;
          }
        }
      `}</style>

      <section ref={container} className="skills-section">
        {/* Header */}
        <div className="skills-header">
          <h2 className="skills-title">
            O que você vai aprender
          </h2>
          <p className="skills-subtitle">
            Desenvolvemos habilidades essenciais para sua aprovação na Jornada Link
            e para sua carreira como futuro empreendedor.
          </p>
        </div>

        {/* Marquee Rows */}
        <div className="skills-marquee-container">
          {/* Row 1 - Scroll Left */}
          <motion.div className="skills-marquee-row" style={{ x: x1 }}>
            {[...row1Skills, ...row1Skills].map((skill, i) => (
              <div key={`r1-${i}`} className="skill-tag">
                <span
                  className="skill-tag-dot"
                  style={{ background: colors[i % colors.length] }}
                />
                {skill}
              </div>
            ))}
          </motion.div>

          {/* Row 2 - Scroll Right */}
          <motion.div className="skills-marquee-row" style={{ x: x2 }}>
            {[...row2Skills, ...row2Skills].map((skill, i) => (
              <div key={`r2-${i}`} className="skill-tag">
                <span
                  className="skill-tag-dot"
                  style={{ background: colors[(i + 2) % colors.length] }}
                />
                {skill}
              </div>
            ))}
          </motion.div>

          {/* Row 3 - Scroll Left */}
          <motion.div className="skills-marquee-row" style={{ x: x3 }}>
            {[...row3Skills, ...row3Skills].map((skill, i) => (
              <div key={`r3-${i}`} className="skill-tag">
                <span
                  className="skill-tag-dot"
                  style={{ background: colors[(i + 4) % colors.length] }}
                />
                {skill}
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
