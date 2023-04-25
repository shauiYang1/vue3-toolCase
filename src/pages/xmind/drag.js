export default (graph, e) => {
  let node = null;
  switch (graph, e) {
    case 'rect':
      node = graph.createNode({
        shape: "rect",
        label: 'Rect',
        width: 100,
        height: 40,
        attrs: {
          body: {
            stroke: '#8f8f8f',
            strokeWidth: 1,
            fill: '#fff',
            rx: 6,
            ry: 6,
          },
        },
      });
      break
    case 'circle':
      node = graph.createNode({
        width: 60,
        height: 60,
        shape: 'circle',
        label: 'Circle',
        attrs: {
          body: {
            stroke: '#8f8f8f',
            strokeWidth: 1,
            fill: '#fff',
          },
        },
      })
      break
    case 'custom-polygon':
      node = graph.createNode({
        // width: 100,
        // height: 100,
        shape: 'custom-polygon',
        attrs: {
          body: {
            refPoints: '0,10 10,0 20,10 10,20',
            
          },
        },
      })
      break
  }
  return node
}