'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const links = [
  {
    title: 'Cursos',
    items: [
      { name: 'Extensivo', href: '/extensivo' },
      { name: 'Intensivo', href: '/intensivo' },
      { name: 'Imersão', href: '/imersao' },
      { name: '360', href: '/360' },
    ],
  },
  {
    title: 'Links Úteis',
    items: [
      { name: 'Link School of Business', href: 'https://www.linkschool.com.br', external: true },
      { name: 'Sobre a Jornada', href: '#' },
    ],
  },
  {
    title: 'Contato',
    items: [
      { name: 'WhatsApp', href: 'https://wa.me/5511999999999', external: true },
      { name: 'Instagram', href: 'https://instagram.com/simplificandoajornada', external: true },
      { name: 'E-mail', href: 'mailto:simplificandoajornada@gmail.com' },
    ],
  },
];

export default function Footer() {
  return (
    <>
      <style jsx global>{`
        .footer {
          background: var(--color-background-dark);
          color: white;
          padding: var(--space-3xl) 0 var(--space-xl);
        }
        
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: var(--space-xl);
          margin-bottom: var(--space-2xl);
        }
        
        .footer-logo {
          height: 40px;
          width: auto;
          object-fit: contain;
          margin-bottom: 1rem;
        }
        
        .footer-brand p {
          font-size: 0.9rem;
          opacity: 0.8;
          line-height: 1.6;
          margin-bottom: 1.25rem;
        }
        
        .footer-socials {
          display: flex;
          gap: 0.75rem;
        }
        
        .footer-social {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          transition: transform 0.2s ease, background 0.2s ease;
        }
        
        .footer-social:hover {
          transform: scale(1.1);
          background: rgba(255,255,255,0.2);
        }
        
        .footer-links h4 {
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: white;
        }
        
        .footer-links ul {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        
        .footer-links a {
          font-size: 0.85rem;
          opacity: 0.7;
          transition: opacity 0.2s ease;
        }
        
        .footer-links a:hover {
          opacity: 1;
        }
        
        .footer-bottom {
          padding-top: var(--space-lg);
          border-top: 1px solid rgba(255,255,255,0.1);
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }
        
        .footer-bottom p {
          font-size: 0.8rem;
          opacity: 0.6;
        }
        
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
          
          .footer-brand {
            grid-column: span 2;
          }
        }
        
        @media (max-width: 600px) {
          .footer {
            padding: var(--space-2xl) 0 var(--space-lg);
          }
          
          .footer-grid {
            grid-template-columns: 1fr;
            gap: var(--space-lg);
          }
          
          .footer-brand {
            grid-column: span 1;
          }
          
          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <motion.div
              className="footer-brand"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Image
                src="/logos/white/LOGO HORIZONTAL BRANCA.png"
                alt="Simplificando a Jornada"
                width={180}
                height={40}
                className="footer-logo"
              />
              <p>
                O cursinho preparatório que mais aprova alunos na Jornada Link.
                Somos muito mais que um cursinho, somos uma família.
              </p>
              <div className="footer-socials">
                <a
                  href="https://instagram.com/simplificandoajornada"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social"
                >
                  📸
                </a>
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social"
                >
                  💬
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social"
                >
                  🎬
                </a>
              </div>
            </motion.div>

            {links.map((section, index) => (
              <motion.div
                key={section.title}
                className="footer-links"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h4>{section.title}</h4>
                <ul>
                  {section.items.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        target={item.external ? '_blank' : undefined}
                        rel={item.external ? 'noopener noreferrer' : undefined}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Simplificando a Jornada. Todos os direitos reservados.</p>
            <p>Feito com 💙 por Mateus e Jordana</p>
          </div>
        </div>
      </footer>
    </>
  );
}
