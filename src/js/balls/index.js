import Matter, {
  Engine,
  Render,
  World,
  Bodies,
  Mouse,
  MouseConstraint,
} from 'matter-js';

let engine = Engine.create();

const createBall = ({ x, y, radius }) =>
  Matter.Bodies.circle(x, y, radius, {
    render: {
      fillStyle: 'rgb(30, 30, 35)',
    },
  });

function init() {
  const width = document.documentElement.clientWidth;
  const height = document.documentElement.clientHeight;
  const vmin = Math.min(width, height);

  engine.events = {};

  World.clear(engine.world);
  Engine.clear(engine);

  engine = Engine.create();

  const render = Render.create({
    canvas: document.getElementById('canvas'),
    engine: engine,
    options: {
      wireframes: false,
      background: 'transparent',
      width: width,
      height: height,
    },
  });

  World.add(engine.world, [
    Bodies.rectangle(width / 2, height + 50, width, 100, {
      isStatic: true,
    }),
    Bodies.rectangle(width / 2, -50, width, 100, {
      isStatic: true,
    }),
    Bodies.rectangle(-50, height / 2, 100, height, {
      isStatic: true,
    }),
    Bodies.rectangle(width + 50, height / 2, 100, height, {
      isStatic: true,
    }),
  ]);

  for (let i = 0; i < 50; i++) {
    const radius = Math.round(10 + (Math.random() * vmin) / 10);
    const ball = createBall({
      x: Math.random() * width,
      y: (Math.random() * height) / 4,
      radius,
    });
    World.add(engine.world, ball);
  }

  var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        render: {
          visible: false,
        },
      },
    });

  World.add(engine.world, mouseConstraint);

  // keep the mouse in sync with rendering
  render.mouse = mouse;

  Engine.run(engine);
  Render.run(render);
  // let num = 0;
  // function update() {
  //   engine.world.gravity.x = Math.sin(num / 100);
  //   engine.world.gravity.y = Math.cos(num / 100);
  //   num += 1.7;
  //   idRAF = requestAnimationFrame(update.bind(this));
  // }
  // update();
}

export default init;

window.addEventListener('resize', init);
