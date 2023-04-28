import { Permission } from '../types';

type CheckPermission = (
  permissionName: string,
  permissions: Permission[]
) => boolean;

const checkPermission: CheckPermission = (permissionName, permissions) => {
  return !!permissions.find((permission) => permission.name === permissionName);
};

export default checkPermission;
