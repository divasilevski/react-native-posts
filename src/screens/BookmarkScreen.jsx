import * as React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { CanvasChart } from '../components/CanvasChart';
import { START_CHART_DATA } from '../data';

const NODES = 10;

function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

export const BookmarkScreen = ({}) => {
  const [data, setData] = React.useState(START_CHART_DATA);

  const pressHandler = () => {
    const data = [];
    for (let i = 0; i < NODES; i++) {
      data.push([i, randomInteger(0, 1000)]);
    }
    setData(data);
  };

  return (
    <View style={styles.container}>
      <CanvasChart data={data} />
      <View style={styles.center}>
        <Button title="Случайные данные" onPress={pressHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
