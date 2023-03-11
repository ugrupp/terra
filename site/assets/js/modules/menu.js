import throttle from 'lodash.throttle';

export default class Menu {
  constructor() {
    this.inited = false;
    this.BP_COLLAPSE = 1025;

    document.addEventListener('DOMContentLoaded', () => {
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

      this.initSubmenuToggler();
      this.initMenuItemWidths();
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

  // OVERLAY (mobile)
  initTogglers() {
    // openers
    this.togglers.forEach((toggler) => {
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

  // Close overlay on click "anywhere"
  initOutsideClick() {
    document.addEventListener('click', (e) => {
      if (this.el !== e.target && !this.el.contains(e.target)) {
        this.close();
      }
    });
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

  // SUBMENU (desktop)
  // Helper method to determine the current breakpoint
  _isDesktop() {
    return window.matchMedia(`(min-width: ${this.BP_COLLAPSE}px)`).matches;
  }

  // Opens submenu on menu hover
  initSubmenuToggler() {
    this.el.addEventListener('mouseenter', () => {
      // mouseenter
      if (this._isDesktop()) {
        this.openSubmenu();
      }
    });

    this.el.addEventListener('mouseleave', () => {
      // mouseleave
      if (this._isDesktop()) {
        this.closeSubmenu();
      }
    });
  }

  // Opens submenu
  openSubmenu() {
    if (this.isInited()) {
      this.el.classList.add('is-submenu-open');
      document.body.classList.add('is-submenu-open');
    }
  }

  // Closes submenu
  closeSubmenu() {
    if (this.isInited()) {
      this.el.classList.remove('is-submenu-open');
      document.body.classList.remove('is-submenu-open');
    }
  }

  // Measure widths of main menu items to transfer to submenu
  initMenuItemWidths() {
    if (this.isInited()) {

      this.measureItems();
      window.addEventListener('resize', throttle(this.measureItems.bind(this)));
      document.addEventListener('has-loaded-fonts-ci', this.measureItems.bind(this));
    }
  }

  measureItems() {
    if (this._isDesktop()) {
      this.items.forEach(item => {
        this.measureItemWidth(item);
      })
    }
  }

  // Measure width of a single menu item and save it in a CSS variable
  measureItemWidth(item) {
    item.style.setProperty('--item-width', item.offsetWidth);
  }
}
