import React from 'react';

interface BulkVisning {
  children: React.ReactNode,
  label: string
}

export const BulkVisning = ({ children, label }: BulkVisning ): React.ReactElement => {
  return <div className="skjemaelement">
    <span className="skjemaelement__label">
      <div>
        {label}
      </div>
    </span>
    <span className="radnr__value">
      {children}
    </span>
  </div>
};

export default BulkVisning;
