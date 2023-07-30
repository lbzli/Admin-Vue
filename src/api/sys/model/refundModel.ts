export interface StateMentReq {
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

export interface StateMentResp {
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
   * 退款金额
   */
  amount?: string;
  /**
   * 班级
   */
  class?: string;
  /**
   * 年级
   */
  grade?: string;
  /**
   * 支付方式id
   */
  pay_type?: number;
  /**
   * 支付方式
   */
  pay_type_text?: string;
  /**
   * 学校名称
   */
  school_name?: string;
  /**
   * 退款状态id
   */
  status?: number;
  /**
   * 退款状态
   */
  status_text?: string;
  /**
   * 学生姓名
   */
  student_name?: string;
  /**
   * 支付交易号
   */
  trade_no?: string;
}

export interface RefundReq {
  /**
   * 退款结算单id
   */
  id: number;
}

export interface RefundResp {
  code: number;
  data: { [key: string]: any };
  message: string;
}
