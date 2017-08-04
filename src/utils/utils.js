import * as THREE from 'three';


// this function returns a list of THREE.Vertex3 with positions in the global scope for the given object
export const getGlobalVerts = (object) => {
  const objPosition = object.getWorldPosition();
  const objScale = object.getWorldScale();
  const objQuaternion = object.getWorldQuaternion();

  return object.geometry.attributes.position.array
    .reduce((acc, value, index)=>{
      if( (index % 3) === 0 ) {
        acc[Math.floor(index / 3)] = [];
      }
      acc[Math.floor(index / 3)].push(value);
      return acc;
    },[])
    .map(vertArray => new THREE.Vector3(...vertArray))
    .map(vector => {
      vector.multiply(objScale);
      vector.applyQuaternion(objQuaternion);
      vector.add(objPosition);
      return vector;
    });
};

// this function takes an intersect position, the plane that is being intersected, and the canvas responsible for the plane's texture
// this function returns the x and y position of the canvas relative to the position passed in
export const getCanvasPosition = (position, plane, canvas) => {
  //for some reason, this only works when the canvas has the same width and height.
  let globalVerts = getGlobalVerts(plane);
  let triangle = new THREE.Triangle(globalVerts[0], globalVerts[1], position);
  let base = globalVerts[0].distanceTo(globalVerts[1]);
  let hype = globalVerts[0].distanceTo(position);
  let totalHeight = globalVerts[0].distanceTo(globalVerts[2]);
  let height = 2 * (triangle.area() / base);
  let width = Math.sqrt(Math.pow(hype,2) - Math.pow(height,2));
  let y = (width/base) * canvas.width;
  let x = (height/totalHeight) * canvas.height;
  return {x, y};
};

// this function creates a small box at the given position in the global context. useful for debugging math
export const createBox = (vert, color) => {
  let scene = document.getElementsByTagName('a-scene')[0];
  let box = document.createElement('a-box');
  box.setAttribute('scale', '0.01 0.01 0.01');
  box.setAttribute('position', `${vert.x} ${vert.y} ${vert.z}`);
  box.setAttribute('color', color);
  scene.appendChild(box);
};

// this function returns a THREE.Color object at the x, y position of the given canvas
export const getColorFromCanvas = (x, y, canvas) => {
  let ctx = canvas.getContext('2d');
  let colorArray = ctx.getImageData(Math.floor(x), Math.floor(y),1,1).data;
  return new THREE.Color(`rgb(${colorArray[0]},${colorArray[1]},${colorArray[2]})`);
};

export const stringifyVector = (vector) => `${vector.x} ${vector.y} ${vector.z}`;

export const degToRad = (rotation) => Object.keys(rotation)
  .map(key => ({key, value: rotation[key]}))
  .map(({key, value}) => ({key, value: (Math.PI / 180) * value}))
  .reduce((acc, {key, value}) => {
    acc[key] = value;
    return acc;
  }, {});

export const radToDeg = (rotation) => Object.keys(rotation)
  .map(key => ({key, value: rotation[key]}))
  .map(({key, value}) => ({key, value: (180 / Math.PI) * value}))
  .reduce((acc, {key, value}) => {
    acc[key] = value;
    return acc;
  }, {});