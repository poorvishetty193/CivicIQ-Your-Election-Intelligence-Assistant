import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('firebase/firestore', () => {
  return {
    getFirestore: vi.fn(),
    collection: vi.fn((db, name) => name),
    doc: vi.fn((db, coll, id) => ({ coll, id })),
    setDoc: vi.fn(),
    addDoc: vi.fn(),
    query: vi.fn(),
    orderBy: vi.fn((field, dir) => ({ orderBy: field, dir })),
    limit: vi.fn((num) => ({ limit: num })),
    getDocs: vi.fn(() => Promise.resolve({ docs: [{ data: () => ({ score: 100 }) }] })),
    serverTimestamp: vi.fn(() => 'timestamp'),
  };
});

vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(),
  getApps: vi.fn(() => []),
  getApp: vi.fn(),
}));

describe('Firestore Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('saveQuizScore calls addDoc with correct shape and anonymous uid if null', async () => {
    const { saveQuizScore } = await import('@/lib/firestore');
    const { addDoc, serverTimestamp } = await import('firebase/firestore');
    
    await saveQuizScore(null, 90, 'Expert');
    
    expect(addDoc).toHaveBeenCalledWith('quiz_scores', {
      uid: 'anonymous',
      score: 90,
      badge: 'Expert',
      timestamp: serverTimestamp(),
    });
  });

  it('getLeaderboard calls getDocs with orderBy and limit', async () => {
    const { getLeaderboard } = await import('@/lib/firestore');
    const { getDocs, query, collection, orderBy, limit } = await import('firebase/firestore');
    
    const result = await getLeaderboard();
    
    expect(orderBy).toHaveBeenCalledWith('score', 'desc');
    expect(limit).toHaveBeenCalledWith(10);
    expect(getDocs).toHaveBeenCalled();
    expect(result).toEqual([{ score: 100 }]);
  });

  it('savePassportProgress calls setDoc with merge true', async () => {
    const { savePassportProgress } = await import('@/lib/firestore');
    const { setDoc, serverTimestamp } = await import('firebase/firestore');
    
    await savePassportProgress('user123', ['quiz'], 50);
    
    expect(setDoc).toHaveBeenCalledWith(
      { coll: 'passports', id: 'user123' },
      { badges: ['quiz'], score: 50, updatedAt: serverTimestamp() },
      { merge: true }
    );
  });
});
