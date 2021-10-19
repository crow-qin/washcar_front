<template>
  <div>
    <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      :unique-opened="true"
      :default-active="defaultActive"
    >
      <el-submenu v-for="v in asideList" :index="v.flag" :key="v.flag">
        <template v-slot:title>
          <i :class="v.icon"></i>
          <span>{{ v.name }}</span>
        </template>
        <el-menu-item-group v-if="v.children.length > 0">
          <el-menu-item
            v-for="v1 in v.children"
            :index="v1.flag"
            :key="v1.flag"
            @click="openPage(v1)"
            >{{ v1.name }}</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import RouterEnums from "@/enums/router.enums.js";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const isCollapse = ref(false);
    const defaultActive = ref("");
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const asideList = ref([
      {
        icon: "el-icon-user-solid",
        name: "会员",
        flag: "member",
        children: [
          {
            name: "充值",
            flag: RouterEnums.MEMBER_RECHARGE,
          },
          {
            name: "消费",
            flag: RouterEnums.MEMBER_CONSUMPTION,
          },
          {
            name: "编辑",
            flag: RouterEnums.MEMBER_EDIT,
          },
        ],
      },
      {
        icon: "el-icon-s-marketing",
        name: "统计记录",
        flag: "statistics",
        children: [
          {
            name: "金额记录",
            flag: RouterEnums.STATISTICS_GOLD,
          },
          {
            name: "个人记录",
            flag: RouterEnums.STATISTICS_USER,
          },
        ],
      },
    ]);
    onMounted(() => {
      const data = router.currentRoute.value;
      asideList.value.map((v) => {
        v.children.map((v1) => {
          if (v1.flag === data.name) {
            defaultActive.value = data.name;
          }
        });
      });
    });
    watch(
      () => router.currentRoute.value,
      (n) => {
        asideList.value.map((v) => {
          v.children.map((v1) => {
            if (v1.flag === n.name) {
              defaultActive.value = n.name;
            }
          });
        });
      }
    );
    const openPage = (item) => {
      console.log("test-item", item);
      router.push({ name: item.flag });
    };
    return {
      isCollapse,
      defaultActive,
      handleOpen,
      handleClose,
      asideList,
      openPage,
    };
  },
};
</script>

<style>
</style>
