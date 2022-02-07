/* eslint-disable no-empty-function, no-unused-vars */
/*

  agregar configuracion para Mode:
  normal (default) - orden normal, de izquierda a derecha
  reverse - orden invertido, de derecha a izquierda
  vertical-fill - orden de izquierda a derecha pero llenando hacia las columnas con menos altura
  
  Configuracion para diferentes anchos de hijos.

*/

const lightMasonry = (containerClass, newOptions = {}) => {
  // ------------------------ VARAIBLES ------------------------

  const $masonryWrapper = document.querySelector(containerClass);
  const hiddenBox =
    '<div class="light-masonry-hidden-box" style="display: none !important;"></div>';
  const column = '<div class="light-masonry-column"></div>';
  const classItemColumn = "light-masonry-item";
  const classWrapper = "light-masonry-wrapper";
  const classInitialized = "light-masonry-initialized";
  const dataCallback = {};
  let firstExecution = false;
  let allItems = [];
  const finalOptions = {
    defaultColumns: 4,
    responsive: {
      1440: 4,
      834: 3,
      680: 2,
    },
    init: (data) => {},
    afterBreakpoint: (data) => {},
    ...newOptions,
  };

  // ------------------------ END VARAIBLES ------------------------

  // ------------------------ FUNCTIONALITY ------------------------

  const setOrder = () => {
    const $masonryItems = $masonryWrapper.querySelectorAll(
      ".light-masonry-item"
    );

    $masonryItems.forEach(($element, index) => {
      $element.dataset.index = index;
    });
  };

  const setChildsClass = () => {
    Array.from($masonryWrapper.children).forEach(($element) => {
      $element.classList.add(classItemColumn);
    });
  };

  const setWrapperClass = () => {
    $masonryWrapper.classList.add(classWrapper);
  };

  const setInitializedClass = () => {
    $masonryWrapper.classList.add(classInitialized);
  };

  const setAttributes = () => {
    $masonryWrapper.setAttribute("data-breakpoint", dataCallback.breakpoint);
    $masonryWrapper.setAttribute("data-columns", dataCallback.columns);
  };

  const createHiddenBox = () => {
    $masonryWrapper.insertAdjacentHTML("beforeend", hiddenBox);
  };

  const getItems = () => {
    const $masonryItems = $masonryWrapper.querySelectorAll(
      ".light-masonry-item"
    );

    $masonryItems.forEach(($element) => {
      $masonryWrapper
        .querySelector(".light-masonry-hidden-box")
        .appendChild($element);
    });
  };

  const removeColumns = () => {
    $masonryWrapper
      .querySelectorAll(".light-masonry-column")
      .forEach(($element) => {
        $element.remove();
      });
  };

  const addColumns = (columns) => {
    for (let i = 1; i <= columns; i++) {
      $masonryWrapper.insertAdjacentHTML("beforeend", column);
    }
  };

  const setItems = () => {
    const $arrayIndex = [];
    const $masonryItems = $masonryWrapper.querySelectorAll(
      ".light-masonry-item"
    );

    $masonryItems.forEach(($element) => {
      $arrayIndex.push($element.dataset.index);
    });

    allItems = $arrayIndex.sort((a, b) => a - b);

    const setItemsInColum = ($column) => {
      if (!allItems.length) {
        return;
      }

      $column.appendChild(
        $masonryWrapper.querySelector(
          `.light-masonry-item[data-index="${allItems[0]}"]`
        )
      );
      allItems.shift();
    };

    while (allItems.length) {
      const $columns = $masonryWrapper.querySelectorAll(
        ".light-masonry-column"
      );
      $columns.forEach(setItemsInColum);
    }
  };

  const setInitCallback = (data) => {
    if (firstExecution) {
      return;
    }
    finalOptions.init(data);
    firstExecution = true;
  };

  const setBreakpointCallback = (data) => {
    if (firstExecution) {
      finalOptions.afterBreakpoint(data);
    }
  };

  const setLayout = () => {
    let finalColumns = finalOptions.defaultColumns;
    if (finalOptions.responsive !== undefined) {
      Object.keys(finalOptions.responsive)
        .reverse()
        .forEach((query) => {
          if (window.innerWidth > Number(query)) {
            return;
          }

          dataCallback.breakpoint = Number(query);
          finalColumns = finalOptions.responsive[query];
        });
    }

    if (dataCallback.columns === finalColumns) {
      dataCallback.columns = finalColumns;
      if (!firstExecution) {
        getItems();
        removeColumns();
        addColumns(finalColumns);
        setItems();
        setAttributes();
      }
    } else {
      dataCallback.columns = finalColumns;
      getItems();
      removeColumns();
      addColumns(finalColumns);
      setItems();
      setAttributes();
      setBreakpointCallback(dataCallback);
    }
  };

  // ------------------------ END FUNCTIONALITY ------------------------

  // ------------------------ BASE CONFIG ------------------------

  setWrapperClass();
  setChildsClass();
  setOrder();
  createHiddenBox();

  // ------------------------ END BASE CONFIG ------------------------

  // ------------------------ INIT ------------------------

  setLayout();
  setInitializedClass();
  setInitCallback(dataCallback);

  // ------------------------ END INIT ------------------------

  // ------------------------ EVENTS ------------------------

  window.addEventListener("resize", setLayout);

  // ------------------------ END EVENTS ------------------------
};

window.lightMasonry = lightMasonry;

export default lightMasonry;
