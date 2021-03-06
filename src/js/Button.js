import React from 'react';
import ReactCanvas from 'react-canvas';

let Group = ReactCanvas.Group;

class Button extends React.Component {
    constructor() {
        super();

        this.mouseX = 0;
        this.mouseY = 0;
        this.isLifted = false;

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
    }

    componentWillMount() {
        this.state = {
            x: this.props.xCoord,
            y: this.props.yCoord,
            offset: [0, 0]
        }
    }

    setDragSize(w, h, off_x = 0, off_y = 0) {
        this.setState({
            width: w,
            height: h,
            offset: [off_x, off_y]
        });
    }

    handleMouseDown(e) {
        this.isLifted = true;
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
    }

    handleMouseMove(e) {
        if (this.isLifted) {
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
        this.props.onClick();
    }

    getWrapperStyle() {
        return {
            top: this.state.y + this.state.offset[1],
            left: this.state.x + this.state.offset[0],
            width: this.state.width,
            height: this.state.height,
            backgroundColor: '#ff0000'
        };
    }

    render() {
        let clones = React.Children.map(
            this.props.children,
            
            function(child) {
                var newShape = child.props.shapes;
                if(this.props.toggle == true){
                    if(child.props.shapes[0].color == 'green'){
                        newShape[0].color = 'black';
                    }
                    else {
                        newShape[0].color = 'green';
                    }
                }
                
                return React.cloneElement(
                    child,
                    {
                        xCoord: this.state.x + child.props.xCoord,
                        yCoord: this.state.y + child.props.yCoord,
                        setDragSize: this.setDragSize.bind(this),
                        shapes: newShape
                    }
                );
            }.bind(this)
        );

        let style = this.getWrapperStyle();

        return (
            <Group
                style={style}
                onMouseDown={this.handleMouseDown}
                onMouseMove={this.handleMouseMove}
                onMouseUp={this.handleMouseUp}
                >
                {clones}
            </Group>
        );
    }
}

Button.propTypes = {
    xCoord: React.PropTypes.number.isRequired,
    yCoord: React.PropTypes.number.isRequired,
    toggle: React.PropTypes.bool
}

export default Button;

