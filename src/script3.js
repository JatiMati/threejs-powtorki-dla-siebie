import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import typeFaceFont from "three/examples/fonts/helvetiker_regular.typeface.json";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

console.log();

// variables and others
const canvas = document.querySelector(".webgl");
const sizes = {
  w: window.innerWidth,
  h: window.innerHeight,
};

const textureLoader = new THREE.TextureLoader();
const stripesTexture = textureLoader.load("krzywa-paski-texture.png");

// scene
const scene = new THREE.Scene();

// Object
const fontLoader = new FontLoader();

fontLoader.load("/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Mati", {
    font: font,
    size: 1,
    height: 1,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.06,
    bevelSize: 0.04,
    bevelOffset: 0,
    bevelSegments: 16,
  });
  const textMaterial = new THREE.MeshPhysicalMaterial({
    color: "white",
    transmission: 1,
    opacity: 0,
    metalness: 0,
    roughness: 0,
    thickness: 0.8,
  });
  const text = new THREE.Mesh(textGeometry, textMaterial);
  scene.add(text);
  textGeometry.center();
});

//plane
const planeGeometry = new THREE.PlaneGeometry(20, 20);

const planeMaterial = new THREE.MeshBasicMaterial({ map: stripesTexture });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.position.z = -3;
// test cube
// scene.add(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial()));

//Camera
const camera = new THREE.PerspectiveCamera(75, sizes.w / sizes.h, 0.1, 100);
scene.add(camera);
camera.position.z = 5;

// lights
const ambientLight = new THREE.AmbientLight("white", 0.1);
scene.add(ambientLight);

const pointLight = new THREE.PointLight("white", 1);
pointLight.position.set(0, 1, 3);

scene.add(pointLight);

const pointLightHelper = new THREE.PointLightHelper(pointLight);
scene.add(pointLightHelper);
pointLightHelper.visible = false;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.w, sizes.h);
renderer.render(scene, camera);

window.addEventListener("resize", () => {
  //sizes
  sizes.w = window.innerWidth;
  sizes.h = window.innerHeight;

  //camera
  camera.aspect = sizes.w / sizes.h;
  camera.updateProjectionMatrix();

  // renderer
  //   renderer.render(scene, camera);
  renderer.setSize(sizes.w, sizes.h);
  //   renderer.render(scene, camera);
});

const clock = new THREE.Clock();

// orbit controls
const orbitControls = new OrbitControls(camera, canvas);

const tick = () => {
  //   time
  const elapsedTime = clock.getElapsedTime();
  //   console.log(elapsedTime);

  // update size
  renderer.render(scene, camera);
  //   loop
  window.requestAnimationFrame(tick);
};
tick();
