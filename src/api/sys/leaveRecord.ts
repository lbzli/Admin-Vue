import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { LeaveDateReq, LeaveRecordListReq, LeaveRecordListResp } from './model/leaveRecordModel';

enum Api {
  Leave = '/record/leave',
  LeaveDate = '/record/leave_date',
}

export function getLeaveRecordList(params: LeaveRecordListReq, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<LeaveRecordListResp>(
    {
      url: Api.Leave,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getLeaveDate(params: LeaveDateReq, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<LeaveRecordListResp>(
    {
      url: Api.LeaveDate,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
