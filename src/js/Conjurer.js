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
            value: "foobar",
        };
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }
    
    render() {
    var radius = 30;  

    return (
        <div>
            <svg>
                <circle cx={50} cy={50} r={radius} fill="red" />
            </svg>
            <p>this is a p tag's text</p>
            <input
                type="text"
                value={this.state.value}
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
