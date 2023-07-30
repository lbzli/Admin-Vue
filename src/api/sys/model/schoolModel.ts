export interface CreateOrUpdateReq {
  /**
   * 订餐结束日期
   */
  end_date?: string;
  /**
   * 学校id，修改学校时必填，添加时不填
   */
  id?: number;
  /**
   * 学校名称
   */
  name?: string;
  /**
   * 餐费标准
   */
  price?: number;
  /**
   * 订餐开始日期
   */
  start_date?: string;
}

export interface EnableOrDisableReq {
  /**
   * 学校id
   */
  id: string;
  /**
   * 学校状态 0禁用，1启用
   */
  status: string;
}

export interface DeleteReq {
  /**
   * 学校id
   */
  id: number;
}

export interface ListReq {
  /**
   * 学校名称
   */
  name?: string;
  /**
   * 页码
   */
  page?: number;
  /**
   * 每页条数
   */
  size?: number;
}

export interface Resp<T> {
  code: number;
  data: T;
  message: string;
}

export interface GradeSettingsReq {
  school_id: string;
}

export interface GradeSettingsResp {
  schoolId: number;
  settings: {
    grade: string;
    class_num: number;
  }[];
}

export interface UpdateGradeSettingsReq {
  school_id: number;
  settings: {
    grade: string;
    class_num: number;
  }[];
}

export interface CalendarSettingsReq {
  school_id: string;
}

export interface CalendarSettingsResp {
  school_id: number;
  date: string[];
}

export interface UpdateCalendarSettingsReq {
  school_id: number;
  date: string[];
}
