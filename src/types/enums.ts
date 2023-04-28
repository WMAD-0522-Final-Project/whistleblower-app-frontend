export enum ClaimStatus {
  Unhandled = 'unHandled',
  InProgress = 'inProgress',
  Done = 'done',
}

export enum UserRoleOption {
  GENERAL = 'general',
  ADMIN = 'admin',
}

export enum inquiryOption {
  FORGOT_PASSWORD = 'Forgot Password',
  CHANGE_USER_INFORMATION = 'Change User Information',
  SYSTEM_ISSUE = 'System Issue',
  OTHERS = 'Others',
}

export enum UserPermissionOption {
  SYSTEM_MANAGEMENT = 'systemManagement',
  CASE_MANAGEMENT = 'caseManagement',
  REPORT_VIEWING = 'reportViewing',
  USER_MANAGEMENT = 'userManagement',
}
