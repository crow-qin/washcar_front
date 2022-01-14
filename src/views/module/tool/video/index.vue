<template>
  <div class="tool-video scroll-page-reset">
    <p class="tool-video__title">调用电脑摄像头</p>
    <video ref="vRef" id="v" :srcObject="srcObject" controls @play="toPlay" @pause="close"></video>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
export default {
  name: 'Video',
  setup() {
    const srcObject = ref({});
    const vRef = ref(null);
    let steam = null;
    const constraints = {
      audio: true,
      video: { width: 500, height: 500}
    };
    const toPlay = async() => {
      try {
        if (!(navigator && navigator.mediaDevices)) {
          throw new Error('navigator.mediaDevices 不存在');
        }
        if (!vRef.value) return;
        if (!vRef.value.paused) {
          close();
          return;
        } 
        let mediaPro = navigator.mediaDevices.getUserMedia(constraints);
        mediaPro.then((res) => {

          if (res) {
            console.log('test-res', res);
            steam = res;
            srcObject.value = res;
            // let v = document.querySelector('#v');
            // v.srcObject = res;
            // v.play();
            vRef.value.play();
          }
        });
      } catch (err) {
        console.error(err);
      }
    };
    const close = () => {
      console.log('test-srcObj', srcObject.value, steam);
      if (srcObject.value.getTracks) {
        // steam.getTracks()[0].stop();
        srcObject.value.getTracks().forEach((track) => {
          track.stop();
        });
        srcObject.value = {};
        // steam = null;
      }
    };

    onMounted(() => {
      // toPlay();
    });
    return {
      srcObject,
      vRef,
      toPlay,
      close,
    };
  }
};
</script>

<style lang="scss">
.tool-video {
  video {
    width:  500px;
    height: 400px;
  }
}
</style>