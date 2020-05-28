import React from 'react';
import { Link } from 'react-router-dom';

interface InternLenkeProps {
  to: string,
  children?: any,
  className?: string,
}

export const InternLenke: React.FC<InternLenkeProps> = ({to, children, className}: InternLenkeProps) => {
  const classes: string = ("lenke " + className).trim();
  return <Link className="lenke " to={to}>{children}</Link>
}

export default InternLenke;
