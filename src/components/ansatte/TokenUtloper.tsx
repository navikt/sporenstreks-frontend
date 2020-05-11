import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import hentInnloggingUtløp, {HentInnggingUtløpInterface} from './hentInnloggingUtlop';

const TokenUtloper = () => {
  const [utloper, setUtloper] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const innloggingUtloperTid: HentInnggingUtløpInterface = await hentInnloggingUtløp();

      if(!innloggingUtloperTid || innloggingUtloperTid.status !== 200) {
        setUtloper('');
      }

      try {
        if(dayjs(innloggingUtloperTid.utcDTstring).isValid()) {
          setUtloper(dayjs(innloggingUtloperTid.utcDTstring).format("HH:mm"));
        } else {
          setUtloper('');
        }
      } catch (error) {
        setUtloper('');
      }
    }
    fetchData();
  }, [])

  return <>{utloper}</>
}

export default TokenUtloper;
