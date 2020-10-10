var scene, camera, renderer;

init();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 3, 10);

  const ambient = new THREE.HemisphereLight(0xffffbb, 0x080820);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 10, 6);
  scene.add(light);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 4, 0);
  controls.update();

  // axes helper
  const axes = new THREE.AxesHelper(15);
  scene.add(axes);

  //Add meshes here
  const height = 0.3;
  const geometry = new THREE.BoxGeometry(3, height, 0.9);
  const material = new THREE.MeshLambertMaterial({
    color: 0xdcbbc7,
  });
  const brick = new THREE.Mesh(geometry, material);
  const rowCount = 20;
  const brickCountPerRow = 1;
  for (let row = 1; row <= rowCount; row++) {
    const yPos = row * (height + 0.05);
    for (let count = 1; count <= brickCountPerRow; count++) {
      const block = brick.clone();
      block.position.set(0, yPos, 0);
      scene.add(block);
    }
  }

  window.addEventListener("resize", resize, false);

  update();
}

function update() {
  requestAnimationFrame(update);
  renderer.render(scene, camera);
}

function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
