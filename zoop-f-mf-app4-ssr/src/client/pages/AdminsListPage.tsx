import React, { Component } from 'react';
import { connect } from 'react-redux';
import requireAuth from '../components/requireAuth';
import { fetchAdmins } from '../store/actions';

class AdminsListPage extends Component {
  public componentDidMount() {
    // if (!this.props.admins) {
    // Does not fetch if it has been done on the server side.
    this.props.fetchAdmins();
    // }
  }

  public renderAdmins() {
    return this.props.admins.map((admin) => <li key={admin.id}>{admin.name}</li>);
  }

  public render() {
    return (
      <div>
        List of Admins:
        <ul>{this.renderAdmins()}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { admins: state.admins };
}

// Returns a promise so SSR knows when its done.
function loadData(store) {
  // Dispatch action creator
  return store.dispatch(fetchAdmins()); // Server side redux store
}

export default {
  loadData,
  component: connect(mapStateToProps, { fetchAdmins })(requireAuth(AdminsListPage)),
};
