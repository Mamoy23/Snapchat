import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Button, Picker, Slider, Text, Image} from 'react-native';
import ImagePicker from './ImagePicker'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class SendSnap extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
        token: this.props.navigation.getParam('token'),
        users: [],
        selected: 'default',
        image: null,
        showPhoto: false,
        duration: 1
    }
  }

componentWillMount(){
    fetch('https://snapchat.improve-code.net/all', {
        method: 'GET',
        headers: {
            'token': this.state.token
        }
    })
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({
            users: responseJson.data
        })
    })
    .catch((error) => {
        console.error(error);
    });
}

componentWillReceiveProps(nextProps) {
    const image = nextProps.navigation.getParam('photo');

    if(image){
        this.setState({ image });
        this.setState({showPhoto: true})
    }
}

sendSnap(){
    if(this.state.image !== null ){
    let formdata = new FormData();
      formdata.append("duration", this.state.duration)
      formdata.append("to", this.state.selected)
      formdata.append("image", {uri: this.state.image.uri, name: 'image.jpg', type: 'image/jpeg'})
      
        fetch('https://snapchat.improve-code.net/snap', {
            method: 'POST',
            headers: {
                'Content-Type': "multipart/form-data",
                'token': this.state.token
            },
            body: formdata
        })
        .then((response) => response.json())
        .then((responseJson) => {
            alert(responseJson.data)
            this.props.navigation.navigate('HomeSnap')
        })
        .catch((error) => {
            console.error(error);
        });
    }
    else{
        alert('Please choose an image')
    }
}

  static navigationOptions = {
    title: 'Send Snapchat',
  };

    handleImage = (result) => {
        this.setState({image: result})
    }

  render(){
    return (
    <View style={styles.container}>
        

        <ImagePicker handleImage={this.handleImage}/>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Camera')}>
            <Ionicons name="ios-camera" size={30} color="black" />
        </TouchableOpacity>
        
        { this.state.showPhoto === true ? <Image source={{ uri: this.state.image.uri }} style={{ width: 200, height: 200 }} /> : null }
        <Picker
            style={{height: 100, width: 250, flex: 2}}
            mode="dropdown"
            selectedValue={this.state.selected}
            onValueChange={(itemValue)=>{
                this.setState({selected: itemValue})
            }}> 
            {this.state.users.map((item, index) => (
                <Picker.Item label={item.email} value={item.email} key={index}/>
            ))}
        </Picker>
        <View style={{ flex: 2, alignItems: 'stretch', justifyContent: 'center' }}>
            <Slider
                value={this.state.duration}
                onValueChange={value => this.setState({duration: value})}
                minimumValue={1}
                maximumValue={10}
                step={1}
                thumbTintColor='black'
                minimumTrackTintColor='black'
                style={{ width: 300}}
            />
            <Text>Duration: {this.state.duration}</Text>
        </View>
        <Button style={styles.button} color='black' title='Send' onPress={() => this.sendSnap()}></Button>
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
});
