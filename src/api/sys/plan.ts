import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { PlanReq, PlanResp } from './model/planModel';

enum Api {
  Plan = '/plan',
}

export function getProductPlanData(params: PlanReq, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<PlanResp>(
    {
      url: Api.Plan,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
