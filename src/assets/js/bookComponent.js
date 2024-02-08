import { addToCart } from '@/assets/js/cart.js';

class BookComponent extends HTMLElement {
    constructor() {
      super();
      this._book = null;
      this._template = null;
      const shadowRoot = this.attachShadow({ mode: "open" });
    }

    get book() {
      return this._book;
    }

    set book(value) {
      this._book = value;
      this.render();
    }

    /**
     * @param {HTMLTemplateElement} value 
     */
    set template(value) {
        this._template = value;
        this.shadowRoot.appendChild(this._template.content.cloneNode(true));

        let link = document.createElement("link");
        link.setAttribute("href", "./index.css");
        link.setAttribute("rel", "stylesheet");
        this.shadowRoot.appendChild(link);
    }

    render() {
      const img = this.shadowRoot.querySelector("img");
      const bookName = this.shadowRoot.querySelector("#bookName");
      const price = this.shadowRoot.querySelector("#price");
      const btn = this.shadowRoot.querySelector("button");
      const stockyQty = this.shadowRoot.querySelector("#stockQty");
      if (this._book) {
        img.src = this.book.getImageUrl();
        bookName.textContent = this.book.name;
        price.textContent = '$'+this.book.price;
        stockyQty.textContent = this.book.stockQty;
        btn.setAttribute('bookId', this.book.id);
        btn.addEventListener('click', function(event) {
            addToCart(event.target.getAttribute('bookId'));
        });
      }
    }
  }
  customElements.define("book-component", BookComponent);
