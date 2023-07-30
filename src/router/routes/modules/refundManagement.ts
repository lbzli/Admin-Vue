import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const dashboard: AppRouteModule = {
  path: '/refundManagement',
  name: 'refundManagement',
  component: LAYOUT,
  redirect: '/refundManagement/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'solar:dollar-minimalistic-bold',
    title: '退费管理',
    orderNo: 4,
  },
  children: [
    {
      path: 'index',
      name: 'refundManagementPage',
      component: () => import('/@/views/pages/refundManagement/index.vue'),
      meta: {
        title: '退费管理',
        icon: 'solar:dollar-minimalistic-bold',
        hideMenu: true,
      },
    },
  ],
};

export default dashboard;
