<template>
  <div class="server-setting scroll-page-reset">
    <div class="part-reset">
      <div>

      </div>
      <cm-table
        :data="state.tableData"
        style="width: 100%"
        :columns="state.columns"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const state = reactive({
  tableData: [
    {
      date: "2016-05-03",
      name: "王小虎",
      type: "充值",
      gold: 210,
    },
    {
      date: "2016-05-02",
      name: "王小虎",
      type: "充值",
      gold: 100,
    },
    {
      date: "2016-05-04",
      name: "王小虎",
      type: "充值",
      gold: 2100,
    },
    {
      date: "2016-05-01",
      name: "王小虎",
      type: "充值",
      gold: 1,
    },
    {
      date: "2016-05-08",
      name: "王小虎",
      type: "充值",
      gold: 20,
    },
    {
      date: "2016-05-06",
      name: "王小虎",
      type: "充值",
      gold: 2,
    },
    {
      date: "2016-05-07",
      name: "王小虎",
      type: "充值",
      gold: 200,
    },
  ],
  columns: [
    {
      id: "date",
      title: "日期",
      width: "20%",
      sortable: true,
    },
    {
      id: "name",
      title: "姓名",
      width: "20%",
    },
    {
      id: "type",
      title: "类型",
      width: "15%",
      // render: ({ row }) => {
      //   return (
      //     <div>{ row.city + row.address }</div>
      //   )
      // }
    },
    {
      id: "gold",
      title: "金额",
      width: "15%",
      sortable: true,
    },
  ]
});
</script>

<style>

</style>