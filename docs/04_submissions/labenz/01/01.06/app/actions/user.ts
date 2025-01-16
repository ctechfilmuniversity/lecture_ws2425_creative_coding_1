// app/actions.ts
'use server';

import { fingerprintLimiter, ipLimiter } from '@/utils/rate-limiting';
import { createClient } from '@/utils/supabase/server';
import { cookies, headers } from 'next/headers';

export async function createUser(formData: FormData) {
  const supabase = await createClient();
  const nickname = formData.get('nickname') as string;
  const fingerprint = formData.get('fingerprint') as string;

  if (!nickname) {
    throw new Error('Bitte gib einen Spitznamen ein');
  }

  // Rate Limiting nur aktivieren wenn nicht im Debug Mode
  if (process.env.NODE_ENV === 'production') {
    // 1. IP-basiertes Rate Limiting
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || 'unknown';

    try {
      await ipLimiter.consume(ip);
    } catch {
      throw new Error(
        'Zu viele Accounts wurden von dieser IP-Adresse erstellt. Bitte warte eine Stunde.'
      );
    }

    // 2. Fingerprint-basiertes Rate Limiting
    if (fingerprint) {
      try {
        await fingerprintLimiter.consume(fingerprint);
      } catch {
        throw new Error(
          'Zu viele Accounts wurden von diesem Browser erstellt. Bitte warte eine Stunde.'
        );
      }
    }

    // 3. Local Storage Check (via Cookie, da wir server-side sind)
    const cookieStore = await cookies();
    const accountsCreatedCookie = cookieStore.get('accountsCreated');
    const lastCreatedCookie = cookieStore.get('lastCreated');

    const accountsCreated = accountsCreatedCookie
      ? parseInt(accountsCreatedCookie.value)
      : 0;
    const lastCreated = lastCreatedCookie
      ? parseInt(lastCreatedCookie.value)
      : 0;
    const now = Date.now();

    if (accountsCreated >= 5 && now - lastCreated < 3600000) {
      throw new Error(
        'Zu viele Accounts wurden erstellt. Bitte warte eine Stunde.'
      );
    }

    // Cookies aktualisieren
    cookieStore.set('accountsCreated', (accountsCreated + 1).toString());
    cookieStore.set('lastCreated', now.toString());
  }

  // Account erstellen
  const { data, error } = await supabase
    .from('users')
    .insert({ nickname })
    .select()
    .single();

  if (error) {
    console.error('Error:', error);
    throw new Error('Fehler beim Erstellen des Profils');
  }

  return `/dashboard/${data.id}`;
}
