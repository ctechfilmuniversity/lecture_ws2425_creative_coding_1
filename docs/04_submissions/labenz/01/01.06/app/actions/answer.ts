'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function submitAnswer(formData: FormData) {
  const supabase = await createClient();

  const userId = formData.get('userId') as string;
  const questionId = formData.get('questionId') as string;
  const text = formData.get('text') as string;

  if (!text) {
    throw new Error('Bitte gib eine Antwort ein');
  }

  const { error } = await supabase.from('answers').insert({
    user_id: userId,
    question_id: questionId,
    text,
  });

  if (error) {
    throw new Error('Fehler beim Speichern der Antwort');
  }

  revalidatePath(`/share/${userId}`);
}
