class Header extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
    <div id="header">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="container mt-3">
        <div class="navbar-brand">
          <a class="navbar-item" href="/">
            <div class="logo">
            </div>
          </a>
          <a
            role="button"
            class="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
          <div class="navbar-end breadcrumb my-auto" aria-label="breadcrumbs">
            <ul id="navbar">
            </ul>
          </div>
        </div>
      </nav>
    </div>
    `;
  }
}

customElements.define('main-header', Header);
