import AnswerCards from '@/components/AnswerCards';
import Background from '@/components/Background';
import { CopyLinkButton } from '@/components/CopyLinkButton';
import { createClient } from '@/utils/supabase/server';
import { DisplayMode } from '@/utils/types';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function DashboardPage(props: {
  params: Promise<{ userId: string }>;
}) {
  const params = await props.params;
  const supabase = await createClient();

  const { data } = await supabase
    .from('answers')
    .select(
      `
      *,
      question:questions (
        text
      )
    `
    )
    .eq('user_id', params.userId)
    .order('created_at', { ascending: false });

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', params.userId)
    .single();

  if (error || !user) {
    notFound();
  }

  const answers = data?.map((answer) => ({
    question: {
      id: answer.id,
      text: answer.question.text,
      answer: answer.text,
    },
    mode: 'display',
  })) as DisplayMode[];

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const shareLink = `${baseUrl}/share/${user.share_id}`;
  const dashboardLink = `${baseUrl}/dashboard/${user.id}`;

  return (
    <main className="h-full overflow-scroll">
      <div className="px-4 md:px-6 py-12 lg:px-12 h-full flex flex-col items-center w-full">
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">
            {user.nickname}
          </h1>
          <h2 className="text-lg md:text-2xl font-serif italic">
            Your personal Year in Review 2024
          </h2>
        </div>

        {user.visible ? (
          <section className="h-full w-full flex justify-center items-center">
            {answers?.length > 0 ? (
              <AnswerCards answers={answers} />
            ) : (
              <div className="rounded-xl lg:p-6 p-4 flex flex-col bg-orange-100 border border-black aspect-video h-64 md:h-72 xl:h-80 justify-center items-center">
                <h3 className="xl:text-xl lg:text-2xl md:text-xl sm:text-lg text-base font-serif mb-4 leading-tight text-center italic">
                  For this year you have no answers. But no worries, you can get
                  ready for the surprise on New Year&apos;s Eve next year! 🎉
                </h3>
              </div>
            )}
          </section>
        ) : (
          <section className="max-w-sm md:max-w-md xl:max-w-none gap-24 flex flex-col xl:flex-row-reverse w-full items-center xl:justify-between flex-1">
            <div className="rounded-xl lg:p-6  flex flex-col items-center justify-center p-12 bg-orange-100 border border-black w-80 sm:w-[28rem] md:w-[32rem] xl:w-[36rem] md:h-72 xl:h-80">
              <h3 className="font-sans font-extrabold leading-tight text-center opacity-30">
                Share your link and get ready for the surprise on New
                Year&apos;s Eve at midnight! 🎉
              </h3>
            </div>
            <div className="max-w-xl">
              <h2 className="text-xl font-bold mb-4">Your Links</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-xl mb-2 italic">
                    Link for your friends:
                  </label>
                  <div className="flex gap-6">
                    <input
                      type="text"
                      readOnly
                      value={shareLink}
                      className={`w-full border-b-2 border-gray-300 focus:outline-none focus:border-black transition-colors font-sans font-bold text-xs text-gray-800 m-0 bg-transparent text-ellipsis rounded-none overflow-hidden${
                        user.visible && 'opacity-50 '
                      }`}
                    />
                    <CopyLinkButton
                      text={shareLink}
                      isDisabled={user.visible}
                    />
                  </div>
                  <p className="text-gray-600 mt-2">
                    Share this link with your friends! They can answer fun
                    questions about your 2024, and you&apos;ll get to read their
                    responses on New Year&apos;s Eve at midnight.
                  </p>
                  {user.visible && (
                    <p className="italic mt-4 text-red-500">
                      Your friends can no longer answer questions. <br />
                      Create a new round on the{' '}
                      <Link href={'/'} className="underline">
                        homepage
                      </Link>
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xl mb-2 italic">
                    Your Dashboard Link:
                  </label>
                  <div className="flex gap-6">
                    <input
                      type="text"
                      readOnly
                      value={dashboardLink}
                      className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-black transition-colors font-sans font-bold text-xs text-gray-800 m-0 bg-transparent text-ellipsis rounded-none overflow-hidden"
                    />
                    <CopyLinkButton text={dashboardLink} />
                  </div>
                  <p className="text-gray-600 mt-2">
                    Save this link to access your dashboard anytime. Here you
                    can view your responses when they become available.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
      <Background />
    </main>
  );
}
