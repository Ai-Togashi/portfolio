"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Mail, Linkedin } from "lucide-react";
import Image from "next/image";
import projects from "./data/projects";
import { skills } from "./data/skills";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "お名前を入力してください"),
  email: z.string().email("正しいメールアドレスを入力してください"),
  message: z.string().min(5, "お問い合わせ内容は5文字以上で入力してください"),
});

export default function Home() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSubmitError("");

    const result = schema.safeParse({ name, email, message });
    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        const key = err.path[0] as string;
        fieldErrors[key] = err.message;
      });
      setErrors(fieldErrors);
      setLoading(false);
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        throw new Error("バックエンドのURLが設定されていません");
      }

      const res = await fetch(`${apiUrl}/api/inquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      if (!res.ok) {
        let data: any = null;
        try {
          data = await res.json();
        } catch {}
        const msg = data?.error || "送信に失敗しました";
        setSubmitError(msg);
        setLoading(false);
        return;
      }

      router.push("/contact/complete");
    } catch (err) {
      console.error("通信エラー:", err);
      setSubmitError("通信エラーが発生しました");
      setLoading(false);
    }
  };

  return (
    // ─── 最上位の div に animate-bgfade と min-h-screen を指定 ───
    <div className="animate-bgfade min-h-screen text-gray-800 dark:text-gray-100">
      {/* ヘッダー */}
      <header className="sticky top-0 z-40 w-full border-b bg-white/90 backdrop-blur dark:bg-gray-800/90">
        <div className="max-w-6xl mx-auto px-4 flex h-16 items-center justify-between">
          <div className="font-bold text-xl">ポートフォリオ</div>
          <nav className="hidden md:flex gap-6">
            <a
              href="#about"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              自己紹介
            </a>
            <a
              href="#projects"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              プロジェクト
            </a>
            <a
              href="#skills"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              スキル
            </a>
          </nav>
          <Link href="/contact/form" className="hidden md:flex">
            <Button variant="outline" size="sm">
              お問い合わせ
            </Button>
          </Link>
        </div>
      </header>

      {/* メイン */}
      <main className="mx-auto px-4 py-12 md:py-20 max-w-6xl">
        {/* ヒーローセクション */}
        <section className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              こんにちは、<br />
              <span className="text-primary">私のポートフォリオ</span>へようこそ
            </h1>
            <p className="text-lg text-muted-foreground">
              現場の課題に寄り添い、<br />
              実用的で役立つWebアプリケーションの開発を目指しています。
            </p>
            <div className="flex flex-col sm:flex-row gap-4"></div>
          </div>

          <div className="flex-1 flex justify-center">
            <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-gray-200 bg-[#f3e8dc]">
              <Image
                src="/images/image画像.png"
                alt="プロフィール写真"
                fill
                className="object-contain pt-6 p-2 bg-[#f3e8dc]"
              />
            </div>
          </div>
        </section>

        {/* ─── スキルスクロール ─── */}
        <div className="overflow-hidden whitespace-nowrap py-4">
          <div className="inline-block animate-marquee space-x-8 text-sm font-medium text-gray-800 dark:text-gray-200">
            {[
              "Next.js",
              "PostgreSQL",
              "Firebase",
              "Tailwind CSS",
              "Prisma",
              "Stripe",
              "TypeScript",
              "Express.js",
              "Flask",
              "Docker",
              "React",
              "Python",
              "JavaScript",
            ].map((skill, i) => (
              <span key={i} className="inline-block px-2">
                🚀 {skill}
              </span>
            ))}
          </div>
        </div>

        {/* 自己紹介 */}
        <section id="about" className="py-20 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">自己紹介</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="text-lg space-y-4">
              <p>
                これまで、コールセンターや営業部門の現場運営・組織マネジメントなど、
                「人と組織を支える仕事」に20年以上携わってきました。
              </p>
              <p>
                直近では、予算管理や人材育成、現場改善、営業・企画など幅広く経験し、
                数値目標の達成と新事業の企画・販売に注力してきました。
              </p>
              <p>
                そんな中、自動運転（level4）事業に携わり、テクノロジーやシステムに興味を持ち、
                自らもシステムに携わる仕事がしたいと、プログラミングブートキャンプでEngineerスキルを学び、
                モノ作りへの興味がますます高まりました。
              </p>
              <p>
                今後はこれまでの経験で培った課題発見力や巻き込み力を活かし、
                ユーザーに寄り添いながら、テクノロジーで本質的な解決を提供できるエンジニアを目指しています。
              </p>
            </div>
            <div className="bg-gray-200 dark:bg-gray-700 w-full rounded-lg p-6 space-y-4">
              {/* タイトル */}
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                📝課題発表：製作したアプリケーションの紹介動画
              </h3>

              {/* 再生誘導 */}
              <p className="text-sm text-gray-600 dark:text-gray-300">
                ▶︎ 下の動画プレイヤーを押して再生してください
              </p>

              {/* 動画プレイヤー */}
              <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden rounded-md shadow-md">
                <video controls className="w-full h-full object-cover rounded-md">
                  <source src="/videos/app-presentation.mp4" type="video/mp4" />
                  お使いのブラウザは video タグをサポートしていません。
                </video>
              </div>
            </div>
          </div>
        </section>

        {/* プロジェクト */}
        <section id="projects" className="py-20 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">プロジェクト</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="w-full bg-white dark:bg-gray-800 rounded-xl shadow"
              >
                <div className="h-10 flex items-center justify-start px-4 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 rounded-t-xl">
                  <span className="text-base font-medium">
                    プロジェクト{project.id}
                  </span>
                </div>
                {project.imageSrc && (
                  <div className="relative w-full h-40 overflow-hidden bg-gray-200">
                    <Image
                      src={project.imageSrc}
                      alt={project.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">
                    <Link
                      href={`/projects/${project.id}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {project.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  <div className="flex gap-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="sm" className="gap-1">
                        <Github className="h-4 w-4" />
                        GitHub
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* スキル */}
        <section id="skills" className="py-20 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">技術スタック</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {skills.map((skill) => (
              <div
                key={skill}
                className="border rounded-lg p-4 text-center bg-white dark:bg-gray-800 shadow-sm"
              >
                {skill}
              </div>
            ))}
          </div>
        </section>

        {/* お問い合わせ */}
        <section id="contact" className="py-20 max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">お問い合わせ</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  お名前
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border rounded-md px-4 py-2"
                  placeholder="山田太郎"
                  required
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  メールアドレス
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border rounded-md px-4 py-2"
                  placeholder="example@example.com"
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                メッセージ
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border rounded-md px-4 py-2 min-h-[120px]"
                placeholder="お問い合わせ内容をご記入ください"
                required
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            {submitError && (
              <p className="text-red-500 text-center">{submitError}</p>
            )}

            <Button
              type="submit"
              className={`
                w-full
                bg-gray-100
                border border-gray-300
                text-gray-800
                dark:bg-gray-800 dark:text-gray-100
                ${loading ? "bg-gray-300 text-gray-600 cursor-not-allowed" : ""}
              `}
              disabled={loading}
>
              {loading ? "送信中…" : "送信する"}
            </Button>
          </form>
        </section>
      </main>

      {/* フッター */}
      <footer className="border-t bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-bold">ポートフォリオ</div>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground"
              aria-label="Mail"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ポートフォリオ. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

