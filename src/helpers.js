export function loadSprite(href, scale = 1) {
  const spriteMap = new THREE.TextureLoader().load(href);
  var geometry = new THREE.PlaneGeometry(1, 1, 1);
  let material = new THREE.MeshBasicMaterial({
    map: spriteMap,
    color: 0xffffff,
    transparent: true
  });

  let part = new THREE.Mesh(geometry, material);

  part.scale.set(scale, scale, scale);

  return part;
}
