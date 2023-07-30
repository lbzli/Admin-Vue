import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { RefundReq, RefundResp, StateMentReq, StateMentResp } from './model/refundModel';

enum Api {
  StateMentList = '/refund/statements',
  Refund = '/refund',
  Generate = '/refund/generate_statements',
}

export function getStatementListData(params: StateMentReq, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<StateMentResp>(
    {
      url: Api.StateMentList,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function postRefund(params: RefundReq, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<RefundResp>(
    {
      url: Api.Refund,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function generateStatement(params: RefundReq, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<RefundResp>(
    {
      url: Api.Generate,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
