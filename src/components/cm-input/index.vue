<template>
  <div class="cm-input">
    <div>{{label + ':'}}</div>
    <input class="cm-input__ipt" type="text" :value="text" @input="$emit('update:text', $event.target.value);">
    <!-- <div>test inject {{ aboutCount }}</div>
    <div @click="addCount">add count</div> -->
  </div>
</template>

<script>
import { inject } from 'vue';
export default {
  name: 'cm-input',
  props: {
    label: {
      default: 'text',
      type: String,
    },
    text: String,
  },
  emits: ['update:text'],
  setup(props, { emit }) {
    console.log('test-props', props, emit);
    const aboutCount = inject('aboutCount');
    const addCount = inject('addCount');

    return {
      aboutCount,
      addCount,
    };
  }
};
</script>

<style lang="scss">
.cm-input {
  display: flex;
  align-items: center;
  .cm-input__ipt {
    margin-left: 4px;
    &:focus {
      outline: none;
      border: 1px solid #666;
    }
  }
}
</style>
