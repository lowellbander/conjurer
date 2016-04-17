/**
 * Created by lowellbander on 4/12/16.
 */

import React from 'react';
import ReactDOM from 'react-dom';

function log(value) {
    console.log(value);
}

class Conjurer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            radius: 50,
            x: 50,
            y: 50,
            dragging: true,
        };
        this.handleChange = this.handleChange.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    handleChange(event) {
        this.setState({radius: event.target.value});
    }

    onMouseMove(event) {
        if (this.state.dragging) {
            this.setState({
                x: event.clientX,
                y: event.clientY
            })
        } else {
            //resizing
            var radius = Math.sqrt(
                Math.pow((this.state.x - event.clientX), 2)
                + Math.pow((this.state.y - event.clientY), 2)
            ); 
            this.setState({radius: radius});
        }
    }
    
    onClick() {
        this.setState({dragging: !this.state.dragging});
    }
    
    /*
     <div onMouseMove={this.onMouseMove} onClick={this.onClick}>
     <circle cx={this.state.x} cy={this.state.y} r={this.state.radius} fill="red" />
     */
    render() {
      return (
        <div>
            <svg width={1000} height={500}>
                <MyRect x={10} y={10} width={30} height={30}/>
                <circle cx="25" cy="75" r="20" stroke="red" fill="transparent" stroke-width="5"/>
                <line x1="10" x2="50" y1="110" y2="150" stroke="orange" fill="transparent" stroke-width="5"/>
                
                <svg width={100} height={100}>
                    <rect x="50" y="10" width="30" height="30" stroke="black" fill="transparent" stroke-width="5"/>
                </svg>
            </svg>
            <p>{JSON.stringify(this.state)}</p>
        </div>
    );
  }
}

class MyRect extends React.Component {
   
   onClick() {
       console.log("clicked rect!");
   } 
    
   render() {
       return (
           <rect onClick={this.onClick}
                 x={this.props.x}
                 y={this.props.y}
                 width={this.props.width}
                 height={this.props.height}
                 stroke="black" 
                 fill="transparent" 
                 stroke-width="5"/>
       );
   } 
}
MyRect.propTypes = {
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
};

ReactDOM.render(
  <Conjurer />,
  document.getElementById('main')
);

export default Conjurer;
