# La Sede — Web Components

Proyecto de carteles para La Sede UCR hecho con Web Components nativos. Tiene dos páginas: el cartel principal y el directorio de aulas.

---

## ¿Cómo usarlo?

Solo abrí `index.html` en el navegador. No necesita instalación ni dependencias.

---

## Componentes

### `<cartel-sede>` (index.html)

Es el cartel principal. Se configura con atributos directamente en el HTML:

```html
<cartel-sede
  heading="LA SEDE"
  subheading="TE"
  banner="ACOMPAÑA"
  body-title="El respeto no se negocia"
  subtitle="¡Pará ya de acosar!"
  qr-src="image.png"
  qr-caption="Escaneá y conocé tus derechos"
  people-src="foto.png"
></cartel-sede>
```

### `<aulas-directorio>` (index2.html)

Es la tarjeta del directorio. Los `<aula-item>` van adentro como hijos:

```html
<aulas-directorio back-href="index.html">
  <aula-item label="Aulas 5, 6, 7" icono="🚪"></aula-item>
  <aula-item label="Apoyo Informático" icono="🖥️"></aula-item>
</aulas-directorio>
```

---

## ¿Qué puedo cambiarle?

### 1. Los textos e imágenes → atributos HTML

Cambiá los atributos directamente en el HTML. Por ejemplo para cambiar el título del cartel:

```html
<cartel-sede heading="MI SEDE" subheading="ME" banner="AYUDA" ...>
```

---

### 2. Los colores y tamaños → variables CSS

Cada componente tiene variables CSS que se pueden sobreescribir desde `global.css` o con un `<style>` en el HTML.

**Variables de `<cartel-sede>`:**

```css
cartel-sede {
  --card-bg-top: #f7c561;       /* color de arriba de la tarjeta */
  --card-bg-mid: #d9a34d;       /* color del medio */
  --card-bg-bottom: #b97440;    /* color de abajo */
  --card-border-color: #1f2f5e; /* color del borde */
  --card-border-radius: 22px;   /* redondez de las esquinas */
  --stripe-color-a: #1f2f5e;    /* color A de las rayitas de arriba */
  --stripe-color-b: #ff6b35;    /* color B de las rayitas de arriba */
  --excl-color: #ff6b35;        /* color de los signos ! */
  --heading-bg: aqua;           /* fondo del título principal */
  --heading-color: #ffffff;     /* color del texto del título */
  --subheading-bg: white;       /* fondo del subheading */
  --subheading-color: yellow;   /* color del texto del subheading */
  --banner-bg: #543d96;         /* fondo de la píldora inclinada */
  --banner-color: #ffefef;      /* texto de la píldora */
  --body-title-color: #3f1468;  /* color del título del cuerpo */
  --subtitle-color: #2e1a4a;    /* color del subtítulo */
  --qr-wrap-bg: rgba(255,255,255,.3);   /* fondo del recuadro del QR */
  --qr-wrap-border: rgba(31,47,94,.3);  /* borde del recuadro del QR */
}
```

**Variables de `<aulas-directorio>`:**

```css
aulas-directorio {
  --card-bg: #1b2f72;           /* fondo de la tarjeta */
  --card-radius: 18px;          /* redondez de las esquinas */
  --top-line-color: #a5c0f7;    /* línea de colores de arriba */
  --title-color: #e8f2ff;       /* color del título "Directorio" */
  --badge-bg: #e8f2ff;          /* fondo de la píldora UCR */
  --badge-color: #1b2f72;       /* texto de la píldora UCR */
  --wave-label-color: #1b2f72;  /* color del texto "UCR" en la ola */
  --back-bg: #e8f2ff;           /* fondo del botón volver */
  --back-color: #1b2f72;        /* texto del botón volver */
}
```

**Variables de `<aula-item>`:**

```css
aula-item {
  --item-bg: rgba(255,255,255,.08);     /* fondo de cada fila */
  --item-border-color: rgba(255,255,255,.15); /* borde izquierdo */
  --item-label-color: #e8f0ff;          /* color del texto */
  --item-hover-bg: rgba(128,0,128,.45); /* fondo al pasar el mouse */
  --item-hover-border: #c084fc;         /* borde al pasar el mouse */
}
```

---

### 3. Estilos específicos de un elemento → CSS parts

Si las variables no alcanzan y querés cambiar algo más específico, cada componente expone partes con `::part()`.

**Partes de `<cartel-sede>`:**
`card`, `header`, `heading`, `subheading`, `banner`, `body`, `body-title`, `subtitle`, `qr-wrap`, `qr-img`, `qr-caption`, `footer`, `people-img`

**Partes de `<aulas-directorio>`:**
`card`, `header`, `title`, `badge`, `list`, `wave`, `back`

**Partes de `<aula-item>`:**
`icon`, `label`, `arrow`

Ejemplo de uso:

```css
/* Sacarle la animación al heading */
cartel-sede::part(heading) {
  animation: none;
}

/* Cambiar el color del botón volver */
aulas-directorio::part(back) {
  background: #ff6b35;
  color: white;
}

/* Ocultar la flecha de los items */
aula-item::part(arrow) {
  display: none;
}
```

---

### 4. Agregar contenido extra → slots

Los componentes tienen slots para meter contenido adicional sin modificar el JS.

| Componente | Slot | Dónde aparece |
|---|---|---|
| `<cartel-sede>` | `extra-body` | Debajo del QR |
| `<cartel-sede>` | `extra-footer` | Antes de la imagen de personas |
| `<aulas-directorio>` | `header-extra` | Dentro del header |
| `<aulas-directorio>` | `footer-extra` | Después de la ola |

Ejemplo:

```html
<cartel-sede ...>
  <p slot="extra-body">Para denuncias llamá al 2511-4567</p>
</cartel-sede>
```

---

## Estructura del proyecto

```
/
├── index.html          # Cartel principal
├── index2.html         # Directorio de aulas
├── global.css          # Estilos globales y fondos
├── components/
│   ├── CartelSede.js
│   └── AulasDirectorio.js
└── README.md
```