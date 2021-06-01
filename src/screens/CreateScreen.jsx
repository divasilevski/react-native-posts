import * as React from 'react';
import { useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Button,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { addPost } from '../store/actions/post';
import { THEME } from '../theme';

export const CreateScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [text, setText] = React.useState('');

  const img =
    'https://static.coindesk.com/wp-content/uploads/2019/01/shutterstock_1012724596-860x430.jpg';

  const saveHandler = () => {
    const post = {
      date: new Date().toJSON(),
      text: text,
      img: img,
      booked: false,
    };
    dispatch(addPost(post));
    navigation.navigate('Main');
  };
  return (
    <ScrollView>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.wrapper}>
          <Text style={styles.title}>Новый пост</Text>
          <TextInput
            style={styles.textArea}
            value={text}
            onChangeText={setText}
            placeholder="Введите текст поста"
            multiline
          />
          <Image
            style={styles.image}
            source={{
              uri: img,
            }}
          />
          <Button
            title="Создать"
            color={THEME.MAIN_COLOR}
            onPress={saveHandler}
          />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

CreateScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Создать пост',
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
  wrapper: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'open-regular',
    marginVertical: 10,
  },
  textArea: {
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
});
