<template>
  <div>
    <el-table :data="data" v-bind="$attrs">
      <el-table-column
        v-for="(row, i) in columns"
        :prop="row.id || ''"
        :key="row.id || '' + i"
        :label="row.title"
        :sortable="row.sortable != undefined ? row.sortable : false"
        :style="{width: row.width}">
        <template #default="scope" v-if="row.render">
          <render-component :data="{row: scope.row, index: i}" :renderContent="row.render"/>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'cm-table',
  props: {
    data: [Array, Function],
    // 标题对应数据
    columns: [Array, Function],
  },
  components: {
    renderComponent: {
      props: {
        data: {},
        renderContent: {
          type: [Function],
          default: () => (h) => h('div'),
        },
      },
      render() {
        if (_.isFunction(this.renderContent)) {
          return this.renderContent(this.data);
        }
        return (
          <div>error</div>
        );
      },
    }
  },
  setup() {

  },
};
</script>

<style>
</style>
