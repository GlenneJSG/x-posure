import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from '../Firebase';

class EditTestScreen extends Component {
  static navigationOptions = {
    title: 'Edit Test',
  };
  constructor() {
    super();
    this.state = {
      key: '',
      isLoading: true,
      testType: '',
      location: '',
      doctor: '',
      date:''
    };
  }
  componentDidMount() {
    const { navigation } = this.props;
    const ref = firebase.firestore().collection('tests').doc(JSON.parse(navigation.getParam('testkey')));
    ref.get().then((doc) => {
      if (doc.exists) {
        const test = doc.data();
        this.setState({
          key: doc.id,
          testType: test.testType,
          location: test.location,
          doctor: test.doctor,
          date: test.date,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }

  updateTest() {
    this.setState({
      isLoading: true,
    });
    const { navigation } = this.props;
    const updateRef = firebase.firestore().collection('tests').doc(this.state.key);
    updateRef.set({
      testType: this.state.testType,
    location: this.state.location,
      doctor: this.state.doctor,
      date: this.state.date,
    }).then((docRef) => {
      this.setState({
        key: '',
        testType: '',
        location: '',
        doctor: '',
        date: '',
        isLoading: false,
      });
      this.props.navigation.navigate('Test');
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
            onChangeText={(text) => this.updateTextInput(text, 'test')}
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
          leftIcon={{name: 'update'}}
          title='Update'
          onPress={() => this.updateTest()} />
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


export default EditTestScreen;
