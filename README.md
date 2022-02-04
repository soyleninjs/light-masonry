# light-masonry

Script para crear un layout tipo masonry.

Solo es necesario tener el contenedor junto a sus hijos que se acomodaran en este tipo de layout.

El script formateara todo, agregara y colocara lo necesario para que funcione el layout.

[![npm](https://img.shields.io/npm/v/light-masonry?color=check&style=plastic)](https://www.npmjs.com/package/light-masonry)
[![npm bundle size](https://img.shields.io/bundlephobia/min/light-masonry?style=plastic)](https://www.npmjs.com/package/light-masonry)

## Demo

**[Codepen](https://codepen.io/soyleninjs/pen/GRMdQqp)**

## CSS

- Este script necesita algunos styles base:

  ```css
  /* ------------------ light-masonry.css ------------------ */
  .light-masonry-wrapper {
    --gap: 5px;
    --gap-between-columns: var(--gap);
    --gap-between-items: var(--gap);
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    width: 100%;
    grid-gap: var(--gap-between-columns);
  }

  .light-masonry-column {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
  }

  .light-masonry-column .light-masonry-item {
    width: 100%;
  }

  .light-masonry-column .light-masonry-item:not(:last-child) {
    margin-bottom: var(--gap-between-items);
  }
  ```

  **Aquí hay 3 variables css que podemos manipular**:

  - **—gap**
    El valor de este cambia los espacios tanto entre las filas y las columnas, totalmente parejo.
  - **—gap-between-columns**
    El valor de este cambia solo los espacios entre cada columna. _Eje horizontal_
  - **—gap-between-items**
    El valor de este cambia solo los espacios entre cada item. _Eje vertical_
    **NOTA:** Estas variables van en la misma clase que le pasaste al script.

## Parámentros

- **containerClass [Required] [String]**
  Este parametro recibe la clase del contenedor al que se configurara el script.
  ```javascript
  const container = ".main-container-masonry";
  ```
- **Options [Optional] [Object]**
  Él parámetro que recibe es un objeto con todas las opciones posibles. Cada que agregues una option esta se actualizara la default.
  ```javascript
  const options = {
    defaultColumns: 4,
    responsive: {
      1440: 4,
      834: 3,
      680: 2,
    },
    init: (data) => {},
    afterBreakpoint: (data) => {},
  };
  ```
  - **defaultColumns [Optional] [Number]**
    Este campo sirve para colocar las columnas por default que tendrá el layout dado caso no se pasen medidas responsive o si las medidas responsive dadas ya no se se cumplen
    ```javascript
    const options = {
      defaultColumns: 5,
    };
    ```
  - **responsive [Optional] [Object]**
    Este parámetro sirve para agregar las medidas responsive y las columnas que abra en cada query.
    Se basa en **desktopFirst,** es decir, una vez que alcanza la medida este se configura hacia abajo, dando el numero de columnas pasado a esta medida, y cambia una vez alcance la siguiente medida.
    ```javascript
    const options = {
      responsive: {
        // window.width <= 1440px : 4 columns
        1440: 4,
        // window.width <= 834px : 3 columns
        834: 3,
        // window.width <= 680px : 2 columns
        680: 2,
      },
    };
    ```
  - **init [Optional] [function]**
    Retorna el objeto con la información actualmente en ejecución.
    Se lanza justo después de configurar el script por primera vez.
    ```javascript
    const options = {
      init: (data) => {
        console.log(data);
      },
    };
    ```
  - **afterBreakpoint [Optional] [function]**
    Retorna el objeto con la información actualmente en ejecución.
    Se lanza justo después de cada cambio de breakpoint.
    ```javascript
    const options = {
      afterBreakpoint: (data) => {
        console.log(data);
      },
    };
    ```
