import React from 'react';

interface BulkVisningInterface {
  children: React.ReactNode;
  label: string;
}

export const BulkVisning = ({
  children,
  label
}: BulkVisningInterface): React.ReactElement => {
  return (
    <div className='skjemaelement'>
      <span className='skjemaelement__label'>
        <div>{label}</div>
      </span>
      <span className='radnr__value'>{children}</span>
    </div>
  );
};

export default BulkVisning;
