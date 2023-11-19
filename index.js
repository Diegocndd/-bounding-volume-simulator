// utils
function drawBoundingCircle(circle) {
  ellipse(circle.centerX, -circle.centerY, 2 * circle.radius);
}

function calculateBoundingCircle(cloud) {
  let centerX = 0;
  let centerY = 0;

  cloud.points.forEach(({ x, y }) => {
    centerX += x;
    centerY += y;
  });

  centerX /= cloud.points.length;
  centerY /= cloud.points.length;

  let maxRadius = 0;

  cloud.points.forEach(({ x, y }) => {
    const distanceToCenter = distance([x, y], [centerX, centerY]);
    maxRadius = Math.max(maxRadius, distanceToCenter);
  });

  return {
    centerX,
    centerY,
    radius: maxRadius,
  };
}

function drawAABB(aabb) {
  rect(aabb.minX, -aabb.maxY, aabb.maxX - aabb.minX, aabb.maxY - aabb.minY);
}

function calculateAABB(cloud) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  cloud.points.forEach(({ x, y }) => {
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  });

  return {
    minX,
    minY,
    maxX,
    maxY,
  };
}

function distance(point1, point2) {
  const [x1, y1] = point1;
  const [x2, y2] = point2;
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// preprocessing

const WIDTH = 400;
const HEIGHT = 400;

const clouds = [
  { center: [200, 200], qtyPoints: 10, maxDistance: 40, points: [] },
  { center: [100, 300], qtyPoints: 10, maxDistance: 20, points: [] },
];

clouds.forEach((cloud) => {
  for (let i = 0; i < cloud.qtyPoints; i++) {
    let x, y;

    do {
      x = Math.floor(Math.random() * (WIDTH + 1));
      y = Math.floor(Math.random() * (HEIGHT + 1));
    } while (distance(cloud.center, [x, y]) > cloud.maxDistance);

    cloud.points.push({
      x,
      y,
    });
  }
});

// p5.js

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  // (0, 0) no canto inferior esquerdo
  translate(0, height);

  clouds.forEach((cloud) => {
    stroke(0);
    strokeWeight(3);
    cloud.points.forEach(({ x, y }) => {
      point(x, -y);
    });

    // const aabb = calculateAABB(cloud);
    // strokeWeight(1);
    // noFill();
    // stroke(255, 0, 0);
    // drawAABB(aabb);
    // fill(0);

    bc = calculateBoundingCircle(cloud);
    strokeWeight(1);
    noFill();
    stroke(255, 0, 0);
    drawBoundingCircle(bc);
    fill(0);
  });
}
