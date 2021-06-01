import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { DATA } from '../data';
import { PostList } from '../components/PostList';

export const BookmarkScreen = ({ navigation }) => {
  const openPostHandler = (post) => {
    navigation.navigate('Post', {
      postId: post.id,
      date: post.date,
      booked: post.booked,
    });
  };

  const data = DATA.filter((post) => post.booked);
  return <PostList data={data} onOpen={openPostHandler} />;
};

BookmarkScreen.navigationOptions = {
  headerTitle: 'Избранное',
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item
        title="Toggle drawer"
        iconName="ios-menu"
        onPress={() => console.log('press photo')}
      />
    </HeaderButtons>
  ),
};
