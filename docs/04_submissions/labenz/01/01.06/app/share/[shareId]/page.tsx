import QuestionCards from '@/components/QuestionCards';
import { createClient } from '@/utils/supabase/server';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ shareId: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const supabase = await createClient();
  const params = await props.params;
  const { data: user } = await supabase
    .from('users')
    .select('nickname')
    .eq('share_id', params.shareId)
    .single();

  return {
    title: `Yearly Dearly for ${user?.nickname || 'Friend'}`,
    description: `Answer questions for ${user?.nickname}&apos;s Yearly Dearly 2024!`,
  };
}

export default async function SharePage(props: Props) {
  const params = await props.params;
  const supabase = await createClient();

  const { data: user, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('share_id', params.shareId)
    .single();

  if (userError || !user) {
    notFound();
  }

  const { data: questions } = await supabase.from('questions').select('*');

  return (
    <main className="py-12 flex flex-col justify-center items-center h-full space-y-6">
      <h1 className="text-center text-2xl">
        <i>Yearly Dearly</i>
        <br /> for <b>{user.nickname}</b>
      </h1>
      <div className="pt-28 pb-8">
        <div className="w-full flex justify-center items-center h-64 md:h-72 xl:h-80">
          <QuestionCards questions={questions || []} userId={user.id} />
        </div>
      </div>
      <p className="text-gray-800 text-center px-12">
        Answer some questions and surprise your friend on New Year&apos;s Eve
        with your memories!
      </p>
    </main>
  );
}
