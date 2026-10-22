# RideShare — Java 5 · Hyrja, profilet dhe paneli i shoferit

## Çfarë u ndërtua

- Hyrja dhe dalja me GitHub OAuth përmes `next-auth@4.24.15`.
- Krijimi i profilit në Neon me rolin fillestar `udhetar`.
- Paneli i shoferit shfaq vetëm udhëtimet që i janë caktuar profilit.
- Server Action-i verifikon sesionin, rolin dhe pronësinë përsëri në pyetjen
  `UPDATE`; një ID e dërguar nga formulari nuk mjafton për të ndryshuar
  udhëtimin.
- Skema e re është te `aplikacioni/schema-java05.sql`.

## Konfigurimi lokalisht dhe në Neon

1. Në GitHub krijo një OAuth App me:
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
2. Shto këto variabla në `aplikacioni/.env.local`, duke ruajtur
   `DATABASE_URL` ekzistues:
   - `GITHUB_ID` dhe `GITHUB_SECRET` nga OAuth App.
   - `NEXTAUTH_URL=http://localhost:3000`.
   - `NEXTAUTH_SECRET`, gjeneruar lokalisht me
     `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`.
3. Rinis serverin lokal pasi t’i ruash ndryshimet. Mos i dërgo këto vlera në
   bisedë dhe mos i publiko në Git.
4. Ekzekuto `aplikacioni/schema-java05.sql` në Neon SQL Editor.
5. Pas hyrjes me GitHub, profili u caktua `shofer` dhe udhëtimi ID 2 iu caktua
   këtij profili në Neon. ID 1 mbeti udhëtim i shoferit demonstrues.

## Provat e kryera

- Hyrja me GitHub funksionoi; pas rifreskimit sesioni vazhdoi dhe dalja e
  ktheu faqen te butoni “Hyr me GitHub”.
- Paneli shfaqi vetëm udhëtimin ID 2 për shoferin.
- Ndryshova ID 2 nga `08:15` në `08:25`; paneli konfirmoi ruajtjen.
- Prova e autorizimit me ID 1 u refuzua me mesazhin “Nuk ke leje për ta
  ndryshuar këtë udhëtim.”
- E riktheva ID 2 në `08:15`. Kontrolli përfundimtar në Neon konfirmoi ID 1
  `08:00` dhe ID 2 `08:15`.
- Faqja kryesore, paneli, endpoint-et OAuth dhe faqet e detajeve u përgjigjën
  me HTTP 200.
- `npm run lint`, `npx tsc --noEmit` dhe `npm run build` përfunduan pa gabime.
- `npm audit --omit=dev` raportoi zero dobësi në varësitë e prodhimit.

Konfigurimi dhe provat u kryen lokalisht. Aplikacioni nuk u publikua në Vercel.
