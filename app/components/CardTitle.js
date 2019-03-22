/*
** A CardTitle is an extended Card for map location displaying.
*/



import React, { Component } from 'react';
import Card from './Card';
import {
  View,
  Text
} from 'react-native';
import Theme from '../styles/Theme';



class CardTitle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUri: this.props.imageUri,
      title: this.props.title,
      numEntrances: this.props.numEntrances,
      desc: this.props.desc,
    }

  }

  setProps = (obj) => {
    this.setState(obj);
    this.card.setProps({
      imageUri: obj.imageUri,
      title: obj.title,
    })
  }

  render() {
    return (

      <Card
      height={this.props.height}
      width={this.props.width}
      margin={this.props.margin}
      style={this.props.style}
      imageUri={this.state.imageUri}
      title={this.state.title}
      ref={ref => { this.card = ref }}
      >
        <Text style={{fontWeight: 'bold'}}>{this.state.numEntrances} accessible entrances</Text>

        <Text>{this.state.desc}</Text>

        <View style={{ position: 'absolute', right: 0, bottom: 0, padding: 10 }}>
          <Text style={{fontSize: 12}}>Swipe to view entrances</Text>
        </View>
      </Card>

    );
  }

}

export default CardTitle;
