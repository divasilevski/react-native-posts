import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
  Alert,
} from 'react-native';
import { DATA } from '../data';
import { THEME } from '../theme';

export const PostScreen = ({ navigation }) => {
  const postId = navigation.getParam('postId');

  const post = DATA.find((p) => p.id === postId);

  const removeHandler = () => {
    Alert.alert('Удаление поста', 'Вы уверены?', [
      { text: 'Отменить', style: 'cancel' },
      {
        text: 'Удалить',
        style: 'destructive',
        onPress: () => console.log('pressed'),
      },
    ]),
      { cancelable: false };
  };

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: post.img }} />
      <View style={styles.textWrap}>
        <Text style={styles.title}>{post.text}</Text>
      </View>
      <Button
        title="Удалить"
        color={THEME.DANGER_COLOR}
        onPress={removeHandler}
      />
    </ScrollView>
  );
};

PostScreen.navigationOptions = ({ navigation }) => {
  const date = navigation.getParam('date');
  const formatDate = new Date(date).toLocaleDateString();
  return {
    headerTitle: `пост от ${formatDate}`,
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
  textWrap: {
    padding: 10,
  },
  title: {
    fontFamily: 'open-regular',
  },
});
