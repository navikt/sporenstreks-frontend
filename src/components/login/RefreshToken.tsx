import React, { useEffect, useRef, useState } from 'react';
import env from '../felles/environment';

const RefreshToken = () => {
  const [displayIframe, setDisplayIframe] = useState(true);
  const [haveInteraction, setHaveInteraction] = useState(false);
  const [haveInteractionLastPeriod, setHaveInteractionLastPeriod] = useState(true);

  const haveInteractionRef = useRef(haveInteraction);
  haveInteractionRef.current = haveInteraction;

  const haveInteractionLastPeriodRef = useRef(haveInteractionLastPeriod);
  haveInteractionLastPeriodRef.current = haveInteractionLastPeriod;

  const toggleState = () => {
    setDisplayIframe(displayIframe => !displayIframe);
    setHaveInteractionLastPeriod(haveInteractionRef.current);
    setHaveInteraction(false);
  }

  const interactionHandler = () => {
    setHaveInteraction(true);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      toggleState();
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

  if (window.location !== window.parent.location) {
    return null;
  }

  if (!displayIframe || !haveInteractionLastPeriod) {
    return null;
  }

  return <iframe title="Invisible" name="refreshtoken-iframe" data-testid="refreshtoken-iframe" className="refreshtoken" src={env.loginServiceUrl} />;
}

export default RefreshToken;
