// import bibliotek
import * as THREE from "three";

// zmienne
const canvas = document.querySelector(".webgl");
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// 4 podstawowe rzeczy

// Scena
const scene = new THREE.Scene();

// Object
const object1Geometry = new THREE.BoxGeometry(1, 1, 1);
const object1Material = new THREE.MeshBasicMaterial({ color: "white" });
const object1 = new THREE.Mesh(object1Geometry, object1Material);
scene.add(object1);
// object1.position.z = -2;

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.01, 1000);
camera.position.z = 1;

scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// mouseMove
const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", () => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = event.clientY / sizes.height - 0.5;
});

window.addEventListener("resize", () => {
  // update rozmiaru
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  //update kamery
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Tick
const clock = new THREE.Clock();
const tick = () => {
  //time
  const elapsedTime = clock.getElapsedTime();
  // update
  // object1.rotation.y = elapsedTime * 5;
  camera.lookAt(object1.position);
  camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2;
  camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2;
  camera.position.y = cursor.y * 2;

  // camera.position.x = cursor.x * 5;
  // camera.position.y = -cursor.y * 5;

  // render
  renderer.render(scene, camera);
  // loop
  window.requestAnimationFrame(tick);
};
tick();
