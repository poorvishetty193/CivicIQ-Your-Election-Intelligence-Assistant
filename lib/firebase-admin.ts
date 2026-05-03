import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

if (!getApps().length) {
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID ?? 'demo-project';
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const rawKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY ?? '';
  const privateKey = rawKey.replace(/\\n/g, '\n');
  const isPlaceholder = privateKey.includes('your_key_here') || !clientEmail || clientEmail.includes('your_project');

  if (!isPlaceholder) {
    try {
      initializeApp({
        credential: cert({ projectId, clientEmail: clientEmail!, privateKey }),
      });
    } catch {
      // Credential parse failed – fall back to minimal app
      initializeApp({ projectId });
    }
  } else {
    // Running without real Firebase Admin credentials (build / dev / CI)
    initializeApp({ projectId });
  }
}

export const adminAuth = getAuth();

