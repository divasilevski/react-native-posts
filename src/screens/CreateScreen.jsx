import * as React from "react";
import { useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { addPost } from "../store/actions/post";
import { THEME } from "../theme";
import { PhotoPicker } from "../components/PhotoPicker";

export const CreateScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [text, setText] = React.useState("");
  const imgRef = React.useRef();

  const saveHandler = () => {
    const post = {
      date: new Date().toJSON(),
      text: text,
      img: imgRef.current,
      booked: false,
    };
    dispatch(addPost(post));
    navigation.navigate("Main");
  };

  const photoPickHandler = (uri) => {
    imgRef.current = uri;
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
          <PhotoPicker onPick={photoPickHandler} />
          <Button
            title="Создать"
            color={THEME.MAIN_COLOR}
            onPress={saveHandler}
            disabled={!text}
          />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "open-regular",
    marginVertical: 10,
  },
  textArea: {
    padding: 10,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
});
