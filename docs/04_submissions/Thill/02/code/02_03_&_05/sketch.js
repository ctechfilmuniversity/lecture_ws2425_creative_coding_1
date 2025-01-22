// Declare global variables to store the p5.js instances
let sketchOne;
let sketchTwo;





// First Sketch
let one = function (p) {
  let time = 0;
  let radius = 10;
  let radiusGrow = 0.2;
  let timeMax = 2;

  // Circle's position
  let circleX;
  let circleY;

  p.setup = function () {
    const canvas1 = p.createCanvas(p.windowWidth, p.windowHeight * 0.45);
    canvas1.parent("one");
    p.background(0);

    // Initialise circle position with the mouse position
    circleX = p.mouseX;
    circleY = p.mouseY;
  };

  p.draw = function () {
    p.background(0, 50);

    p.middle(100);

    p.push();
    p.translate(300, 0);
    // p.middle(20);
    p.pop();
  };

  p.middle = function (brightness) {
    // Check if the mouse is inside the canvas
    if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
      // Follow the mouse position

      // circleX = p.mouseX;
      // circleY = p.mouseY;

       circleX = p.lerp(circleX, p.mouseX, 0.3);
       circleY = p.lerp(circleY, p.mouseY, 0.3);
    } else {
      // Lerp the circle's position to the centre
      circleX = p.lerp(circleX, p.width / 2, 0.05); // 0.05 controls the smoothness
      circleY = p.lerp(circleY, p.height / 2, 0.05);

    }

    // Update radius
    radius += radiusGrow;

    if (radius >= 300 || radius <= 10) {
      radiusGrow *= -1;
    }

    // Draw main circle
    p.stroke(255, brightness);
    p.strokeWeight(7);
    p.noFill();
    p.ellipse(circleX, circleY, radius * 2);

    // Draw orbiting circle
    let x = radius * p.cos(time);
    let y = radius * p.sin(time);
    p.stroke(255);
    p.ellipse(circleX + x, circleY + y, radius * 4);
    p.ellipse(circleX + x / 2, circleY + y / 2, radius);

    time += p.map(p.mouseX, 100, p.width, 0.03, 2); // Control acceleration
  }
};






// Second Sketch
let two = function (p) {
  let flowers = []; // Array to hold all flower objects

  p.setup = function () {
    const canvas1 = p.createCanvas(p.windowWidth, p.windowHeight * 0.45);
    canvas1.parent("two");

    p.angleMode(p.DEGREES); // Use degrees for angle calculations
    p.noStroke(); // Disable stroke for shapes
  };

  p.draw = function () {
    p.background(0, 50); // Semi-transparent background for fade effect

    // Draw all flowers
    for (let flower of flowers) {
      flower.update(); // Update each flower's size
      flower.display(); // Draw each flower
    }
  };

  // Add a new flower when the mouse is pressed
  p.mousePressed = function () {
    flowers.push(new Flower(p.mouseX, p.mouseY)); // Use instance-scoped p.mouseX, p.mouseY
  };

  // Flower class
  class Flower {
    constructor(x, y) {
      this.x = x; // X-coordinate of the flower
      this.y = y; // Y-coordinate of the flower
      this.size = p.random(10, 30); // Initial size of the flower
      this.color = p.color(p.random(200, 255), p.random(100, 255), p.random(100, 255)); // Random color
      this.petalCount = p.int(p.random(6, 12)); // Number of petals
      this.growthRate = p.random(0.5, 2); // Growth rate
    }

    update() {
      this.size += this.growthRate; // Increase size
      if (this.size > 150) {
        this.size = p.random(5, 50); // Reset size to a random value
      }
    }

    display() {
      p.fill(this.color); // Set fill color for petals
      for (let i = 0; i < this.petalCount; i++) {
        let angle = (360 / this.petalCount) * i; // Angle between petals
        let x = this.x + p.cos(angle) * this.size; // X-coordinate of petal
        let y = this.y + p.sin(angle) * this.size; // Y-coordinate of petal
        p.ellipse(x, y, this.size / 5, this.size / 5); // Draw petal
      }
      p.fill(255, 200); // Set fill color for the flower's center
      p.ellipse(this.x, this.y, this.size / 5); // Draw the flower's center
    }
  }
};


// Instantiate the sketches and store their instances
sketchOne = new p5(one);
sketchTwo = new p5(two);

// Resizing the window will have an effect on each sketch listed in here:
window.addEventListener('resize', () => {
  if (sketchOne) {
    sketchOne.resizeCanvas(sketchOne.windowWidth, sketchOne.windowHeight * 0.4);
  }
  if (sketchTwo) {
    sketchTwo.resizeCanvas(sketchTwo.windowWidth, sketchTwo.windowHeight * 0.4);
  }
});
