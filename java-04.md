# RideShare — Java 4 · Neon dhe PostgreSQL

## Çfarë ndërtova

Lista, detajet dhe kërkesa lexojnë udhëtimin nga Neon PostgreSQL përmes
`@neondatabase/serverless`. Lidhja me bazën qëndron në server; skedarët e
`lib/` mbrohen me `server-only`. ID-të kthehen si tekst edhe kur kolona në
databazën ekzistuese është numerike. Nëse lidhja dështon, faqet shfaqin
udhëzim për përdoruesin dhe regjistrojnë gabimin në terminal. Lista bosh
shfaq mesazhin e vet. Kërkesa “Në pritje” është vetëm simulim; nuk ruhet
rezervim.

## Provat që bëra

### Prova 1: Ndryshimi në databazë shfaqet në aplikacion

E ndryshova përkohësisht orën e udhëtimit me ID 2 nga 08:15 në 08:25.
Lista dhe faqja e detajeve e shfaqën 08:25 pas rifreskimit. E riktheva në
08:15 dhe verifikova se vlera u ruajt.

### Prova 2: Lista bosh dhe rikthimi

Shtova përkohësisht `WHERE false` te pyetja e listës. Faqja shfaqi
“Nuk ka udhëtime për momentin.” E hoqa kushtin dhe u kthyen tri kartat.

### Prova 3: Lidhja mungon, rikthimi dhe siguria

Çaktivizova përkohësisht lidhjen e databazës për mjedisin lokal. Faqja shfaqi
“Nuk u lidhëm me databazën. Provo përsëri.” E riktheva konfigurimin dhe
verifikova përsëri lidhjen. `.env.local` përputhet me rregullin `.env*` në
`.gitignore` dhe nuk shfaqet si ndryshim në Git.

## Ku gjendet puna

- Skema e tabelës dhe tri udhëtimet: `aplikacioni/schema.sql`
- Leximi i sigurt nga Neon: `aplikacioni/lib/db.ts` dhe
  `aplikacioni/lib/udhetimet.ts`
- Lista: `aplikacioni/app/page.tsx`
- Detajet dhe simulimi i kërkesës: `aplikacioni/app/udhetimi/[id]/`
- Projekti: https://github.com/erza2101/rideshare-mobile
- Aplikacion Vercel: nuk u testua.

## Çfarë mbetet për përmirësim

Kërkesa nuk ruhet ende dhe nuk dërgohet te shoferi. Hapi i ardhshëm është
shtimi i ruajtjes së kërkesës dhe konfirmimit, pas validimit dhe autorizimit.

## Ndihma nga AI

AI ndihmoi me lidhjen e faqeve me Neon, trajtimin e gabimeve, skemën SQL dhe
testet. U verifikuan veçmas përgjigjet e faqeve, ndryshimi dhe rikthimi i orës,
lista bosh dhe sjellja kur lidhja nuk është e disponueshme. `npm run build`,
kontrolli TypeScript dhe lint-i përfunduan pa gabime. Kredencialet e databazës
nuk u përfshinë në raport.
