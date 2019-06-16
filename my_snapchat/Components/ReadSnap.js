import React from 'react';
import { StyleSheet, View, Image, Text, ActivityIndicator} from 'react-native';

export default class ReadSnap extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
        token: this.props.navigation.getParam('token'),
        from: this.props.navigation.getParam('from'),
        snap_id: this.props.navigation.getParam('snap_id'),
        duration: this.props.navigation.getParam('duration'),
        refresh: false,
        loading: true
    }
}

  static navigationOptions = {
    headerLeft: null
  };

    seenSnap(){
        fetch('https://snapchat.improve-code.net/seen', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': this.state.token
            },
            body: JSON.stringify({
                'id': this.state.snap_id
            }),
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
        })
        .catch((error) => {
        console.error(error);
        });
    }

  startTiming(){
    setTimeout(() => {this.seenSnap(), this.props.navigation.navigate('HomeSnap')}, this.state.duration*1000)
    this.interval = setInterval(() => {this.setState({duration: this.state.duration-1})}, 1000)
}

componentWillUnmount(){
    this.interval && clearInterval(this.interval)
    this.interval = false
  }

  render(){
    return (
    <View style={styles.container}>
        <Image 
            source={{uri : `https://snapchat.improve-code.net/snap/${this.state.snap_id}`}}
            style={{width:'100%', height: '100%'}}
            onLoad={(e) => {this.startTiming(), this.setState({loading: false})}}
            />
        <View style={{ alignItems:'center', alignContent: 'center', justifyContent: 'center', bottom: 100}}>
            { this.state.loading === true ? <ActivityIndicator style={{bottom: 100}} size="large" color="black" /> : null } 
        </View>
        <Text style={styles.timer}>{this.state.duration}</Text>
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
  },
  timer: {
    position: 'absolute',
    backgroundColor: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    padding: 10,
    borderRadius: 5,
    top: 20, 
    right: 20
  }
});
