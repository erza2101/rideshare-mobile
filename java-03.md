Java 3 – RideShare
Prova 1: Lista e udhëtimeve

Hapat: Hapa http://localhost:3000 në shfletues dhe kontrollova listën e udhëtimeve.

Rezultati real: Faqja shfaqi 3 udhëtime: Prishtinë – AAB, Fushë Kosovë – AAB dhe Lipjan – AAB. Secili udhëtim shfaqi orën, numrin e vendeve të lira, vendtakimin dhe lidhjen “Shiko detajet”.

Prova 2: Detajet e udhëtimeve

Hapat: Hapa http://localhost:3000/udhetimi/2, http://localhost:3000/udhetimi/3 dhe http://localhost:3000/udhetimi/99.

Rezultati real: Udhëtimi 2 shfaqi Fushë Kosovë – AAB, orën 08:15, 1 vend të lirë dhe vendtakimin “Te stacioni kryesor”. Udhëtimi 3 shfaqi Lipjan – AAB, orën 07:45, 0 vende të lira dhe vendtakimin “Qendra e qytetit”. Për ID 99 u shfaq “Udhëtimi nuk u gjet: 99”. Butoni i rezervimit për udhëtimin pa vende është i çaktivizuar.

Prova 3: Kërkesa për vend

Hapat: Hapa http://localhost:3000/udhetimi/1, klikova “Kërko vend”, plotësova formularin dhe klikova “Dërgo kërkesën”.

Rezultati real: Butoni “Kërko vend” shfaqet, por pas dërgimit të formularit shfaqet gabim dhe nuk konfirmohet mesazhi “Simulim: Në pritje”. Funksioni duhet të kontrollohet më tej.