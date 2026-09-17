export * from './user-tenant-dropdown'
export * from './identifier-first-resolver'
export * from './auth-method-dispatcher'
export * from './mfa-challenge-panel'
export * from './qr-session-canvas'

// Type definitions
export interface OrganismComponent {
  name: string
  implemented: boolean
  description: string
  category: 'auth' | 'layout' | 'data' | 'feature'
}

// Registry
export const ORGANISM_REGISTRY: OrganismComponent[] = [
  { name: 'CUserTenantDropdown', implemented: true, description: 'User and tenant selection dropdown', category: 'auth' },
  { name: 'CIdentifierFirstResolver', implemented: true, description: 'Identifier first auth resolution', category: 'auth' },
  { name: 'CAuthMethodDispatcher', implemented: true, description: 'Auth method selection', category: 'auth' },
  { name: 'CMfaChallengePanel', implemented: true, description: 'MFA challenge panel', category: 'auth' },
  { name: 'CQrSessionCanvas', implemented: true, description: 'QR cross-device auth', category: 'auth' }
]

import { CUserTenantDropdown } from './user-tenant-dropdown'
import { CIdentifierFirstResolver } from './identifier-first-resolver'
import { CAuthMethodDispatcher } from './auth-method-dispatcher'
import { CMfaChallengePanel } from './mfa-challenge-panel'
import { CQrSessionCanvas } from './qr-session-canvas'

export const ORGANISMS = {
  CUserTenantDropdown,
  CIdentifierFirstResolver,
  CAuthMethodDispatcher,
  CMfaChallengePanel,
  CQrSessionCanvas,
} as const
