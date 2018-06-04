import React from "react";

import SearchBar from "./search/search_bar";
import ToolBar from "./toolBar/tool_bar";
import UserList from "./userList/user_list";
import ActiveUser from "./activeUser/active_user";
import AddUser from "./addUser/add_user";

import load from "../actions/load";

const baseUrl = "http://localhost:52481";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      term: "",
      activeUser: 0,
      isSorted: { Name: true, Age: true },
      showAddUser: false
    };

    this.update = this.update.bind(this);
    this.showAddForm = this.showAddForm.bind(this);
    this.closeAddForm = this.closeAddForm.bind(this);
  }

  loadData() {
    //const { data } = this.props;
    load(`${baseUrl}/api/users`)
      .then(users => {
        this.initialData = JSON.parse(users);
        this.setState({
          data: this.initialData
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.loadData();
  }

  update(state) {
    this.setState(state);
  }

  showAddForm() {
    this.setState({
      showAddUser: !this.state.showAddUser
    });
  }

  closeAddForm() {
    this.setState({
      showAddUser: !this.state.showAddUser
    });
  }

  render() {
    //const guyToSearch = _.debounce(this.guyToSearch, 1000);
    const { data, activeUser, term, isSorted, showAddUser } = this.state;

    return (
      <div className="app container-fluid">
        <div className="row mt-4">
          <div className="col-12">
            <SearchBar
              term={term}
              data={this.initialData}
              update={this.update}
              onClickChange={this.update}
            />
          </div>
        </div>
        <div className="row">
          <ToolBar
            update={this.update}
            data={data}
            isSorted={isSorted}
            initialData={this.initialData}
            activeUser={activeUser}
          />
          <button
            type="button"
            className="btn btn-default ml-3 text-uppercase add-new-user"
            onClick={this.showAddForm}
          >
            Add new user
          </button>
        </div>

        <div className="row user-list-data">
          <div className="col-12 col-sm-8 col-md-9 col-lg-10 user-list">
            <UserList data={data} update={this.update} />
          </div>
          <div className="col-sm-4 col-md-3 col-lg-2 active-user">
            <ActiveUser data={data} activeUser={activeUser} />
          </div>
          {showAddUser ? (
            <AddUser
              update={this.update}
              showAddUser={showAddUser}
              onClick={this.closeAddForm}
              data={data}
            />
          ) : null}
        </div>
      </div>
    );
  }
}
