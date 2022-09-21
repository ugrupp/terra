import throttle from 'lodash.throttle';

class Input {
  constructor(el) {
    this.el = el;
    this.input = this.el.querySelector('input, textarea');
    this.input.inputClass = this;
    this.tagName = this.input.tagName.toLowerCase();
  }
}

// Text inputs
class InputText extends Input {
  constructor(el) {
    super(el);

    if (this.tagName === 'textarea') {
      this.textareaAutoResize();
    }
  }

  textareaAutoResize() {
    this.input.style.boxSizing = 'border-box';
    let offset = this.input.offsetHeight - this.input.clientHeight;

    const applyResize = () => {
      this.input.style.height = 'auto';
      this.input.style.height = this.input.scrollHeight + offset + 'px';
    };

    this.input.addEventListener('input', applyResize.bind(this));
    window.addEventListener('resize', throttle(applyResize.bind(this)));
  }
}


// Controls (radios & checkboxes)
class InputControl extends Input {
  constructor(el) {
    super(el);

    this.controlGroup = this.el.dataset.controlGroup;
  }
}


// Inputs initializer
export default class Inputs {
  constructor() {
    document.addEventListener('DOMContentLoaded', () => {
      this.textInputs = [...document.querySelectorAll('[data-input]')].map((el) => new InputText(el));
      this.controls = [...document.querySelectorAll('[data-checkbox], [data-radio]')].map((el) => new InputControl(el));

      this.initControlGroups();
    });
  }

  // init control groups, displaying a custom validity message for checkboxes
  initControlGroups() {
    function checkSetValidity(controls) {
      if (controls.length <= 0) return false;

      const errorMessage = controls.some((control) => (control.input.checked)) ? '' : controls[0].el.dataset.controlGroupError;
      controls[0].input.setCustomValidity(errorMessage);
    }

    let controlGroups = {};

    // group controls by name
    this.controls.forEach((control) => {
      let controlGroup = control.controlGroup;
      if (controlGroup) {
        controlGroups[controlGroup] = controlGroups[controlGroup] || [];
        controlGroups[controlGroup].push(control);
      }
    });

    // set up validity check triggers
    Object.values(controlGroups).forEach((controls) => {
      const firstCheckbox = controls.length > 0 ? controls[0] : null;
      if (firstCheckbox) {
        controls.forEach((checkbox) => {
          checkbox.input.addEventListener('change', () => {
            checkSetValidity(controls);
          });
        });
        checkSetValidity(controls);
      }
    });
  }
}
