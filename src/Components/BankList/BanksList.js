import React, { Component } from "react";
import styles from "./banksList.module.css";

class BanksList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 5,
      pageNumber: 1,
      inputCount: 5
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.bankName !== nextProps.baseName) {
      this.setState({
        pageNumber: 1
      });
    }
  }

  paginationHandler = () => {
    this.setState({
      pageNumber: this.state.pageNumber + 1
    });
  };

  changeHandler = () => {
    let inputCount = this.state.inputCount;
    if (inputCount) {
      inputCount = parseInt(inputCount, 10);
      if (inputCount > 0) {
        this.setState({
          count: inputCount,
          pageNumber: 1
        });
      } else {
        alert("Invalid count input");
      }
    }
  };

  inputHandler = e => {
    this.setState({
      inputCount: e.target.value
    });
  };

  render() {
    const data = this.props.data;
    const filteredData = this.props.filteredData;

    if (data.length === 0) {
      return null;
    }

    let bankList = data;

    if (filteredData.length > 0) {
      bankList = filteredData;
    }

    const totalResults = bankList.length;
    const showLoadMore =
      this.state.count * this.state.pageNumber < totalResults;

    const tableBodyList = bankList
      .slice(0, this.state.count * this.state.pageNumber)
      .map((bank, index) => {
        return (
          <tr key={index}>
            <td>{bank.bank_name}</td>
            <td>{bank.ifsc}</td>
            <td>{bank.branch}</td>
            <td>{bank.address}</td>
            <td>{bank.city}</td>
            <td>{bank.district}</td>
            <td>{bank.state}</td>
          </tr>
        );
      });

    return (
      <div>
        <div className={styles.heading}>
          Total Results: <b>{totalResults}</b>
        </div>
        <div className={styles.changeCountCtn}>
          <b>Change result count:</b>
          <input
            className={styles.count}
            type="number"
            onChange={this.inputHandler}
            name="quantity"
            value={this.state.inputCount}
            min="1"
            max="20"
          />
          <button className={styles.countSubmit} onClick={this.changeHandler}>
            Submit
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Bank Name</th>
              <th>IFSC code</th>
              <th>Branch</th>
              <th>Address</th>
              <th>City</th>
              <th>District</th>
              <th>state</th>
            </tr>
          </thead>
          <tbody>{tableBodyList}</tbody>
        </table>
        {showLoadMore && (
          <button className={styles.loadMore} onClick={this.paginationHandler}>
            Load More
          </button>
        )}
      </div>
    );
  }
}
export default BanksList;
