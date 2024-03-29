import * as React from "react";
import { View, StyleSheet, Button, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

async function askForPermissions() {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    Alert.alert("Ошибка", "Вы не дали прав на создание фото");
    return false;
  }
  return true;
}

export const PhotoPicker = ({ onPick }) => {
  const [image, setImage] = React.useState(null);
  const takePhoto = async () => {
    const hasPermissions = await askForPermissions();

    if (!hasPermissions) return;

    const img = await ImagePicker.launchCameraAsync({
      quality: 0.7,
      allowsEditing: false,
      aspect: [16, 9],
    });

    if (!img.canceled) {
      const uri = img.assets[0].uri;
      setImage(uri);
      onPick(uri);
    }
  };
  return (
    <View style={styles.wrapper}>
      <Button title="Сделать фото" onPress={takePhoto} />
      {image && <Image style={styles.image} source={{ uri: image }} />}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 200,
    marginTop: 10,
  },
});
