/* ═══════════════════════════════════════════
   <aula-item>  —  fila individual del directorio
   ═══════════════════════════════════════════ */
class AulaItem extends HTMLElement {
    static get observedAttributes() {
        return ["label", "icono"];
    }

    #label = "";
    #icono = "→";
    #index = 0;

    constructor() {
        super();
        /* ── Shadow DOM ── */
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.#label = this.getAttribute("label") ?? this.#label;
        this.#icono = this.getAttribute("icono") ?? this.#icono;

        const siblings = [...(this.parentElement?.querySelectorAll("aula-item") ?? [])];
        this.#index = siblings.indexOf(this);
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;
        if (name === "label") this.#label = newValue;
        if (name === "icono") this.#icono = newValue;
        if (this.isConnected) this.render();
    }

    render() {
        const delay = (this.#index * 0.1 + 0.4).toFixed(2);

        this.shadowRoot.innerHTML = /* html */`
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Black+Ops+One&family=Nunito:wght@600;700;800;900&display=swap');

            /*
             * ╔══════════════════════════════════════════════════════════╗
             * ║  CSS CUSTOM PROPERTIES de <aula-item>                    ║
             * ║                                                          ║
             * ║  aula-item {                                             ║
             * ║    --item-bg:           rgba(255,0,0,.2);               ║
             * ║    --item-border-color: red;                             ║
             * ║    --item-label-color:  #fff;                           ║
             * ║    --item-hover-bg:     rgba(255,0,0,.5);               ║
             * ║    --item-hover-border: red;                             ║
             * ║  }                                                       ║
             * ╚══════════════════════════════════════════════════════════╝
             */
            :host {
                --item-bg:           rgba(255,255,255,.08);
                --item-border-color: rgba(255,255,255,.15);
                --item-label-color:  #e8f0ff;
                --item-arrow-color:  rgba(255,255,255,.6);
                --item-hover-bg:     rgba(128,0,128,.45);
                --item-hover-border: #c084fc;
                --item-hover-label:  #f3e8ff;

                display: grid;
                grid-template-columns: auto 1fr auto;
                align-items: center;
                gap: .75rem;
                padding: .8rem 1rem;
                background: var(--item-bg);
                border-left: 4px solid var(--item-border-color);
                border-radius: 0 .6rem .6rem 0;
                cursor: default;
                transition: background .25s ease, border-left-color .25s ease, transform .2s ease;
                animation: item-in .5s ${delay}s cubic-bezier(.22,1,.36,1) both;
            }
            @keyframes item-in {
                from { opacity: 0; transform: translateX(-18px); }
                to   { opacity: 1; transform: translateX(0); }
            }
            :host(:hover) {
                background: var(--item-hover-bg);
                border-left-color: var(--item-hover-border);
                transform: translateX(4px);
            }

            /* ═══════════════════════════════════════
               CSS PARTS de <aula-item>:
               aula-item::part(icon)   { font-size: 2rem; }
               aula-item::part(label)  { color: yellow; }
               aula-item::part(arrow)  { display: none; }
               ═══════════════════════════════════════ */

            .ai-icon {
                font-size: 1.2rem;
                line-height: 1;
                transition: transform .2s;
            }
            :host(:hover) .ai-icon {
                transform: scale(1.25) rotate(-5deg);
            }
            .ai-label {
                font-family: "Nunito", sans-serif;
                font-size: clamp(.88rem, 2.5vw, 1.05rem);
                font-weight: 700;
                color: var(--item-label-color);
                letter-spacing: .01rem;
                transition: color .25s;
            }
            :host(:hover) .ai-label {
                color: var(--item-hover-label);
            }
            .ai-arrow {
                font-family: "Nunito", sans-serif;
                font-size: 1.4rem;
                font-weight: 900;
                color: var(--item-arrow-color);
                transition: color .25s, transform .2s;
            }
            :host(:hover) .ai-arrow {
                color: var(--item-hover-label);
                transform: translateX(4px);
            }
        </style>
        <span class="ai-icon" part="icon">${this.#icono}</span>
        <span class="ai-label" part="label">${this.#label}</span>
        <span class="ai-arrow" part="arrow">›</span>
        `;
    }
}
customElements.define("aula-item", AulaItem);


/* ═══════════════════════════════════════════
   <aulas-directorio>  —  tarjeta contenedora
   ═══════════════════════════════════════════ */
class AulasDirectorio extends HTMLElement {
    static get observedAttributes() {
        return ["wave-src", "back-href", "title-text", "badge-text"];
    }

    #waveSrc   = "abstract-white-waves-png.png";
    #backHref  = "index.html";
    #titleText = "Directorio";
    #badgeText = "UCR · Sede";

    constructor() {
        super();
        /* ── Shadow DOM ──
           Con Shadow DOM los <aula-item> hijos permanecen en el Light DOM
           y se distribuyen al shadow mediante un <slot>. Ya no es necesario
           leer y clonar los hijos manualmente. */
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.#waveSrc   = this.getAttribute("wave-src")   ?? this.#waveSrc;
        this.#backHref  = this.getAttribute("back-href")  ?? this.#backHref;
        this.#titleText = this.getAttribute("title-text") ?? this.#titleText;
        this.#badgeText = this.getAttribute("badge-text") ?? this.#badgeText;
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;
        if (name === "wave-src")   this.#waveSrc   = newValue;
        if (name === "back-href")  this.#backHref  = newValue;
        if (name === "title-text") this.#titleText = newValue;
        if (name === "badge-text") this.#badgeText = newValue;
        if (this.isConnected) this.render();
    }

    get #styles() {
        return /* css */`
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Black+Ops+One&family=Nunito:wght@600;700;800;900&display=swap');

            /*
             * ╔══════════════════════════════════════════════════════════╗
             * ║  CSS CUSTOM PROPERTIES de <aulas-directorio>             ║
             * ║                                                          ║
             * ║  aulas-directorio {                                      ║
             * ║    --card-bg:          #0a1628;                         ║
             * ║    --card-radius:      8px;                             ║
             * ║    --title-color:      #a5c0f7;                         ║
             * ║    --badge-bg:         #4f7bdc;                         ║
             * ║    --badge-color:      #fff;                            ║
             * ║    --top-line-color:   #a5c0f7;                         ║
             * ║    --wave-label-color: #a5c0f7;                         ║
             * ║  }                                                       ║
             * ╚══════════════════════════════════════════════════════════╝
             */
            :host {
                --card-bg:           #1b2f72;
                --card-radius:       18px;
                --card-shadow:       0 24px 48px rgba(10,20,60,.45);

                --top-line-color:    #a5c0f7;

                --title-color:       #e8f2ff;
                --badge-bg:          #e8f2ff;
                --badge-color:       #1b2f72;

                --divider-color:     rgba(255,255,255,.2);

                --wave-label-color:  #1b2f72;

                --back-bg:           #e8f2ff;
                --back-color:        #1b2f72;

                display: grid;
                place-items: center;
                width: min(500px, 92vw);
            }

            @keyframes card-in {
                from { opacity: 0; transform: translateY(24px) scale(.98); }
                to   { opacity: 1; transform: translateY(0)    scale(1);   }
            }
            @keyframes wave-drift {
                0%, 100% { transform: translateX(0)   scaleY(1); }
                50%      { transform: translateX(-8px) scaleY(1.03); }
            }
            @keyframes badge-glow {
                0%, 100% { box-shadow: 0 0 0 0   rgba(255,255,255,0); }
                50%      { box-shadow: 0 0 18px 4px rgba(200,220,255,.25); }
            }
            @keyframes title-in {
                from { opacity: 0; letter-spacing: .4rem; }
                to   { opacity: 1; letter-spacing: .12rem; }
            }

            /* ═══════════════════════════════════════
               CSS PARTS de <aulas-directorio>:
               aulas-directorio::part(card)  { border: 2px solid red; }
               aulas-directorio::part(title) { color: gold; }
               aulas-directorio::part(badge) { background: navy; }
               ═══════════════════════════════════════ */

            .ad-card {
                position: relative;
                width: 100%;
                background: var(--card-bg);
                border-radius: var(--card-radius);
                overflow: hidden;
                display: grid;
                grid-template-rows: auto auto auto auto;
                box-shadow: var(--card-shadow), inset 0 1px 0 rgba(255,255,255,.12);
                animation: card-in .65s cubic-bezier(.22,1,.36,1) both;
            }
            .ad-card::before {
                content: "";
                position: absolute;
                top: 0; left: 0; right: 0;
                height: 3px;
                background: linear-gradient(
                    90deg,
                    #4f7bdc 0%,
                    var(--top-line-color) 40%,
                    #4f7bdc 80%,
                    #2b4fa8 100%
                );
                z-index: 5;
            }
            .ad-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 1.3rem 1.3rem .9rem;
                background: linear-gradient(180deg, rgba(255,255,255,.1) 0%, rgba(255,255,255,0) 100%);
            }
            .ad-title {
                margin: 0;
                font-family: "Black Ops One", cursive;
                font-size: clamp(1.4rem, 4vw, 1.9rem);
                color: var(--title-color);
                letter-spacing: .12rem;
                text-shadow: 0 2px 8px rgba(0,0,0,.4);
                animation: title-in .8s .1s cubic-bezier(.22,1,.36,1) both;
            }
            .ad-badge {
                font-family: "Nunito", sans-serif;
                font-size: .72rem;
                font-weight: 900;
                color: var(--badge-color);
                background: var(--badge-bg);
                padding: .25rem .6rem;
                border-radius: 2rem;
                letter-spacing: .05rem;
                text-transform: uppercase;
                animation: badge-glow 3s ease-in-out infinite;
            }
            .ad-divider {
                height: 1px;
                background: linear-gradient(
                    90deg,
                    transparent,
                    var(--divider-color) 30%,
                    var(--divider-color) 70%,
                    transparent
                );
                margin: 0 1rem;
            }
            .ad-list {
                display: grid;
                gap: .4rem;
                padding: .8rem 1rem 1rem;
            }
            .ad-wave {
                position: relative;
                height: 110px;
                overflow: hidden;
            }
            .ad-wave-img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                opacity: .92;
                animation: wave-drift 7s ease-in-out infinite;
            }
            .ad-wave-label {
                position: absolute;
                inset: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: "Black Ops One", cursive;
                font-size: 1.6rem;
                color: var(--wave-label-color);
                letter-spacing: .25rem;
                text-shadow: 0 1px 3px rgba(255,255,255,.5);
                pointer-events: none;
            }
            .ad-back {
                position: absolute;
                top: 1.1rem;
                right: 1.1rem;
                font-family: "Nunito", sans-serif;
                font-size: .82rem;
                font-weight: 900;
                text-decoration: none;
                color: var(--back-color);
                background: var(--back-bg);
                padding: .35rem .75rem;
                border-radius: 2rem;
                letter-spacing: .03rem;
                transition: background .2s, transform .15s;
                z-index: 10;
            }
            .ad-back:hover {
                background: #ffffff;
                transform: translateY(-2px);
            }

            /* Estilo base para los <aula-item> distribuidos al slot */
            ::slotted(aula-item) {
                display: block;
            }
        </style>`;
    }

    /*
     * ── Plantilla HTML ──
     *
     * SLOTS disponibles:
     *   (default)            → Los <aula-item> hijos van aquí automáticamente.
     *                          No hace falta indicar slot="..." en los hijos.
     *
     *   name="header-extra"  → Contenido adicional dentro del header
     *                          Ejemplo: <img slot="header-extra" src="logo.png" />
     *
     *   name="footer-extra"  → Contenido después de la ola decorativa
     *                          Ejemplo: <p slot="footer-extra">Piso 3</p>
     *
     * PARTS expuestos (aulas-directorio::part(nombre)):
     *   card | header | title | badge | divider | list | wave | back
     */
    get #template() {
        return /* html */`
        ${this.#styles}
        <article class="ad-card" part="card">

            <header class="ad-header" part="header">
                <h1 class="ad-title" part="title">${this.#titleText}</h1>
                <span class="ad-badge" part="badge">${this.#badgeText}</span>
                <!-- Slot: contenido extra en el header (p.ej. logo) -->
                <slot name="header-extra"></slot>
            </header>

            <div class="ad-divider" part="divider"></div>

            <!-- Slot por defecto: aquí se distribuyen los <aula-item> hijos -->
            <section class="ad-list" part="list">
                <slot></slot>
            </section>

            <div class="ad-wave" part="wave">
                <img class="ad-wave-img"
                     src="${this.#waveSrc}"
                     alt="Decoración de ola" />
                <div class="ad-wave-label">UCR</div>
            </div>

            <!-- Slot: contenido extra al final de la tarjeta -->
            <slot name="footer-extra"></slot>

            <a href="${this.#backHref}" class="ad-back" part="back">← Volver</a>
        </article>`;
    }

    render() {
        this.shadowRoot.innerHTML = this.#template;
    }
}
customElements.define("aulas-directorio", AulasDirectorio);