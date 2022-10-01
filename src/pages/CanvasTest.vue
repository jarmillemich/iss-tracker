<template>
  <canvas ref="canvas"></canvas>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import {
  Scene,
  Mesh,
  MeshBasicMaterial,
  WebGLRenderer,
  PerspectiveCamera,
  BoxGeometry,
  Group,
  Box3,
  PointLight,
  SpotLight,
  DirectionalLight,
  MeshPhongMaterial,
  AmbientLight,
  SphereGeometry
} from 'three'
import { getSatelliteInfo } from 'tle.js'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

let info = getSatelliteInfo(`ISS (ZARYA)             
1 25544U 98067A   22274.46188292  .00014869  00000+0  26380-3 0  9996
2 25544  51.6447 170.0519 0002623 316.7478 215.0466 15.50450812361668`, new Date().getTime(), -83, 42, 800)

let canvas = ref<HTMLCanvasElement | null>();

var scene = new Scene();
var camera = new PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 1, 50000 );

var renderer = new WebGLRenderer();
watch(() => canvas.value, () => canvas.value && (renderer.domElement = canvas.value))
renderer.setSize( window.innerWidth, window.innerHeight );
let ctrls = new OrbitControls(camera, renderer.domElement)
onMounted(() => {
  console.log(canvas.value)
  canvas.value?.replaceWith(renderer.domElement)
  canvas.value = renderer.domElement
})

const loader = new GLTFLoader();

let light = new DirectionalLight(0xffffff, 1)

scene.add(light)
light.position.set(10000, 10000, 10000)
light.lookAt(0, 0, 0)

let whatLight = new AmbientLight(0xffffff, 0.5)
scene.add(whatLight)

let ship: Group

async function main() {
  let [
    { scene: ship },
    { scene: planet }
  ] = await Promise.all([
    loader.loadAsync('/assets/models/ISS_stationary.glb'),
    loader.loadAsync('/assets/models/Earth_1_12756.glb'),
  ])

  ship.scale.set(100, 100, 100)
  scene.add(ship)
  scene.add(planet)

  ship.position.set(
    (12742 + info.height) * Math.sin(info.lng) * Math.cos(info.lat),
    (12742 + info.height) * -Math.cos(info.lng) * Math.cos(info.lat),
    (12742 + info.height) * Math.sin(info.lat)
  )
}

main().catch(err => {
  console.error('Failed in main', err)
})

let fakePlanet = new SphereGeometry(12742, 20, 20)
let planetMat = new MeshPhongMaterial({ color: 0x93dccc })
let fakePlanetNode = new Mesh(fakePlanet, planetMat)
scene.add(fakePlanetNode)

camera.position.z = 15000;
ctrls.update()

var animate = function () {
	requestAnimationFrame( animate );

  if (ship) {
    ship.rotation.x += 0.001;
    ship.rotation.y += 0.001;
  }

	renderer.render( scene, camera );
};

animate();

// Sizing things
function onResize() {
  if (canvas.value) {
    console.log(canvas.value)
    canvas.value.width = innerWidth
    canvas.value.height = innerHeight
    renderer.setSize(canvas.value.width, canvas.value.height)
    camera.aspect = innerWidth / innerHeight
    camera.updateProjectionMatrix()
    
  }
}
onResize()

addEventListener('wheel', (evt: WheelEvent) => {
  console.log(evt)
  if (evt.deltaY > 0) {
    camera.position.z *= 1.1
  } else if (evt.deltaY < 0) {
    camera.position.z /= 1.1
  }
})

onMounted(() => addEventListener('resize', onResize))
onUnmounted(() => removeEventListener('resize', onResize))

</script>

<style lang="scss">
canvas {
  height: 100%;
  width: 100%;
  background: mediumaquamarine;
}
</style>