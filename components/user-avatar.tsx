'use client'

import { User } from '@/types/user'
import { GraduationCap } from 'lucide-react'

interface UserAvatarProps {
  user: User
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base'
}

const iconSizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6'
}

const colorClasses = {
  blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  green: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
  red: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
}

export function UserAvatar({ user, size = 'md', onClick }: UserAvatarProps) {
  const initials = user.name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <button
      onClick={onClick}
      className={`${sizeClasses[size]} ${colorClasses[user.color]} rounded-lg flex items-center justify-center font-semibold flex-shrink-0 transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
      aria-label={`Avatar de ${user.name}`}
    >
      {user.avatar ? (
        <img
          src={user.avatar}
          alt={user.name}
          className="w-full h-full rounded-lg object-cover"
        />
      ) : initials !== '' ? (
        initials
      ) : (
        <GraduationCap className={iconSizeClasses[size]} />
      )}
    </button>
  )
}
