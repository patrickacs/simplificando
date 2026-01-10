'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { value: 255, suffix: '+', label: 'Alunos aprovados na Link', icon: '🎓' },
    { value: 84, suffix: '%', label: 'de aprovação nas últimas 10 turmas', icon: '📈' },
    { value: 31, suffix: '%', label: 'da turma dos Builders passou pelo Simplificando', icon: '🏆' },
    { value: 100, suffix: '+', label: 'pitchs de ouro durante as Group Sessions', icon: '⭐' },
    { value: 4, suffix: '', label: 'primeiros lugares nas últimas Jornadas', icon: '🥇' },
];

export default function Stats() {
    const sectionRef = useRef<HTMLElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!statsRef.current) return;

            const items = statsRef.current.querySelectorAll('.stat-item');
            const numbers = statsRef.current.querySelectorAll('.stat-number');

            gsap.from(items, {
                scrollTrigger: { trigger: statsRef.current, start: 'top 80%' },
                y: 60, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
            });

            numbers.forEach((num) => {
                const targetValue = parseInt(num.getAttribute('data-value') || '0');
                const suffix = num.getAttribute('data-suffix') || '';

                gsap.from({ value: 0 }, {
                    value: targetValue,
                    scrollTrigger: { trigger: num, start: 'top 85%' },
                    duration: 2,
                    ease: 'power2.out',
                    onUpdate: function () {
                        num.textContent = Math.round(this.targets()[0].value) + suffix;
                    },
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <style jsx global>{`
        .stats-section {
          padding: var(--space-3xl) 0;
          background: linear-gradient(180deg, var(--color-background) 0%, var(--color-background-alt) 100%);
        }
        
        .stats-header {
          text-align: center;
          margin-bottom: var(--space-2xl);
        }
        
        .stats-header h2 {
          margin-bottom: 1rem;
        }
        
        .stats-header .subtitle {
          font-size: clamp(1rem, 2.5vw, 1.5rem);
          color: var(--color-primary);
          font-weight: 600;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1.5rem;
        }
        
        .stat-item {
          text-align: center;
          padding: 1.5rem 1rem;
          background: white;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .stat-item:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-xl);
        }
        
        .stat-icon {
          font-size: 2rem;
          display: block;
          margin-bottom: 0.5rem;
        }
        
        .stat-number {
          font-size: clamp(2rem, 4vw, 2.75rem);
          font-weight: 800;
          color: var(--color-primary);
          line-height: 1;
          margin-bottom: 0.4rem;
        }
        
        .stat-label {
          font-size: 0.8rem;
          color: var(--color-text-light);
          line-height: 1.3;
        }
        
        .stats-placements {
          margin-top: var(--space-2xl);
          text-align: center;
          padding: var(--space-lg);
          background: rgba(121, 153, 217, 0.08);
          border-radius: var(--radius-xl);
        }
        
        .stats-placements p {
          font-size: clamp(0.85rem, 1.5vw, 1rem);
          color: var(--color-text);
          line-height: 1.7;
        }
        
        @media (max-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        @media (max-width: 768px) {
          .stats-section {
            padding: var(--space-2xl) 0;
          }
          
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
          
          .stat-item {
            padding: 1.25rem 0.75rem;
          }
          
          .stat-icon {
            font-size: 1.5rem;
          }
        }
        
        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr 1fr;
          }
          
          .stat-item:nth-child(5) {
            grid-column: span 2;
          }
        }
      `}</style>

            <section ref={sectionRef} className="stats-section">
                <div className="container">
                    <div className="stats-header">
                        <h2>10 Turmas Depois...</h2>
                        <p className="subtitle">Somos muito mais que um cursinho, somos uma família 🚀</p>
                    </div>

                    <div ref={statsRef} className="stats-grid">
                        {stats.map((stat, index) => (
                            <div key={index} className="stat-item">
                                <span className="stat-icon">{stat.icon}</span>
                                <div
                                    className="stat-number"
                                    data-value={stat.value}
                                    data-suffix={stat.suffix}
                                >
                                    0{stat.suffix}
                                </div>
                                <p className="stat-label">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    <div className="stats-placements">
                        <p>
                            <strong style={{ color: 'var(--color-primary)' }}>TOP COLOCADOS:</strong>{' '}
                            1° e 2° lugar dos Owners, 2° lugar dos Builders,
                            1° lugar dos Creators, 1º lugar dos Dreamers, 1° e 2° lugar dos Visionaires
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
