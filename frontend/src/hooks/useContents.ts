import { useEffect, useState } from "react";

export type Content = {
  id: number;
  title: string;
  description: string;
};

export const useContents = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [error, setError] = useState("");

  const fetchContents = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contents`);
      if (!res.ok) throw new Error("取得失敗");
      const data = await res.json();
      setContents(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("取得エラーが発生しました");
    }
  };

  useEffect(() => {
    fetchContents();
  }, []);

  return { contents, error, fetchContents };
};
