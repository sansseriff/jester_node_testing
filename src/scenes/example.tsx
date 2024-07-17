import {
  Circle,
  makeScene2D,
  Path,
  Node,
  Line,
  Shape,
  Spline,
  Knot,
  Polygon,
  Rect,
  Layout,
} from "@motion-canvas/2d";
import {
  createRef,
  all,
  createSignal,
  tween,
  map,
  waitFor,
  chain,
} from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  // Create your animations here

  // const circle = createRef<Circle>();
  // const path = createRef<Path>();

  // view.add(<Circle ref={circle} size={320} fill={'lightseagreen'} />);

  const maskRef = createRef<Path>();
  const valueRef = createRef<Path>();

  const spline = createRef<Spline>();

  const progress = createSignal(0);




  const polygonCount = 16; // Example: 5 polygons
  const polygons = Array.from(
    { length: polygonCount },
    (_, index) => index * 2*(1/(polygonCount+1)) - 1
  ); // Adjust for your use case
  const alternating = Array.from( 
    { length: polygonCount },
    (_, index) => index % 2 === 0  
  ); // Adjust for your use case

  view.add(
    <>
      <Node cache>
      <Spline lineWidth={15} stroke={"lightseagreen"} ref={spline}>
          <Knot position={[-300, 0]} startHandle={[-100, 0]} />
          <Knot position={[-150, -100]} startHandle={[-100, 0]} />
          <Knot position={[150, 100]} startHandle={[-100, 0]} />
          <Knot position={[300, 0]} startHandle={[-100, 0]} />
        </Spline>

        {polygons.map((offset, index) => (
          <>
            <Layout
              layout
              position={() =>
                spline().getPointAtPercentage(progress() - offset).position
              }
              rotation={() =>
                spline().getPointAtPercentage(progress() - offset).normal.flipped
                  .perpendicular.degrees + 90
              }
              compositeOperation={"source-atop"}
            >
              <Polygon
                offset={[0, -1]}
                sides={3}
                size={[20, 20]}
                fill={alternating[index] ? "#e32727" : "#992222"}
                scale={[13, 8]}
                // compositeOperation={"source-atop"}
              />
            </Layout>
          </>
        ))}
        
        {/* <Spline
          lineWidth={15}
          // stroke={"lightseagreen"}
          ref={spline}
          // compositeOperation={"source-in"}
        >
          <Knot position={[-300, 0]} startHandle={[-100, 0]} />
          <Knot position={[-150, -100]} startHandle={[-100, 0]} />
          <Knot position={[150, 100]} startHandle={[-100, 0]} />
          <Knot position={[300, 0]} startHandle={[-100, 0]} />
        </Spline> */}
      </Node>
    </>
  );

  yield* all(
    tween(2, (value) => {
      progress(map(0, 0.9, value));
    }),
    // chain(
    //   waitFor(0.02), 
    //   tween(2, (value) => {
    //     progress(map(0, 1, value));
    //   })
    // )
  );
});
