export interface AdminListReq {
  /**
   * 分页码
   */
  page?: number;
  /**
   * 分页条数
   */
  size?: number;
}

export interface AdminListResp {
  code: number;
  data: Data;
  message: string;
}

export interface Data {
  list: List[];
  /**
   * 页码
   */
  page: number;
  /**
   * 条数
   */
  size: number;
  /**
   * 总条数
   */
  total: number;
}

export interface List {
  /**
   * 创建时间
   */
  created_at: string;
  /**
   * 用户id
   */
  id: number;
  /**
   * 状态 1正常，0封禁
   */
  status: number;
  /**
   * 用户名
   */
  username: string;
}

export interface AdminReq {
  /**
   * 用户id
   */
  id: number;
}

export interface AdminResp<T> {
  code: number;
  data: T;
  message: string;
}

export interface AdminAddReq {
  /**
   * 确认密码
   */
  confirm_password: string;
  /**
   * 密码
   */
  password: string;
  /**
   * 账户名
   */
  username: string;
}

export interface UpdatePasswordReq {
  /**
   * 确认密码
   */
  confirm_password: string;
  /**
   * 用户id
   */
  id: number;
  /**
   * 密码
   */
  password: string;
}
