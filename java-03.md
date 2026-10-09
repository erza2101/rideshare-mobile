Java 3 – RideShare
Prova 1: Lista e udhëtimeve

Hapat: Hapa faqen kryesore të RideShare në http://localhost:3000. Kontrollova kartat e udhëtimeve dhe klikova lidhjen “Shiko detajet”. Pastaj përdora Inspect dhe pamjen e telefonit për të kontrolluar përshtatjen e faqes.

Rezultati real: Në faqen kryesore u shfaqën tri karta udhëtimesh. Lidhjet “Shiko detajet” funksionuan. Në pamjen e telefonit kontrollova që përmbajtja të shihej pa lëvizje horizontale.

Prova 2: Detajet e udhëtimit

Hapat: Hapa http://localhost:3000/udhetimi/2, kontrollova vendtakimin dhe pastaj hapa http://localhost:3000/udhetimi/3. Në fund hapa http://localhost:3000/udhetimi/99.

Rezultati real: Te udhëtimi i dytë kontrollova vendtakimin “Te stacioni kryesor”. Te udhëtimi i tretë kontrollova që shfaqeshin zero vende të lira dhe që nuk mund të kërkohej vend. Te ID 99 kontrollova mesazhin për udhëtimin që nuk u gjet.

Prova 3: Kërkesa për vend

Hapat: Hapa një udhëtim që kishte vende të lira, klikova “Kërko vend” dhe kontrollova mesazhin në faqen e kërkesës. Pastaj u ktheva te detajet e udhëtimit.

Rezultati real: Kontrollova nëse shfaqej mesazhi “Simulim: Në pritje”, nëse mund të kthehesha te detajet dhe nëse kërkesa ishte vetëm simulim pa rezervim real.