import { env } from '../../config/env'
import { HttpError } from './http-error'

export async function requestJson(
    path: string,
    options: RequestInit = {},
): Promise<unknown> {
    if (!path.startsWith('/') || path.startsWith('//')) {
        throw new Error('API paths must start with a single "/"')
    }

    const headers = new Headers(options.headers)

    if (!headers.has('Accept')) {
        headers.set('Accept', 'application/json')
    }

    const response = await fetch(`${env.apiBaseUrl}${path}`, {
        ...options,
        headers,
    })

    if (!response.ok) {
        throw new HttpError(response.status)
    }

    if (response.status === 204 || response.status === 205) {
        return undefined
    }

    const data: unknown = await response.json()

    return data
}