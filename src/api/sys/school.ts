import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import {
  CalendarSettingsReq,
  CalendarSettingsResp,
  CreateOrUpdateReq,
  DeleteReq,
  EnableOrDisableReq,
  GradeSettingsReq,
  GradeSettingsResp,
  ListReq,
  Resp,
  UpdateCalendarSettingsReq,
  UpdateGradeSettingsReq,
} from './model/schoolModel';

enum Api {
  CreateOrUpdate = '/school/create_or_update',
  EnableOrDisable = '/school/enable_or_disable',
  Delete = '/school/delete',
  List = '/school/list',
  GradeSettings = '/school/grade_settings',
  CalendarSettings = '/school/calendar_settings',
  All = '/school/all',
}

export function createOrUpdate(params: CreateOrUpdateReq, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<Resp>(
    {
      url: Api.CreateOrUpdate,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function enableOrDisable(params: EnableOrDisableReq, mode: ErrorMessageMode = 'modal') {
  return defHttp.put<Resp>(
    {
      url: Api.EnableOrDisable,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function deleteFn(params: DeleteReq, mode: ErrorMessageMode = 'modal') {
  return defHttp.delete<Resp>(
    {
      url: Api.Delete,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export async function getList(params: ListReq, mode: ErrorMessageMode = 'modal') {
  const data = await defHttp.get<Resp>(
    {
      url: Api.List,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
  return data;
}

export async function getGradeSettings(params: GradeSettingsReq, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<Resp<GradeSettingsResp>>(
    {
      url: Api.GradeSettings,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export async function postGradeSettings(
  params: UpdateGradeSettingsReq,
  mode: ErrorMessageMode = 'modal',
) {
  return defHttp.post<Resp<null>>(
    {
      url: Api.GradeSettings,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export async function getCalendarSettings(
  params: CalendarSettingsReq,
  mode: ErrorMessageMode = 'modal',
) {
  return defHttp.get<CalendarSettingsResp>(
    {
      url: Api.CalendarSettings,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export async function postCalendarSettings(
  params: UpdateCalendarSettingsReq,
  mode: ErrorMessageMode = 'modal',
) {
  return defHttp.post<Resp<null>>(
    {
      url: Api.CalendarSettings,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export async function getAllSchool(params: ListReq, mode: ErrorMessageMode = 'modal') {
  const data = await defHttp.get<Resp>(
    {
      url: Api.All,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
  data.list = data.data;
  return data;
}
