import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, CheckBox, AsyncStorage} from 'react-native';


class Login extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        token: '',
        err: '',
        checked: false,
        email: '',
        password: ''
      }
    }
  
  componentWillMount(){
    this._retrieveData()
  }
    _retrieveData = async () => {
      try {
        this.emailStore = await AsyncStorage.getItem('email');
        this.passwordStore = await AsyncStorage.getItem('password');
        if(this.emailStore !== null && this.passwordStore !== null){
          this.setState({
            email: this.emailStore,
            password: this.passwordStore
          })
        }
      } catch (error) {
        console.log(error.message)
      }
    };

    _storeData = async () => {
      try {
        await AsyncStorage.setItem('email', this.state.email);
        await AsyncStorage.setItem('password', this.state.password);
      } catch (error) {
        console.log(error.message)
      }
    };

  handleSubmit = () => {
    if(this.state.checked === true){
      this._storeData()
    }
    if((this.state.email !== '' && this.state.password !== '')){
      fetch('https://snapchat.improve-code.net/connection', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              email: this.state.email,
              password: this.state.password
          }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.data.token){
          this.setState({
              token: responseJson.data.token,
              err: ''
          })
          this.props.navigation.navigate('HomeSnap', {email : this.state.email, token: this.state.token})
        }
        else{
          alert(responseJson.data)
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
    title: 'Login',
  };

  render(){
      return (
        <View style={styles.container}>
          <View>
            {this.props.navigation.getParam('email') ?
              <Text style={styles.title}>Welcome {this.props.navigation.getParam('email')}</Text> 
              : null }
            <TextInput 
              style={styles.textinput}
              placeholder='Email'
              value={this.state.email}
              onChangeText={(text) => this.setState({email: text})}>
            </TextInput>
            <TextInput
              secureTextEntry={true}
              style={styles.textinput}
              placeholder='Password'
              value={this.state.password}
              onChangeText={(text) => this.setState({password: text})}>
            </TextInput>
            <View style={{flexDirection: 'row', alignItems: 'center', margin: 5}}>
              <CheckBox 
                value={this.state.checked} 
                onValueChange={() => this.setState({ checked: !this.state.checked })}/>
              <Text>Remember me</Text>
            </View>
            <Button title='Log in' color='#dbdb1e' onPress={() => this.handleSubmit()}></Button>
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
  },
  title: {
    fontSize: 40,
    margin: 10
  }
});

export default Login
