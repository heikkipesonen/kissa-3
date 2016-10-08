export const getPointer = (event, layer) => {
  let propx = 'pageX'
  let propy = 'pageY'

  if (layer) {
    propx = 'layerX'
    propy = 'layerY'
  }

  if (event.touches && event.touches.length) {
    return {
      x: event.touches[0][propx],
      y: event.touches[0][propy],
      timeStamp: event.timeStamp || Date.now()
    }
  }

  return {
    x: event[propx],
    y: event[propy],
    timeStamp: event.timeStamp || Date.now()
  }
}
