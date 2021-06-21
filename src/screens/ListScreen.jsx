import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { View, StyleSheet } from 'react-native';
import { PullToRefreshListView } from '../components/PullToRefreshListView';

export const ListScreen = ({}) => {
  return (
    <View style={styles.center}>
      <PullToRefreshListView />
    </View>
  );
};

ListScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Кастомный список',
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item
        title="Toggle drawer"
        iconName="ios-menu"
        onPress={() => navigation.toggleDrawer()}
      />
    </HeaderButtons>
  ),
});

const styles = StyleSheet.create({
  center: {
    flex: 1,
  },
});
