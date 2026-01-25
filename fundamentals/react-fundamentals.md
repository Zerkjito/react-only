# REACT RECAP

---

## Puntos clave

- React es una librería que se usa junto a otros frameworks, e.g., NextJS, Remix, JSolid, etc.
- Su principal propósito es construir interfaces UI (con o sin frameworks).
- React se instala mediante un bundler, e.g., Vite, WebStack (desaconsejado totalmente ya que usaba CRA), o Bun (muy ligero, aunque este no es exactamente un bundler per se, es all-in-one: runtime + bundler + package manager).
- React está principalmente enfocado para SPA(s), en cuyo caso todo se carga a través de un único `index.html` que va re-renderizando los componentes que hacen falta, lo cual ocurre mediante **triggers** (e.g., apretar un botón, realizar un fetch a un API endpoint, un estado interno, etc.).
- Permite nativamente **HMR (Hot Module Reload)** para ver en tiempo real los cambios sin tener que recargar toda la app.
- No es tan bueno cuando hay que separar parte privada y parte pública (ahí entra en juego NextJS). La razón es simple: React solo maneja UI, no implementa routing ni SSR por defecto. NextJS o similares ofrecen funcionalidades para routing complejo, SSR, SEO, etc.

---

## Distinción entre 2 tipos de Triggers

- **Trigger inicial (mounting):** ocurre cuando se monta un componente por primera vez en el DOM.
- **Re-render:** ocurre cuando se renderiza un componente nuevamente tras un cambio (e.g., click en botón, llamada async, cambio de estado). **Cuidado con este!**

---

## React trabaja con el DOM y el DOM virtual

- En el **DOM** se carga previamente el HTML, CSS y JS.
- En el **DOM virtual** React mantiene una copia ligera en memoria del DOM real, compara los cambios realizados (**Diffing**) y luego aplica solo los necesarios (**Commit**).

**Consejo:** limitar el número de renders al mínimo, ya que este proceso puede ralentizar la app.

---

## Teoría relevante acerca de estados

- Un componente debe tener la **mínima cantidad de lógica posible**.
- **Lifting state up:** hacer que el estado compartido de los componentes venga del mismo padre. Es decir, el padre pasa lo que quiere que el hijo ejecute, y el hijo es un componente **tonto** que no tiene estado propio.
- **Distinción entre componentes:**
  - **Componente tonto (presentational/dumb):** no tiene estado propio; generalmente es un hijo que delega las acciones al padre.
  - **Componente inteligente (stateful/smart):** contiene lógica de negocio, estados (`useState`) y efectos (`useEffect`), y maneja su propio comportamiento.

- Concepto **batching** explicado con la analogía del camarero; sin **batching**, pides agua, el camarero va a la cocina y lo trae, pides pan el camarero va a la cocina de nuevo y lo trae (lento). Con **batching**, el camaraero apunta todo directamente y hace un solo viaje. Es decir, React por detrás hace esto. Pero con useState, el cambio ha de ser una actualización funcional para que tome en cuenta el valor previo.

---

## React Hooks

### useEffect

Este hook sirve para manejar el ciclo de vida de un componente, pero con alguno matices. Casi siempre se usa con una **dependency list**, lo cual es el o los componentes a los que va a afectar cada vez que realicen un render. Omitirlo es muy mala práctica e implica que cualquier cambio en el componente aplique el useEffect. Su trigger ocurre ya sea por el mounting inicial de un componente, la modificación de algún valor de la dependency list, o la ejecución del return (destrucción)

Casos de uso más comúnes:

- comunicarse con un endpoint
- operación async
- parámetros de entrada
