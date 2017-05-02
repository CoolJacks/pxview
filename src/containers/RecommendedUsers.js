import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserListContainer from './UserListContainer';
import * as recommendedUsersActionCreators from '../common/actions/recommendedUsers';
import { getRecommendedUsersItems } from '../common/selectors';

class RecommendedUsers extends Component {
  componentDidMount() {
    const { fetchRecommendedUsers } = this.props;
    fetchRecommendedUsers();
  }

  loadMoreItems = () => {
    const { fetchRecommendedUsers, recommendedUsers: { nextUrl, loading } } = this.props;
    if (!loading && nextUrl) {
      console.log('load more ', nextUrl);
      fetchRecommendedUsers(null, nextUrl);
    }
  }

  handleOnRefresh = () => {
    const { fetchRecommendedUsers, clearRecommendedUsers } = this.props;
    clearRecommendedUsers();
    fetchRecommendedUsers(null, null, true);
  }

  render() {
    const { recommendedUsers, items, navigation, screenProps } = this.props;
    return (
      <UserListContainer
        userList={{ ...recommendedUsers, items }}
        loadMoreItems={this.loadMoreItems}
        onRefresh={this.handleOnRefresh}
        screenProps={screenProps}
      />
    );
  }
}

export default connect(state => {
  const { recommendedUsers } = state;
  return {
    recommendedUsers,
    items: getRecommendedUsersItems(state),
  };
}, recommendedUsersActionCreators)(RecommendedUsers);
