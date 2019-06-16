import React from 'react'
import { StyleSheet, View, Text, FlatList} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class HomeSnap extends React.Component {
  
  constructor(props){
    super(props)

    this.state = {
        snaps: [],
        token: this.props.navigation.getParam('token')
    }
  }
  static navigationOptions = {
    title: 'Home',
    headerLeft: null
  };

  componentWillMount(){
    this.getSnaps()
  } 

  componentDidUpdate(){
      this.getSnaps()
  }

  getSnaps(){
    fetch('https://snapchat.improve-code.net/snaps', {
        method: 'GET',
        headers: {
            'token': this.state.token
        }
    })
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({
            snaps: responseJson.data
        })
    })
    .catch((error) => {
        console.error(error);
    });
  }

  render(){
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome {this.props.navigation.getParam('email')}</Text>
        {this.state.snaps.length > 0 ? (
            <FlatList
            data={this.state.snaps}
            keyExtractor={(item) => item.snap_id.toString()}
            renderItem={({ item }) => (
                    <TouchableOpacity 
                        style={styles.item} 
                        onPress={() => navigate('ReadSnap', {
                            snap_id: item.snap_id,
                            token: this.state.token,
                            from: item.from,
                            duration: item.duration
                        })
                    }>
                        <Ionicons name="logo-snapchat" size={30} color="black" />
                        <Text style={[{marginLeft: 2}]}>{item.from}</Text>
                    </TouchableOpacity>
                  )}
                />
            ) :
            <Text style={[{margin: 5, fontSize: 20}]}>No new snaps</Text>
        }
        <TouchableOpacity style={[{margin: 20}]} onPress={() => navigate('SendSnap', {token: this.state.token})}>
            <Ionicons name="ios-paper-plane" size={30} color="black" />        
        </TouchableOpacity>
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
  title: {
    fontSize: 32,
    margin: 10,
    textAlign: 'center'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 1
  }
});
