// TODO: deprecate this by delegation on Anchor

let ANCHOR_COLOR = "#903fd1";
let Event = require('./event/EventNames');
let ee = require('./event/EventEmitter');

class Obj {
    constructor ({id, ref, x, y, shapes, width, height, children}={}) {
        this.width = width || 180;
        this.height = height || 180;
        this.children = children || [];
        this.id = id;
        this.ref = ref;
        this.x = x;
        this.y = y;
        this.shapes = shapes;

        this.getCollision = this.getCollision.bind(this);
    }
    
    getValue () {
        ee.emitEvent(Event.ACCESS_MEMBER_VARIABLE, [this.id]);
        return parseInt(this.shapes[0].value);
    }

    copy () {
        return new Obj({
            id: this.id,
            ref: this.ref,
            width: this.width,
            height: this.height,
            x: this.x,
            y: this.y,
            shapes: this.shapes.map(shape => shape.copy()),
            children: this.children.map(this.copy)
        });
    }
    
    right () {
        return this.x
            + Math.max(...this.shapes.map(shape => shape.left + shape.width));
    }
    
    bottom () {
        return this.y
            + Math.max(...this.shapes.map(shape => shape.top + shape.height));
    }

    inBounds(point) {
        var bounds =  {
            left : this.x,
            top : this.y,
            right : this.right(),
            bottom : this.bottom()
        };
        return ((point.x > bounds.left)
            && (point.x < bounds.right)
            && (point.y > bounds.top)
            && (point.y < bounds.bottom));
    }
    
    // TODO: getCollision returns parent and anchor coordinates
    getCollision (candidates) {
        
        // didCollide() is a helper for getCollision
        var newOrigin = null;
        var didCollide = function (candidate) {
            // get shapes that are anchors
            var anchors = candidate.shapes.filter(shape => shape.color === ANCHOR_COLOR);

            // get absolute coordinates for anchors
            var coordinates = anchors.map(anchor => ({x: anchor.left + candidate.x, y: anchor.top + candidate.y}));

            // check to see if any of candidate's anchors are in obj's bounding rectangle
            for (let coordinate of coordinates) {
                if (this.inBounds(coordinate)) {
                    newOrigin = {x: coordinate.x - candidate.x, y: coordinate.y - candidate.y};
                    
                    // do some math to try to prevent siblings from occluding each other
                    var xs = coordinates.map(c => c.x - candidate.x);
                    var x_max = Math.max(...xs);
                    var x_min = Math.min(...xs);
                    var x_mid = (x_max - x_min)/2;
                    var width = x_max - x_min;
                    var index = xs.findIndex(x => x === coordinate.x - candidate.x);
                    var x = (index >= xs.length/2)
                        ? x_mid + index * width * 0.25
                        : x_mid - (index + 1) * width;
                    
                    newOrigin = {x: x, y: coordinate.y - candidate.y};
                    
                    return true;
                }
            }
            return false;
        }.bind(this);
        
        if (candidates.length === 0) {
            return {
                collidee: null,
                origin: null
            }
        }
        var collision = candidates.find(didCollide);
        return collision
            ? {collidee: collision, origin: newOrigin}
            : this.getCollision([].concat(...candidates.map(c => c.children)));
    }

    getFamily() {
        return (this.children.length === 0)
            ? [this]
            : [this].concat(...this.children.map(c => c.getFamily()));
    }
    
    // TODO: refactor [].concat(...arrs) pattern to a merge() function
}

export default Obj;
