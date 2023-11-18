function distance(point1, point2) {
  const [x1, y1] = point1;
  const [x2, y2] = point2;
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

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

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  // (0, 0) no canto inferior esquerdo
  translate(0, height);

  stroke(0);
  strokeWeight(5);

  clouds.forEach((cloud) => {
    cloud.points.forEach(({ x, y }) => {
      point(x, -y);
    });
  });
}
