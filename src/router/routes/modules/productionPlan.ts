import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const dashboard: AppRouteModule = {
  path: '/productionPlan',
  name: 'ProductionPlan',
  component: LAYOUT,
  redirect: '/productionPlan/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'solar:pie-chart-2-bold',
    title: '生产计划数据',
    orderNo: 1,
  },
  children: [
    {
      path: 'index',
      name: 'productionPlanPage',
      component: () => import('/@/views/pages/productionPlan/index.vue'),
      meta: {
        title: '生产计划数据',
        icon: 'solar:pie-chart-2-bold',
        hideMenu: true,
      },
    },
  ],
};

export default dashboard;
