import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';

import TokenUtloper from './TokenUtloper';

jest.mock('../../util/getCookie', () => ({
  __esModule: true, // this property makes it work
  default: jest.fn().mockReturnValue('eyJraWQiOiJsb2NhbGhvc3Qtc2lnbmVyIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIxMjMyMSIsImF1ZCI6ImF1ZC1sb2NhbGhvc3QiLCJhY3IiOiJMZXZlbDQiLCJ2ZXIiOiIxLjAiLCJuYmYiOjE1ODkxODQzNjEsImF1dGhfdGltZSI6MTU4OTE4NDM2MSwiaXNzIjoiaXNzLWxvY2FsaG9zdCIsImV4cCI6MjM2Njc4NDM2MSwibm9uY2UiOiJteU5vbmNlIiwiaWF0IjoxNTg5MTg0MzYxLCJqdGkiOiI3MjA4NDI2ZS02YjIzLTRhZmMtYWZjNi1jYTJiYTliNDZiNzAifQ.aM4hkKAVHDR-n8_MRQoRHGxWVb3PMaXDEiBNCoUhSsDZCZwPdkWoRnPir6gfEkDdESPGX38fWoAxDyF6Q-1GsnN-uSPIOdytNKX-UWLLbgfQrXsevpd6DJ5XMGM-3gJkS5VTnwIe9aSuXDIuQ8ga7yJ4K_aaOV4hQtNfvSroDwsrAEZQPjN5_xKwY-Pv2FWdyeq15IGqar5Cv3QOKwSMkM_PqhNb5BY6AhNYt3Ui0j65Rvd7QWC3YuKtM_r3A-brdBHbwJDdTFWtd--HrMAbr4Di2SmmHUhUBtbxaleuni-D8DX5jsiy0gxegaEEqm-lc2cjsjyqhTamih_Gl_Ku4g'),
}));


describe('TokenUtloper', () => {
  it('should display the time', () => {
    render(<TokenUtloper />);
    expect(screen.getByText('09:06')).toBeInTheDocument();
  })
})
