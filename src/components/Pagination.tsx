import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import './Pagination.less';
import { Keys } from '../locales/keys';
import { WithTranslation, withTranslation } from 'react-i18next';

interface Props extends WithTranslation {
  items: JSX.Element[]
  wrapperFunction?: (items: JSX.Element[]) => JSX.Element
  itemsPerPage?: number
  pageRangeDisplayed?: number
  marginPagesDisplayed?: number
  t: (str: string) => string
}

type State = {
  currentPageIndex: number
}

class Pagination extends Component<Props, State> {
  state: State = {
    currentPageIndex: 0
  };

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
    if (this.props.items !== prevProps.items) {
      this.setState({ currentPageIndex: 0 });
    }
  }

  handlePageClick = (selectedIndex: number): void => {
    this.setState({ currentPageIndex: selectedIndex});
  };

  render() {
    const {
      items,
      wrapperFunction,
      itemsPerPage = 10,
      pageRangeDisplayed = 3,
      marginPagesDisplayed = 1,
      children,
      t,
    } = this.props;
    const { currentPageIndex } = this.state;

    const pageCount = Math.ceil(items.length / itemsPerPage);
    const startIndex = currentPageIndex * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, items.length);

    const filteredItems = items.slice(startIndex, endIndex);

    return <>
      {
        wrapperFunction
          ? wrapperFunction(filteredItems)
          : filteredItems
      }
      {
        children
      }
      {
        pageCount > 1 &&
        <ReactPaginate
          previousLabel={t(Keys.PREVIOUS)}
          nextLabel={t(Keys.NEXT)}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          forcePage={currentPageIndex}
          marginPagesDisplayed={marginPagesDisplayed}
          pageRangeDisplayed={pageRangeDisplayed}
          onPageChange={e => this.handlePageClick(e.selected)}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      }
    </>
  }
}

export default withTranslation()(Pagination);
