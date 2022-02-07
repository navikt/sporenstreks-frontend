import muligMaksimalRefusjon from './muligMaksimalRefusjon';

describe('muligMaksimalRefusjon', () => {
  it('shoould calculate the correct number', () => {
    expect(muligMaksimalRefusjon(15600, 10)).toBe(3600);
  });

  it('shoould calculate an other correct number', () => {
    expect(muligMaksimalRefusjon(7800, 5)).toBe(900);
  });
});
