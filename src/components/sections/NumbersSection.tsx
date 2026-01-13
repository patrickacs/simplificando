'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

// Dados dos cards de números
const numbersData = [
    {
        number: '+260',
        label: 'Alunos Aprovados',
        description: 'Mais de 260 alunos aprovados na Jornada Link desde nossa fundação.',
        color: '#9B59B6', // Roxo
        icon: '🎓',
    },
    {
        number: '4',
        label: 'Primeiros Lugares',
        description: 'Conquistamos 4 primeiros lugares nas últimas edições da Jornada.',
        color: '#00B0FF', // Azul
        icon: '🏆',
    },
    {
        number: '86%',
        label: 'Taxa de Aprovação',
        description: 'Nossa taxa de aprovação é de 86%, a maior entre os preparatórios.',
        color: '#27AE60', // Verde
        icon: '✓',
    },
    {
        number: '+50',
        label: 'Mentores Especializados',
        description: 'Time de mentores ex-alunos da Link prontos para te ajudar.',
        color: '#E67E22', // Laranja
        icon: '👥',
    },
];

interface NumberCardProps {
    i: number;
    number: string;
    label: string;
    description: string;
    color: string;
    icon: string;
    progress: MotionValue<number>;
    range: [number, number];
    targetScale: number;
}

function NumberCard({ i, number, label, description, color, icon, progress, range, targetScale }: NumberCardProps) {
    const container = useRef<HTMLDivElement>(null);

    useScroll({
        target: container,
        offset: ['start end', 'start start']
    });

    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div ref={container} className="number-card-container">
            <motion.div
                className="number-card"
                style={{
                    backgroundColor: color,
                    scale,
                    top: `calc(-5vh + ${i * 30}px)`,
                }}
            >
                <div className="card-icon">{icon}</div>
                <div className="card-number">{number}</div>
                <div className="card-label">{label}</div>
                <p className="card-description">{description}</p>
            </motion.div>
        </div>
    );
}

export default function NumbersSection() {
    const container = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    return (
        <>
            <style jsx global>{`
        .numbers-section {
          position: relative;
          background: #FEFFFA;
          padding: 100px 0;
        }

        .numbers-container {
          display: flex;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 4rem;
          gap: 4rem;
        }

        .numbers-left {
          flex: 1;
          position: sticky;
          top: 200px;
          height: fit-content;
        }

        .numbers-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          color: #1a1a1a;
          line-height: 1.1;
          margin-bottom: 1rem;
        }

        .numbers-title span {
          font-style: italic;
          position: relative;
        }

        .numbers-title span::after {
          content: '';
          position: absolute;
          bottom: 5px;
          left: 0;
          right: 0;
          height: 8px;
          background: linear-gradient(90deg, #9B59B6, #00B0FF, #27AE60);
          border-radius: 4px;
          z-index: -1;
          opacity: 0.5;
        }

        .numbers-subtitle {
          font-size: 1.1rem;
          color: #666;
          line-height: 1.6;
          max-width: 400px;
          margin-top: 2rem;
        }

        .numbers-right {
          flex: 1;
          position: relative;
        }

        .number-card-container {
          height: 60vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: sticky;
          top: 100px;
        }

        .number-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          width: 100%;
          max-width: 400px;
          height: 350px;
          border-radius: 32px;
          padding: 40px;
          transform-origin: top;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
        }

        .card-icon {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 48px;
          height: 48px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .card-number {
          font-size: clamp(4rem, 10vw, 7rem);
          font-weight: 800;
          color: white;
          line-height: 1;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .card-label {
          font-size: 1.25rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          margin-top: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .card-description {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.8);
          text-align: center;
          margin-top: 1.5rem;
          line-height: 1.5;
          max-width: 280px;
        }

        @media (max-width: 1024px) {
          .numbers-container {
            flex-direction: column;
            padding: 0 2rem;
            gap: 2rem;
          }

          .numbers-left {
            position: relative;
            top: 0;
            text-align: center;
          }

          .numbers-subtitle {
            max-width: 100%;
            margin: 2rem auto 0;
          }

          .numbers-right {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .number-card-container {
            height: 50vh;
          }

          .number-card {
            max-width: 350px;
            height: 300px;
          }
        }

        @media (max-width: 480px) {
          .numbers-section {
            padding: 60px 0;
          }

          .number-card {
            max-width: 300px;
            height: 280px;
            padding: 30px;
          }

          .card-number {
            font-size: 4rem;
          }
        }
      `}</style>

            <section className="numbers-section">
                <div className="numbers-container">
                    <div className="numbers-left">
                        <h2 className="numbers-title">
                            Alguns números<br />
                            por trás dos <span>resultados</span>
                        </h2>
                        <p className="numbers-subtitle">
                            Esses números representam mais do que estatísticas.
                            Eles mostram a força da nossa comunidade, a consistência
                            do nosso trabalho e o impacto real que criamos para você.
                        </p>
                    </div>

                    <div ref={container} className="numbers-right">
                        {numbersData.map((data, i) => {
                            const targetScale = 1 - ((numbersData.length - i) * 0.05);
                            return (
                                <NumberCard
                                    key={`number_${i}`}
                                    i={i}
                                    {...data}
                                    progress={scrollYProgress}
                                    range={[i * 0.25, 1]}
                                    targetScale={targetScale}
                                />
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}
