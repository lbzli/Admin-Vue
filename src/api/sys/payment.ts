import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { PaymentListResp, PaymentReq } from './model/paymentModel';

enum Api {
  PaymentList = '/record/payment',
}

export function getPaymentListData(params: PaymentReq, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<PaymentListResp>(
    {
      url: Api.PaymentList,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
