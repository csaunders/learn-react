import React from 'react-native';

var {
  View,
  Image,
  StyleSheet
} = React;

var styles = StyleSheet.create({
  picture: {
    margin: 5,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#a0a0a0',
    width: 100,
    height: 100
  }
})

class Photo extends React.Component {
  render() {
    return(
        <Image source={{uri: this.props.source}} style={styles.picture} />
    );
  }
}

module.exports = Photo;
