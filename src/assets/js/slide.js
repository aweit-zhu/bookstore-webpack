import { slide, currency, rand } from "@/assets/js/util.js";
import { findAllBooks,findAllBookTypes,findBooksByTypeName,} from "@/assets/js/book.js";
import '@/assets/js/bookComponent.js';
import $ from 'jquery';

$("#slide").load("./templates/advertisement.html", function () {
  slide(document.querySelector("#advertisement"), 5000);
});

$("#popular").load("./templates/product.html", function () {
  let template = document.getElementById("book-component-template");
  findAllBookTypes().map((booType, index) => {
    $("#popular").append(
      `
                  <div class="my-4 flex h-56 w-full justify-start lg:justify-center rounded" id="${booType.typeName}">
                    <div class="relative flex-shrink-0 w-44 md:w-72 rounded cursor-pointer">
                      <img
                          src="https://picsum.photos/288/224?random?${booType.typeId}"
                          class="h-full w-3/4 rounded-3xl mx-auto opacity-60"
                      />
                      <p class="absolute-x-center bottom-0 absolute text-nowrap text-white text-center text-lg bg-gradient-to-r from-${booType.color}-500 w-3/4 rounded">${booType.typeName}</p>
                    </div>
                    <book-component class="relative mx-1 w-32 md:w-44 flex-shrink-0 rounded border-2"></book-component>
                    <book-component class="relative mx-1 w-32 md:w-44 flex-shrink-0 rounded border-2"></book-component>
                    <book-component class="relative mx-1 w-32 md:w-44 flex-shrink-0 rounded border-2"></book-component>
                    <book-component class="relative mx-1 w-32 md:w-44 flex-shrink-0 rounded border-2"></book-component>
                    <book-component class="relative mx-1 w-32 md:w-44 flex-shrink-0 rounded border-2"></book-component>
                  </div>
                `
    );

    let books = findBooksByTypeName(booType.typeName);
    books.map((book, index) => {
      const bookComponent = $(
        `#${booType.typeName} > book-component:nth-child(${index + 2})`
      )[0];
      if (bookComponent) {
        bookComponent.template = template;
        bookComponent.book = book;
      }
    });
  });
});
