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
  SphereGeometry,
  Vector3,
} from 'three'
import { getSatelliteInfo } from 'tle.js'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

let info = getSatelliteInfo(`ISS (ZARYA)             
1 25544U 98067A   22274.46188292  .00014869  00000+0  26380-3 0  9996
2 25544  51.6447 170.0519 0002623 316.7478 215.0466 15.50450812361668`, new Date().getTime(), -83, 42, 800)

console.log(info)

let canvas = ref<HTMLCanvasElement | null>();
let out = ref<HTMLElement | null>()

var scene = new Scene();
var camera = new PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 1, 1000000 );

var renderer = new WebGLRenderer();
watch(() => canvas.value, () => canvas.value && (renderer.domElement = canvas.value))
renderer.setSize( window.innerWidth, window.innerHeight );
let ctrls = new OrbitControls(camera, renderer.domElement)
onMounted(() => {
  console.log(canvas.value)
  canvas.value?.replaceWith(renderer.domElement)
  canvas.value = renderer.domElement
})

//const loader = new GLTFLoader();

const loader = new GLTFLoader();
let dl = new DRACOLoader
dl.setDecoderPath('/assets/draco/');
dl.preload();
loader.setDRACOLoader(dl)
let light = new DirectionalLight(0xffffff, 2)

scene.add(light)
//camera.add(light)
light.position.set(10000, 10000, 10000)
light.lookAt(0, 0, 0)

let system: Group, ship: Group, planet: Group
let issTle: string

async function main() {
  let tleData: any
  
  [
    { scene: ship },
    { scene: planet },
    tleData
  ] = await Promise.all([
    // loader.loadAsync('ISS_stationary_lo.glb'),
    // loader.loadAsync('Earth_1_12756.glb'),
     loader.loadAsync('/assets/models/ISS_stationary_lo.glb'),
     loader.loadAsync('/assets/models/Earth_1_12756.glb'),
    
    // 25544 = ISS (Zarya)
    fetch('https://tle.ivanstanojevic.me/api/tle/25544').then(res => res.json())
  ])

  let whatLight = new AmbientLight(0xffffff, 1)
  scene.add(whatLight)

  system = new Group()

  //ship.scale.set(5, 5, 5)
  //ship.position(new Vector3(planet.position.x, planet.position.y, planet.position.z))
  //scene.add(ship)
  //planet.attach(ship);
  ship.scale.set(5, 5, 5)
  //planet.attach(whatLight);
  //planet.add(ship)
  scene.add(system)
  system.attach(ship)
  system.attach(planet)

  // Earth = 12,742 km diameter, model = 1000 km diameter
  let scale = 12742/1000
  planet.scale.set(scale, scale, scale)

  issTle = `${tleData.name}\n${tleData.line1}\n${tleData.line2}`
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

  light.lookAt(0, 0, 0)

  if (ship) {
    ship.rotation.x += 0.001;
    ship.rotation.y += 0.001;
    system.rotation.y += 0.01;

    let when = start + (new Date().getTime() - start) * 100

    

    if (out.value) out.value.innerText = JSON.stringify(info, null, 2)


    ship.position.copy(getTleXyz(issTle, when))

  }

	renderer.render( scene, camera );
};

function getTleXyz(tle: string, when: number): Vector3 {

  let info = getSatelliteInfo(tle,
    when,
    -83,
    42,
    800
  )

  let lat = info.lat * Math.PI / 180
  let lon = info.lng * Math.PI / 180

  return new Vector3(
    (12742/2 + info.height) * -Math.sin(lon) * Math.cos(lat),
    (12742/2 + info.height) * Math.sin(lat),
    (12742/2 + info.height) * -Math.cos(lon) * Math.cos(lat),
  )
}

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
  left: -28rem;
  background: white;
  width: 30rem;
  height: 14rem;
  transition: left 300ms ease;

  &:hover {
    left: 0;
  }
}
</style>