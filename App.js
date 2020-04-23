import React, {useState} from 'react';
import {
  StyleSheet,
  Button,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

function Input() {
  const buttonPressed = () => {};
  return (
    <View style={styles.container}>
      <Text>Username</Text>
      <TextInput placeholder="Enter your username" />
      <Text>Password</Text>
      <TextInput placeholder="Enter your Password" />
      <Button title="Hello" onPress={buttonPressed} />
    </View>
  );
}

function App() {
  const [resultText, setResultText] = useState('');
  const [calculationText, setCalculationText] = useState('');
  const operations = ['DEL', '+', '-', 'x', '/'];

  const calulateResult = () => {
    const text = resultText;
    //BODMAS
    setCalculationText(eval(text));
    console.log();
  };
  const validate = () => {
    const text = resultText;
    switch (text.slice(-1)) {
      case '+':
      case '-':
      case '*':
      case '/':
        return false;
    }
    return true;
  };
  const buttonPressed = (text) => {
    if (text === '=') {
      return validate() && calulateResult();
    }
    setResultText(resultText + text);
    console.log(text);
  };

  const operate = (operation) => {
    switch (operation) {
      case 'DEL':
        const text = resultText.split('');
        text.pop();
        setResultText(text.join(''));
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        const lastChar = resultText.split('').pop();
        if (operations.indexOf(lastChar) > 0) return;
        if (text === '') return;
        setResultText(resultText + operation);
    }
  };
  let rows = [];
  for (let i = 0; i < 4; i++) {
    let row = [];
    let nums = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [0, '.', '='],
    ];
    for (let j = 0; j < 3; j++) {
      row.push(
        <TouchableOpacity
          key={nums[i][j]}
          onPress={() => buttonPressed(nums[i][j])}
          style={styles.btn}>
          <Text style={styles.btntext}>{nums[i][j]}</Text>
        </TouchableOpacity>,
      );
    }
    rows.push(
      <View key={i} style={styles.row}>
        {row}
      </View>,
    );
  }

  let ops = [];
  for (let i = 0; i < 5; i++) {
    ops.push(
      <TouchableOpacity
        key={operations[i]}
        onPress={() => operate(operations[i])}
        style={styles.btn}>
        <Text style={[styles.btntext, styles.white]}>{operations[i]}</Text>
      </TouchableOpacity>,
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.result}>
        <Text style={styles.resultText}>{resultText}</Text>
      </View>
      <View style={styles.calculations}>
        <Text style={styles.calculationsText}>{calculationText}</Text>
      </View>
      <View style={styles.buttons}>
        <View style={styles.numbers}>{rows}</View>
        <View style={styles.operations}>{ops}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  result: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'white',
  },
  btntext: {
    fontSize: 25,
    color: 'white',
  },
  white: {
    color: '#fff',
  },
  resultText: {
    fontSize: 40,
    color: 'black',
  },
  calculations: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'white',
  },
  calculationsText: {
    fontSize: 24,
    color: 'black',
  },
  buttons: {
    flex: 7,
    flexDirection: 'row',
  },
  numbers: {
    flex: 3,
    backgroundColor: '#4c5154',
  },
  operations: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: '#267deb',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
});

export default App;
