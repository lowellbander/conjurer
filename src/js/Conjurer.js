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
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({radius: event.target.value});
    }
    
    render() {
      return (
        <div>
            <svg width={1000} height={1000}>
                <circle cx={500} cy={500} r={this.state.radius} fill="red" />
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
