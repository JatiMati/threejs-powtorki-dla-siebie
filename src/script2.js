import * as THREE from "three";
import { OrbitControls } from "../node_modules/three/examples/jsm/controls/OrbitControls.js";

// other
const canvas = document.querySelector(".webgl");
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const textureLoader = new THREE.TextureLoader();
const stripesTexture = textureLoader.load("/krzywa-paski-texture.png", () => {
  console.log("loaded");
});
stripesTexture.rotation = Math.PI * 0.5;
stripesTexture.offset.x = 0;
stripesTexture.offset.y = 1;
// console.log(sizes.height, sizes.width);

// Scene
const scene = new THREE.Scene();

// Object
const material = new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
  transmission: 3,
  opacity: 1,
  metalness: 0,
  roughness: 0,
  ior: 2,
  thickness: 2,
  attenuationColor: 0xffffff,
  attenuationDistance: 1,
  specularIntensity: 1,
  specularColor: 0xffffff,
  envMapIntensity: 1,
});
const mesh1 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
const mesh2 = new THREE.Mesh(new THREE.SphereGeometry(0.6, 32, 32), material);
const mesh3 = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.25, 12, 40), material);
const plane = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshStandardMaterial({ map: stripesTexture }));
plane.position.z = -3;
scene.add(mesh1, mesh2, mesh3, plane);
mesh1.position.x = -2;
mesh2.position.x = 2;

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.01, 1000);
scene.add(camera);
camera.position.z = 4;
camera.position.x = 1;

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.9);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  console.log("resize");

  renderer.setSize(sizes.width, sizes.height);
});

// Controls
const controls = new OrbitControls(camera, canvas);

renderer.render(scene, camera);

const clock = new THREE.Clock();

const tick = () => {
  //elapsedTime
  const elapsedTime = clock.getElapsedTime();
  // object update
  mesh1.rotation.x = elapsedTime * 0.1;
  mesh2.rotation.x = elapsedTime * 0.13;
  mesh3.rotation.x = -elapsedTime * 0.16;

  //controls update
  controls.update();
  //renderer
  renderer.render(scene, camera);
  //request frame
  window.requestAnimationFrame(tick);
};
tick();
