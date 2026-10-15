/* =========================================
   MÚSICA DE LA INVITACIÓN
   ========================================= */

const musica = document.getElementById("musica");

function iniciarMusica() {
    if (musica && musica.paused) {
        musica.play().catch(() => {
            // El navegador puede bloquear la reproducción
            // hasta que la persona interactúe con la página.
        });
    }
}

// Activar la música con la primera interacción
document.addEventListener("click", iniciarMusica, { once: true });

document.addEventListener("touchstart", iniciarMusica, {
    once: true,
    passive: true
});

// Intentar reproducir al cargar la página
window.addEventListener("load", iniciarMusica);


/* =========================================
   ZONAS CLICABLES SOBRE LA INVITACIÓN
   ========================================= */

const imagenInvitacion = document.querySelector(".invitacion-imagen");

const zonasClicables = [
    {
        nombre: "confirmar",
        top: 75.2,
        left: 41,
        width: 20,
        height: 3.5,

        // IMPORTANTE:
        // Este enlace todavía es el de la invitación
        // de cumpleaños de Aarón. Cámbialo por el
        // WhatsApp y mensaje de la boda.
        url: "https://wa.me/573102222051?text=%C2%A1Hola%21+Confirmo+mi+asistencia+al+cumple+de+Aar%C3%B3n%0A%0A%C2%A1Ah%C3%AD+estar%C3%A9+para+celebrar+su+primer+a%C3%B1ito%21"
    }
];

if (imagenInvitacion) {
    imagenInvitacion.addEventListener("click", function (e) {
        const rect = imagenInvitacion.getBoundingClientRect();

        const xPct = ((e.clientX - rect.left) / rect.width) * 100;
        const yPct = ((e.clientY - rect.top) / rect.height) * 100;

        for (const zona of zonasClicables) {
            if (
                xPct >= zona.left &&
                xPct <= zona.left + zona.width &&
                yPct >= zona.top &&
                yPct <= zona.top + zona.height
            ) {
                const enlace = document.createElement("a");

                enlace.href = zona.url;
                enlace.target = "_blank";
                enlace.rel = "noopener noreferrer";

                document.body.appendChild(enlace);
                enlace.click();
                enlace.remove();

                return;
            }
        }
    });
}


/* =========================================
   SOBRE, NOTA BÍBLICA E INVITACIÓN PRINCIPAL
   ========================================= */

const sobre = document.getElementById("sobre");
const notaBiblica = document.getElementById("nota-biblica");
const invitacionCard = document.querySelector(".invitacion");

if (sobre && notaBiblica && invitacionCard) {
    sobre.addEventListener("click", function () {

        // Evitar que se active varias veces
        if (sobre.classList.contains("abriendo")) {
            return;
        }

        sobre.classList.add("abriendo");
        sobre.classList.add("abrir");

        // Esperar a que termine la animación del sobre
        setTimeout(() => {
            sobre.style.display = "none";

            // Mostrar la nota bíblica
            notaBiblica.classList.remove("oculto");
            notaBiblica.classList.add("mostrar");

            // Mantener la nota visible durante 4 segundos
            setTimeout(() => {
                notaBiblica.classList.remove("mostrar");
                notaBiblica.classList.add("oculto");

                // Mostrar la invitación principal
                invitacionCard.classList.add("mostrar");

                // Intentar activar la música tras la interacción
                iniciarMusica();

            }, 5500);

        }, 800);
    });
}