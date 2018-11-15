export function loadSprite(href, scale = 1) {
  const spriteMap = new THREE.TextureLoader().load(href);
  const spriteMaterial = new THREE.SpriteMaterial({
    map: spriteMap,
    color: 0xffffff
  });

  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.scale.set(scale, scale, 1);
  return sprite;
}
