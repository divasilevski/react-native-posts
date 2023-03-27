import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const AboutScreen = ({}) => {
  return (
    <View style={styles.center}>
      <Text style={styles.text}>Первые попытки создавать приложения. 2021</Text>
      <Text style={styles.text}>Обновление зависимостей. 2023</Text>
      <Text style={styles.version}>v1.2.0</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "open-regular",
  },
  version: {
    fontFamily: "open-bold",
  },
});
