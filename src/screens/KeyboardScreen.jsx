import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { View, StyleSheet } from 'react-native';
import { CustomInput } from '../components/KeyboardScreen/CustomInput';

export const KeyboardScreen = ({}) => {
  return (
    <View style={styles.center}>
      <CustomInput />
    </View>
  );
};

KeyboardScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Кастомная клавиатура',
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});
