import Matter, {
  Engine,
  Render,
  World,
  Bodies,
  Composite,
  Common,
  Composites,
  Mouse,
  MouseConstraint,
} from 'matter-js';

const fillColor = '#aab5c5';

function init() {
  const world = World.create({
    gravity: {
      x: 0,
      y: 0,
    },
  });
  const engine = Engine.create({
    world,
  });

  const render = Render.create({
    engine: engine,
    canvas: document.getElementById('canvas'),
  });

  const balls = [
    Bodies.circle(
      25,
      120,
      120,
      {
        // restitution: 0.1,
        // frictionAir: 0.1,
        render: {
          fillStyle: fillColor,
        },
      },
      120
    ),
  ];

  World.add(engine.world, balls);

  var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        render: {
          visible: false,
        },
      },
    });

  World.add(world, mouseConstraint);

  // keep the mouse in sync with rendering
  render.mouse = mouse;

  Engine.run(engine);
  Render.run(render);
}
export default init;
