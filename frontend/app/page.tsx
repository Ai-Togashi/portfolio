import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Mail, Linkedin, ExternalLink } from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* ヘッダー */}
      <header className="sticky top-0 z-40 w-full border-b bg-white/90 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 flex h-16 items-center justify-between">
          <div className="font-bold text-xl">ポートフォリオ</div>
          <nav className="hidden md:flex gap-6">
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">自己紹介</a>
            <a href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">プロジェクト</a>
            <a href="#skills" className="text-muted-foreground hover:text-foreground transition-colors">スキル</a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">お問い合わせ</a>
          </nav>
          <Button variant="outline" size="sm" className="hidden md:flex">お問い合わせ</Button>
        </div>
      </header>

      <main className="mx-auto px-4 py-12 md:py-20 max-w-6xl">
        {/* ヒーローセクション */}
        <section className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              こんにちは、<br />
              <span className="text-primary">私のポートフォリオ</span>へようこそ
            </h1>
            <p className="text-lg text-muted-foreground">ウェブ開発者・デザイナーとして、創造的なソリューションを提供します。</p>
            <div className="flex gap-4">
              <Button className="px-6">プロジェクトを見る</Button>
              <Button variant="outline" className="px-6">お問い合わせ</Button>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-gray-200">
              <Image src="/placeholder.svg?height=320&width=320" alt="プロフィール写真" fill className="object-cover" />
            </div>
          </div>
        </section>

        {/* 自己紹介セクション */}
        <section id="about" className="py-20 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">自己紹介</h2>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="text-lg space-y-4">
              <p>私はウェブ開発とデザインに情熱を持つプロフェッショナルです。ユーザー体験を向上させる革新的なソリューションの開発に取り組んでいます。</p>
              <p>フロントエンドからバックエンド開発まで幅広く対応し、常に新技術を学び、最適な手法を提供します。</p>
              <p>チームワークを大切にし、クライアントと連携して成果を上げることを目指しています。</p>
            </div>
            <div className="bg-gray-200 h-64 w-full rounded-lg"></div>
          </div>
        </section>

        {/* プロジェクトセクション */}
        <section id="projects" className="py-20 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">プロジェクト</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((project) => (
              <Card key={project} className="bg-white rounded-xl shadow hover:shadow-lg transition">
                <div className="relative h-48">
                  <Image
                    src={`/placeholder.svg?height=192&width=384&text=プロジェクト${project}`}
                    alt={`プロジェクト ${project}`}
                    fill
                    className="object-cover rounded-t-xl"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">プロジェクト {project}</h3>
                  <p className="text-sm text-muted-foreground mb-4">最新技術を使用して開発したウェブアプリケーションの事例です。</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-1"><ExternalLink className="h-4 w-4" />詳細</Button>
                    <Button variant="outline" size="sm" className="gap-1"><Github className="h-4 w-4" />GitHub</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* スキルセクション */}
        <section id="skills" className="py-20 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">スキル</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["HTML/CSS", "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Tailwind CSS", "UI/UXデザイン"].map((skill) => (
              <div key={skill} className="border rounded-lg p-4 text-center bg-white shadow-sm">
                {skill}
              </div>
            ))}
          </div>
        </section>

        {/* お問い合わせセクション */}
        <section id="contact" className="py-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">お問い合わせ</h2>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">お名前</label>
                <input id="name" className="w-full border rounded-md px-4 py-2" placeholder="山田 太郎" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">メールアドレス</label>
                <input id="email" type="email" className="w-full border rounded-md px-4 py-2" placeholder="example@example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">メッセージ</label>
              <textarea id="message" className="w-full border rounded-md px-4 py-2 min-h-[120px]" placeholder="お問い合わせ内容をご記入ください"></textarea>
            </div>
            <Button className="w-full">送信する</Button>
          </form>
        </section>
      </main>

      {/* フッター */}
      <footer className="border-t bg-white">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-bold">ポートフォリオ</div>
          <div className="flex gap-4">
            <a href="#" className="text-muted-foreground hover:text-foreground"><Github className="h-5 w-5" /></a>
            <a href="#" className="text-muted-foreground hover:text-foreground"><Linkedin className="h-5 w-5" /></a>
            <a href="#" className="text-muted-foreground hover:text-foreground"><Mail className="h-5 w-5" /></a>
          </div>
          <div className="text-sm text-muted-foreground">© {new Date().getFullYear()} ポートフォリオ. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
