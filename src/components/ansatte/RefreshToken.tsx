import React, { useState, useEffect } from 'react';
import env from '../../util/environment';
import './RefreshToken.less';

const RefreshToken = () => {
  const [displayIframe, setDisplayIframe] = useState(true);


  const toggleState = () => {
    setDisplayIframe(displayIframe => !displayIframe);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      toggleState();
    }, 1200000);  // 20 minutter. Gir refresh av token hvert 40. minutt
    return () => clearInterval(interval);
  }, []);

  return <>{displayIframe && <iframe name="jwt-refresh-token-iframe" className={"refresh-token-jwt"} src={env.loginServiceUrl} />}</>
}

export default RefreshToken;
