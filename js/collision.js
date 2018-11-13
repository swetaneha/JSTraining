
function QuadTree(boundBox, lvl) {
	var maxObjects = 10;
	this.bounds = boundBox || {
		x: 0,
		y: 0,
		width: 0,
		height: 0
	};
	var objects = [];
	this.nodes = [];
	var level = lvl || 0;
	var maxLevels = 5;
	/*
	 * Clears the quadTree and all nodes of objects
	 */
	this.clear = function() {
		objects = [];
		for (var i = 0; i < this.nodes.length; i++) {
			this.nodes[i].clear();
		}
		this.nodes = [];
	};
	/*
	 * Get all objects in the quadTree
	 */
	this.getAllObjects = function(returnedObjects) {
		for (var i = 0; i < this.nodes.length; i++) {
			this.nodes[i].getAllObjects(returnedObjects);
		}
		for (var i = 0, len = objects.length; i < len; i++) {
			returnedObjects.push(objects[i]);
		}
		return returnedObjects;
	};
	/*
	 * Return all objects that the object could collide with
	 */
	this.findObjects = function(returnedObjects, obj) {
		if (typeof obj === "undefined") {
			console.log("UNDEFINED OBJECT");
			return;
		}
		var index = this.getIndex(obj);
		if (index != -1 && this.nodes.length) {
			this.nodes[index].findObjects(returnedObjects, obj);
		}
		for (var i = 0, len = objects.length; i < len; i++) {
			returnedObjects.push(objects[i]);
		}
		return returnedObjects;
	};
	/*
	 * Insert the object into the quadTree. If the tree
	 * excedes the capacity, it will split and add all
	 * objects to their corresponding nodes.
	 */
	this.insert = function(obj) {
		if (typeof obj === "undefined") {
			return;
		}
		if (obj instanceof Array) {
			for (var i = 0, len = obj.length; i < len; i++) {
				this.insert(obj[i]);
			}
			return;
		}
		if (this.nodes.length) {
			var index = this.getIndex(obj);
			// Only add the object to a subnode if it can fit completely
			// within one
			if (index != -1) {
				this.nodes[index].insert(obj);
				return;
			}
		}
		objects.push(obj);
		// Prevent infinite splitting
		if (objects.length > maxObjects && level < maxLevels) {
			if (this.nodes[0] == null) {
				this.split();
			}
			var i = 0;
			while (i < objects.length) {
				var index = this.getIndex(objects[i]);
				if (index != -1) {
					this.nodes[index].insert((objects.splice(i,1))[0]);
				}
				else {
					i++;
				}
			}
		}
	};
	/*
	 * Determine which node the object belongs to. -1 means
	 * object cannot completely fit within a node and is part
	 * of the current node
	 */
	this.getIndex = function(obj) {
		var index = -1;
		var verticalMidpoint = this.bounds.x + this.bounds.width / 2;
		var horizontalMidpoint = this.bounds.y + this.bounds.height / 2;
		// Object can fit completely within the top quadrant
		var topQuadrant = (obj.y < horizontalMidpoint && obj.y + obj.height < horizontalMidpoint);
		// Object can fit completely within the bottom quandrant
		var bottomQuadrant = (obj.y > horizontalMidpoint);
		// Object can fit completely within the left quadrants
		if (obj.x < verticalMidpoint &&
				obj.x + obj.width < verticalMidpoint) {
			if (topQuadrant) {
				index = 1;
			}
			else if (bottomQuadrant) {
				index = 2;
			}
		}
		// Object can fix completely within the right quandrants
		else if (obj.x > verticalMidpoint) {
			if (topQuadrant) {
				index = 0;
			}
			else if (bottomQuadrant) {
				index = 3;
			}
		}
		return index;
	};
	/*
	 * Splits the node into 4 subnodes
	 */
	this.split = function() {
		// Bitwise or [html5rocks]
		var subWidth = (this.bounds.width / 2) | 0;
		var subHeight = (this.bounds.height / 2) | 0;
		this.nodes[0] = new QuadTree({
			x: this.bounds.x + subWidth,
			y: this.bounds.y,
			width: subWidth,
			height: subHeight
		}, level+1);
		this.nodes[1] = new QuadTree({
			x: this.bounds.x,
			y: this.bounds.y,
			width: subWidth,
			height: subHeight
		}, level+1);
		this.nodes[2] = new QuadTree({
			x: this.bounds.x,
			y: this.bounds.y + subHeight,
			width: subWidth,
			height: subHeight
		}, level+1);
		this.nodes[3] = new QuadTree({
			x: this.bounds.x + subWidth,
			y: this.bounds.y + subHeight,
			width: subWidth,
			height: subHeight
		}, level+1);
	};
}








let A, B;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  A = new Triangle(0, 0, createVector(0, -80), createVector(-80, 40), createVector(80, 40));
  B = new Triangle(0, 0, createVector(0, -80), createVector(-40, 40), createVector(40, 40));
}

function draw() {
  clear();
  background(249, 246, 236);
  let t = radians(frameCount) / 2;
  A.position.x = cos(t) * 120;
  A.position.y = sin(t * 2) * 120;
  B.position.x = -cos(t * 3) * 120;
  B.position.y = -sin(t * 4) * 120;
  A.rotation = t;
  B.rotation = -t / 2;
  A.update();
  B.update();

  // test

  let renderingData = [];
  let result = true;
  for (let i = 0; i < 3; i++) {
    let i0 = i;
    let i1 = (i + 1) % 3;
    let i2 = (i + 2) % 3;
    let vec = A.p[i1].copy().sub(A.p[i0]).normalize();
    let axis = createVector(vec.y, - vec.x);
    let o = axis.dot(A.p[i0]);
    let dA0 = axis.dot(A.p[i1]);
    let dA1 = axis.dot(A.p[i2]);
    let Amin = min(dA0, dA1);
    let Amax = max(dA0, dA1);

    let dB0 = axis.dot(B.p[0]);
    let dB1 = axis.dot(B.p[1]);
    let dB2 = axis.dot(B.p[2]);
    let Bmin = min(dB0, dB1, dB2);
    let Bmax = max(dB0, dB1, dB2);

    renderingData.push({vec: vec, axis: axis, o: o, Amin: Amin, Amax: Amax, Bmin, Bmax, result: false});
    if (
      ( Bmin <= Amin && Amin <= Bmax ) ||
      ( Bmin <= Amax && Amax <= Bmax ) ||
      ( Amin <= Bmin && Bmin <= Amax ) ||
      ( Amin <= Bmax && Bmax <= Amax )
    ) {
      renderingData[i].result = true;
      continue;
    }
    result = false;
  }

  // rendering

  push();
  translate(width / 2, height / 2);
  noStroke();
  if (result) {
    fill(225, 81, 106);
  } else {
    fill(255);
  }
  A.draw();
  B.draw();

  noFill(); stroke(0); strokeWeight(1);
  A.draw();
  B.draw();

  fill(0);

  let n = floor(frameCount / 180) % 4;
  let boundary = {x: -width / 2, y: -height / 2, w: width, h: height};
  for (let i = 0; i < n; i ++) {
    let d = renderingData[i];
    let origin = A.p[i].copy();
    let axis = new Line().fromPointAndVector(origin, d.axis);

    stroke(0); strokeWeight(1);
    axis.draw(boundary);

    let pAmin = origin.copy().add(d.axis.copy().mult(d.Amin - d.o));
    let pAmax = origin.copy().add(d.axis.copy().mult(d.Amax - d.o));
    let pBmin = origin.copy().add(d.axis.copy().mult(d.Bmin - d.o));
    let pBmax = origin.copy().add(d.axis.copy().mult(d.Bmax - d.o));

    stroke(0, 0, 0, 32);
    axis.getPerpendicular(pAmin).draw(boundary);
    axis.getPerpendicular(pAmax).draw(boundary);
    axis.getPerpendicular(pBmin).draw(boundary);
    axis.getPerpendicular(pBmax).draw(boundary);

    if (d.result) {
      let sorted = [d.Amin, d.Amax, d.Bmin, d.Bmax].sort((a,b)=>{return a > b ? 1: -1});
      let p0 = origin.copy().add(d.axis.copy().mult(sorted[1] - d.o));
      let p1 = origin.copy().add(d.axis.copy().mult(sorted[2] - d.o));
      stroke(0); strokeWeight(3);
      line(p0.x, p0.y, p1.x, p1.y);
    }
  }
  pop();
}

class Triangle {
  constructor(x, y, p0, p1, p2) {
    this.position = createVector(x, y);
    this.op = [];
    this.p = [];
    this.op.push(p0);
    this.op.push(p1);
    this.op.push(p2);
    this.p.push(createVector());
    this.p.push(createVector());
    this.p.push(createVector());
    this.rotation = 0;
    this.update();
  }

  update() {
    for (let i = 0; i < 3; i ++) {
      this.p[i] = rotate2d(this.op[i], this.rotation).add(this.position);
    }
  }

  draw() {
    beginShape();
    for (let i = 0; i < 3; i ++) {
      vertex(this.p[i].x, this.p[i].y);
    }
    endShape(CLOSE);
  }


}

function rotate2d(p, rad) {
  // see p5.Vector.rotate()
  // https://p5js.org/reference/#/p5.Vector/rotate
  let sine = sin(rad);
  let cosine = cos(rad);
  return createVector(p.x * cosine + p.y * sine, -p.x * sine + p.y * cosine);
}

class Line {
  constructor(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
  }

  fromTwoPoints(p0, p1) {
    let dx = p1.x - p0.x;
    let dy = p1.y - p0.y;
    this.a = dy;
    this.b = -dx;
    this.c = dx * p0.y - dy * p0.x;
    return this;
  }

  fromPointAndAngle(p0, angle) {
    let p1 = {x: p0.x + cos(angle), y: p0.y + sin(angle)};
    return this.fromTwoPoints(p0, p1);
  }

  fromPointAndVector(p0, v) {
    let p1 = {x: p0.x + v.x, y: p0.y + v.y};
    return this.fromTwoPoints(p0, p1);
  }

  intersects(o) {
    if (o instanceof Line) {
      let d = this.a * o.b - o.a * this.b;
      return d != 0.0;
    } else if (o instanceof LineSegment) {
      let t1 = this.a * o.p0.x + this.b * o.p0.y + this.c;
      let t2 = this.a * o.p1.x + this.b * o.p1.y + this.c;
      return t1 * t2 <= 0;
    }
    return undefined;
  }

  getIntersectionPoint(o) {
    if (o instanceof Line) {
      let d = this.a * o.b - o.a * this.b;
      if (d == 0.0) { return undefined; }
      let x = (this.b * o.c - o.b * this.c) / d;
      let y = (o.a * this.c - this.a * o.c) / d;
      return createVector(x, y);
    } else if (o instanceof LineSegment) {
      if (!this.intersects(o)) { return undefined; }
      return this.getIntersectionPoint(o.toLine());
    }
    return undefined;
  }

  getAngle() {
    return atan2(this.a, -this.b);
  }

  getPerpendicular(p) {
    return new Line(this.b, -this.a, this.a * p.y - this.b * p.x);
  }

  getParallel(p) {
    return new Line(this.a, this.b, -this.a * p.x - this.b * p.y);
  }

  getNearestPoint(p) {
    let l = this.getPerpendicular(p);
    return this.getIntersectionPoint(l);
  }

  draw(rect) {
    if (!rect) { rect = {x:0, y:0, w:0, h:0}}
    let l0, l1;
    if (abs(this.a) > abs(this.b)) {
      l0 = new Line().fromTwoPoints({x:rect.x, y:rect.y}, {x:rect.x + width, y:rect.y});
      l1 = new Line().fromTwoPoints({x:rect.x, y:rect.y + height}, {x:rect.x + width,   y:height});
    } else {
        l0 = new Line().fromTwoPoints({x:rect.x, y:rect.y}, {x:rect.x, y:height});
      l1 = new Line().fromTwoPoints({x:rect.x + width, y:rect.y}, {x:rect.x + width, y:rect.y + height});
    }

    let p0 = this.getIntersectionPoint(l0);
    let p1 = this.getIntersectionPoint(l1);
    line(p0.x, p0.y, p1.x, p1.y);
  }
}