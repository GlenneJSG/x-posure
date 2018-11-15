import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from '../Firebase';

class AddTestScreen extends Component {
  static navigationOptions = {
    title: 'Add Test',
  };
  constructor() {
    super();
    this.ref = firebase.firestore().collection('tests');
    this.state = {
      testType: '',
      location: '',
      doctor: '',
      date: '',

      isLoading: false,
    };
  }
  updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }

  saveTest() {
    this.setState({
      isLoading: true,
    });
    this.ref.add({
      testType: this.state.testType,
      location: this.state.location,
      doctor: this.state.doctor,
      date: this.state.date,
    }).then((docRef) => {
      this.setState({
        testType: '',
        location: '',
        doctor: '',
        date: '',
        isLoading: false,
      });
      this.props.navigation.goBack();
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }
  render() {
  if(this.state.isLoading){
    return(
      <View style={styles.activity}>
        <ActivityIndicator size="large" color="#0000ff"/>
      </View>
    )
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.subContainer}>
        <TextInput
            placeholder={'Test'}
            value={this.state.testType}
            onChangeText={(text) => this.updateTextInput(text, 'testType')}
        />
      </View>
      <View style={styles.subContainer}>
        <TextInput
            multiline={true}
            numberOfLines={4}
            placeholder={'Location'}
            value={this.state.location}
            onChangeText={(text) => this.updateTextInput(text, 'location')}
        />
      </View>
      <View style={styles.subContainer}>
        <TextInput
            placeholder={'Doctor'}
            value={this.state.doctor}
            onChangeText={(text) => this.updateTextInput(text, 'doctor')}
        />
      </View>
      <View style={styles.subContainer}>
        <TextInput
            placeholder={'Date'}
            value={this.state.date}
            onChangeText={(text) => this.updateTextInput(text, 'date')}
        />
      </View>
      <View style={styles.button}>
        <Button
          large
          leftIcon={{name: 'save'}}
          title='Save'
          onPress={() => this.saveTest()} />
      </View>
    </ScrollView>
  );
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  subContainer: {
    flex: 1,
    marginBottom: 20,
    padding: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#CCCCCC',
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
export default AddTestScreen;
