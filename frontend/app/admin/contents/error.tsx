"use client";

export default function Error({ error }: { error: Error }) {
  return <p className="p-4 text-red-500">エラーが発生しました: {error.message}</p>;
}
