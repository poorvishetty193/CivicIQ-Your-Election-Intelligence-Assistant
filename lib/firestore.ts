import { getFirestore, collection, doc, setDoc, addDoc, query, orderBy, limit, getDocs, serverTimestamp } from 'firebase/firestore';
import { firebaseApp } from './firebase';

export const db = getFirestore(firebaseApp);

export const saveQuizScore = async (uid: string | null, score: number, badge: string) => {
  await addDoc(collection(db, 'quiz_scores'), {
    uid: uid ?? 'anonymous',
    score,
    badge,
    timestamp: serverTimestamp(),
  });
};

export const getLeaderboard = async () => {
  const q = query(collection(db, 'quiz_scores'), orderBy('score', 'desc'), limit(10));
  const snap = await getDocs(q);
  return snap.docs.map(d => d.data());
};

export const savePassportProgress = async (uid: string, badges: string[], score: number) => {
  await setDoc(doc(db, 'passports', uid), { badges, score, updatedAt: serverTimestamp() }, { merge: true });
};

export const saveBallotHistory = async (uid: string, ballot: string, explanation: string) => {
  await addDoc(collection(db, 'ballot_history'), {
    uid,
    ballot: ballot.slice(0, 500),
    explanation,
    timestamp: serverTimestamp(),
  });
};

export const trackFeatureEvent = async (feature: string, sessionId: string) => {
  await addDoc(collection(db, 'feature_events'), {
    feature,
    sessionId,
    timestamp: serverTimestamp(),
  });
};
