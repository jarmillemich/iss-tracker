<template>
  <pre ref="out"></pre>
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

console.log(info)

let canvas = ref<HTMLCanvasElement | null>();
let out = ref<HTMLElement | null>()

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

let light = new DirectionalLight(0xffffff, 4)

scene.add(light)
light.position.set(10000, 10000, 10000)
light.lookAt(0, 0, 0)

let whatLight = new AmbientLight(0xffffff, 1)
scene.add(whatLight)

let ship: Group, planet: Group

async function main() {
  [
    { scene: ship },
    { scene: planet }
  ] = await Promise.all([
    loader.loadAsync('/assets/models/ISS_stationary.glb'),
    loader.loadAsync('/assets/models/Earth_1_12756.glb'),
  ])

  ship.scale.set(5, 5, 5)
  scene.add(ship)
  scene.add(planet)

  let what = new Box3
  what.setFromObject(planet)
  console.log(what)

  let scale = 12742/1000
  planet.scale.set(scale, scale, scale)

  
}

main().catch(err => {
  console.error('Failed in main', err)
})

let fakePlanet = new SphereGeometry(12742, 20, 20)
let planetMat = new MeshPhongMaterial({ color: 0x93dccc })
let fakePlanetNode = new Mesh(fakePlanet, planetMat)
//scene.add(fakePlanetNode)

camera.position.z = -9000;
ctrls.update()

let start = new Date().getTime()

var animate = function () {
	requestAnimationFrame( animate );

  if (ship) {
    ship.rotation.x += 0.001;
    ship.rotation.y += 0.001;

    let when = start + (new Date().getTime() - start) * 100

    let info = getSatelliteInfo(`ISS (ZARYA)             
      1 25544U 98067A   22274.46188292  .00014869  00000+0  26380-3 0  9996
      2 25544  51.6447 170.0519 0002623 316.7478 215.0466 15.50450812361668`,
      when,
      -83,
      42,
      800
    )

    if (out.value) out.value.innerText = JSON.stringify(info, null, 2)

    let lat = info.lat * Math.PI / 180
    let lon = info.lng * Math.PI / 180

    ship.position.set(
      (12742/2 + info.height) * -Math.sin(lon) * Math.cos(lat),
      
      (12742/2 + info.height) * Math.sin(lat),
      (12742/2 + info.height) * -Math.cos(lon) * Math.cos(lat),
    )

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

pre {
  position: absolute;
  top: 0;
  left: 0;
  background: white;
  width: 30rem;
  height: 14rem;
}
</style>