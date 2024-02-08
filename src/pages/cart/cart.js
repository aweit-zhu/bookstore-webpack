import { findAllBooks } from '@/assets/js/book.js';
import { findAllCartItems } from '@/assets/js/cart.js';
import $ from 'jquery';

findAllCartItems().map(bookId => {
    let book = [...findAllBooks()].filter(b => b.id == bookId)[0];
    $('#cartItem-row').before(
      `
        <tr>
            <td class="w-10">${book.id}</td>
            <td class="w-40">${book.name}</td>
            <td class="w-20">1</td>
            <td class="w-20">${book.price}</td>
            <td class="w-20">${book.stockQty}</td>
            <td class="w-30"><button class="btn-success">修改</button></td>
        </tr>
      `
    );
});