export interface PaymentReq {
  /**
   * 缴费结束日期
   */
  end_date?: string;
  school_id?: number;
  /**
   * 缴费起始日期
   */
  start_date?: string;
  /**
   * 学生姓名
   */
  student_name?: string;
}

export interface PaymentListResp {
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
   * 年级
   */
  grade: string;
  /**
   * 订餐周期结束日期
   */
  meal_end_date: string;
  /**
   * 订餐周期开始日期
   */
  meal_start_date: string;
  /**
   * 已收款项
   */
  pay_price: string;
  /**
   * 支付时间
   */
  pay_time: string;
  /**
   * 支付渠道id
   */
  pay_type: number;
  /**
   * 支付渠道
   */
  pay_type_text: string;
  /**
   * 餐费标准
   */
  price: string;
  /**
   * 学校名称
   */
  school_name: string;
  /**
   * 学生姓名
   */
  student_name: string;
}
