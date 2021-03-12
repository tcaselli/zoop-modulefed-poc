import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../store/actions';
import { Helmet } from 'react-helmet';

class UsersListPage extends Component {
  public componentDidMount() {
    // if (!this.props.users) {
    // Does not fetch if it has been done on the server side.
    this.props.fetchUsers();
    // }
  }

  public renderUsers() {
    return this.props.users.map((user) => <li key={user.id}>{user.name}</li>);
  }

  public head() {
    // Use a single string if you make dynamicly generated head tags.
    return (
      <Helmet>
        <title>{`${this.props.users.length} Users`}</title>
        <meta property="og:title" content="Users App" />
      </Helmet>
    );
  }

  public render() {
    return (
      <div>
        {this.head()}
        List of Users:
        <ul>{this.renderUsers()}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { users: state.users };
}

// Returns a promise so SSR knows when its done.
function loadData(store) {
  // Dispatch action creator
  return store.dispatch(fetchUsers()); // Server side redux store
}

export default {
  loadData,
  component: connect(mapStateToProps, { fetchUsers })(UsersListPage),
};
