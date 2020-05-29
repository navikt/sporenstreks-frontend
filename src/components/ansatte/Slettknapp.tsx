import React from 'react';
import InternLenke from '../InternLenke';

const DeleteIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m12 2c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm4.9 13.5-1.4 1.4-3.5-3.5-3.5 3.5-1.4-1.4 3.5-3.5-3.5-3.5 1.4-1.4 3.5 3.5 3.5-3.5 1.4 1.4-3.5 3.5 3.5 3.5z" /></svg>);

interface slettknappProps {
  onClick: any
}

const Slettknapp = ({ onClick }: slettknappProps) => {
  return (<InternLenke onClick={onClick} className={"slettknapp"}><DeleteIcon /><span>Slett</span></InternLenke >)
}

export default Slettknapp
