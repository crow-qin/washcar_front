import RouterEnums from '@/enums/router.enums.js';
const Main = () => import('@/views/layout/main');

export default [
  {
    name: RouterEnums.MEMBER,
    path: '/member',
    component: Main,
    meta: {
      title: '会员',
      icon: "el-icon-user-solid",
    },
    children: [
      {
        name: RouterEnums.MEMBER_RECHARGE,
        path: 'recharge',
        meta: {
          title: '充值',
        },
        component: () => import('@/views/module/member/member-recharge/index.vue'),
      },
      {
        name: RouterEnums.MEMBER_CONSUMPTION,
        path: 'consumption',
        meta: {
          title: '金额记录',
        },
        component: () => import('@/views/module/member/consumption/index.vue'),
      },
      // {
      //   name: RouterEnums.MEMBER_EDIT,
      //   path: 'consumption',
      //   component: () => import('@/views/module/member/consumption/index.vue'),
      // },
    ]
  },
  {
    name: RouterEnums.STATISTICS,
    path: '/statistic',
    meta: {
      title: '统计记录',
      icon: "el-icon-s-marketing",
    },
    component: Main,
    children: [
      {
        name: RouterEnums.STATISTICS_GOLD,
        path: 'gold',
        meta: {
          title: '金额记录',
        },
        component: () => import('@/views/module/statistic/gold/index.vue'),
      }
    ]
  },
  {
    name: RouterEnums.SERVER_TYPR,
    path: '/server-type',
    meta: {
      title: '服务类型',
      icon: 'el-icon-s-help'
    },
    component: Main,
    redirect: {
      name: RouterEnums.SERVER_TYPR_SETTING
    },
    children: [
      {
        name: RouterEnums.SERVER_TYPR_SETTING,
        path: 'setting',
        meta: {
          title: '设置',
        },
        component: () => import('@/views/module/server-type/setting/index.vue'),
      }
    ]
  },
  {
    name: RouterEnums.COMPONENTS,
    path: '/components',
    meta: {
      title: '组件',
      icon: 'el-icon-s-help'
    },
    component: Main,
    children: [
      {
        name: RouterEnums.LONG_LIST,
        path: 'longList',
        meta: {
          title: '长列表',
        },
        component: () => import('@/views/module/component-model/long-list/index.vue'),
      }
    ]
  }
];