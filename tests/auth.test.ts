import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(),
  GoogleAuthProvider: vi.fn(),
  signInWithPopup: vi.fn(() => Promise.resolve({ user: { uid: '123' } })),
  signOut: vi.fn(),
  onAuthStateChanged: vi.fn(),
}));

vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(),
  getApps: vi.fn(() => []),
  getApp: vi.fn(),
}));

vi.mock('firebase-admin/app', () => ({
  initializeApp: vi.fn(),
  getApps: vi.fn(() => []),
  cert: vi.fn(),
}));

vi.mock('firebase-admin/auth', () => ({
  getAuth: vi.fn(() => ({
    verifyIdToken: vi.fn((token) => {
      if (token === 'valid') return Promise.resolve({ uid: 'admin123', email: 'test@test.com', name: 'Test User' });
      return Promise.reject(new Error('Invalid token'));
    }),
  })),
}));

describe('Auth Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('signInWithPopup is called with GoogleAuthProvider', async () => {
    const { signInWithGoogle, googleProvider, auth } = await import('@/lib/firebase-auth');
    const { signInWithPopup } = await import('firebase/auth');
    
    await signInWithGoogle();
    
    expect(signInWithPopup).toHaveBeenCalledWith(auth, googleProvider);
  });

  it('protected route returns 401 when no token provided', async () => {
    const { GET } = await import('@/app/api/protected/route');
    const req = new NextRequest('http://localhost:3000/api/protected');
    const res = await GET(req);
    expect(res.status).toBe(401);
  });

  it('protected route returns 401 when invalid token provided', async () => {
    const { GET } = await import('@/app/api/protected/route');
    const req = new NextRequest('http://localhost:3000/api/protected', {
      headers: { Authorization: 'Bearer invalid' },
    });
    const res = await GET(req);
    expect(res.status).toBe(401);
  });

  it('protected route verifies token', async () => {
    const { GET } = await import('@/app/api/protected/route');
    const req = new NextRequest('http://localhost:3000/api/protected', {
      headers: { Authorization: 'Bearer valid' },
    });
    const res = await GET(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.uid).toBe('admin123');
  });
});
