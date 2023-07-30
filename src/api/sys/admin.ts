import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { AdminAddReq, AdminListReq, AdminListResp, AdminReq, AdminResp } from './model/adminModel';

enum Api {
  List = '/admin/list',
  Add = '/admin/add',
  Delete = '/admin/delete',
  Forbid = '/admin/forbid',
  UpdatePassword = '/admin/update_password',
}

export function getAdminList(params: AdminListReq, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<AdminListResp>(
    {
      url: Api.List,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function addAdmin(params: AdminAddReq, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<AdminResp<null>>(
    {
      url: Api.Add,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function deleteAdmin(params: AdminReq, mode: ErrorMessageMode = 'modal') {
  return defHttp.delete<AdminResp<null>>(
    {
      url: Api.Delete,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function forBidAdmin(params: AdminReq, mode: ErrorMessageMode = 'modal') {
  return defHttp.put<AdminResp<null>>(
    {
      url: Api.Forbid,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function updatePassword(params: AdminReq, mode: ErrorMessageMode = 'modal') {
  return defHttp.patch<AdminResp<null>>(
    {
      url: Api.UpdatePassword,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
