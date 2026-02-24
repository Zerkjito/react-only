import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
}

interface ImageProps {
  src: string;
  alt: string;
}

export const Card = ({ children }: CardProps) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: '#fff',
        color: '#333',
      }}
    >
      {children}
    </div>
  );
};

const Header = ({ children }: CardProps) => {
  return (
    <div style={{ fontSize: '2rem', fontWeight: 'bold', padding: '1rem' }}>
      {children}
    </div>
  );
};

const Body = ({ children }: CardProps) => {
  return (
    <div
      style={{
        paddingBlock: '2.5rem',
        paddingInline: '2.5rem',
        flexGrow: '1',
      }}
    >
      {children}
    </div>
  );
};

const Footer = ({ children }: CardProps) => {
  return (
    <div
      style={{
        borderTop: '2px solid #1a1a1a',
        fontSize: '12px',
        paddingBlock: '1rem',
      }}
    >
      {children}
    </div>
  );
};

const CardImage = ({ src, alt }: ImageProps) => {
  return (
    <img
      style={{
        width: '100%',
        height: 'auto',
        display: 'block',
        objectFit: 'cover',
      }}
      src={src}
      alt={alt}
    />
  );
};

const Action = ({ children }: CardProps) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '10px',
        padding: '1rem',
      }}
    >
      {children}
    </div>
  );
};

Card.Header = Header;
Card.Body = Body;
Card.Footer = Footer;
Card.Image = CardImage;
Card.Action = Action;
