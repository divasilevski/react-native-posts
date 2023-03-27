import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
  Alert,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { AppHeaderIcon } from "../components/AppHeaderIcon";
import { THEME } from "../theme";
import { removePost, toggleBooked } from "../store/actions/post";

export const PostScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const postId = route.params.postId;

  const post = useSelector((state) =>
    state.post.allPosts.find((post) => post.id === postId)
  );

  const booked = useSelector((state) =>
    state.post.bookedPosts.some((post) => post.id === postId)
  );

  React.useEffect(() => {
    navigation.setParams({ booked });
  }, [booked]);

  const toggleHandler = React.useCallback(() => {
    dispatch(toggleBooked(post));
  }, [dispatch, post]);

  const removeHandler = () => {
    Alert.alert("Удаление поста", "Вы уверены?", [
      { text: "Отменить", style: "cancel" },
      {
        text: "Удалить",
        style: "destructive",
        onPress: () => {
          navigation.goBack();
          dispatch(removePost(postId));
        },
      },
    ]),
      { cancelable: false };
  };

  const setNavigationOptions = () => {
    const date = route.params.date;
    const formatDate = new Date(date).toLocaleDateString();
    const booked = route.params.booked;
    const iconName = booked ? "ios-star" : "ios-star-outline";

    navigation.setOptions({
      title: `пост от ${formatDate}`,
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item title="Stared" iconName={iconName} onPress={toggleHandler} />
        </HeaderButtons>
      ),
    });
  };

  React.useEffect(() => {
    setNavigationOptions();
  });

  if (!post) return null;

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

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  textWrap: {
    padding: 10,
  },
  title: {
    fontFamily: "open-regular",
  },
});
