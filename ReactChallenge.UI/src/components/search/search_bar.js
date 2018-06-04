import React from "react";

class SearchBar extends React.Component {
  dataSearch(e) {
    const { data, update } = this.props;
    const value = e.target.value.toLowerCase();

    const filter = data.filter(user => {
      return user.Name.toLowerCase().includes(value);
    });

    update({
      data: filter,
      activeUser: 0,
      term: value
    });
  }

  render() {
    const { term } = this.props;
    return (
      <div className="search-name">
        <input
          className="form-control"
          type="text"
          placeholder="Search in here..."
          aria-label="Search"
          value={term}
          onChange={this.dataSearch.bind(this)}
        />
      </div>
    );
  }
}

export default SearchBar;

//eslint-disable-next-line
{
  /* // onClick={this.props.onClickChange}

<div className="row">
                    <div className="input-group">
                        <input type="search"
                            placeholder="input your request..."
                            onChange={this.onInputChange}
                        />
                    </div>
                </div> */
}
