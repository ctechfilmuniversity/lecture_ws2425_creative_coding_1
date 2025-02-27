import { projects } from '@/lib/data';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `Projects | ${project.title}`,
    description: project.data.description || 'View project details',
  };
}

export default function ProjectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="xl:grid grid-cols-12 xl:px-12 2xl:px-24 gap-4 2xl:gap-6 py-9 min-h-full transition-opacity duration-500"
      style={{
        gridTemplateRows: 'auto 1fr auto',
      }}
    >
      <div className="col-span-12 grid-cols-subgrid grid px-4 xl:px-0">
        <Link href="/" className="col-span-1 block ">
          <Image
            src={'/icon/arrow_back.svg'}
            alt="Back"
            width={24}
            height={24}
            className="xl:w-auto xl:h-auto w-8 h-8"
          />
        </Link>
      </div>
      {children}
    </div>
  );
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}
