import * as admin from "firebase-admin";

// 環境変数チェック（サーバーサイド専用）
const {
  FIREBASE_PROJECT_ID,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY,
} = process.env;

if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
  throw new Error("❌ Firebase Admin SDK 用の環境変数が未定義です");
}

// Firebase Admin SDK の初期化（再初期化防止）
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: FIREBASE_PROJECT_ID,
      clientEmail: FIREBASE_CLIENT_EMAIL,
      privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

// IDトークンの検証関数（ミドルウェアやAPIルートで使用）
export async function verifyIdToken(token: string) {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error("❌ Firebase IDトークンの検証に失敗:", error);
    throw new Error("Invalid or expired Firebase ID token");
  }
}


