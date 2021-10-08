import outsideClick from './outsideclick.js';

export default class DropdownMenu {
  constructor(dropdown, events) {
    this.dropdownMenus = document.querySelectorAll(dropdown);

    // define touchstart e click como agumento padrão
    // de events caso o usuário não defina
    if (events === undefined) this.events = ['touchstart', 'click'];
    else this.events = events;
    this.activeClass = 'active';
    this.activeDropdownMenu = this.activeDropdownMenu.bind(this);
  }

  // Ativa o dropdownmenu e adiciona
  // a função que observa o clique fora dele
  activeDropdownMenu(event) {
    event.preventDefault();
    const element = event.curretTarget;
    element.classList.add(this.activeClass);
    outsideClick(element, this.events, () => {
      element.classList.remove(this.activeClass);
    });
  }

  // adiciona os eventos ao dropdownmenu
  addDropdownMenusEvent() {
    this.dropdownMenus.forEach((menu) => {
      this.events.forEach((userEvent) => {
        menu.addEventListener(userEvent, this.activeDropdownMenu);
      });
    });
  }

  init() {
    if (this.dropdownMenus.length) {
      this.addDropdownMenusEvent();
    }
    return this;
  }
}
