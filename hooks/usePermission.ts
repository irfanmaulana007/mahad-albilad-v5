import { Role } from '@prisma/client'
import { MODULE_PERMISSIONS_ENUM, ROLE_PERMISSIONS } from '../constants/permission'
import useAuthStore from '../stores/useAuthStore'

export const usePermission = (module?: MODULE_PERMISSIONS_ENUM) => {
  const { user } = useAuthStore()

  const role: Role = user?.role as Role
  let permissions = ROLE_PERMISSIONS[role]
  if (module)
    permissions = ROLE_PERMISSIONS[role].filter((permission) => permission.module === module)

  return permissions
}
