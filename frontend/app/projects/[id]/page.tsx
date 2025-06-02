import { notFound } from "next/navigation";
import projects from "../../data/projects";
import kakeiboApp from "../../data/projects/kakeiboApp";
import chochikuApp from "../../data/projects/chochikuApp";
import linkageApp from "../../data/projects/linkageApp";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const projectDetails = [kakeiboApp, chochikuApp, linkageApp];

export async function generateStaticParams() {
  return projects.map((p) => ({ id: p.id.toString() }));
}

interface ProjectPageProps {
  params: Promise<{ id: string }>; 
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const resolvedParams = await params; 
  const id = parseInt(resolvedParams.id, 10);

  const project = projects.find((p) => p.id === id);
  const projectDetail = projectDetails.find((pd) => pd.id === id);

  if (!project || !projectDetail) {
    notFound();
  }

  return (
    <main className="px-4 py-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{project.title}</h1>

      <div className="mb-6">
        <Image
          src={projectDetail.imageUrl}
          alt={project.title}
          width={800}
          height={400}
          className="rounded-lg"
        />
      </div>

      <p className="mb-6">{project.description}</p>

      <div className="prose max-w-none mb-6">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
        >
          {projectDetail.detailContent}
        </ReactMarkdown>
      </div>

      <div className="flex gap-4 mt-8">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          GitHub リポジトリを開く
        </a>
        <a
          href="/"
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          トップページに戻る
        </a>
      </div>
    </main>
  );
}






