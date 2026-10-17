export class AppError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "AppError"
  }
}

export class UnauthorizedError extends AppError {
  constructor() {
    super("Unauthorized")
    this.name = "UnauthorizedError"
  }
}

export class ValidationError extends AppError {
  constructor(public readonly data: unknown) {
    super("Validation failed")
    this.name = "ValidationError"
  }
}

export class NotFoundError extends AppError {
  constructor() {
    super("Not found")
    this.name = "NotFoundError"
  }
}

export async function apiCall<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`/api${path}`, options)

  if (res.status === 401) throw new UnauthorizedError()
  if (res.status === 422) throw new ValidationError(await res.json())
  if (res.status === 404) throw new NotFoundError()
  if (!res.ok) throw new AppError(`HTTP ${res.status}`)

  return res.json() as Promise<T>
}
