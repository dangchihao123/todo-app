import React, { Component } from "react";
import Search from "./Search";
import Sort from "./Sort";

class Control extends Component {
  render() {
    return (
      <>
        <Search keyword={this.props.keyword} />
        <Sort
          onSort={this.props.onSort}
          sortBy={this.props.sortBy}
          sortValue={this.props.sortValue}
        />
      </>
    );
  }
}

export default Control;
