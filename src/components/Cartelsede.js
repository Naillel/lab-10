class CartelSede extends HTMLElement {
    /* ── Atributos reactivos ── */
    static get observedAttributes() {
        return [
            "heading", "subheading", "banner",
            "body-title", "subtitle",
            "qr-src", "qr-alt", "qr-caption",
            "people-src", "people-alt"
        ];
    }

    /* ── Propiedades privadas con valores por defecto ── */
    #heading    = "LA SEDE";
    #subheading = "TE";
    #banner     = "ACOMPAÑA";
    #bodyTitle  = "El respeto no se negocia";
    #subtitle   = "¡Pará ya de acosar!";
    #qrSrc      = "";
    #qrAlt      = "QR code";
    #qrCaption  = "Escaneá y conocé tus derechos";
    #peopleSrc  = "";
    #peopleAlt  = "";

    #attrMap = {
        "heading":    v => { this.#heading    = v; },
        "subheading": v => { this.#subheading = v; },
        "banner":     v => { this.#banner     = v; },
        "body-title": v => { this.#bodyTitle  = v; },
        "subtitle":   v => { this.#subtitle   = v; },
        "qr-src":     v => { this.#qrSrc      = v; },
        "qr-alt":     v => { this.#qrAlt      = v; },
        "qr-caption": v => { this.#qrCaption  = v; },
        "people-src": v => { this.#peopleSrc  = v; },
        "people-alt": v => { this.#peopleAlt  = v; },
    };

    constructor() {
        super();
        /* ── Shadow DOM: encapsulación total de estilos e internos ── */
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        for (const [attr, setter] of Object.entries(this.#attrMap)) {
            const val = this.getAttribute(attr);
            if (val !== null) setter(val);
        }
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;
        const setter = this.#attrMap[name];
        if (setter) setter(newValue);
        if (this.isConnected) this.render();
    }

    get #styles() {
        return /* css */`
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Black+Ops+One&family=Nunito:wght@600;700;800;900&display=swap');

            /*
             * ╔══════════════════════════════════════════════════════════╗
             * ║  CSS CUSTOM PROPERTIES  (variables)                      ║
             * ║  Se pueden sobreescribir desde fuera del componente así: ║
             * ║                                                          ║
             * ║  cartel-sede {                                           ║
             * ║    --card-bg-top:     #1a1a2e;                          ║
             * ║    --heading-bg:      #e94560;                          ║
             * ║    --banner-bg:       #0f3460;                          ║
             * ║  }                                                       ║
             * ╚══════════════════════════════════════════════════════════╝
             */
            :host {
                /* Gradiente de fondo de la tarjeta */
                --card-bg-top:        #f7c561;
                --card-bg-mid:        #d9a34d;
                --card-bg-bottom:     #b97440;

                /* Borde de la tarjeta */
                --card-border-color:  #1f2f5e;
                --card-border-width:  5px;
                --card-border-radius: 22px;

                /* Franja decorativa superior */
                --stripe-color-a:     #1f2f5e;
                --stripe-color-b:     #ff6b35;

                /* Signo de exclamación */
                --excl-color:         #ff6b35;

                /* Heading principal */
                --heading-bg:         aqua;
                --heading-color:      #ffffff;
                --heading-shadow:     #1f2f5e;

                /* Subheading */
                --subheading-bg:      white;
                --subheading-color:   yellow;

                /* Banner (píldora inclinada) */
                --banner-bg:          #543d96;
                --banner-color:       #ffefef;

                /* Textos del cuerpo */
                --body-title-color:   #3f1468;
                --subtitle-color:     #2e1a4a;

                /* Contenedor QR */
                --qr-wrap-bg:         rgba(255,255,255,.3);
                --qr-wrap-border:     rgba(31,47,94,.3);

                display: grid;
                place-items: center;
                width: min(500px, 92vw);
            }

            @keyframes card-in {
                from { opacity: 0; transform: translateY(28px) scale(.97); }
                to   { opacity: 1; transform: translateY(0)    scale(1);   }
            }
            @keyframes pulse-text {
                0%, 100% { transform: scale(1); }
                50%      { transform: scale(1.04); }
            }
            @keyframes shimmer {
                0%   { box-shadow: 0 0 0 0    rgba(255,255,255,.5); }
                70%  { box-shadow: 0 0 14px rgba(255,255,255,0); }
                100% { box-shadow: 0 0 0 0    rgba(255,255,255,0); }
            }
            @keyframes float-tilt {
                0%, 100% { transform: rotate(-8deg) translateY(0); }
                50%      { transform: rotate(-8deg) translateY(-4px); }
            }
            @keyframes row-in {
                from { opacity: 0; transform: translateY(12px); }
                to   { opacity: 1; transform: translateY(0); }
            }

            /* ═══════════════════════════════════════
               CSS PARTS — estilizables desde afuera
               con: cartel-sede::part(nombre) { ... }
               ═══════════════════════════════════════ */

            .c-card {
                width: 100%;
                background: linear-gradient(
                    180deg,
                    var(--card-bg-top)     0%,
                    var(--card-bg-mid)    45%,
                    var(--card-bg-bottom) 100%
                );
                border: var(--card-border-width) solid var(--card-border-color);
                border-radius: var(--card-border-radius);
                box-shadow: 0 20px 40px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.35);
                overflow: hidden;
                display: grid;
                grid-template-rows: auto 1fr auto;
                animation: card-in .7s cubic-bezier(.22,1,.36,1) both;
            }

            .c-header {
                position: relative;
                text-align: center;
                padding: 1.4rem 1.4rem 1rem;
                background: linear-gradient(180deg, rgba(255,255,255,.18) 0%, rgba(255,255,255,0) 100%);
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: .55rem;
            }
            .c-header::before {
                content: "";
                position: absolute;
                top: 0; left: 0; right: 0;
                height: 4px;
                background: repeating-linear-gradient(
                    90deg,
                    var(--stripe-color-a) 0px,  var(--stripe-color-a) 12px,
                    var(--stripe-color-b) 12px, var(--stripe-color-b) 24px
                );
            }
            .c-header-top {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: .9rem;
            }
            .c-excl {
                font-family: "Black Ops One", cursive;
                font-size: 2.8rem;
                color: var(--excl-color);
                line-height: 1;
                filter: drop-shadow(0 2px 4px rgba(0,0,0,.25));
            }
            .c-heading {
                margin: 0;
                font-family: "Black Ops One", cursive;
                font-size: clamp(2rem, 5vw, 2.9rem);
                letter-spacing: .18rem;
                color: var(--heading-color);
                text-shadow: 2px 2px 0 var(--heading-shadow), 4px 4px 0 rgba(31,47,94,.3);
                padding: .15rem .65rem;
                border-radius: .45rem;
                background: var(--heading-bg);
                animation: float-tilt 3s ease-in-out infinite;
                display: inline-block;
            }
            .c-subheading {
                margin: 0;
                font-family: "Black Ops One", cursive;
                font-size: clamp(2rem, 5vw, 2.9rem);
                letter-spacing: .18rem;
                color: var(--subheading-color);
                text-shadow: 2px 2px 0 var(--heading-shadow);
                padding: .15rem .65rem;
                border-radius: .45rem;
                background: var(--subheading-bg);
                display: inline-block;
                animation: row-in .6s .2s both;
            }
            .c-header-bottom {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: .9rem;
                animation: row-in .6s .35s both;
            }
            .c-banner {
                margin: 0;
                font-family: "Nunito", sans-serif;
                display: inline-flex;
                padding: .2rem .85rem;
                background: var(--banner-bg);
                color: var(--banner-color);
                font-weight: 900;
                font-size: 1.05rem;
                border-radius: .6rem;
                text-transform: uppercase;
                letter-spacing: .12rem;
                box-shadow: inset 0 -3px 0 rgba(0,0,0,.2), 0 4px 10px rgba(84,61,150,.4);
                transform: rotate(8deg);
            }
            .c-body {
                display: grid;
                gap: 1.1rem;
                place-items: center;
                text-align: center;
                padding: 1.1rem 1.2rem;
                background: rgba(255,255,255,.08);
            }
            .c-body-title {
                margin: 0;
                font-family: "Nunito", sans-serif;
                font-size: clamp(1.35rem, 4vw, 1.9rem);
                font-weight: 900;
                color: var(--body-title-color);
                text-shadow: 0 1px 0 rgba(255,255,255,.4);
                animation: row-in .6s .45s both;
            }
            .c-subtitle {
                margin: 0;
                font-family: "Nunito", sans-serif;
                font-size: clamp(1rem, 3vw, 1.35rem);
                color: var(--subtitle-color);
                font-weight: 800;
                animation: pulse-text 2.4s ease-in-out infinite, row-in .6s .55s both;
            }
            .c-qr-wrap {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: .6rem;
                background: var(--qr-wrap-bg);
                border: 2px dashed var(--qr-wrap-border);
                border-radius: 1rem;
                padding: .8rem 1.2rem;
                animation: row-in .6s .65s both;
            }
            .c-qr-img {
                width: min(110px, 24vw);
                height: min(110px, 24vw);
                object-fit: contain;
                border-radius: .5rem;
                animation: shimmer 2.2s infinite;
            }
            .c-qr-caption {
                margin: 0;
                font-family: "Nunito", sans-serif;
                font-size: .88rem;
                font-weight: 700;
                color: var(--body-title-color);
            }
            .c-footer {
                padding: 0;
                position: relative;
                overflow: hidden;
            }
            .c-footer::before {
                content: "";
                position: absolute;
                top: 0; left: 0; right: 0;
                height: 32px;
                background: linear-gradient(to bottom, rgba(217,163,77,.8), transparent);
                z-index: 1;
                pointer-events: none;
            }
            .c-people-img {
                display: block;
                width: 100%;
                height: auto;
                object-fit: cover;
            }

            /* Estilo base para elementos en slots */
            ::slotted(*) {
                margin-top: .5rem;
            }
        </style>`;
    }

    /*
     * ── Plantilla HTML ──
     *
     * SLOTS disponibles:
     *   name="extra-body"    → Contenido adicional dentro de la sección .c-body
     *                          Ejemplo: <p slot="extra-body">Contacto: 2511-0000</p>
     *
     *   name="extra-footer"  → Contenido entre el body y el footer (imagen de personas)
     *                          Ejemplo: <div slot="extra-footer">...</div>
     *
     * PARTS expuestos (cartel-sede::part(nombre)):
     *   card | header | excl | heading | subheading | banner |
     *   body | body-title | subtitle | qr-wrap | qr-img | qr-caption |
     *   footer | people-img
     */
    get #template() {
        return /* html */`
        ${this.#styles}
        <article class="c-card" part="card">

            <header class="c-header" part="header">
                <div class="c-header-top">
                    <span class="c-excl" part="excl">!</span>
                    <h1 class="c-heading" part="heading">${this.#heading}</h1>
                </div>
                <h2 class="c-subheading" part="subheading">${this.#subheading}</h2>
                <div class="c-header-bottom">
                    <p class="c-banner" part="banner">${this.#banner}</p>
                    <span class="c-excl" part="excl">!</span>
                </div>
            </header>

            <section class="c-body" part="body">
                <h2 class="c-body-title" part="body-title">${this.#bodyTitle}</h2>
                <p class="c-subtitle" part="subtitle">${this.#subtitle}</p>
                <div class="c-qr-wrap" part="qr-wrap">
                    <img class="c-qr-img" part="qr-img"
                         src="${this.#qrSrc}" alt="${this.#qrAlt}" />
                    <p class="c-qr-caption" part="qr-caption">${this.#qrCaption}</p>
                </div>
                <!-- Slot: contenido adicional en el cuerpo del cartel -->
                <slot name="extra-body"></slot>
            </section>

            <!-- Slot: contenido entre el body y el footer -->
            <slot name="extra-footer"></slot>

            <footer class="c-footer" part="footer">
                <img class="c-people-img" part="people-img"
                     src="${this.#peopleSrc}"
                     alt="${this.#peopleAlt}" />
            </footer>

        </article>`;
    }

    render() {
        /* Con Shadow DOM usamos shadowRoot.innerHTML en vez de this.innerHTML */
        this.shadowRoot.innerHTML = this.#template;
    }
}
customElements.define("cartel-sede", CartelSede);