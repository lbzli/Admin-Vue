export interface PlanReq {
  page?: number;
  /**
   * 学校id
   */
  school_id?: number;
  size?: number;
}

export interface PlanResp {
  code: number;
  data: Data;
  message: string;
}

export interface Data {
  list: List[];
  page: number;
  size: number;
  total: number;
}

export interface List {
  actual_num: number;
  /**
   * 班级
   */
  class: number;
  date: string;
  /**
   * 年级
   */
  grade: string;
  grade_id: number;
  leave_num: number;
  school: string;
  /**
   * 学校id
   */
  school_id: number;
  total_num: number;
}
