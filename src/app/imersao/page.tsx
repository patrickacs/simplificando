'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import Footer from '@/components/sections/Footer';

gsap.registerPlugin(ScrollTrigger);

const schedule = [
    { day: 'Sexta-feira', time: '12h - 19h', activities: ['Check-in e boas-vindas', 'Comunicação Efetiva', 'Dinâmica de Aquecimento', 'Resolução de Case', 'Networking'] },
    { day: 'Sábado', time: '08h - 18h', activities: ['Simulação de Group Session', 'Feedbacks individuais', 'Matemática e Raciocínio', 'Simulação de Case', 'Roda de conversa'] },
    { day: 'Domingo', time: '08h - 18h', activities: ['Simulação de Entrevista', 'Feedbacks finais', 'Preparação mental', 'Encerramento e fotos'] },
];

const features = ['Café da manhã e tarde inclusos', 'Simulações presenciais', 'Correção individual', 'Mentoria presencial', 'Apostila de entrevista', 'Networking com candidatos'];

export default function ImersaoPage() {
    const heroRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.imersao-title', { y: 60, opacity: 0, duration: 0.8, delay: 0.3 });
            gsap.from('.imersao-subtitle', { y: 40, opacity: 0, duration: 0.8, delay: 0.5 });
            gsap.from('.schedule-card', { scrollTrigger: { trigger: '.schedule-grid', start: 'top 80%' }, y: 60, opacity: 0, stagger: 0.15, duration: 0.6 });
        }, heroRef);
        return () => ctx.revert();
    }, []);

    return (
        <>
            <style jsx global>{`
        .imersao-hero { min-height: 60vh; display: flex; align-items: center; padding: 120px 0 60px; background: linear-gradient(180deg, rgba(230, 126, 34, 0.08) 0%, transparent 100%); }
        .imersao-tag { display: inline-block; padding: 0.5rem 1rem; background: var(--color-imersao); color: white; border-radius: 9999px; font-size: 0.85rem; font-weight: 600; margin-bottom: 1rem; }
        .imersao-title { font-size: clamp(2.5rem, 6vw, 4.5rem); margin-bottom: 1rem; }
        .imersao-title span { color: var(--color-imersao); }
        .imersao-subtitle { font-size: clamp(1rem, 2vw, 1.25rem); color: var(--color-text-light); max-width: 700px; line-height: 1.7; margin-bottom: 2rem; }
        .imersao-info { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
        .imersao-info-item { text-align: center; padding: 1rem; background: white; border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); }
        .imersao-info-value { font-size: 1.5rem; font-weight: 800; color: var(--color-imersao); }
        .imersao-info-label { font-size: 0.85rem; color: var(--color-text-muted); margin-top: 0.25rem; }
        .imersao-section { padding: var(--space-3xl) 0; }
        .imersao-section.alt { background: var(--color-background-alt); }
        .section-title { font-size: clamp(1.75rem, 4vw, 2.5rem); margin-bottom: var(--space-xl); text-align: center; }
        .section-title span { color: var(--color-imersao); }
        .schedule-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .schedule-card { background: white; border-radius: var(--radius-xl); padding: 2rem; box-shadow: var(--shadow-lg); border-top: 4px solid var(--color-imersao); }
        .schedule-day { font-size: 1.25rem; font-weight: 700; color: var(--color-imersao); margin-bottom: 0.25rem; }
        .schedule-time { font-size: 0.9rem; color: var(--color-text-muted); margin-bottom: 1rem; }
        .schedule-activities { display: flex; flex-direction: column; gap: 0.6rem; }
        .schedule-activity { display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; color: var(--color-text-light); }
        .schedule-activity::before { content: '🔸'; }
        .pillars-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .pillar-card { text-align: center; padding: 2rem; background: white; border-radius: var(--radius-xl); box-shadow: var(--shadow-lg); }
        .pillar-icon { font-size: 3rem; margin-bottom: 1rem; }
        .pillar-title { font-size: 1.25rem; font-weight: 700; color: var(--color-imersao); margin-bottom: 0.75rem; }
        .pillar-desc { font-size: 0.9rem; color: var(--color-text-light); line-height: 1.6; }
        .features-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem; }
        .feature-tag { padding: 0.75rem 1.5rem; background: var(--color-imersao); color: white; border-radius: 9999px; font-weight: 600; font-size: 0.9rem; }
        .cta-section { text-align: center; padding: var(--space-3xl) 0; background: var(--color-imersao); color: white; }
        .cta-title { color: white; margin-bottom: 1rem; }
        .cta-price { font-size: 3rem; font-weight: 800; margin-bottom: 0.5rem; }
        .cta-note { opacity: 0.8; margin-bottom: 2rem; }
        @media (max-width: 900px) { .schedule-grid, .pillars-grid { grid-template-columns: 1fr; } }
        @media (max-width: 768px) { .imersao-hero { padding: 100px 0 40px; min-height: auto; } .imersao-section { padding: var(--space-2xl) 0; } }
      `}</style>

            <main ref={heroRef}>
                <section className="imersao-hero">
                    <div className="container">
                        <span className="imersao-tag">🧡 3 DIAS PRESENCIAIS</span>
                        <h1 className="imersao-title">
                            <span>Imersão</span> do Simplificando
                        </h1>
                        <p className="imersao-subtitle">
                            Experiência presencial única para vivenciar a Jornada Link como se fosse real. 3 dias em São Paulo com dinâmicas, simulações e feedbacks ao vivo.
                        </p>
                        <div className="imersao-info">
                            <div className="imersao-info-item"><div className="imersao-info-value">3</div><div className="imersao-info-label">Dias</div></div>
                            <div className="imersao-info-item"><div className="imersao-info-value">SP</div><div className="imersao-info-label">Presencial</div></div>
                            <div className="imersao-info-item"><div className="imersao-info-value">20h+</div><div className="imersao-info-label">Atividades</div></div>
                            <div className="imersao-info-item"><div className="imersao-info-value">✓</div><div className="imersao-info-label">Coffee Break</div></div>
                        </div>
                        <motion.a href="https://wa.me/5511999999999" className="btn btn-primary btn-large" style={{ background: 'var(--color-imersao)' }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            Fazer minha inscrição
                        </motion.a>
                    </div>
                </section>

                <section className="imersao-section">
                    <div className="container">
                        <h2 className="section-title">Os 3 <span>Pilares</span> da Imersão</h2>
                        <div className="pillars-grid">
                            <div className="pillar-card"><div className="pillar-icon">🎭</div><h3 className="pillar-title">Vivência na Prática</h3><p className="pillar-desc">Experimente as etapas restantes da Jornada Link com banca avaliadora.</p></div>
                            <div className="pillar-card"><div className="pillar-icon">🤝</div><h3 className="pillar-title">Conexões Reais</h3><p className="pillar-desc">Conheça professores, especialistas e futuros colegas da Link.</p></div>
                            <div className="pillar-card"><div className="pillar-icon">📝</div><h3 className="pillar-title">Feedbacks</h3><p className="pillar-desc">Orientação individualizada logo após cada simulação.</p></div>
                        </div>
                    </div>
                </section>

                <section className="imersao-section alt">
                    <div className="container">
                        <h2 className="section-title">Cronograma da <span>Imersão</span></h2>
                        <div className="schedule-grid">
                            {schedule.map((day) => (
                                <motion.div key={day.day} className="schedule-card" whileHover={{ y: -4 }}>
                                    <div className="schedule-day">{day.day}</div>
                                    <div className="schedule-time">{day.time}</div>
                                    <div className="schedule-activities">
                                        {day.activities.map((act) => <div key={act} className="schedule-activity">{act}</div>)}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="imersao-section">
                    <div className="container">
                        <h2 className="section-title">O que está <span>incluso</span></h2>
                        <div className="features-grid">
                            {features.map((f) => <span key={f} className="feature-tag">✓ {f}</span>)}
                        </div>
                    </div>
                </section>

                <section className="cta-section">
                    <div className="container">
                        <h2 className="section-title cta-title">Garanta sua vaga na Imersão</h2>
                        <div className="cta-price">R$4.000</div>
                        <p className="cta-note">Lote atual • Em até 2x no PIX/boleto</p>
                        <motion.a href="https://wa.me/5511999999999" className="btn btn-large" style={{ background: 'white', color: 'var(--color-imersao)' }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            Falar com a equipe
                        </motion.a>
                    </div>
                </section>

                <Footer />
            </main>
        </>
    );
}
