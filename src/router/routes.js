import RouterEnums from '@/enums/router.enums.js';
const Main = () => import('@/views/layout/main');

export default [
  {
    name: RouterEnums.MEMBER,
    path: '/member',
    component: Main,
    meta: {
      title: '会员',
      // icon: 'el-icon-user-solid',
      icon: 'User'
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
      icon: 'Goods'
      // icon: 'el-icon-s-marketing',
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
    name: RouterEnums.SERVER_TYPE,
    path: '/server-type',
    meta: {
      title: '服务类型',
      icon: 'Help'
    },
    component: Main,
    redirect: {
      name: RouterEnums.SERVER_TYPE_SETTING
    },
    children: [
      {
        name: RouterEnums.SERVER_TYPE_SETTING,
        path: 'setting',
        meta: {
          title: '表单',
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
      icon: 'Suitcase'
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
      },
      {
        name: RouterEnums.COMPONENTS_VIDEO,
        path: 'video',
        meta: {
          title: '调用摄像头',
        },
        component: () => import('@/views/module/component-model/video/index.vue')
      }
    ]
  },
  {
    name: RouterEnums.SETTING,
    path: '/setting',
    meta: {
      title: '设置',
      icon: 'Suitcase'
    },
    component: Main,
    children: [
      {
        name: RouterEnums.SETTING_ADD_USER,
        path: 'settingAddUser',
        meta: {
          title: '添加用户',
        },
        component: () => import('@/views/module/setting/addUser/index.vue')
      },
      {
        name: RouterEnums.CHAT_CON,
        path: 'chatCon',
        meta: {
          title: '聊天',
        },
        component: () => import('@/views/module/chat/index.vue')
      }
    ]
  },
];