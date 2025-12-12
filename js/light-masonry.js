/*
*
*
* agregar configuracion para Mode:
*   normal (default) - orden normal, de izquierda a derecha
*   reverse - orden invertido, de derecha a izquierda
*   filled - orden de izquierda a derecha pero llenando hacia las columnas con menos altura
* 
* Agregar un metodo para reiniciar el layout.
*
*
*
*/

class LightMasonry {
  // ------------------------ VARAIBLES ------------------------
  constructor($containerGrid, options = {}) {
    this.$containerGrid = $containerGrid;
    this.options = options;
    
    if (!this.$containerGrid) {
      window.console.error(`[LightMasonry]: Elemento no encontrado: ${this.$containerGrid}`);
      return;
    }
    
    this.limbo = document.createDocumentFragment();
    this.column = '<div class="light-masonry-column"></div>';
    this.classItemColumn = 'light-masonry-item';
    this.classWrapper = 'light-masonry-grid';
    this.classInitialized = 'light-masonry-initialized';
    this.dataCallback = {};
    this.finalOptions = {
      defaultColumns: 4,
      resizeDelay: 0,
      responsive: {},
      init: (data) => {},
      afterBreakpoint: (data) => {},
      ...this.options
    }

    this._prepareContainer();
    this._prepareItems();
    this._setLayout();
    this._getItems();
    this._setColumns();
    this._setItems();
    this._setAttributes();
    this._handleEvents();
    this.finalOptions.init(this.dataCallback);

    // ------------------------ END INIT ------------------------
  }

  _handleEvents() {
    if (this.finalOptions.resizeDelay === 0) {
      window.addEventListener('resize', () => {
        this._setLayout('resize');
      });
    } else {
      window.addEventListener(
        'resize',
        this._debounce(() => {
          this._setLayout('resize');
        }, this.finalOptions.resizeDelay),
      );
    }
  }
  
  _prepareContainer() {
    this.$containerGrid.classList.add(this.classWrapper);
    this.$containerGrid.classList.add(this.classInitialized);
  }

  _prepareItems() {
    const $masonryItems = Array.from(this.$containerGrid.children)

    $masonryItems.forEach(($element, index) => {
      $element.classList.add(this.classItemColumn);
      $element.dataset.index = index;
    });
  }

  _setAttributes() {
    this.$containerGrid.setAttribute('data-breakpoint', this.dataCallback.breakpoint);
    this.$containerGrid.setAttribute('data-columns', this.dataCallback.columns);
  };

  _getItems() {
    const $items = this.$containerGrid.querySelectorAll('.light-masonry-item');

    $items.forEach(($element) => {
      this.limbo.appendChild($element);
    });
  };

  _removeColumns() {
    this.$containerGrid
      .querySelectorAll('.light-masonry-column')
      .forEach(($element) => {
        $element.remove();
      });
  };

  _setColumns() {
    for (let i = 1; i <= this.dataCallback.columns; i++) {
      this.$containerGrid.insertAdjacentHTML('beforeend', this.column);
    }
  };

  _setItems() {
    const $items = Array.from(this.limbo.querySelectorAll('.light-masonry-item'));
    $items.sort((a, b) => Number(a.dataset.index) - Number(b.dataset.index))
    const $columns = this.$containerGrid.querySelectorAll('.light-masonry-column');
    
    let columnIndex = 0
    $items.forEach($item => {
      $columns[columnIndex].appendChild($item)
      columnIndex = (columnIndex + 1) % this.dataCallback.columns
    })
  };

  _setLayout(type = 'default') {
    let columns = this.finalOptions.defaultColumns;
    this.dataCallback.breakpoint = 'defaultColumns';

    if (this.finalOptions.responsive !== undefined && Object.keys(this.finalOptions.responsive).length > 0) {
      Object.keys(this.finalOptions.responsive)
        .reverse()
        .forEach((query) => {
          if (window.innerWidth > Number(query)) {
            return;
          }

          columns = this.finalOptions.responsive[query];
          this.dataCallback.breakpoint = Number(query);
        });
    }

    if (type === 'resize' && columns !== this.dataCallback.columns) {
      this.dataCallback.columns = columns;
      this._getItems();
      this._removeColumns();
      this._setColumns();
      this._setItems();
      this._setAttributes();
      this.finalOptions.afterBreakpoint(this.dataCallback);
    } else if (type === 'default') {
      this.dataCallback.columns = columns;
    }
  };

  _debounce(fn, wait) {
    let t;
    return (...args) => {
      window.clearTimeout(t);
      t = window.setTimeout(() => fn.apply(this, args), wait);
    };
  }
};

window.LightMasonry = LightMasonry;

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = LightMasonry;
}
