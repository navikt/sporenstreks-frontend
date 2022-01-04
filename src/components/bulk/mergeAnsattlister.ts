import { Ansatt } from './Ansatt';

export default (primary: Ansatt[], secondary: Ansatt[]) =>
  primary.map((item) => {
    const item2 = secondary.find((i2) => i2.fnr === item.fnr);
    return item2 ? { ...item, ...item2 } : item;
  });
