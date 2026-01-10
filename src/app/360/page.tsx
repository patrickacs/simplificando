'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import Footer from '@/components/sections/Footer';

gsap.registerPlugin(ScrollTrigger);

const whyPoints = [
    { icon: '🎯', title: 'Acesso Ampliado aos Mentores', desc: 'Turma menor = mais proximidade e orientação direta.' },
    { icon: '🚀', title: 'Preparação para a Vida', desc: 'Mais que passar na Jornada, desenvolva habilidades para sua carreira.' },
    { icon: '🏆', title: '100% de Aprovação em 2024', desc: 'Resultados comprovados com histórias de sucesso.' },
];

const structure = [
    { name: 'Extensivo', period: 'Início do ano', desc: 'Base completa de habilidades' },
    { name: 'Intensivo', period: 'Meio e final do ano', desc: 'Consolidação prática' },
    { name: '360 Exclusivo', period: 'Agosto', desc: 'Módulos diferenciados' },
];

const exclusiveModules = [
    'Autoconhecimento II', 'Produtividade', 'Comunicação Efetiva', 'People Skills',
    'Inteligência Artificial', 'Google Sheets', 'Resolução de Cases (6 turmas)',
];

const skills = ['Autoconhecimento', 'Comunicação e storytelling', 'Língua inglesa', 'Matemática e raciocínio lógico', 'Resolução de problemas', 'Trabalho em equipe'];

export default function Page360() {
    const heroRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.page360-title', { y: 60, opacity: 0, duration: 0.8, delay: 0.3 });
            gsap.from('.page360-subtitle', { y: 40, opacity: 0, duration: 0.8, delay: 0.5 });
        }, heroRef);
        return () => ctx.revert();
    }, []);

    return (
        <>
            <style jsx global>{`
        .page360-hero { min-height: 60vh; display: flex; align-items: center; padding: 120px 0 60px; background: linear-gradient(180deg, rgba(52, 152, 219, 0.08) 0%, transparent 100%); }
        .page360-tag { display: inline-block; padding: 0.5rem 1rem; background: var(--color-360); color: white; border-radius: 9999px; font-size: 0.85rem; font-weight: 600; margin-bottom: 1rem; }
        .page360-title { font-size: clamp(2.5rem, 6vw, 4.5rem); margin-bottom: 1rem; }
        .page360-title span { color: var(--color-360); }
        .page360-subtitle { font-size: clamp(1rem, 2vw, 1.25rem); color: var(--color-text-light); max-width: 700px; line-height: 1.7; margin-bottom: 2rem; }
        .page360-badge { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.25rem; background: rgba(52, 152, 219, 0.1); border-radius: 9999px; font-weight: 600; color: var(--color-360); margin-bottom: 2rem; font-size: 1rem; }
        .page360-info { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
        .page360-info-item { text-align: center; padding: 1rem; background: white; border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); }
        .page360-info-value { font-size: 1.5rem; font-weight: 800; color: var(--color-360); }
        .page360-info-label { font-size: 0.85rem; color: var(--color-text-muted); margin-top: 0.25rem; }
        .page360-section { padding: var(--space-3xl) 0; }
        .page360-section.alt { background: var(--color-background-alt); }
        .section-title { font-size: clamp(1.75rem, 4vw, 2.5rem); margin-bottom: var(--space-xl); text-align: center; }
        .section-title span { color: var(--color-360); }
        .why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .why-card { text-align: center; padding: 2rem; background: white; border-radius: var(--radius-xl); box-shadow: var(--shadow-lg); }
        .why-icon { font-size: 3rem; margin-bottom: 1rem; }
        .why-title { font-size: 1.1rem; font-weight: 700; color: var(--color-360); margin-bottom: 0.5rem; }
        .why-desc { font-size: 0.9rem; color: var(--color-text-light); line-height: 1.5; }
        .structure-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .structure-card { padding: 2rem; background: white; border-radius: var(--radius-xl); box-shadow: var(--shadow-lg); border-left: 4px solid var(--color-360); }
        .structure-name { font-size: 1.25rem; font-weight: 700; color: var(--color-360); margin-bottom: 0.25rem; }
        .structure-period { font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 0.5rem; }
        .structure-desc { font-size: 0.9rem; color: var(--color-text-light); }
        .modules-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.75rem; }
        .module-tag { padding: 0.6rem 1.25rem; background: var(--color-360); color: white; border-radius: 9999px; font-weight: 500; font-size: 0.85rem; }
        .skills-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem; }
        .skill-tag { padding: 0.75rem 1.5rem; background: rgba(52, 152, 219, 0.1); color: var(--color-360); border-radius: 9999px; font-weight: 600; font-size: 0.9rem; }
        .cta-section { text-align: center; padding: var(--space-3xl) 0; background: var(--color-360); color: white; }
        .cta-title { color: white; margin-bottom: 1rem; }
        .cta-price { font-size: 3rem; font-weight: 800; margin-bottom: 0.5rem; }
        .cta-note { opacity: 0.8; margin-bottom: 2rem; }
        @media (max-width: 900px) { .why-grid, .structure-grid { grid-template-columns: 1fr; } }
        @media (max-width: 768px) { .page360-hero { padding: 100px 0 40px; min-height: auto; } .page360-section { padding: var(--space-2xl) 0; } }
      `}</style>

            <main ref={heroRef}>
                <section className="page360-hero">
                    <div className="container">
                        <span className="page360-tag">🌎 ANO INTEIRO</span>
                        <h1 className="page360-title">
                            Simplificando <span>360</span>
                        </h1>
                        <p className="page360-subtitle">
                            O curso exclusivo para alunos do 3º ano do Ensino Médio. Preparação completa durante todo o ano com 100% de aprovação.
                        </p>
                        <div className="page360-badge">⚡ 100% de aprovação em 2024</div>
                        <div className="page360-info">
                            <div className="page360-info-item"><div className="page360-info-value">64h</div><div className="page360-info-label">Aulas ao Vivo</div></div>
                            <div className="page360-info-item"><div className="page360-info-value">25h</div><div className="page360-info-label">Aulas Gravadas</div></div>
                            <div className="page360-info-item"><div className="page360-info-value">8</div><div className="page360-info-label">Mentorias</div></div>
                            <div className="page360-info-item"><div className="page360-info-value">2x</div><div className="page360-info-label">Jornadas</div></div>
                        </div>
                        <motion.a href="https://wa.me/5511999999999" className="btn btn-primary btn-large" style={{ background: 'var(--color-360)' }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            Quero garantir minha vaga
                        </motion.a>
                    </div>
                </section>

                <section className="page360-section">
                    <div className="container">
                        <h2 className="section-title">Por que o <span>360</span>?</h2>
                        <div className="why-grid">
                            {whyPoints.map((p) => (
                                <motion.div key={p.title} className="why-card" whileHover={{ y: -4 }}>
                                    <div className="why-icon">{p.icon}</div>
                                    <h3 className="why-title">{p.title}</h3>
                                    <p className="why-desc">{p.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="page360-section alt">
                    <div className="container">
                        <h2 className="section-title">Estrutura do <span>Curso</span></h2>
                        <div className="structure-grid">
                            {structure.map((s) => (
                                <motion.div key={s.name} className="structure-card" whileHover={{ y: -4 }}>
                                    <div className="structure-name">{s.name}</div>
                                    <div className="structure-period">{s.period}</div>
                                    <div className="structure-desc">{s.desc}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="page360-section">
                    <div className="container">
                        <h2 className="section-title">Módulos <span>Exclusivos</span></h2>
                        <div className="modules-grid">
                            {exclusiveModules.map((m) => <span key={m} className="module-tag">{m}</span>)}
                        </div>
                    </div>
                </section>

                <section className="page360-section alt">
                    <div className="container">
                        <h2 className="section-title">Habilidades <span>Desenvolvidas</span></h2>
                        <div className="skills-grid">
                            {skills.map((s) => <span key={s} className="skill-tag">🚀 {s}</span>)}
                        </div>
                    </div>
                </section>

                <section className="cta-section">
                    <div className="container">
                        <h2 className="section-title cta-title">Garanta sua vaga no 360</h2>
                        <div className="cta-price">R$23.920</div>
                        <p className="cta-note">À vista com 5% de desconto | Parcele em até 8x</p>
                        <motion.a href="https://wa.me/5511999999999" className="btn btn-large" style={{ background: 'white', color: 'var(--color-360)' }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            Falar com a equipe
                        </motion.a>
                    </div>
                </section>

                <Footer />
            </main>
        </>
    );
}
