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

let canvas = ref<HTMLCanvasElement | null>();

var scene = new Scene();
var camera = new PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

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
light.position.set(100, 100, 100)
light.lookAt(0, 0, 0)

let whatLight = new AmbientLight(0xffffff, 0.5)
scene.add(whatLight)

let ship: Group

loader.load( '/assets/models/ISS_stationary.glb', function ( gltf ) {

  console.log('loaded')
	scene.add( ship = gltf.scene );

  ship.position.set(100, 100, 100)

}, undefined, function ( error ) {

	console.error( error );

} );

loader.load( 'assets/models/Earth_1_12756.glb', function ( gltf ) {

console.log('loaded')
scene.add( ship = gltf.scene );

ship.position.set(
  (12742 + info.height) * Math.sin(info.lng) * Math.cos(info.lat),
  (12742 + info.height) * -Math.cos(info.lng) * Math.cos(info.lat),
  (12742 + info.height) * Math.sin(info.lat)
)

ship.scale.set(100, 100, 100)

console.log(ship.position)

}, undefined, function ( error ) {

console.error( error );

} );

let fakePlanet = new SphereGeometry(10, 20, 20)
let planetMat = new MeshPhongMaterial({ color: 0x93dccc })
let fakePlanetNode = new Mesh(fakePlanet, planetMat)
scene.add(fakePlanetNode)

camera.position.z = 80;
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