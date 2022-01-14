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
      <template v-for="v in asideList" :key="v.name">
        <el-submenu :index="v.name" v-if="v.children && v.children.length> 0 && v.redirect == undefined ">
          <template v-slot:title>
            <i :class="v.meta.icon"></i>
            <span>{{ v.meta.title }}</span>
          </template>
          <el-menu-item-group v-if="v.children && v.children.length > 0">
            <el-menu-item
              v-for="v1 in v.children"
              :index="v1.name"
              :key="v1.name"
              @click="openPage(v1)"
              >{{ v1.meta.title }}</el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item v-else :index="v.name" @click="openPage(v)">
          <i :class="v.meta.icon"></i>
          <span>{{ v.meta.title }}</span>
        </el-menu-item>
      </template>
      
    </el-menu>
  </div>
</template>

<script>
import { onMounted, ref, watchEffect } from "vue";
// import RouterEnums from "@/enums/router.enums.js";
import { useRouter } from "vue-router";
import asideList from '@/router/routes';

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
    onMounted(() => {
    });
    watchEffect(
      () => {
        const curVal = router.currentRoute.value;
        asideList.map((v) => {
          if (v.children) {
            v.children.map((v1) => {
              if (v1.name === curVal.name) {
                defaultActive.value = curVal.name;
              }
            });
            return;
          } else if (v.name === curVal.name) {
            defaultActive.value = curVal.name;
          }
        });
      }
    );
    const openPage = (item) => {
      console.log("test-item", item);
      router.push({ name: item.name });
    };
    console.log('test-router', asideList);
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
