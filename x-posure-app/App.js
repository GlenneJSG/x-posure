import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import TestScreen from './components/TestScreen';
import TestDetailScreen from './components/TestDetailScreen';
import AddTestScreen from './components/AddTestScreen';
import EditTestScreen from './components/EditTestScreen';

const RootStack = createStackNavigator(
  {
    Test: TestScreen,
    TestDetails: TestDetailScreen,
    AddTest: AddTestScreen,
    EditTest: EditTestScreen,
  },
  {
    initialRouteName: 'Test',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#b2d6d6',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
