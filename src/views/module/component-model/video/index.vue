<template>
  <div class="tool-video scroll-page-reset">
    <p class="tool-video__title">调用电脑摄像头</p>
    <!-- <video ref="vRef" id="v" :srcObject="srcObject" controls @play="play" @pause="close"></video> -->
    <video ref="vRef" id="v" :srcObject="srcObject" @play="() => true" @pause="()=>true"></video>
    <button @click="play">打开</button>
    <button @click="close">关闭</button>
    <button @click="screen">截图</button>
    <img :src="screenImg">
    <canvas class="tool-video__canvas" width="400" height="400" ref="canvasRef"/>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { nextTick } from '@vue/runtime-core';
export default {
  name: 'Video',
  setup() {
    const srcObject = ref({});
    const vRef = ref(null);
    const constraints = {
      audio: false,
      video: { width: 500, height: 500}
    };
    const play = async() => {
      try {
        if (!(navigator && navigator.mediaDevices)) {
          throw new Error('navigator.mediaDevices 不存在');
        }
        if (!vRef.value) return;
        if (srcObject.id) {
          await nextTick(() => {
            vRef.value.play();
          });
          return;
        }

        let mediaPro = navigator.mediaDevices.getUserMedia(constraints);
          let res = await Promise.resolve(mediaPro);
          if (res) {
            console.log('test-res', res);
            srcObject.value = res;
            await nextTick(() => {
              vRef.value.play();
            });
          }
      } catch (err) {
        console.error(err);
      }
    };
    const close = () => {
      console.log('test-close', srcObject.value);
      if (srcObject.value.id) {
        srcObject.value.getTracks().forEach((track) => {
          track.stop();
        });
        srcObject.value = {};
      }
    };
    const screenImg = ref('');
    const canvasRef = ref(null);
    const screen = async() => {
      await play();
      nextTick(() => {
        console.log('test-next');
        setTimeout(() => {
          console.log('test-setTime');
          let c = canvasRef.value;
          let ctx = c.getContext('2d');
          canvasRef.value.width = c.width;
          canvasRef.value.height = c.height;
    
          ctx.drawImage(vRef.value, 0, 0, c.width, c.height);
          screenImg.value = c.toDataURL('image/jpeg');
        }, 1000);
      });
    };

    return {
      srcObject,
      vRef,
      play,
      close,
      screenImg,
      canvasRef,
      screen,
    };
  }
};
</script>

<style lang="scss">
.tool-video {
  video {
    display: none;
    width:  500px;
    height: 500px;
  }
  .tool-video__canvas {
    display: none;
  }
  img {
    width: 100px;
    height: 100px;
  }
}
</style>