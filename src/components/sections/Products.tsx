'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const products = [
    {
        id: 'extensivo',
        name: 'Extensivo',
        duration: '3 meses',
        color: 'var(--color-extensivo)',
        icon: '💜',
        description: 'Preparação completa e detalhada com 12 módulos semanais, mentorias e aulas de inglês.',
        features: ['15h aulas gravadas', '20h aulas ao vivo', '3 mentorias', 'Aulas de inglês'],
        price: 'R$8.820',
        href: '/extensivo',
    },
    {
        id: 'intensivo',
        name: 'Intensivo',
        duration: '3 semanas',
        color: 'var(--color-intensivo)',
        icon: '💚',
        description: 'Preparação intensa e eficiente com simulações práticas de todas as etapas.',
        features: ['12h aulas ao vivo', 'Simulações práticas', 'Feedbacks detalhados', '1 mentoria'],
        price: 'R$5.000',
        href: '/intensivo',
    },
    {
        id: 'imersao',
        name: 'Imersão',
        duration: '3 dias',
        color: 'var(--color-imersao)',
        icon: '🧡',
        description: 'Experiência presencial única para vivenciar o processo seletivo como se fosse real.',
        features: ['Dinâmicas em grupo', 'Simulações completas', 'Feedbacks imediatos', 'Networking'],
        price: 'R$4.000',
        href: '/imersao',
    },
    {
        id: '360',
        name: '360',
        duration: 'Ano inteiro',
        color: 'var(--color-360)',
        icon: '🌎',
        description: 'Preparação completa para alunos do 3º ano do EM com 100% de aprovação.',
        features: ['64h aulas ao vivo', '25h aulas gravadas', '8 mentorias', 'Acesso ilimitado'],
        price: 'R$25.200',
        href: '/360',
    },
];

export default function Products() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (titleRef.current) {
                gsap.from(titleRef.current, {
                    scrollTrigger: { trigger: titleRef.current, start: 'top 80%' },
                    y: 60, opacity: 0, duration: 0.8,
                });
            }

            if (cardsRef.current) {
                gsap.from(cardsRef.current.children, {
                    scrollTrigger: { trigger: cardsRef.current, start: 'top 75%' },
                    y: 80, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out',
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <style jsx global>{`
        .products-section {
          padding: var(--space-3xl) 0;
          background: var(--color-background-alt);
        }
        
        .products-header {
          text-align: center;
          margin-bottom: var(--space-2xl);
        }
        
        .products-header h2 {
          margin-bottom: 1rem;
        }
        
        .products-header p {
          max-width: 600px;
          margin: 0 auto;
          color: var(--color-text-light);
        }
        
        .products-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        
        .product-card {
          height: 100%;
          cursor: pointer;
          background: white;
          border-radius: var(--radius-lg);
          padding: var(--space-lg);
          box-shadow: var(--shadow-md);
          position: relative;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-xl);
        }
        
        .product-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }
        
        .product-icon {
          font-size: 2rem;
        }
        
        .product-duration {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
        }
        
        .product-title {
          margin-bottom: 0.75rem;
          font-size: 1.25rem;
        }
        
        .product-description {
          font-size: 0.9rem;
          color: var(--color-text-light);
          margin-bottom: 1.25rem;
          line-height: 1.5;
        }
        
        .product-features {
          margin-bottom: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        
        .product-feature {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: var(--color-text-muted);
        }
        
        .product-price-wrapper {
          padding-top: 1rem;
          border-top: 1px solid rgba(0,0,0,0.08);
        }
        
        .product-price-label {
          font-size: 0.8rem;
          color: var(--color-text-muted);
        }
        
        .product-price {
          font-size: 1.35rem;
          font-weight: 700;
        }
        
        .pacote-cta {
          margin-top: var(--space-2xl);
          padding: var(--space-xl);
          background: var(--gradient-primary);
          border-radius: var(--radius-xl);
          color: white;
          text-align: center;
        }
        
        .pacote-title {
          margin-bottom: 1rem;
          color: white;
        }
        
        .pacote-description {
          margin-bottom: 1.5rem;
          opacity: 0.9;
        }
        
        .pacote-price {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
        }
        
        @media (max-width: 1200px) {
          .products-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 768px) {
          .products-section {
            padding: var(--space-2xl) 0;
          }
          
          .products-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .product-card {
            padding: var(--space-md);
          }
          
          .pacote-cta {
            padding: var(--space-lg);
          }
          
          .pacote-price {
            font-size: 2rem;
          }
        }
        
        @media (max-width: 480px) {
          .product-title {
            font-size: 1.1rem;
          }
          
          .product-description {
            font-size: 0.85rem;
          }
        }
      `}</style>

            <section ref={sectionRef} className="products-section">
                <div className="container">
                    <div ref={titleRef} className="products-header">
                        <h2>Nossos <span className="text-gradient">Cursos</span></h2>
                        <p>Escolha a preparação ideal para a sua jornada até a Link School of Business</p>
                    </div>

                    <div ref={cardsRef} className="products-grid">
                        {products.map((product) => (
                            <Link key={product.id} href={product.href}>
                                <motion.div
                                    className="product-card"
                                    style={{ borderTop: `4px solid ${product.color}` }}
                                    whileHover={{ y: -8 }}
                                >
                                    <div className="product-header">
                                        <span className="product-icon">{product.icon}</span>
                                        <span
                                            className="product-duration"
                                            style={{ background: `${product.color}20`, color: product.color }}
                                        >
                                            {product.duration}
                                        </span>
                                    </div>

                                    <h4 className="product-title" style={{ color: product.color }}>
                                        {product.name}
                                    </h4>

                                    <p className="product-description">{product.description}</p>

                                    <ul className="product-features">
                                        {product.features.map((feature, index) => (
                                            <li key={index} className="product-feature">
                                                <span style={{ color: product.color }}>✓</span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="product-price-wrapper">
                                        <span className="product-price-label">A partir de</span>
                                        <div className="product-price" style={{ color: product.color }}>
                                            {product.price}
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>

                    <motion.div
                        className="pacote-cta"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                    >
                        <h3 className="pacote-title">🎁 Pacote Simplificando</h3>
                        <p className="pacote-description">
                            Combine Extensivo + Intensivo + Imersão e ganhe R$2.690 de desconto
                        </p>
                        <div className="pacote-price">R$15.770</div>
                        <motion.button
                            className="btn"
                            style={{ background: 'white', color: 'var(--color-primary)', fontWeight: 600 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Quero o Pacote Completo
                        </motion.button>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
