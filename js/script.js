const burstPolygon = new mojs.Burst({
    radius: { 0 : 180 },
    top: '30%',
    left: '20%',
    count: 30,
    children: {
      shape: 'polygon',
      radius: { 20 : 5 },
      duration: 1500,
      repeat: 9999,
    },
  });
  const burstCross = new mojs.Burst({
    radius: { 0 : 135 },
    top: '40%',
    left: '80%',
    count: 15,
    children: {
      shape: 'cross',
      stroke: 'orange',
      strokeWidth: { 9 : 3 },
      radius: { 20 : 5 },
      angle: { 360 : 0 },
      duration: 1500,
      repeat: 9999,
    },
  });
  const swirls = {
    radius: 5,
    direction: -1,
    swirlSize: 85,
    swirlFrequency: 10,
    repeat: 999
  };
  const swirl = new mojs.ShapeSwirl({
    ...swirls,
    fill: 'papayawhip',
    top: '10%',
    y: { 0: -150 },
    duration: 3000,
  });
  const swirl2 = new mojs.ShapeSwirl({
    ...swirls,
    fill: 'mediumvioletred',
    top: '80%',
    left: '80%',
    y: { 0: 50 },
    duration: 3000,
  });
  const swirl3 = new mojs.ShapeSwirl({
    ...swirls,
    fill: 'yellow',
    top: '80%',
    left: '20%',
    y: { 0: -100 },
    duration: 3000,
  });
  const circs = {
    fill: 'none',
    opacity: { 1 : 0 },
    duration: 1800,
    repeat: 999
  };
  const circ = new mojs.Shape({
    ...circs,
    radius: { 0 : 100 },
    top: '40%',
    left: '80%',
    stroke: 'peachpuff',
  });
  const circ2 = new mojs.Shape({
    ...circs,
    radius: { 0 : 250 },
    top: '30%',
    left: '20%',
    stroke: 'magenta'
  });
  const tl = new mojs.Timeline({
    repeat: 999
  })
  .add(burstPolygon, burstCross, swirl, swirl2, swirl3, circ, circ2)
  .play();