import React, { Component, PropTypes } from 'react';

class Paginator extends Component {
  static propTypes = {
    pageSize: PropTypes.number,
    selectedPage: PropTypes.number,
    gotoPage: PropTypes.func.isRequired,
    total: PropTypes.number,
  };

  static defaultProps = {
    pageSize: 20,
    selectedPage: 0,
    total: 0,
  };

  render() {
    const { selectedPage, pageSize, total } = this.props;
    const lastPage = Math.ceil(total / pageSize);
    return (
      <div>
        <div>
          <button onClick={this.props.gotoPage(0)}>{'<<'}</button>
          <button onClick={this.props.gotoPage(selectedPage - 1)}>{'<'}</button>
          <span>{selectedPage}</span>
          <span>/</span>
          <span>{total}</span>
          <button onClick={this.props.gotoPage(selectedPage + 1)}>{'>'}</button>
          <button onClick={this.props.gotoPage(lastPage)}>{'>>'}</button>
        </div>
      </div>
    );
  }
}

export default Paginator;
