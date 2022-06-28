class TopButton extends HTMLElement {
    constructor() {
        super();

        const style = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 00; /* Make sure it does not overlap */
                background-color: transparent;
                border: none;
                width: 50px;
            `;

        const style_hover = `this.style.cursor='pointer'`

        const topHandler = `
            window.scrollTo({top: 0, behavior: 'smooth'});
        `;

        this.innerHTML = `
            <button id="btn_top" onclick="${topHandler}" onmouseover="${style_hover}" alt="맨위로 가기" style="${style}">
                <img src="/components/TopButton/up-arrow.png" />
            </button>
        `;
    }
}

customElements.define('btn-top', TopButton);