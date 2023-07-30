import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const dashboard: AppRouteModule = {
  path: '/payment',
  name: 'Payment',
  component: LAYOUT,
  redirect: '/payment/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'ion:layers-outline',
    title: '缴费记录查询',
    orderNo: 2,
  },
  children: [
    {
      path: 'index',
      name: 'paymentPage',
      component: () => import('/@/views/pages/payment/index.vue'),
      meta: {
        title: '缴费记录查询',
        icon: 'ion:layers-outline',
        hideMenu: true,
      },
    },
  ],
};

export default dashboard;
