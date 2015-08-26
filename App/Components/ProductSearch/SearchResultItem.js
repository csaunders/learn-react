import React from 'react-native';
import Stylish from 'react-native-stylish';
import ProductActions from '../../Actions/ProductActions';

var {
  Component,
  View,
  Text,
  Image
} = React;

class SearchResultItem extends Component {
  render() {
    product = this.props.result;
    return (
      <View
        onClick={() => {
          console.log("Yar");
          // ProductActions.select(this.product);
        }}
        style={this.stylesFor('container')}>
        <Image
          style={this.stylesFor('thumbnail')}
          source={{uri: product.thumbnail }} />
        <View style={this.stylesFor('containerRight')}>
          <Text style={this.stylesFor('title')}>{product.title}</Text>
          <Text style={this.stylesFor('producer')}>{product.producer}</Text>
          <Text>{product.origin}</Text>
          <Text style={this.stylesFor('details')}>{product.price} per {product.package}</Text>
        </View>
      </View>
    );
  }
}

Stylish.for(SearchResultItem).base({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingTop: 5
  },
  thumbnail: {
    flex: 0,
    width: 53,
    height: 81,
  },
  rightContainer: {
    flex: 1,
    alignItems: 'left'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8
  },
  producer: {
    fontSize: 16
  },
  details: {
    fontWeight: 'bold'
  }
})

module.exports = SearchResultItem;
