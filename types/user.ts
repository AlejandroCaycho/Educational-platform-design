export type UserRole = 'Padre' | 'Profesor' | 'Estudiante' | 'Administrador'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  color: 'blue' | 'green' | 'purple' | 'red'
}

export interface UserModalState {
  profileOpen: boolean
  settingsOpen: boolean
  userMenuOpen: boolean
}
