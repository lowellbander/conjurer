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
        };
        this.handleChange = this.handleChange.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
    }

    handleChange(event) {
        this.setState({radius: event.target.value});
    }

    onMouseMove(event) {
        this.setState({
            x: event.clientX,
            y: event.clientY
        })
    }
    
    render() {
      return (
        <div onMouseMove={this.onMouseMove}>
            <svg width={500} height={500}>
                <circle cx={this.state.x} cy={this.state.y} r={this.state.radius} fill="red" />
            </svg>
            <p>this is a p tag's text</p>
            <input
                type="text"
                value={this.state.radius}
                onChange={this.handleChange}
            />
            <p>state:</p>
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
