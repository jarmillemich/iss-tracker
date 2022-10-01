<template>
    <canvas ref="canvas"></canvas>
</template>
<script lang="ts" setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'


onMounted(() => {
    console.log('hi Jared')

    //let q = new XRView
})




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