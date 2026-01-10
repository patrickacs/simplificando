'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
    {
        question: 'O que é o Simplificando?',
        answer: 'O Simplificando é um cursinho preparatório para a Jornada Link, o processo seletivo da Link School of Business. Oferecemos Extensivo (3 meses), Intensivo (3 semanas), Imersão (3 dias presencial) e 360 (ano inteiro para 3º ano EM).',
    },
    {
        question: 'Os cursos são online ou presenciais?',
        answer: 'Nossos cursos são 100% online, exceto a Imersão que é presencial em São Paulo. Todas as aulas ficam gravadas para você assistir quando quiser.',
    },
    {
        question: 'Qual a diferença entre os cursos?',
        answer: 'Extensivo: preparação completa de 3 meses. Intensivo: 3 semanas focadas em simulações. Imersão: experiência presencial de 3 dias. 360: curso anual para alunos do 3º ano do EM.',
    },
    {
        question: 'Qual o diferencial do Simplificando?',
        answer: 'Temos 84% de aprovação, +255 alunos aprovados e 4 primeiros lugares nas últimas Jornadas. Nossos mentores são ex-alunos da Link.',
    },
    {
        question: 'Como funciona o pagamento?',
        answer: 'Aceitamos PIX, boleto bancário e cartão de crédito. Para PIX e boleto, faça o pagamento e envie o comprovante pelo WhatsApp.',
    },
    {
        question: 'Moro fora do Brasil. Posso fazer o curso?',
        answer: 'Sim! Nossos cursos são online e você pode assistir de qualquer lugar. A exceção é a Imersão, que é presencial em SP.',
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <>
            <style jsx global>{`
        .faq-section {
          padding: var(--space-3xl) 0;
          background: var(--color-background-alt);
        }
        
        .faq-header {
          text-align: center;
          margin-bottom: var(--space-2xl);
        }
        
        .faq-header h2 {
          margin-bottom: 1rem;
        }
        
        .faq-list {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        
        .faq-item {
          background: white;
          border-radius: var(--radius-lg);
          overflow: hidden;
          transition: box-shadow 0.3s ease;
        }
        
        .faq-item.open {
          box-shadow: var(--shadow-lg);
        }
        
        .faq-question {
          width: 100%;
          padding: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-align: left;
          background: transparent;
          border: none;
          cursor: pointer;
          font-family: inherit;
          gap: 1rem;
        }
        
        .faq-question-text {
          font-size: 1rem;
          font-weight: 600;
          color: var(--color-text);
        }
        
        .faq-icon {
          font-size: 1.25rem;
          color: var(--color-primary);
          flex-shrink: 0;
          transition: transform 0.2s ease;
        }
        
        .faq-answer {
          padding: 0 1.25rem 1.25rem;
          font-size: 0.9rem;
          color: var(--color-text-light);
          line-height: 1.65;
        }
        
        .faq-cta {
          margin-top: var(--space-2xl);
          text-align: center;
        }
        
        .faq-cta p {
          margin-bottom: 1rem;
          color: var(--color-text-light);
        }
        
        .whatsapp-btn {
          background: #25D366 !important;
          gap: 0.6rem;
        }
        
        @media (max-width: 768px) {
          .faq-section {
            padding: var(--space-2xl) 0;
          }
          
          .faq-question {
            padding: 1rem;
          }
          
          .faq-question-text {
            font-size: 0.9rem;
          }
          
          .faq-answer {
            padding: 0 1rem 1rem;
            font-size: 0.85rem;
          }
        }
      `}</style>

            <section className="faq-section">
                <div className="container">
                    <motion.div
                        className="faq-header"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2>Perguntas <span className="text-gradient">Frequentes</span></h2>
                        <p style={{ color: 'var(--color-text-light)' }}>Tire suas dúvidas sobre nossos cursos</p>
                    </motion.div>

                    <div className="faq-list">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                className={`faq-item ${openIndex === index ? 'open' : ''}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <button
                                    className="faq-question"
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                >
                                    <span className="faq-question-text">{faq.question}</span>
                                    <motion.span
                                        className="faq-icon"
                                        animate={{ rotate: openIndex === index ? 45 : 0 }}
                                    >
                                        +
                                    </motion.span>
                                </button>

                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <p className="faq-answer">{faq.answer}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        className="faq-cta"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <p>Ainda ficou com dúvidas?</p>
                        <motion.a
                            href="https://wa.me/5511999999999"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary btn-large whatsapp-btn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span>💬</span>
                            Entre em Contato pelo WhatsApp
                        </motion.a>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
