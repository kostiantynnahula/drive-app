export const AUTH_SERVICE = 'auth';
export const PAYMENT_SERVICE = 'payments';
export const NOTIFICATION_SERVICE = 'notifications';
export const ORGANIZATION_SERVICE = 'organizations';
export const FILES_SERVICE = 'files';
export const CARS_SERVICE = 'cars';
export const RESET_PASSWORD = 'reset-password';

// NOTIFICATIONS SERVICE MESSAGES
export const RESET_PASSWORD_EMAIL = 'reset-password';
export const SUCCESSFUL_REGISTER_EMAIL = 'successful-register';
export const SUCCESSFUL_RESET_PASSWORD_EMAIL = 'success-register-password';

// AUTH SERViCE MESSAGES
export enum AuthServiceEvents {
  AUTHENTICATE,
  UPDATE_USER_LOGO,
  ADD_USER_TO_ORGANIZATION,
  REMOVE_USER_FROM_ORGANIZATION,
  FIND_USER_BY_ORGANIZATION,
  FIND_USERS_BY_ORGANIZATION,
}

// ORGANIZATION SERVICE MESSAGES
export enum OrganizationServiceEvents {
  FIND_ORGANIZATION,
  UPDATE_ORGANIZATION_LOGO,
}
