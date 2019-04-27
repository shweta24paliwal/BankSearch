import React, { Component } from "react";
import axios from "axios";
import BanksList from "../BankList/BanksList";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./bankSearch.module.css";

class BanksSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: ["BENGALURU", "DELHI", "CHENNAI", "PUNE", "MUMBAI"],
      bankData: [],
      searchQuery: "",
      cityName: "BENGALURU",
      noResultsFound: false,
      loading: false,
      filteredData: [],
      noFilterResult: false
    };
  }

  componentDidMount() {
    this.getBankData();
  }

  getBankData = () => {
    this.setState({
      loading: true
    });

    axios
      .get(
        `https://vast-shore-74260.herokuapp.com/banks?city=${
          this.state.cityName
        }`
      )
      .then(response => {
        if (response.status === 200 && response.data.length > 0) {
          this.setState({
            bankData: response.data,
            noResultsFound: false,
            loading: false,
            filteredData: [],
            noFilterResult: false
          });
        } else {
          this.setState({
            bankData: [],
            noResultsFound: true,
            loading: false,
            filteredData: [],
            noFilterResult: false
          });
        }
      });
  };

  cityChangeHandler = e => {
    this.setState(
      {
        cityName: e.target.value,
        bankData: [],
        filteredData: [],
        noFilterResult: false,
        searchQuery: ""
      },
      () => {
        this.getBankData();
      }
    );
  };

  changeHandler = e => {
    this.setState({
      searchQuery: e.target.value,
      filteredData: [],
      noFilterResult: false
    });
  };

  toLowerCase(q) {
    if (q) {
      return q.toLowerCase();
    }
    return "";
  }

  keyPressHandler = e => {
    if (e.key === "Enter") {
      if (this.state.searchQuery.trim() !== "") {
        const data = [...this.state.bankData];

        const filteredData = data.filter(bank => {
          const q = this.state.searchQuery;
          const name =
            this.toLowerCase(bank.bank_name).indexOf(q.toLocaleLowerCase()) >=
            0;
          const address =
            this.toLowerCase(bank.address).indexOf(q.toLocaleLowerCase()) >= 0;
          const ifsc =
            this.toLowerCase(bank.ifsc)
              .toLowerCase()
              .indexOf(q.toLocaleLowerCase()) >= 0;
          const branch =
            this.toLowerCase(bank.branch).indexOf(q.toLocaleLowerCase()) >= 0;
          const city =
            this.toLowerCase(bank.city).indexOf(q.toLocaleLowerCase()) >= 0;
          const district =
            this.toLowerCase(bank.district).indexOf(q.toLocaleLowerCase()) >= 0;
          const state =
            this.toLowerCase(bank.state).indexOf(q.toLocaleLowerCase()) >= 0;

          return name || address || ifsc || branch || city || district || state;
        });

        if (filteredData.length > 0) {
          this.setState({
            filteredData: filteredData,
            noFilterResult: false
          });
        } else {
          this.setState({
            filteredData: [],
            noFilterResult: true
          });
        }
      }
    }
  };

  render() {
    const cities = this.state.cities.map((city, index) => {
      return <option key={index}>{city}</option>;
    });

    return (
      <div className={styles.mainContainer}>
        <h1 className={styles.heading}>Banks in the City</h1>

        <header className={styles.header}>
          <select
            value={this.state.cityName}
            className={styles.selectCity}
            onChange={this.cityChangeHandler}
          >
            {cities}
          </select>

          <input
            className={styles.searchQuery}
            type="text"
            placeholder="Search by Bank name, IFSC, Branch, Address, city , state etc..."
            onChange={this.searchHandler}
            value={this.state.searchQuery}
            onChange={this.changeHandler}
            onKeyPress={this.keyPressHandler}
          />
        </header>

        {this.state.noFilterResult && (
          <h4>No results for search query. Showing all the results.</h4>
        )}

        {this.state.loading && (
          <div className="loadingContainer">
            fetching results please wait...
            <div className="circle loadingAnimation" />
          </div>
        )}

        <BanksList
          filteredData={this.state.filteredData}
          bankName={this.state.cityName}
          data={this.state.bankData}
        />

        {this.state.noResultsFound && (
          <div>No results found for city: {this.state.cityName}</div>
        )}
        <SearchBar />
      </div>
    );
  }
}
export default BanksSearch;
