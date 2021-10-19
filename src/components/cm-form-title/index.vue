<template>
  <div class="cm-title d-flex">
    <div class="cm-title__content"> 
      <span class="cm-title__content__title">
        {{title}}
      </span>
      <span class="cm-title__content__tip">
        {{tip}}
      </span>
    </div>
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'cm-form-title',
  props: {
    title: String,
    tip: String,
  }
};
</script>

<style lang="scss">
.cm-title {
 justify-content: space-between;
 align-items: center;
 margin-bottom: 20px;
 .cm-title__content {
   .cm-title__content__title {
     font-size: 20px;
     color: $color-3;
     margin-right: 10px;
   }
   .cm-title__content__tip {
     font-size: 14px;
     color: $color-9;
   }
 }
}
</style>
