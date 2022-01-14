import RouterEnums from '@/enums/router.enums.js';
const Main = () => import('@/views/layout/main');

export default [
  {
    name: 'member',
    path: '/member',
    component: Main,
    children: [
      {
        name: RouterEnums.MEMBER_RECHARGE,
        path: 'recharge',
        component: () => import('@/views/module/member/member-recharge/index.vue'),
      },
      {
        name: RouterEnums.MEMBER_CONSUMPTION,
        path: 'consumption',
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
    name: 'statistic',
    path: '/statistic',
    component: Main,
    children: [
      {
        name: RouterEnums.STATISTICS_GOLD,
        path: 'gold',
        component: () => import('@/views/module/statistic/gold/index.vue'),
      }
    ]
  },
  {
    name: 'tool',
    path: '/tool',
    component: Main,
    children: [
      {
        name: RouterEnums.TOOL_VIDEO,
        path: 'video',
        component: () => import('@/views/module/tool/video/index.vue')
      }
    ]
  }
];