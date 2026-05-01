'use client'

import { useState } from 'react'
import { User } from '@/types/user'

const MOCK_USER: User = {
  id: '1',
  name: 'Familia García',
  email: 'familia.garcia@email.com',
  role: 'Padre',
  color: 'blue'
}

export function useUserModal() {
  const [profileOpen, setProfileOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USER)

  const openProfileModal = () => {
    setProfileOpen(true)
    setUserMenuOpen(false)
  }

  const closeProfileModal = () => {
    setProfileOpen(false)
  }

  const openSettingsModal = () => {
    setSettingsOpen(true)
    setUserMenuOpen(false)
  }

  const closeSettingsModal = () => {
    setSettingsOpen(false)
  }

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen)
  }

  const closeUserMenu = () => {
    setUserMenuOpen(false)
  }

  const updateUser = (updates: Partial<User>) => {
    setCurrentUser(prev => ({ ...prev, ...updates }))
  }

  return {
    profileOpen,
    settingsOpen,
    userMenuOpen,
    currentUser,
    openProfileModal,
    closeProfileModal,
    openSettingsModal,
    closeSettingsModal,
    toggleUserMenu,
    closeUserMenu,
    updateUser
  }
}
