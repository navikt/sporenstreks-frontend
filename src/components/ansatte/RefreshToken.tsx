import React, { useState, useEffect } from 'react';
import env from '../../util/environment';
import './RefreshToken.less';

const RefreshToken = () => {
  const [displayIframe, setDisplayIframe] = useState(true);
  const [haveInteraction, setHaveInteraction] = useState(true);

  const toggleState = () => {
    setDisplayIframe(displayIframe => !displayIframe);
    setHaveInteraction(false);
  }

  const interactionHandler = () => {
    setHaveInteraction(true);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if(haveInteraction) {
        toggleState();
      }
    }, 1200000);  // 20 minutter. Gir refresh av token hvert 40. minutt
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', interactionHandler);
    window.addEventListener('mousemove', interactionHandler);
    window.addEventListener('touchstart', interactionHandler);

    return () => {
      window.removeEventListener('keydown', interactionHandler);
      window.removeEventListener('mousemove', interactionHandler);
      window.removeEventListener('touchstart', interactionHandler);
    };
  }, []);

  return <>{displayIframe && <iframe name="jwt-refresh-token-iframe" className={"refresh-token-jwt"} src={env.loginServiceUrl} />}</>
}

export default RefreshToken;
