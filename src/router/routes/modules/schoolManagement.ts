import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const dashboard: AppRouteModule = {
  path: '/schoolmanagement',
  name: 'SchoolManagement',
  component: LAYOUT,
  redirect: '/schoolmanagement/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'solar:map-point-school-bold',
    title: '学校管理',
    orderNo: 5,
  },
  children: [
    {
      path: 'index',
      name: 'SchoolManagementPage',
      component: () => import('/@/views/pages/schoolManagement/index.vue'),
      meta: {
        title: '学校管理',
        icon: 'solar:map-point-school-bold',
        hideMenu: true,
      },
    },
  ],
};

export default dashboard;
