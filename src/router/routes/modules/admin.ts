import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const dashboard: AppRouteModule = {
  path: '/adminManage',
  name: 'AdminManage',
  component: LAYOUT,
  redirect: '/adminManage/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'solar:user-rounded-bold',
    title: '管理员用户管理',
    orderNo: 6,
  },
  children: [
    {
      path: 'index',
      name: 'AdminManagePage',
      component: () => import('/@/views/pages/adminManage/index.vue'),
      meta: {
        title: '管理员用户管理',
        icon: 'solar:user-rounded-bold',
        hideMenu: true,
      },
    },
  ],
};

export default dashboard;
