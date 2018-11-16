export function createImagePlane({
  href,
  position = [0, 0, 0],
  scale = 1,
  opacity = 1
}) {
  const spriteMap = new THREE.TextureLoader().load(href);
  var geometry = new THREE.PlaneGeometry(1, 1, 1);
  //MeshBasicMaterial - not reacts to light
  //MeshPhongMaterial - reacts to light
  let material = new THREE.MeshLambertMaterial({
    map: spriteMap,
    color: 0xffffff,
    side: THREE.DoubleSide,
    transparent: true,
    opacity
  });

  let plane = new THREE.Mesh(geometry, material);
  plane.scale.set(scale, scale, scale);
  plane.position.set(...position);
  plane.receiveShadow = true;
  plane.castShadow = true;

  return plane;
}

export function createImageBox({ href, position = [0, 0, 0], scale = 1 }) {
  const spriteMap = new THREE.TextureLoader().load(href);
  let geometry = new THREE.BoxGeometry(1, 1, 1);
  let material = new THREE.MeshLambertMaterial({
    map: spriteMap,
    color: 0xffffff
    //transparent: true
  });

  let cube = new THREE.Mesh(geometry, material);
  cube.position.set(...position);
  cube.scale.set(scale, scale, scale);
  cube.receiveShadow = true;
  cube.castShadow = true;

  return cube;
}
