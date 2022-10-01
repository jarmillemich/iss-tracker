<template>
  hello
  <button onclick="activateXR()">Start Hello WebXR</button>
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
  canvas: canvas
});
renderer.autoClear = false;

// The API directly updates the camera matrices.
// Disable matrix auto updates so three.js doesn't attempt
// to handle the matrices independently.
const camera = new PerspectiveCamera();
camera.matrixAutoUpdate = false;


// Initialize a WebXR session using "immersive-ar".
const session = await navigator.xr.requestSession("immersive-ar");
session.updateRenderState({
  baseLayer: new XRWebGLLayer(session, gl)
});

// A 'local' reference space has a native origin that is located
// near the viewer's position at the time the session was created.
const referenceSpace = await session.requestReferenceSpace('local');

// Create a render loop that allows us to draw on the AR view.
const onXRFrame = (time, frame) => {
  // Queue up the next draw request.
  session.requestAnimationFrame(onXRFrame);

  // Bind the graphics framebuffer to the baseLayer's framebuffer
  gl.bindFramebuffer(gl.FRAMEBUFFER, session.renderState.baseLayer.framebuffer)

  // Retrieve the pose of the device.
  // XRFrame.getViewerPose can return null while the session attempts to establish tracking.
  const pose = frame.getViewerPose(referenceSpace);
  if (pose) {
    // In mobile AR, we only have one view.
    const view = pose.views[0];

    const viewport = session.renderState.baseLayer.getViewport(view);
    renderer.setSize(viewport.width, viewport.height)

    // Use the view's transform matrix and projection matrix to configure the THREE.camera.
    camera.matrix.fromArray(view.transform.matrix)
    camera.projectionMatrix.fromArray(view.projectionMatrix);
    camera.updateMatrixWorld(true);

    // Render the scene with THREE.WebGLRenderer.
    renderer.render(scene, camera)
  }
}
session.requestAnimationFrame(onXRFrame);
}
  
  </script>