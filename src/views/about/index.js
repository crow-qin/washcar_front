import { ref, watch, computed,getCurrentInstance, onMounted, reactive, provide, readonly, onUpdated, onBeforeUpdate } from "vue";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import RouterEnums from "../../enums/router.enums.js";

export default () => {
  const { ctx } = getCurrentInstance();
  const store = useStore();
  const router = useRouter();

  const count = ref(1);
  const formatCount = computed(() => count.value * 2);
  const add = () => {
    count.value++;
  };

  const count1 = ref(50);
  const sub = () => {
    count1.value--;
  };
  
  // watch监听多个属性
  watch([() => count.value, () => count1.value], ([n1, n2], [o1, o2])=> {
    console.log('test', n1, n2, o1, o2);
  });

  // vuex
  const user = computed(() => ctx.$store.state.about.user);
  
  let community = ref([
    { id: 1, name: '第一小区' },
    { id: 2, name: '第二小区' },
  ]);
  // ref数组
  let communityRef = [];
  const setCommunityRef = el => {
    communityRef.push(el);
  };
  onBeforeUpdate(() => {
    communityRef = [];
  });
  onUpdated(() => {
    console.log('test-communityRef', communityRef);
  });

  // 对象使用reactive
  const current = reactive({
    name: 'dd',
    password: '123',
  });

  const name = ref('');
  // 路由
  // const { ctx } = getCurrentInstance();
  // console.log('test-ctx.$router.currentRoute.value', ctx.$router.currentRoute.value);
  const setUserAsync = () => store.dispatch('about/setUserAsync');

  const openPage = () => {
    router.push({ name: RouterEnums.LOGIN });
  };
  // provide
  // readonly 只读 子组件无法修改
  provide('aboutCount', readonly(count));
  provide ('addCount', add);

  onMounted (()=> {
    // 两种触发
    // ctx.$store.commit('about/setUser', current);
    setUserAsync();
    console.log('test-user', user);
    setTimeout(() => {
      // community.value = [
      //   { id: 3, name: '第三小区' },
      //   { id: 4, name: '第四小区' },
      // ]
      // console.log('test-community', community.value);

      current.name = 'cc';
    }, 2000);
  });
  return {
    count,
    add,
    formatCount,
    count1,
    sub,
    community,
    current,
    name,
    user,
    setUserAsync,
    openPage,
    communityRef,
    setCommunityRef,
    // ...mapState('about', ['user']),
  };
};