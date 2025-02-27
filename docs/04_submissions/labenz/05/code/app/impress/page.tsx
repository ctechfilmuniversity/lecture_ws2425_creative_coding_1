'use client';

import Navbar from '@/components/Navbar';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Obfuscate from 'react-obfuscate';

const ImpressumPage: React.FC = () => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    setOpacity(0);
    requestAnimationFrame(() => {
      setOpacity(1);
    });
  }, []);

  return (
    <>
      <Navbar />
      <div
        className="grid grid-cols-12 gap-8 mx-8 my-24 transition-opacity duration-500"
        style={{ opacity }}
      >
        <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3">
          <h1 className="font-display text-4xl font-light mb-8">Impressum</h1>

          <section className="mb-12">
            <h2 className="font-display text-xl font-bold mb-4">
              Angaben gemäß § 5 TMG
            </h2>
            <p className="font-display mb-4">
              Gorm Labenz
              <br />
              Thaerstraße 46
              <br />
              10249 Berlin
            </p>

            <h3 className="font-display text-lg font-bold mt-6 mb-2">
              Kontakt
            </h3>
            <p className="font-display mb-4">
              E-Mail: <Obfuscate email="hi@labenz.io" />
            </p>

            <h3 className="font-display text-lg font-bold mt-6 mb-2">
              Berufsbezeichnung
            </h3>
            <p className="font-display mb-4">Designer und Entwickler</p>

            <h3 className="font-display text-lg font-bold mt-6 mb-2">
              Umsatzsteuer-Identifikationsnummer
            </h3>
            <p className="font-display mb-4">DE360184760</p>
          </section>

          <hr className="my-12 border-gray-300" />

          <h1 className="font-display text-4xl font-light mb-8">
            Datenschutzerklärung
          </h1>

          <section className="mb-12">
            <h2 className="font-display text-xl font-bold mb-4">
              1. Datenschutz auf einen Blick
            </h2>

            <h3 className="font-display text-lg font-bold mt-6 mb-2">
              Allgemeine Hinweise
            </h3>
            <p className="font-display mb-4">
              Die folgenden Hinweise geben einen einfachen Überblick darüber,
              was mit Ihren personenbezogenen Daten passiert, wenn Sie diese
              Website besuchen. Personenbezogene Daten sind alle Daten, mit
              denen Sie persönlich identifiziert werden können. Ausführliche
              Informationen zum Thema Datenschutz entnehmen Sie unserer unter
              diesem Text aufgeführten Datenschutzerklärung.
            </p>

            <h3 className="font-display text-lg font-bold mt-6 mb-2">
              Datenerfassung auf dieser Website
            </h3>

            <h4 className="font-display font-bold mt-4 mb-2">
              Wer ist verantwortlich für die Datenerfassung auf dieser Website?
            </h4>
            <p className="font-display mb-4">
              Die Datenverarbeitung auf dieser Website erfolgt durch den
              Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum
              dieser Website entnehmen.
            </p>

            <h4 className="font-display font-bold mt-4 mb-2">
              Wie erfasse ich Ihre Daten?
            </h4>
            <p className="font-display mb-4">
              Ihre Daten werden zum einen dadurch erhoben, dass Sie mir diese
              mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie in
              einer E-Mail an mich senden.
              <br />
              <br />
              Andere Daten werden automatisch beim Besuch der Website durch
              meine IT-Systeme erfasst. Das sind vor allem technische Daten
              (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des
              Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch,
              sobald Sie diese Website betreten.
            </p>

            <h4 className="font-display font-bold mt-4 mb-2">
              Wofür nutze ich Ihre Daten?
            </h4>
            <p className="font-display mb-4">
              Die Daten werden erhoben, um eine fehlerfreie Bereitstellung der
              Website zu gewährleisten und um mit Ihnen kommunizieren zu können,
              wenn Sie mich per E-Mail kontaktieren.
            </p>

            <h4 className="font-display font-bold mt-4 mb-2">
              Welche Rechte haben Sie bezüglich Ihrer Daten?
            </h4>
            <p className="font-display mb-4">
              Sie haben jederzeit das Recht, unentgeltlich Auskunft über
              Herkunft, Empfänger und Zweck Ihrer gespeicherten
              personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht,
              die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie
              eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie
              diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem
              haben Sie das Recht, unter bestimmten Umständen die Einschränkung
              der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
              <br />
              <br />
              Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie
              sich jederzeit an mich unter der im Impressum angegebenen Adresse
              wenden.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-xl font-bold mb-4">2. Hosting</h2>
            <p className="font-display mb-4">
              Meine Website wird bei Vercel gehostet und ist mit Next.js
              umgesetzt. Die personenbezogenen Daten, die auf dieser Website
              erfasst werden, werden auf den Servern des Hosters gespeichert.
              Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta-
              und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen,
              Websitezugriffe und sonstige Daten, die über eine Website
              generiert werden, handeln.
              <br />
              <br />
              Der Einsatz des Hosters erfolgt zum Zwecke der Vertragserfüllung
              gegenüber unseren potenziellen und bestehenden Kunden (Art. 6 Abs.
              1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und
              effizienten Bereitstellung unseres Online-Angebots durch einen
              professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO).
              <br />
              <br />
              Unser Hoster Vercel wird Ihre Daten nur insoweit verarbeiten, wie
              dies zur Erfüllung seiner Leistungspflichten erforderlich ist und
              unsere Weisungen in Bezug auf diese Daten befolgen. Weitere
              Informationen zum Datenschutz bei Vercel finden Sie unter:
              <Link
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                https://vercel.com/legal/privacy-policy
              </Link>
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-xl font-bold mb-4">
              3. Allgemeine Hinweise und Pflichtinformationen
            </h2>

            <h3 className="font-display text-lg font-bold mt-6 mb-2">
              Datenschutz
            </h3>
            <p className="font-display mb-4">
              Der Betreiber dieser Seiten nimmt den Schutz Ihrer persönlichen
              Daten sehr ernst. Ich behandle Ihre personenbezogenen Daten
              vertraulich und entsprechend der gesetzlichen
              Datenschutzvorschriften sowie dieser Datenschutzerklärung.
              <br />
              <br />
              Wenn Sie diese Website benutzen, werden verschiedene
              personenbezogene Daten erhoben. Personenbezogene Daten sind Daten,
              mit denen Sie persönlich identifiziert werden können. Die
              vorliegende Datenschutzerklärung erläutert, welche Daten ich
              erhebe und wofür ich sie nutze. Sie erläutert auch, wie und zu
              welchem Zweck das geschieht.
              <br />
              <br />
              Ich weise darauf hin, dass die Datenübertragung im Internet (z.B.
              bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen
              kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch
              Dritte ist nicht möglich.
            </p>

            <h3 className="font-display text-lg font-bold mt-6 mb-2">
              Hinweis zur verantwortlichen Stelle
            </h3>
            <p className="font-display mb-4">
              Die verantwortliche Stelle für die Datenverarbeitung auf dieser
              Website ist:
              <br />
              <br />
              Gorm Labenz
              <br />
              Thaerstraße 46
              <br />
              10249 Berlin
              <br />
              E-Mail: <Obfuscate email="hi@labenz.io" />
              <br />
              <br />
              Verantwortliche Stelle ist die natürliche oder juristische Person,
              die allein oder gemeinsam mit anderen über die Zwecke und Mittel
              der Verarbeitung von personenbezogenen Daten (z.B. Namen,
              E-Mail-Adressen o. Ä.) entscheidet.
            </p>

            <h3 className="font-display text-lg font-bold mt-6 mb-2">
              Speicherdauer
            </h3>
            <p className="font-display mb-4">
              Soweit innerhalb dieser Datenschutzerklärung keine speziellere
              Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen
              Daten bei mir, bis der Zweck für die Datenverarbeitung entfällt.
              Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine
              Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten
              gelöscht, sofern ich keine anderen rechtlich zulässigen Gründe für
              die Speicherung Ihrer personenbezogenen Daten habe (z.B. steuer-
              oder handelsrechtliche Aufbewahrungsfristen); im letztgenannten
              Fall erfolgt die Löschung nach Fortfall dieser Gründe.
            </p>

            <h3 className="font-display text-lg font-bold mt-6 mb-2">
              Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung
              auf dieser Website
            </h3>
            <p className="font-display mb-4">
              Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeite
              ich Ihre personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1
              lit. a DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO, sofern besondere
              Datenkategorien nach Art. 9 Abs. 1 DSGVO verarbeitet werden. Im
              Falle einer ausdrücklichen Einwilligung in die Übertragung
              personenbezogener Daten in Drittstaaten erfolgt die
              Datenverarbeitung außerdem auf Grundlage von Art. 49 Abs. 1 lit. a
              DSGVO. Sofern Sie in die Speicherung von Cookies oder in den
              Zugriff auf Informationen in Ihr Endgerät (z.B. via
              Device-Fingerprinting) eingewilligt haben, erfolgt die
              Datenverarbeitung zusätzlich auf Grundlage von § 25 Abs. 1 TTDSG.
              Die Einwilligung ist jederzeit widerrufbar. Sind Ihre Daten zur
              Vertragserfüllung oder zur Durchführung vorvertraglicher Maßnahmen
              erforderlich, verarbeite ich Ihre Daten auf Grundlage des Art. 6
              Abs. 1 lit. b DSGVO. Des Weiteren verarbeite ich Ihre Daten,
              sofern diese zur Erfüllung einer rechtlichen Verpflichtung
              erforderlich sind auf Grundlage von Art. 6 Abs. 1 lit. c DSGVO.
              Die Datenverarbeitung kann ferner auf Grundlage meines
              berechtigten Interesses nach Art. 6 Abs. 1 lit. f DSGVO erfolgen.
              Über die jeweils im Einzelfall einschlägigen Rechtsgrundlagen wird
              in den folgenden Absätzen dieser Datenschutzerklärung informiert.
            </p>

            <h3 className="font-display text-lg font-bold mt-6 mb-2">
              Widerruf Ihrer Einwilligung zur Datenverarbeitung
            </h3>
            <p className="font-display mb-4">
              Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen
              Einwilligung möglich. Sie können eine bereits erteilte
              Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum
              Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf
              unberührt.
            </p>

            <h3 className="font-display text-lg font-bold mt-6 mb-2">
              Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen
              sowie gegen Direktwerbung (Art. 21 DSGVO)
            </h3>
            <p className="font-display mb-4 uppercase">
              Wenn die Datenverarbeitung auf Grundlage von Art. 6 Abs. 1 lit. e
              oder f DSGVO erfolgt, haben Sie jederzeit das Recht, aus Gründen,
              die sich aus Ihrer besonderen Situation ergeben, gegen die
              Verarbeitung Ihrer personenbezogenen Daten Widerspruch einzulegen;
              dies gilt auch für ein auf diese Bestimmungen gestütztes
              Profiling. Die jeweilige Rechtsgrundlage, auf denen eine
              Verarbeitung beruht, entnehmen Sie dieser Datenschutzerklärung.
              Wenn Sie Widerspruch einlegen, werde ich Ihre betroffenen
              personenbezogenen Daten nicht mehr verarbeiten, es sei denn, ich
              kann zwingende schutzwürdige Gründe für die Verarbeitung
              nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen
              oder die Verarbeitung dient der Geltendmachung, Ausübung oder
              Verteidigung von Rechtsansprüchen (Widerspruch nach Art. 21 Abs. 1
              DSGVO).
            </p>
            <p className="font-display mb-4 uppercase">
              Werden Ihre personenbezogenen Daten verarbeitet, um Direktwerbung
              zu betreiben, so haben Sie das Recht, jederzeit Widerspruch gegen
              die Verarbeitung Sie betreffender personenbezogener Daten zum
              Zwecke derartiger Werbung einzulegen; dies gilt auch für das
              Profiling, soweit es mit solcher Direktwerbung in Verbindung
              steht. Wenn Sie widersprechen, werden Ihre personenbezogenen Daten
              anschließend nicht mehr zum Zwecke der Direktwerbung verwendet
              (Widerspruch nach Art. 21 Abs. 2 DSGVO).
            </p>

            <h3 className="font-display text-lg font-bold mt-6 mb-2">
              Beschwerderecht bei der zuständigen Aufsichtsbehörde
            </h3>
            <p className="font-display mb-4">
              Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein
              Beschwerderecht bei einer Aufsichtsbehörde, insbesondere in dem
              Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes
              oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht
              besteht unbeschadet anderweitiger verwaltungsrechtlicher oder
              gerichtlicher Rechtsbehelfe.
            </p>

            <h3 className="font-display text-lg font-bold mt-6 mb-2">
              Recht auf Datenübertragbarkeit
            </h3>
            <p className="font-display mb-4">
              Sie haben das Recht, Daten, die ich auf Grundlage Ihrer
              Einwilligung oder in Erfüllung eines Vertrags automatisiert
              verarbeite, an sich oder an einen Dritten in einem gängigen,
              maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die
              direkte Übertragung der Daten an einen anderen Verantwortlichen
              verlangen, erfolgt dies nur, soweit es technisch machbar ist.
            </p>

            <h3 className="font-display text-lg font-bold mt-6 mb-2">
              SSL- bzw. TLS-Verschlüsselung
            </h3>
            <p className="font-display mb-4">
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der
              Übertragung vertraulicher Inhalte, wie zum Beispiel Anfragen, die
              Sie an mich als Seitenbetreiber senden, eine SSL- bzw.
              TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie
              daran, dass die Adresszeile des Browsers von &quot;http://&quot;
              auf &quot;https://&quot; wechselt und an dem Schloss-Symbol in
              Ihrer Browserzeile.
              <br />
              <br />
              Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die
              Daten, die Sie an mich übermitteln, nicht von Dritten mitgelesen
              werden.
            </p>

            <h3 className="font-display text-lg font-bold mt-6 mb-2">
              Auskunft, Löschung und Berichtigung
            </h3>
            <p className="font-display mb-4">
              Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen
              jederzeit das Recht auf unentgeltliche Auskunft über Ihre
              gespeicherten personenbezogenen Daten, deren Herkunft und
              Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht
              auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu
              weiteren Fragen zum Thema personenbezogene Daten können Sie sich
              jederzeit an mich wenden.
            </p>

            <h3 className="font-display text-lg font-bold mt-6 mb-2">
              Recht auf Einschränkung der Verarbeitung
            </h3>
            <p className="font-display mb-4">
              Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer
              personenbezogenen Daten zu verlangen. Hierzu können Sie sich
              jederzeit an mich wenden. Das Recht auf Einschränkung der
              Verarbeitung besteht in folgenden Fällen:
              <br />
              <br />
              - Wenn Sie die Richtigkeit Ihrer bei mir gespeicherten
              personenbezogenen Daten bestreiten, benötige ich in der Regel
              Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben Sie
              das Recht, die Einschränkung der Verarbeitung Ihrer
              personenbezogenen Daten zu verlangen.
              <br />
              <br />
              - Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig
              geschah/geschieht, können Sie statt der Löschung die Einschränkung
              der Datenverarbeitung verlangen.
              <br />
              <br />
              - Wenn ich Ihre personenbezogenen Daten nicht mehr benötige, Sie
              sie jedoch zur Ausübung, Verteidigung oder Geltendmachung von
              Rechtsansprüchen benötigen, haben Sie das Recht, statt der
              Löschung die Einschränkung der Verarbeitung Ihrer
              personenbezogenen Daten zu verlangen.
              <br />
              <br />- Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO
              eingelegt haben, muss eine Abwägung zwischen Ihren und meinen
              Interessen vorgenommen werden. Solange noch nicht feststeht,
              wessen Interessen überwiegen, haben Sie das Recht, die
              Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu
              verlangen.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-xl font-bold mb-4">
              4. Datenerfassung auf dieser Website
            </h2>

            <h3 className="font-display text-lg font-bold mt-6 mb-2">
              Server-Log-Dateien
            </h3>
            <p className="font-display mb-4">
              Der Provider der Seiten erhebt und speichert automatisch
              Informationen in so genannten Server-Log-Dateien, die Ihr Browser
              automatisch an uns übermittelt. Dies sind:
              <br />
              <br />
              - Browsertyp und Browserversion
              <br />
              - verwendetes Betriebssystem
              <br />
              - Referrer URL
              <br />
              - Hostname des zugreifenden Rechners
              <br />
              - Uhrzeit der Serveranfrage
              <br />
              - IP-Adresse
              <br />
              <br />
              Eine Zusammenführung dieser Daten mit anderen Datenquellen wird
              nicht vorgenommen.
              <br />
              <br />
              Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1
              lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse
              an der technisch fehlerfreien Darstellung und der Optimierung
              seiner Website – hierzu müssen die Server-Log-Files erfasst
              werden.
            </p>

            <h3 className="font-display text-lg font-bold mt-6 mb-2">
              Anfrage per E-Mail
            </h3>
            <p className="font-display mb-4">
              Wenn Sie mir per E-Mail Anfragen zukommen lassen, werden Ihre
              Angaben inklusive der von Ihnen dort angegebenen Kontaktdaten
              zwecks Bearbeitung der Anfrage und für den Fall von
              Anschlussfragen bei mir gespeichert. Diese Daten gebe ich nicht
              ohne Ihre Einwilligung weiter.
              <br />
              <br />
              Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6
              Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines
              Vertrags zusammenhängt oder zur Durchführung vorvertraglicher
              Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die
              Verarbeitung auf meinem berechtigten Interesse an der effektiven
              Bearbeitung der an mich gerichteten Anfragen (Art. 6 Abs. 1 lit. f
              DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO)
              sofern diese abgefragt wurde.
              <br />
              <br />
              Die von Ihnen an mich per Kontaktanfragen übersandten Daten
              verbleiben bei mir, bis Sie mich zur Löschung auffordern, Ihre
              Einwilligung zur Speicherung widerrufen oder der Zweck für die
              Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung
              Ihres Anliegens). Zwingende gesetzliche Bestimmungen –
              insbesondere gesetzliche Aufbewahrungsfristen – bleiben unberührt.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-xl font-bold mb-4">
              5. Externe Einbindungen
            </h2>

            <h3 className="font-display text-lg font-bold mt-6 mb-2">
              Google Fonts
            </h3>
            <p className="font-display mb-4">
              Diese Website nutzt Google Fonts, diese werden jedoch lokal
              eingebunden und nicht von Google-Servern nachgeladen. Bei dieser
              lokalen Einbindung findet keine Datenübertragung zu Google statt.
              Die Schriftarten werden beim Build-Prozess heruntergeladen und vom
              eigenen Server ausgeliefert.
            </p>

            <h3 className="font-display text-lg font-bold mt-6 mb-2">Vimeo</h3>
            <p className="font-display mb-4">
              Diese Website nutzt Plugins des Videoportals Vimeo. Anbieter ist
              die Vimeo Inc., 555 West 18th Street, New York, New York 10011,
              USA.
              <br />
              <br />
              Wenn Sie eine meiner mit einem Vimeo-Plugin ausgestatteten Seiten
              besuchen, wird eine Verbindung zu den Servern von Vimeo
              hergestellt. Dabei wird dem Vimeo-Server mitgeteilt, welche meiner
              Seiten Sie besucht haben. Zudem erlangt Vimeo Ihre IP-Adresse.
              Dies gilt auch dann, wenn Sie nicht bei Vimeo eingeloggt sind oder
              keinen Account bei Vimeo besitzen. Die von Vimeo erfassten
              Informationen werden an den Vimeo-Server in den USA übermittelt.
              <br />
              <br />
              Wenn Sie in Ihrem Vimeo-Account eingeloggt sind, ermöglichen Sie
              Vimeo, Ihr Surfverhalten direkt Ihrem persönlichen Profil
              zuzuordnen. Dies können Sie verhindern, indem Sie sich aus Ihrem
              Vimeo-Account ausloggen.
              <br />
              <br />
              Die Nutzung von Vimeo erfolgt im Interesse einer ansprechenden
              Darstellung meiner Online-Angebote. Dies stellt ein berechtigtes
              Interesse im Sinne des Art. 6 Abs. 1 lit. f DSGVO dar. Sofern eine
              entsprechende Einwilligung abgefragt wurde, erfolgt die
              Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a
              DSGVO; die Einwilligung ist jederzeit widerrufbar.
              <br />
              <br />
              Weitere Informationen zum Umgang mit Nutzerdaten finden Sie in der
              Datenschutzerklärung von Vimeo unter:
              <Link
                href="https://vimeo.com/privacy"
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                https://vimeo.com/privacy
              </Link>
            </p>
          </section>

          <footer className="mt-16 font-display text-sm text-gray-500">
            <p>Stand: Februar 2025</p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default ImpressumPage;
