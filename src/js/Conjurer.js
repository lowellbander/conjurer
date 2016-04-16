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
    
    render() {
      return (
        <div onMouseMove={this.onMouseMove} onClick={this.onClick}>
            <svg width={500} height={500}>
                <circle cx={this.state.x} cy={this.state.y} r={this.state.radius} fill="red" />
            </svg>
            <p>{JSON.stringify(this.state)}</p>
        </div>
    );
  }
}

ReactDOM.render(
  <Conjurer />,
  document.getElementById('main')
);

export default Conjurer;
