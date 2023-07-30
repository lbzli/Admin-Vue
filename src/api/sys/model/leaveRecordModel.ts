export interface LeaveRecordListReq {
  /**
   * 请假记录
   */
  date?: string;
  page?: number;
  /**
   * 学校id
   */
  school_id?: number;
  size?: number;
  /**
   * 学生姓名
   */
  student_name?: string;
}

export interface LeaveRecordListResp {
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
  /**
   * 班级
   */
  class: string;
  /**
   * 请假申请时间
   */
  created_at: string;
  /**
   * 年级
   */
  grade: string;
  /**
   * 请假记录id
   */
  id: number;
  /**
   * 学校名称
   */
  school_name: string;
  /**
   * 退费状态id
   */
  status: number;
  /**
   * 退费状态
   */
  status_text: string;
  /**
   * 学生姓名
   */
  student_name: string;
}

export interface LeaveDateReq {
  id: number;
}

export interface LeaveDateResp {
  code: number;
  data: DateData;
  message: string;
}

export interface DateData {
  date: string[];
}
