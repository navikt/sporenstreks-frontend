import React, { Component } from 'react';
import { getClassnameFromStatus } from "../util/getClassnameFromStatus";
import { Ytelsesperiode } from "../store/types/helseSpionTypes";
import { Keys } from "../locales/keys";
import { WithTranslation, withTranslation } from "react-i18next";
import { filterYtelsesperioder } from "../util/filterYtelsesperioder";
import { totalRefundInYtelsesperioder } from "../util/totalRefundInYtelsesperioder";
import { sortYtelsesperioder } from "../util/sortYtelsesperioder";
import { thousandSeparation } from "../util/thousandSeparation";
import Pagination from "./Pagination";
import './YtelsesperiodeTable.less';
import { dateToString } from "../util/dateToString";

interface Props extends WithTranslation{
  ytelsesperioder: Ytelsesperiode[]
  fom: Date | undefined
  tom: Date | undefined
  t: (str: string) => string
}

type State = {
  sortColumn: number
  sortDescending: boolean
}

class YtelsesperiodeTable extends Component<Props, State> {
  state: State = {
    sortColumn: -1,
    sortDescending: true,
  };
  
  setSort = (index: number): void =>
    this.state.sortColumn === index
      ? this.setState({ sortDescending: !this.state.sortDescending })
      : this.setState({ sortColumn: index, sortDescending: true });
  
  render() {
    
    const { ytelsesperioder, fom, tom, t } = this.props;
    const { sortColumn, sortDescending } = this.state;
    
    const filteredYtelsesperioder = filterYtelsesperioder(ytelsesperioder, fom, tom);
    const totalRefund = totalRefundInYtelsesperioder(filteredYtelsesperioder);
    const sortedYtelsesperioder = sortYtelsesperioder(filteredYtelsesperioder, sortColumn, sortDescending);
    
    const columnHeaders: string[] = [
      t(Keys.PERIOD),
      t(Keys.STATUS),
      t(Keys.BENEFIT),
      t(Keys.GRADE),
      t(Keys.MARK),
      t(Keys.REFUND),
    ];
    
    const items: JSX.Element[] = sortedYtelsesperioder.map((ytelsesperiode, index ) =>
      <tr key={index}>
        <td>{`${dateToString(ytelsesperiode.periode.fom)} - ${dateToString(ytelsesperiode.periode.tom)}`}</td>
        <td>
          <span
            className={"ytelsesperiode-tabell__sirkel ytelsesperiode-tabell__sirkel--" +
            getClassnameFromStatus(ytelsesperiode.status)}
          />
          {t(ytelsesperiode.status)}
        </td>
        <td>{ytelsesperiode.ytelse}</td>
        <td>{ytelsesperiode.grad}</td>
        <td>{ytelsesperiode.merknad}</td>
        <td>{thousandSeparation(ytelsesperiode.refusjonsbeløp)}</td>
      </tr>);
    
    const wrapperFunction = (items: JSX.Element[]): JSX.Element =>
      <table className="tabell tabell--stripet ytelsesperiode-tabell--tabell">
      <thead>
      <tr>
        {
          columnHeaders.map((columnHeader, index) => {
            if (sortColumn === index) {
              return sortDescending
                ? <th
                  key={index}
                  role="columnheader"
                  className="tabell__th--sortert-desc"
                  aria-sort="descending"
                  onClick={() => this.setSort(index)}>
                  <a>{columnHeader}</a>
                </th>
                : <th
                  key={index}
                  role="columnheader"
                  className="tabell__th--sortert-asc"
                  aria-sort="ascending"
                  onClick={() => this.setSort(index)}>
                  <a>{columnHeader}</a>
                </th>
            } else {
              return <th
                key={index}
                role="columnheader"
                aria-sort="none"
                onClick={() => this.setSort(index)}>
                <a>{columnHeader}</a></th>
            }
          })
        }
      </tr>
      </thead>
      <tbody>
        {items}
      </tbody>
    </table>;
  
    return <Pagination wrapperFunction={wrapperFunction} items={items}>
      <div className="ytelsesperiode-tabell--footer">
        <div className="ytelsesperiode-tabell--max-dato">
          Maxdato: <b>15.03.20</b>
        </div>
        <div className="ytelsesperiode-tabell--total">
          {t(Keys.TOTAL_REFUNDED)}{fom && tom ? ` ${dateToString(fom)} - ${dateToString(tom)}` : ''}
          : <b>{thousandSeparation(totalRefund)}</b>
        </div>
      </div>
    </Pagination>
  }
}

export default withTranslation()(YtelsesperiodeTable);
