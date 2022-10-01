<p>Hello World!!n dfkvnjks;fkjgadjkfglksdhflghjk</p>
<template>
    <button id="xr-button"></button>

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

let sessionSupported:boolean
let xrButton:HTMLElement|null

async function checkXR() {
  xrButton= document.getElementById('xr-button')

  if (navigator.xr) {
    await checkSupportedState();
    return sessionSupported;
  }
}

function checkSupportedState() {
  return new Promise<void>((resolve, reject) => {
    if(!navigator.xr)
        throw new Error("navigator.xr not supported");
    
    
        navigator.xr.isSessionSupported('immersive-ar').then((supported) => {
        
            if(!xrButton)
                throw new Error("xr button not found")
            if (supported) {
                xrButton.innerHTML = 'Enter AR'
                sessionSupported = true;
                resolve();
            }else{
                xrButton.innerHTML = 'AR not found'
            }
        })
  });
}
function onButtonClicked() {
  if (!XRSession) {
    if(!navigator.xr){
    navigator.xr.requestSession('immersive-ar', {
      optionalFeatures: ['dom-overlay'],
      requiredFeatures: ['local', 'hit-test'],
      domOverlay: {root: document.getElementById('app')},
    }).then(session => onSessionStarted(session), onRequestSessionError)
    } 
} 
//   else {
//     XRSession.end()
//   }
}
</script>