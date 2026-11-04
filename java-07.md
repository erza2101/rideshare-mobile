# RideShare · Java 7

## Rasti im

- GitHub: `erza2101` (kontrolloje që është llogaria me të cilën do ta dorëzosh)
- Kodi personal: `P7-980`
- Të dhënat e rastit: Gjilan, ora 09:10, 3 vende; ora për provën e re 09:15.
- Skenari: **Rasti 1 · Lista dhe detajet**
- ID i testuar në projekt: `1` (Prishtinë – AAB)
- Shënim: të dhënat P7 nuk u shkruan në Neon; provat u kryen me udhëtimet ekzistuese të projektit.


## Dy probleme

1. Hapa `/udhetimi/99`. Shfaqej faqja e parazgjedhur e Next.js në anglisht, “This page could not be found”, pa treguar ID-në që mungonte.
2. E njëjta faqe nuk ofronte lidhje për t’u kthyer te lista e udhëtimeve.

## Korrigjimi

- Skedari: `aplikacioni/app/udhetimi/[id]/not-found.tsx`
- Shtova një faqe 404 në shqip për ID-në e udhëtimit që mungon. Ajo e tregon ID-në dhe ka lidhje për kthim te lista. Faqet e udhëtimeve ekzistuese nuk ndryshuan.

## Versionet

- Para: plotësoje me URL-në e commit-it fillestar pasi ta krijosh vetë në GitHub.
- Pas: plotësoje me URL-në e commit-it të korrigjimit pasi ta krijosh vetë në GitHub.

## Provat që bëra

### Prova 1 · Rrjedha e udhëtimit

- Hapat: Hapa listën, pastaj `/udhetimi/1` dhe `/udhetimi/1/kerkesa`.
- Pritshmëria: Të shfaqen detajet e të njëjtit udhëtim; kërkesa të identifikohet si simulim, jo rezervim real.
- Vëzhgimi: Lista shfaqi Prishtinë – AAB, 08:00, 2 vende. Detajet treguan të njëjtat të dhëna. Faqja e kërkesës tha “Simulim: Në pritje” dhe se kërkesa nuk iu dërgua shoferit.

### Prova 2 · ID që mungon pas korrigjimit

- Hapat: Hapa `/udhetimi/99`.
- Pritshmëria: Mesazh në shqip që tregon ID-në e panjohur dhe lidhje për t’u kthyer te lista.
- Vëzhgimi: Pas korrigjimit, faqja tregoi “Udhëtimi nuk u gjet: 99”, shpjegoi se ID-ja nuk përputhet me asnjë udhëtim dhe shfaqi lidhjen “Kthehu te lista”.

### Prova 3 · Një hyrje tjetër: udhëtim pa vende

- Hapat: Hapa `/udhetimi/3` dhe pastaj `/udhetimi/3/kerkesa`.
- Pritshmëria: Të shfaqen 0 vende, butoni të mos lejojë kërkesë dhe faqja e kërkesës të tregojë se nuk ka vende.
- Vëzhgimi: U shfaqën 0 vende; butoni ishte i çaktivizuar. Edhe hapja e drejtpërdrejtë e faqes së kërkesës tregoi “Nuk ka vende të lira”.

## Ndryshimi i ri

Kontrolli me koleg nuk është bërë ende.


