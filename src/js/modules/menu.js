class Submenu {
  constructor(parent) {
    this.parent = parent;

    this.el = this.parent.el.querySelector('[data-menu-submenu]');
    this.BP_COLLAPSE = 1025;
    this.OPEN_FLAG = 'is-submenu-open';
    this.initTogglers();

    // close submenues on topbar unpin
    document.addEventListener('topbar-unpinned', this.closeAll.bind(this));
  }

  // helper method to determine the current breakpoint
  _isDesktop() {
    return window.matchMedia(`(min-width: ${this.BP_COLLAPSE}px)`).matches;
  }

  // init submenu togglers
  initTogglers() {
    this.parent.items.forEach((level1) => {
      // desktop subnav
      level1.addEventListener('mouseenter', () => {
        // mouseenter
        if (this._isDesktop()) {
          let submenu = level1.querySelector('[data-menu-submenu]');
          if (submenu && !this.isOpen(level1)) {
            this.open(level1);
          }
        }
      });

      level1.addEventListener('mouseleave', () => {
        // mouseleave
        if (this._isDesktop()) {
          let submenu = level1.querySelector('[data-menu-submenu]');
          if (submenu) {
            this.close(level1);
          }
        }
      });
    });
  }

  open(level1Item) {
    level1Item.classList.add(this.OPEN_FLAG);
  }

  close(level1Item) {
    level1Item.classList.remove(this.OPEN_FLAG);
  }

  closeAll() {
    this.parent.items.forEach((item) => {
      this.close(item);
    });
  }

  isOpen(level1Item) {
    return level1Item.classList.contains(this.OPEN_FLAG);
  }
}


export default class Menu {
  constructor() {
    this.inited = false;

    document.addEventListener('DOMContentLoaded', (event) => {
      this.el = document.querySelector('[data-menu]');

      // init success depends on root element being found
      if (this.el) {
        this.inited = true;
        this.togglers = [...document.querySelectorAll('[data-menu-toggler]')];
        this.items = [...this.el.querySelectorAll('[data-menu-item]')];
      } else {
        console.error('Error: Menu could not be initialized.'); // eslint-disable-line no-console
        return this;
      }

      this.initSubmenu();
      this.initTogglers();
      this.initOutsideClick();
    });

    return this;
  }

  // Helper method to determine if overlay has been inited. Should be called by all public methods.
  isInited() {
    if (!this.inited) {
      console.error('Error: Tried to call menu method prior to initialization.'); // eslint-disable-line no-console
      return false;
    }
    return true;
  }

  initTogglers() {
    // openers
    this.togglers.forEach((toggler, idx) => {
      toggler.addEventListener('click', (e) => {
        if (this.isInited()) {
          this.toggle();
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      }, false);
    });
  }

  // close overlay on click "anywhere"
  initOutsideClick() {
    document.addEventListener('click', (e) => {
      if (this.el !== e.target && !this.el.contains(e.target)) {
        this.close();
      }
    });
  }

  initSubmenu() {
    if (this.isInited()) {
      new Submenu(this);
    }
  }

  // Toggles overlay
  toggle() {
    if (this.isInited()) {
      this.el.classList.contains('is-open') ? this.close() : this.open();
    }
  }

  // Opens overlay
  open() {
    if (this.isInited()) {
      this.el.classList.add('is-open');
      document.body.classList.add('is-menu-open');
    }
  }

  // Closes overlay
  close() {
    if (this.isInited()) {
      this.el.classList.remove('is-open');
      document.body.classList.remove('is-menu-open');
    }
  }
}
