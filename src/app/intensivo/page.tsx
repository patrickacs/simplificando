'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import Footer from '@/components/sections/Footer';

gsap.registerPlugin(ScrollTrigger);

const aulas = [
    { num: 1, title: 'Oratória e Storytelling', desc: 'Como contar suas histórias e o impacto da comunicação.' },
    { num: 2, title: 'Etapa PREP', desc: 'Dicas e frameworks para Scrapbook e Vídeo.' },
    { num: 3, title: 'Business Tools', desc: 'Cases, Matemática, Raciocínio Lógico e Redação.' },
    { num: 4, title: 'People Skills', desc: 'Liderança e trabalho em equipe na Group Session.' },
    { num: 5, title: 'Empreendedorismo', desc: 'Mindset empreendedor e visão de negócios.' },
    { num: 6, title: 'Entrevista', desc: 'Comunicação, autoconhecimento e gestão emocional.' },
];

const features = ['+12h aulas ao vivo', 'Simulações práticas', 'Feedbacks detalhados', '1 mentoria individual', 'Apostila de Entrevista', 'Acesso aos cases anteriores'];

export default function IntensivoPage() {
    const heroRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.intensivo-title', { y: 60, opacity: 0, duration: 0.8, delay: 0.3 });
            gsap.from('.intensivo-subtitle', { y: 40, opacity: 0, duration: 0.8, delay: 0.5 });
            gsap.from('.aula-card', { scrollTrigger: { trigger: '.aulas-grid', start: 'top 80%' }, y: 60, opacity: 0, stagger: 0.1, duration: 0.6 });
        }, heroRef);
        return () => ctx.revert();
    }, []);

    return (
        <>
            <style jsx global>{`
        .intensivo-hero { min-height: 60vh; display: flex; align-items: center; padding: 120px 0 60px; background: linear-gradient(180deg, rgba(39, 174, 96, 0.08) 0%, transparent 100%); }
        .intensivo-tag { display: inline-block; padding: 0.5rem 1rem; background: var(--color-intensivo); color: white; border-radius: 9999px; font-size: 0.85rem; font-weight: 600; margin-bottom: 1rem; }
        .intensivo-title { font-size: clamp(2.5rem, 6vw, 4.5rem); margin-bottom: 1rem; }
        .intensivo-title span { color: var(--color-intensivo); }
        .intensivo-subtitle { font-size: clamp(1rem, 2vw, 1.25rem); color: var(--color-text-light); max-width: 700px; line-height: 1.7; margin-bottom: 2rem; }
        .intensivo-info { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
        .intensivo-info-item { text-align: center; padding: 1rem; background: white; border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); }
        .intensivo-info-value { font-size: 1.5rem; font-weight: 800; color: var(--color-intensivo); }
        .intensivo-info-label { font-size: 0.85rem; color: var(--color-text-muted); margin-top: 0.25rem; }
        .intensivo-section { padding: var(--space-3xl) 0; }
        .intensivo-section.alt { background: var(--color-background-alt); }
        .section-title { font-size: clamp(1.75rem, 4vw, 2.5rem); margin-bottom: var(--space-xl); text-align: center; }
        .section-title span { color: var(--color-intensivo); }
        .aulas-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.25rem; }
        .aula-card { background: white; border-radius: var(--radius-lg); padding: 1.5rem; box-shadow: var(--shadow-md); display: flex; gap: 1rem; transition: transform 0.3s ease; }
        .aula-card:hover { transform: translateY(-4px); }
        .aula-num { width: 50px; height: 50px; background: var(--color-intensivo); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.25rem; flex-shrink: 0; }
        .aula-content h4 { font-size: 1rem; margin-bottom: 0.4rem; color: var(--color-intensivo); }
        .aula-content p { font-size: 0.9rem; color: var(--color-text-light); line-height: 1.5; }
        .pillars-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .pillar-card { text-align: center; padding: 2rem; background: white; border-radius: var(--radius-xl); box-shadow: var(--shadow-lg); }
        .pillar-icon { font-size: 3rem; margin-bottom: 1rem; }
        .pillar-title { font-size: 1.25rem; font-weight: 700; color: var(--color-intensivo); margin-bottom: 0.75rem; }
        .pillar-desc { font-size: 0.9rem; color: var(--color-text-light); line-height: 1.6; }
        .features-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem; }
        .feature-tag { padding: 0.75rem 1.5rem; background: var(--color-intensivo); color: white; border-radius: 9999px; font-weight: 600; font-size: 0.9rem; }
        .cta-section { text-align: center; padding: var(--space-3xl) 0; background: var(--color-intensivo); color: white; }
        .cta-title { color: white; margin-bottom: 1rem; }
        .cta-price { font-size: 3rem; font-weight: 800; margin-bottom: 0.5rem; }
        .cta-note { opacity: 0.8; margin-bottom: 2rem; }
        @media (max-width: 900px) { .pillars-grid { grid-template-columns: 1fr; } }
        @media (max-width: 768px) { .intensivo-hero { padding: 100px 0 40px; min-height: auto; } .intensivo-section { padding: var(--space-2xl) 0; } }
      `}</style>

            <main ref={heroRef}>
                <section className="intensivo-hero">
                    <div className="container">
                        <span className="intensivo-tag">💚 3 SEMANAS</span>
                        <h1 className="intensivo-title">
                            <span>Intensivo</span> do Simplificando
                        </h1>
                        <p className="intensivo-subtitle">
                            Preparação intensa e eficiente em 3 semanas. Aulas dinâmicas, simulações práticas e feedbacks personalizados para você se destacar na Jornada Link.
                        </p>
                        <div className="intensivo-info">
                            <div className="intensivo-info-item"><div className="intensivo-info-value">3</div><div className="intensivo-info-label">Semanas</div></div>
                            <div className="intensivo-info-item"><div className="intensivo-info-value">12h+</div><div className="intensivo-info-label">Aulas ao Vivo</div></div>
                            <div className="intensivo-info-item"><div className="intensivo-info-value">6</div><div className="intensivo-info-label">Aulas</div></div>
                            <div className="intensivo-info-item"><div className="intensivo-info-value">1</div><div className="intensivo-info-label">Mentoria</div></div>
                        </div>
                        <motion.a href="https://wa.me/5511999999999" className="btn btn-primary btn-large" style={{ background: 'var(--color-intensivo)' }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            Quero me inscrever
                        </motion.a>
                    </div>
                </section>

                <section className="intensivo-section">
                    <div className="container">
                        <h2 className="section-title">Os 3 <span>Pilares</span> do Intensivo</h2>
                        <div className="pillars-grid">
                            <div className="pillar-card"><div className="pillar-icon">🎯</div><h3 className="pillar-title">Aulas ao Vivo</h3><p className="pillar-desc">Todo conteúdo sobre a Jornada Link com convidados e dinâmicas práticas.</p></div>
                            <div className="pillar-card"><div className="pillar-icon">🎭</div><h3 className="pillar-title">Simulações</h3><p className="pillar-desc">Simulações de todas as etapas com feedback individual.</p></div>
                            <div className="pillar-card"><div className="pillar-icon">📋</div><h3 className="pillar-title">Material de Apoio</h3><p className="pillar-desc">Cases anteriores, apostila de entrevista e mentoria individual.</p></div>
                        </div>
                    </div>
                </section>

                <section className="intensivo-section alt">
                    <div className="container">
                        <h2 className="section-title">Cronograma do <span>Curso</span></h2>
                        <div className="aulas-grid">
                            {aulas.map((aula) => (
                                <motion.div key={aula.num} className="aula-card" whileHover={{ y: -4 }}>
                                    <div className="aula-num">{aula.num}</div>
                                    <div className="aula-content">
                                        <h4>{aula.title}</h4>
                                        <p>{aula.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="intensivo-section">
                    <div className="container">
                        <h2 className="section-title">O que você <span>recebe</span></h2>
                        <div className="features-grid">
                            {features.map((f) => <span key={f} className="feature-tag">✓ {f}</span>)}
                        </div>
                    </div>
                </section>

                <section className="cta-section">
                    <div className="container">
                        <h2 className="section-title cta-title">Garanta sua vaga no Intensivo</h2>
                        <div className="cta-price">R$5.000</div>
                        <p className="cta-note">Pagamento via PIX, boleto ou cartão</p>
                        <motion.a href="https://wa.me/5511999999999" className="btn btn-large" style={{ background: 'white', color: 'var(--color-intensivo)' }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            Falar com a equipe
                        </motion.a>
                    </div>
                </section>

                <Footer />
            </main>
        </>
    );
}
