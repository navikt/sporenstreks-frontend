import amplitude from 'amplitude-js';
import env from '../../util/environment';
import { useEffect, useRef } from 'react';
import constate from 'constate';
import { useAppStore } from '../../data/store/AppStore';

export const useAmplitudeInstance = constate(() => {
  const { unleash } = useAppStore();
  const unleashAmplitudeEnabled = unleash === undefined ? false : unleash['syfo.amplitude'];

  const instance: any = useRef({
    _userAgent: '',
    logEvent: (eventName: string, data?: any) => {
      if (unleashAmplitudeEnabled) {
        // eslint-disable-next-line
        console.log(`Logger ${eventName} - Event properties: ${JSON.stringify(data)}!`);
      }
      return 1;
    },
    init: () => {
      // console.log('Initialiserer mockAmplitude'); // eslint-disable-line
    }
  });

  useEffect(() => {
    if (unleashAmplitudeEnabled && env.amplitudeEnabled) {
      instance.current = amplitude.getInstance()
    }
    instance.current.init(
      env.amplitudeKey, null, {
        apiEndpoint: 'amplitude.nav.no/collect',
        saveEvents: false,
        includeUtm: true,
        batchEvents: false,
        includeReferrer: true,
        trackingOptions: {
          city: false,
          ip_address: false, // eslint-disable-line
          version_name: false, // eslint-disable-line
          region: false,
          country: false,
          dma: false,
        },
      },
    );
    instance.current._userAgent = '';
    // eslint-disable-next-line
  }, []);

  function logEvent(eventName: string, eventProperties: any) {
    instance.current.logEvent(eventName, eventProperties);
  }

  return { logEvent };
});
