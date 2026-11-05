function parseApiBaseUrl(value: string | undefined): string {
    if (!value?.trim()) {
        throw new Error('Missing required environment variable: VITE_API_BASE_URL')
    }

    let url: URL

    try {
        url = new URL(value.trim())
    } catch {
        throw new Error('VITE_API_BASE_URL must be an absolute URL')
    }

    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        throw new Error('VITE_API_BASE_URL must use HTTP or HTTPS')
    }

    if (url.username || url.password || url.search || url.hash) {
        throw new Error(
            'VITE_API_BASE_URL must not contain credentials, query parameters, or a fragment',
        )
    }

    return url.href.replace(/\/+$/, '')
}

export const env = Object.freeze({
    apiBaseUrl: parseApiBaseUrl(import.meta.env.VITE_API_BASE_URL),
    mode: import.meta.env.MODE,
})