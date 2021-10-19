<template>
  <div class="statistic-gold scroll-page-reset">
    <div class="statistic-gold-top part-reset d-flex">
      <cm-form
        class="statistic-gold-top__form"
        :model="form"
        label-width="120px"
        label-suffix=":"
      >
        <cm-form-item label="时间范围">
          <el-date-picker
            size="small"
            v-model="form.timeRange"
            type="monthrange"
            range-separator="至"
            start-placeholder="开始月份"
            end-placeholder="结束月份"
            :disabledDate="disabledDate"
          >
          </el-date-picker>
        </cm-form-item>
      </cm-form>
      <el-button size="small" @click="search">搜索</el-button>
    </div>
    <div class="statistic-gold-echart mt-20 part-reset" id="echart"></div>
    <div class="mt-20 part-reset">
      <cm-table
        v-show="showData"
        :data="tableData"
        style="width: 100%"
        :columns="columns"
      />
    </div>
  </div>
</template>

<script>
import echarts from "@/plugins/echarts/plugin.js";
import RouterEnums from "@/enums/router.enums.js";
import { onMounted, reactive, ref } from "vue";

export default {
  name: RouterEnums.STATISTICS_GOLD,
  setup() {
    let myEchart = null;
    const setEchart = () => {
      const echart = document.getElementById("echart");
      myEchart = echarts.init(echart);
      myEchart.setOption({
        title: {
          text: "消费与充值金额统计",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["消费金额", "充值金额"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "消费金额",
            type: "line",
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "充值金额",
            type: "line",
            data: [220, 182, 191, 234, 290, 330, 310],
          },
        ],
      });
    };
    // 表格数据
    const tableData = ref([
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
    ]);
    
    const columns = ref([
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
    ]);
    const showData = ref(true);
    // 图表搜索对象
    const form = reactive({
      timeRange: "",
    });
    const search = () => {
      console.log('test-form', form);
    };
    const disabledDate = (time) => {
      return time.getTime() > Date.now();
    };
    onMounted(() => {
      setEchart();
      myEchart.getZr().on("click", function(params) {
        // 获取像素坐标点
        const pointInPixel = [params.offsetX, params.offsetY];
        console.log("test-params", params);
        if (myEchart.containPixel("grid", pointInPixel)) {
          let seriesIndex = myEchart.containPixel(
            { seriesIndex: 0 },
            pointInPixel
          )
            ? 0
            : 1;
          let index = myEchart.convertFromPixel(
            { seriesIndex },
            pointInPixel
          )[0];
          console.log("test-index", seriesIndex, index);
          // index=数据index
          // todo...
        }
      });
      // 将可以响应点击事件的范围内，鼠标样式设为pointer--------------------
      myEchart.getZr().on("mousemove", function(params) {
        const { topTarget } = params;
        // 给折线的鼠标悬浮 变为 小手
        if (topTarget?.z === 2) {
          myEchart.getZr().setCursorStyle("pointer");
        }
      });
      window.onresize = () => {
        myEchart && myEchart.resize();
      };
    });
    return {
      setEchart,
      tableData,
      columns,
      showData,
      form,
      search,
      disabledDate,
    };
  },
};
</script>

<style lang="scss">
.statistic-gold {
  .el-button {
    height: 28px;
  }
  .statistic-gold-top__form {
    flex: 1;
  }
  .statistic-gold-echart {
    height: 500px;
  }
}
</style>
 