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
  AmbientLight
} from 'three'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

let canvas = ref<HTMLCanvasElement | null>();

var scene = new Scene();
var camera = new PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new WebGLRenderer();
watch(() => canvas.value, () => canvas.value && (renderer.domElement = canvas.value))
renderer.setSize( window.innerWidth, window.innerHeight );
//document.body.appendChild( renderer.domElement );
//canvas.value?.replaceWith(renderer.domElement)
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

}, undefined, function ( error ) {

	console.error( error );

} );



camera.position.z = 80;

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