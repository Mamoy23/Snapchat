import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

static navigationOptions = {
    title: 'Camera'
  };

  snap = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      this.props.navigation.navigate('SendSnap', {photo})
    }
  };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type}   ref={ref => {this.camera = ref;}}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-start',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}>
                <Ionicons name="ios-reverse-camera" size={40} color="white" />
              </TouchableOpacity>
              <TouchableOpacity                 
              style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                    this.snap()
                }}>
                <Ionicons name="ios-checkmark-circle-outline" size={40} color="white" />
            </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}