import React from 'react';
import ReactCanvas from 'react-canvas'

var Text = ReactCanvas.Text;

class Lowell extends React.Component {
  getTextStyle() {
    return {
      top: 50,
      left: 0,
      width: window.innerWidth,
      height: 50,
      lineHeight: 20,
      fontSize: 25
    };
  }

  render() {
    var textStyle = this.getTextStyle();

    return (
      <Text style={textStyle}>Fowell</Text>
    );
  }
}

export default Lowell;
