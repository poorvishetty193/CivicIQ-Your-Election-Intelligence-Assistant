import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    return NextResponse.json({ uid: decoded.uid, email: decoded.email, name: decoded.name });
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
