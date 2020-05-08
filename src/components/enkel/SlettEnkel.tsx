import React from 'react';
import { useAppStore } from '../../data/store/AppStore';
import Slettknapp from '../ansatte/Slettknapp';

interface SlettEnkelProps {
  id: string
}

const SlettEnkel = ({ id }: SlettEnkelProps) => {
  const { perioder, setPerioder } = useAppStore();
  const periode = perioder.find(p => p.id === id);
  const onChange = () => {
    if (periode){
    }
    setPerioder([...perioder]);
  };
  return (
    <Slettknapp onClick={onChange}/>
  )
}

export default SlettEnkel;
