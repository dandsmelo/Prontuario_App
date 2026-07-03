import React from 'react';
import './style.css';

interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
  gapSize?: string;
}

export default function Carousel(props: Props) {
  const { children, style, gapSize } = props;
  return (
    <div
      className="carousel"
      style={{
        ...style,
        gap: gapSize,
      }}
    >
      {children}
    </div>
  );
}
