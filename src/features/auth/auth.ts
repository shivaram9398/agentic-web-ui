import type { MessageKey } from '../../i18n/messages'
import requestJson from '../../lib/http/client'
import HttpError from '../../lib/http/http-error'

type Credentials = { email: string; password: string }

const sessionKey = 'agentic-meetings.access-token'

export function isSignedIn() {
  return Boolean(sessionStorage.getItem(sessionKey))
}

export function signOut() {
  sessionStorage.removeItem(sessionKey)
}

function post(path: string, body: Credentials & { name?: string }) {
  return requestJson(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

export async function register(credentials: Credentials & { name: string }) {
  await post('/auth/register', credentials)
}

export async function signIn(credentials: Credentials) {
  const response = await post('/auth/login', credentials)
  const token = (response as { data?: { accessToken?: unknown } } | null)?.data?.accessToken

  if (typeof token !== 'string' || !token.trim()) {
    throw new Error('The sign-in response did not include an access token.')
  }

  sessionStorage.setItem(sessionKey, token)
}

export function authErrorKey(error: unknown, registering: boolean): MessageKey {
  if (error instanceof HttpError) {
    if (!registering && (error.status === 400 || error.status === 401)) {
      return 'login.badLogin'
    }

    if (registering && error.status === 409) {
      return 'registration.alreadyRegistered'
    }

    if (error.status === 429) {
      return 'auth.rateLimit'
    }

    if (registering && (error.status === 400 || error.status === 422)) {
      return 'registration.badRegistration'
    }
  }

  return registering ? 'registration.registerError' : 'login.loginError'
}
