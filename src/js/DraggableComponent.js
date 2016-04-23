import React from 'react';
import ReactCanvas from 'react-canvas';

class DraggableComponent extends React.Component {
  constructor() {
    super();

    this.mouseX = 0;
    this.mouseY = 0;
    this.isLifted = false;

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.debounce(this.handleMouseMove.bind(this), 5);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  componentWillMount() {
    this.state = {
      x: this.props.xCoord,
      y: this.props.yCoord
    }
  }

  debounce(func, wait) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function () {
        timeout = null;
      };
      var call = !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (call) func.apply(context, args);
    };
  }

  handleMouseDown(e) {
    this.isLifted = true;
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
    this.hasBeenMoved = false;
  }

  handleMouseMove(e) {
    if (this.isLifted) {
      this.hasBeenMoved = true;
      var diffX = e.clientX - this.mouseX;
      var diffY = e.clientY - this.mouseY;
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;

      var newX = this.state.x + diffX;
      var newY = this.state.y + diffY;

      this.setState({
        x: newX,
        y: newY
      });
    }
  }

  handleMouseUp(e) {
    this.isLifted = false;
    if (!this.hasBeenMoved) {
      console.log("click via handleMouseDown then handleMouseUp without moving the mouse");
      // here we should treat this as a click
      // create box showing data of object
      // I feel like this may be the wrong way to do this because now telling if
      // an object has been clicked depends on whether or not it is a draggable component because
      // draggable components have different handleMouseDown, handleMouseUp events than non draggable components
    }
  }
}

DraggableComponent.propTypes = {
  xCoord: React.PropTypes.number.isRequired,
  yCoord: React.PropTypes.number.isRequired
};

export default DraggableComponent;
