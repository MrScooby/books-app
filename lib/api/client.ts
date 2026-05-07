const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'

export async function apiFetch<T>(
  path: string,
  options?: { params?: Record<string, string | number | undefined> }
): Promise<T> {
  const url = new URL(path, API_URL)

  if (options?.params) {
    Object.entries(options.params).forEach(([k, v]) => {
      if (v !== undefined && v !== '') url.searchParams.set(k, String(v))
    })
  }

  const res = await fetch(url.toString(), { cache: 'force-cache' })

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`)
  }

  return res.json()
}

export const ADMIN_TOKEN_KEY = 'books-admin-token'

function adminHeaders(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  const token = window.localStorage.getItem(ADMIN_TOKEN_KEY)
  return token ? { 'X-Admin-Token': token } : {}
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...adminHeaders()
    },
    body: JSON.stringify(body),
    cache: 'no-store'
  })

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error('Unauthorized — set a valid admin token (key icon in the top bar)')
    }
    const data = await res.json().catch(() => ({}))
    throw new Error(data.error || `API error: ${res.status}`)
  }

  return res.json()
}
