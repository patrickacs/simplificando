'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import Footer from '@/components/sections/Footer';

gsap.registerPlugin(ScrollTrigger);

const modules = [
    { title: 'Introdução ao Empreendedorismo e à Jornada Link', desc: 'Tudo sobre a Link, seu ecossistema, professores e o processo seletivo.' },
    { title: 'Autoconhecimento', desc: 'Autoanálise completa para destacar suas características na Jornada.' },
    { title: 'Oratória & Storytelling', desc: 'Técnicas práticas para se comunicar melhor.' },
    { title: 'PREP', desc: 'Foco nas entregas da primeira etapa da Jornada Link.' },
    { title: 'Criatividade e Inovação', desc: 'Desbloqueie sua criatividade, um dos critérios mais avaliados.' },
    { title: 'CASES', desc: 'Método Simplificando para resolução de cases de negócios.' },
    { title: 'Redação e Comunicação Escrita', desc: 'Análise e atividades para uma ótima produção textual.' },
    { title: 'Unit Economics e Investimento', desc: 'Indicadores de negócios e mundo dos investimentos.' },
    { title: 'Planos de Negócios', desc: 'Frameworks para análises de empresas e resolução de cases.' },
    { title: 'GROUP SESSION', desc: 'Trabalho em equipe e técnicas para dinâmicas em grupo.' },
    { title: 'ENTREVISTA', desc: 'Comunicação, improviso e gestão emocional.' },
    { title: 'Autoconfiança e Gestão Emocional', desc: 'Técnicas para o nervosismo e ansiedade.' },
];

const skills = ['Autoconhecimento', 'Comunicação e storytelling', 'Língua inglesa', 'Matemática e raciocínio lógico', 'Resolução de problemas', 'Trabalho em equipe'];

export default function ExtensivoPage() {
    const heroRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.extensivo-title', { y: 60, opacity: 0, duration: 0.8, delay: 0.3 });
            gsap.from('.extensivo-subtitle', { y: 40, opacity: 0, duration: 0.8, delay: 0.5 });
            gsap.from('.module-card', { scrollTrigger: { trigger: '.modules-grid', start: 'top 80%' }, y: 60, opacity: 0, stagger: 0.1, duration: 0.6 });
        }, heroRef);
        return () => ctx.revert();
    }, []);

    return (
        <>
            <style jsx global>{`
        .extensivo-hero { min-height: 60vh; display: flex; align-items: center; padding: 120px 0 60px; background: linear-gradient(180deg, rgba(155, 89, 182, 0.08) 0%, transparent 100%); }
        .extensivo-tag { display: inline-block; padding: 0.5rem 1rem; background: var(--color-extensivo); color: white; border-radius: 9999px; font-size: 0.85rem; font-weight: 600; margin-bottom: 1rem; }
        .extensivo-title { font-size: clamp(2.5rem, 6vw, 4.5rem); margin-bottom: 1rem; }
        .extensivo-title span { color: var(--color-extensivo); }
        .extensivo-subtitle { font-size: clamp(1rem, 2vw, 1.25rem); color: var(--color-text-light); max-width: 700px; line-height: 1.7; margin-bottom: 2rem; }
        .extensivo-info { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
        .extensivo-info-item { text-align: center; padding: 1rem; background: white; border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); }
        .extensivo-info-value { font-size: 1.5rem; font-weight: 800; color: var(--color-extensivo); }
        .extensivo-info-label { font-size: 0.85rem; color: var(--color-text-muted); margin-top: 0.25rem; }
        .extensivo-section { padding: var(--space-3xl) 0; }
        .extensivo-section.alt { background: var(--color-background-alt); }
        .section-title { font-size: clamp(1.75rem, 4vw, 2.5rem); margin-bottom: var(--space-xl); text-align: center; }
        .section-title span { color: var(--color-extensivo); }
        .modules-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem; }
        .module-card { background: white; border-radius: var(--radius-lg); padding: 1.5rem; box-shadow: var(--shadow-md); border-left: 4px solid var(--color-extensivo); transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .module-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
        .module-card h4 { font-size: 1rem; margin-bottom: 0.5rem; color: var(--color-extensivo); }
        .module-card p { font-size: 0.9rem; color: var(--color-text-light); line-height: 1.5; }
        .pillars-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .pillar-card { text-align: center; padding: 2rem; background: white; border-radius: var(--radius-xl); box-shadow: var(--shadow-lg); }
        .pillar-icon { font-size: 3rem; margin-bottom: 1rem; }
        .pillar-title { font-size: 1.25rem; font-weight: 700; color: var(--color-extensivo); margin-bottom: 0.75rem; }
        .pillar-desc { font-size: 0.9rem; color: var(--color-text-light); line-height: 1.6; }
        .skills-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem; }
        .skill-tag { padding: 0.75rem 1.5rem; background: var(--color-extensivo); color: white; border-radius: 9999px; font-weight: 600; font-size: 0.9rem; }
        .cta-section { text-align: center; padding: var(--space-3xl) 0; background: var(--color-extensivo); color: white; }
        .cta-title { color: white; margin-bottom: 1rem; }
        .cta-price { font-size: 3rem; font-weight: 800; margin-bottom: 0.5rem; }
        .cta-note { opacity: 0.8; margin-bottom: 2rem; }
        @media (max-width: 900px) { .pillars-grid { grid-template-columns: 1fr; } }
        @media (max-width: 768px) { .extensivo-hero { padding: 100px 0 40px; min-height: auto; } .extensivo-section { padding: var(--space-2xl) 0; } }
      `}</style>

            <main ref={heroRef}>
                <section className="extensivo-hero">
                    <div className="container">
                        <span className="extensivo-tag">💜 3 MESES</span>
                        <h1 className="extensivo-title">
                            <span>Extensivo</span> do Simplificando
                        </h1>
                        <p className="extensivo-subtitle">
                            Preparação completa e detalhada para a Jornada Link. Durante 3 meses, oferecemos o conteúdo mais abrangente, preparando você para os desafios do processo seletivo e para sua vida de empreendedor.
                        </p>
                        <div className="extensivo-info">
                            <div className="extensivo-info-item"><div className="extensivo-info-value">12</div><div className="extensivo-info-label">Semanas</div></div>
                            <div className="extensivo-info-item"><div className="extensivo-info-value">15h</div><div className="extensivo-info-label">Aulas Gravadas</div></div>
                            <div className="extensivo-info-item"><div className="extensivo-info-value">20h+</div><div className="extensivo-info-label">Aulas ao Vivo</div></div>
                            <div className="extensivo-info-item"><div className="extensivo-info-value">3</div><div className="extensivo-info-label">Mentorias</div></div>
                        </div>
                        <motion.a href="https://wa.me/5511999999999" className="btn btn-primary btn-large" style={{ background: 'var(--color-extensivo)' }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            Quero me inscrever
                        </motion.a>
                    </div>
                </section>

                <section className="extensivo-section">
                    <div className="container">
                        <h2 className="section-title">Os 3 <span>Pilares</span> do Extensivo</h2>
                        <div className="pillars-grid">
                            <div className="pillar-card"><div className="pillar-icon">📚</div><h3 className="pillar-title">Aulas Gravadas</h3><p className="pillar-desc">Conteúdo técnico em 12 módulos semanais. Cada módulo disponibilizado na segunda-feira.</p></div>
                            <div className="pillar-card"><div className="pillar-icon">🎯</div><h3 className="pillar-title">Aulas ao Vivo</h3><p className="pillar-desc">Dinâmicas práticas, resolução de problemas e feedbacks imediatos. Quintas, 18h-20h.</p></div>
                            <div className="pillar-card"><div className="pillar-icon">🤝</div><h3 className="pillar-title">Mentorias</h3><p className="pillar-desc">3 sessões personalizadas com mentores especializados nas áreas que você mais precisa.</p></div>
                        </div>
                    </div>
                </section>

                <section className="extensivo-section alt">
                    <div className="container">
                        <h2 className="section-title">Os <span>Módulos</span> do Curso</h2>
                        <div className="modules-grid">
                            {modules.map((mod, i) => (
                                <motion.div key={i} className="module-card" whileHover={{ y: -4 }}>
                                    <h4>{mod.title}</h4>
                                    <p>{mod.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="extensivo-section">
                    <div className="container">
                        <h2 className="section-title">Habilidades que você vai <span>desenvolver</span></h2>
                        <div className="skills-grid">
                            {skills.map((skill) => <span key={skill} className="skill-tag">🚀 {skill}</span>)}
                        </div>
                    </div>
                </section>

                <section className="cta-section">
                    <div className="container">
                        <h2 className="section-title cta-title">Garanta sua vaga no Extensivo</h2>
                        <div className="cta-price">R$8.820</div>
                        <p className="cta-note">Pagamento via PIX, boleto ou cartão</p>
                        <motion.a href="https://wa.me/5511999999999" className="btn btn-large" style={{ background: 'white', color: 'var(--color-extensivo)' }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            Falar com a equipe
                        </motion.a>
                    </div>
                </section>

                <Footer />
            </main>
        </>
    );
}
