# RideShare - Java 7

## Rasti im

- Kodi personal: P7-980
- GitHub: erza2101
- Të dhënat e rastit: Gjilan, ora 09:10, 3 vende; ora për provën e re 09:15.
- Skenari: Rasti 1 - Lista dhe detajet.
- ID i testuar: 1 (Prishtinë - AAB).

## Parashikimi

Parashikimi im retrospektiv është se hapja e një ID-je që nuk ekziston do të shfaqte faqen standarde 404 të Next.js në anglisht dhe nuk do të ofronte lidhje për kthim te lista. Ky parashikim është shkruar pas korrigjimit dhe jo para tij.

## Ndihma nga AI

Përdora ChatGPT për udhëzime gjatë analizimit të problemit, krijimit të faqes 404 në shqip dhe plotësimit të raportit. Rezultatet i kontrollova në aplikacion.

## Korrigjimi

Skedari: aplikacioni/app/udhetimi/[id]/not-found.tsx

Shtova një faqe 404 në shqip për ID-në e udhëtimit që mungon. Faqja e tregon ID-në dhe ofron lidhje për kthim te lista e udhëtimeve.

## Versionet

- Para: https://github.com/erza2101/rideshare-mobile/commit/f2b7d6b
- Pas: https://github.com/erza2101/rideshare-mobile/commit/f324a79

## Prova 1

### Hapat
Hapa listën e udhëtimeve, pastaj /udhetimi/1 dhe /udhetimi/1/kerkesa.

### Pritshmëria
Të shfaqen detajet e të njëjtit udhëtim dhe kërkesa të identifikohet si simulim, jo rezervim real.

### Vëzhgimi
Lista shfaqi Prishtinë - AAB, 08:00, 2 vende. Detajet treguan të njëjtat të dhëna. Faqja e kërkesës tha "Simulim: Në pritje" dhe se kërkesa nuk iu dërgua shoferit.

## Prova 2

### Hapat
Hapa /udhetimi/99 pas korrigjimit.

### Pritshmëria
Të shfaqet mesazh në shqip që tregon ID-në e panjohur dhe lidhje për kthim te lista.

### Vëzhgimi
Faqja tregoi "Udhëtimi nuk u gjet: 99" dhe lidhjen "Kthehu te lista".

## Prova 3

### Hapat
Hapa /udhetimi/3 dhe pastaj /udhetimi/3/kerkesa.

### Pritshmëria
Të shfaqen 0 vende, butoni të mos lejojë kërkesë dhe faqja e kërkesës të tregojë se nuk ka vende.

### Vëzhgimi
U shfaqën 0 vende; butoni ishte i çaktivizuar. Faqja e kërkesës tregoi "Nuk ka vende të lira".

## Ndryshimi i ri

Kontrolli me koleg nuk është kryer ende. Vërejtjet e kolegut mbeten për t'u plotësuar.