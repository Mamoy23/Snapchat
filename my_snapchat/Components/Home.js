import React from 'react';
import { StyleSheet, View, Button, Image, Text} from 'react-native';

export default class Home extends React.Component {
  
  constructor(props){
    super(props)

  }
  static navigationOptions = {
    title: 'Snapchat',
  };
  render(){
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Image
          style={{width: 200, height: 200, margin: 50}}
          source={{uri: 'http://1000logos.net/wp-content/uploads/2017/08/snapchat-logo-transparent.png'}}
        />
        <View style={[{width: '100%', height: '50%'}]}>
            <Button title='Login' color='#f2f20e' onPress={() => navigate('Login')}></Button>
            <Button color='black' title='Register' onPress={() => navigate('Signin')}></Button>
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
    justifyContent: 'center',
  }
});
