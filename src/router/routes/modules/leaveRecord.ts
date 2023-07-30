import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const dashboard: AppRouteModule = {
  path: '/leave',
  name: 'Leave',
  component: LAYOUT,
  redirect: '/leave/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'solar:bill-list-bold',
    title: '请假记录查询',
    orderNo: 3,
  },
  children: [
    {
      path: 'index',
      name: 'LeavePage',
      component: () => import('/@/views/pages/leaveRecord/index.vue'),
      meta: {
        title: '请假记录查询',
        icon: 'solar:bill-list-bold',
        hideMenu: true,
      },
    },
  ],
};

export default dashboard;
