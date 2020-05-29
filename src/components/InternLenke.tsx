import React from 'react';
import { Link } from 'react-router-dom';
import Lenke from 'nav-frontend-lenker';

interface InternLenkeProps {
  to?: string,
  children?: any,
  className?: string,
  onClick?: any
}

export const InternLenke: React.FC<InternLenkeProps> = ({to, children, className, onClick}: InternLenkeProps) => {
  const classes: string = ("lenke " + className).trim();
  const linkTo = to || ''

  if(to) {
    return <Link className={classes} to={linkTo}>{children}</Link>
  } else {
    return <Lenke className={className} href="#" onClick={onClick}>{children}</Lenke>
  }
}

export default InternLenke;
