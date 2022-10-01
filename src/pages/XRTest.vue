<p>Hello World!!n dfkvnjks;fkjgadjkfglksdhflghjk</p>
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
  SphereGeometry,
} from 'three'


onMounted(() => {
    console.log('hi Jared')

    //let q = new XRView
    //activateXR();
    const scene = new Scene();

})

async function activateXR() {
    // Add a canvas element and initialize a WebGL context that is compatible with WebXR.
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    const gl = canvas.getContext("webgl", {xrCompatible: true});

    const scene = new Scene();

    // The cube will have a different color on each side.
    const materials = [
        new MeshBasicMaterial({color: 0xff0000}),
        new MeshBasicMaterial({color: 0x0000ff}),
        new MeshBasicMaterial({color: 0x00ff00}),
        new MeshBasicMaterial({color: 0xff00ff}),
        new MeshBasicMaterial({color: 0x00ffff}),
        new MeshBasicMaterial({color: 0xffff00})
    ];

    // Create the cube and add it to the demo scene.
    const cube = new Mesh(new BoxGeometry(0.2, 0.2, 0.2), materials);
    cube.position.set(1, 1, 1);
    scene.add(cube);

    // Set up the WebGLRenderer, which handles rendering to the session's base layer.
    const renderer = new WebGLRenderer({
    alpha: true,
    preserveDrawingBuffer: true,
    canvas: canvas,
    //context: gl
    });
    renderer.autoClear = false;

    // The API directly updates the camera matrices.
    // Disable matrix auto updates so three.js doesn't attempt
    // to handle the matrices independently.
    const camera = new PerspectiveCamera();
    camera.matrixAutoUpdate = false;

    if(navigator.xr){
        // Initialize a WebXR session using "immersive-ar".
        const session = await navigator.xr.requestSession("immersive-ar");
        session.updateRenderState({
        baseLayer: new XRWebGLLayer(session, gl)
        });
    }

    // A 'local' reference space has a native origin that is located
    // near the viewer's position at the time the session was created.
    const referenceSpace = await session.requestReferenceSpace('local');
}



//let q = new XRView()
// function getXR(usePolyfill) {
//   let tempXR;

//   switch(usePolyfill) {
//     case "if-needed":
//       tempXR = navigator.xr;
//       if (!tempXR) {
//         webxrPolyfill = new WebXRPolyfill();
//         tempXR = webxrPolyfill;
//       }
//       break;
//     case "yes":
//       webxrPolyfill = new WebXRPolyfill();
//       tempXR = webxrPolyfill;
//       break;
//     case "no":
//     default:
//       tempXR = navigator.xr;
//       break;
//   }

//   return tempXR;
// }

// const nativeXr = getXR("no");  // Get the native XRSystem object
// const polyfilledXr = getXR("yes"); // Always returns an XRSystem from the polyfill
// const xr = getXR("if-needed");

</script>