//calculate hit probability based on given function
export const calcProb = (plate_x, plate_z, velo) => {
  return (
    -0.2168
    - 0.0043 * Math.tanh(0.5 * (-67.7856 + 0.5504 * velo + 6.7840 * plate_z - 7.0900 * plate_x))
    - 0.2951 * Math.tanh(0.5 * (-2.2518 - 0.0236 * velo + 1.4241 * plate_z + 0.6548 * plate_x))
    + 0.1418 * Math.tanh(0.5 * (-5.4668 + 0.0354 * velo + 2.2263 * plate_z - 2.6540 * plate_x))
    - 0.2735 * Math.tanh(0.5 * (0.5539 + 0.0134 * velo - 1.0178 * plate_z - 1.2269 * plate_x))
    - 0.0152 * Math.tanh(0.5 * (-61.8711 + 0.6910 * velo - 1.1399 * plate_z - 2.5312 * plate_x))
  )
}; 

export const removeDuplicatesByProperty = (myArr, prop) =>  {
  return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
  });
}

export const extractPitchers = data => {
  return removeDuplicatesByProperty(data, 'pitcher').map(row => (
    { id: row.pitcher_id, name: row.pitcher }
  ))
}

export const getPitcherData = (data, pitcherId) => {
  return data.filter( dataPoint => dataPoint.pitcher_id === pitcherId)
}

export const getVelocityData = (data, velocity) => {
  return data.filter( dataPoint => {
    console.log(dataPoint.release_speed, velocity)
    return (parseFloat(dataPoint.release_speed) >= parseFloat(velocity)) && (parseFloat(dataPoint.release_speed) <= parseFloat(velocity + 1))
  })
}

export const getContourData = data => {
  const filteredData = data.map(dataPoint => {
    return (({ pitcher_id, plate_x, plate_z, release_speed }) => ({ pitcher_id, plate_x, plate_z, release_speed }))(dataPoint)
  })

  return filteredData.map(dp => {
    const converted = [dp.plate_x, dp.plate_z, dp.release_speed].map(Number);
    return {x: converted[0], y: converted[1], color: calcProb(...converted) }
  })
}

export const updateContourSet = (parsedData, pitcherId, velocity) => {
  const pitcherData = getPitcherData(parsedData, pitcherId); 
  const pitcherVeloData = getVelocityData(pitcherData, velocity);
  return getContourData(pitcherVeloData);
}

export const minVelo = (data, pitcherId) => {
  Math.min(...getPitcherData(data, pitcherId).map(dataPoint => dataPoint.release_speed))
}

export const maxVelo = (data, pitcherId) => {
  Math.min(...getPitcherData(data, pitcherId).map(dataPoint => dataPoint.release_speed))
}