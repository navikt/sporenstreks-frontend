import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import hentInnloggingUtlop, {HentInnloggingUtlopInterface} from './hentInnloggingUtlop';

const TokenUtloper = () => {
  const [utloper, setUtloper] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const innloggingUtloperTid: HentInnloggingUtlopInterface = await hentInnloggingUtlop();

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
