
export default (graph) => {
  return {
    source: graph.addNode({
      x: 130,
      y: 30,
      width: 100,
      height: 40,
      attrs: {
        label: {
          text: 'Hello',
          fill: '#6a6c8a',
        },
        body: {
          stroke: '#31d0c6',
          strokeWidth: 2,
        },
      },
    }),
    target: graph.addNode({
      x: 180,
      y: 160,
      width: 100,
      height: 40,
      attrs: {
        label: {
          text: 'World',
          fill: '#6a6c8a',
        },
        body: {
          stroke: '#31d0c6',
          strokeWidth: 2,
        },
      },
    })
  }
}

