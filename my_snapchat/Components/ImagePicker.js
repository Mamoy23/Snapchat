import * as React from 'react';
import { Button, Image, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {ImagePicker, Permissions, Constants} from 'expo';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class ImagePickerExample extends React.Component {
  state = {
    image: null,
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity
          title="Gallery"
          onPress={this._pickImage}
          color='black'>
            <Ionicons name="ios-images" size={30} color="black" /> 
        </TouchableOpacity>
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      this.props.handleImage(result);
    }
  };
}