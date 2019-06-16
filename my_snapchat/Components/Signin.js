import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';

class Signin extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          data: '',
          err: ''
        }
        this.email = ''
        this.password = ''
    }
    
    handleSubmit = () => {
        if(this.email !== '' && this.password !== ''){
            fetch('https://snapchat.improve-code.net/inscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.email,
                    password: this.password,
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.data.email){
                    this.setState({
                        data: responseJson.data.email,
                        err: ''
                    })
                    this.props.navigation.navigate('Login', {email : this.state.data})
                }
                else{
                    this.setState({err: responseJson.data})
                }
    
            })
            .catch((error) => {
              console.error(error);
            });
        }
        else{
            alert('Please fill all the fields')
        }

    }

    
    static navigationOptions = {
        title: 'Signin',
    };
    
    render(){
        return (
          <View style={styles.container}>
            <View style={[{}]}>
                <TextInput style={styles.textinput} placeholder ='Email' onChangeText={(text) => this.email= text}></TextInput>
                <TextInput secureTextEntry={true} style={styles.textinput} onChangeText={(text) => this.password = text} placeholder ='Password'></TextInput>
                <Button color='black' title='Register' onPress={() => this.handleSubmit()}></Button>
                {this.state.err ? 
                        Alert.alert(
                    'Try again',
                    this.state.err,
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false},
                    ) : null
                    }
            </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfce0',
    alignItems: 'center',
  },
  textinput: {
    borderColor: 'grey',
    borderBottomWidth: 1,
    width:300,
    height: 50,
    margin: 5
  }
});

export default Signin
