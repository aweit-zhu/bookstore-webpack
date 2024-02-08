import { findAllBooks, findAllBookTypes, findBookTypeByTypeName, saveBook, deleteBookById } from "@/assets/js/book.js";
import { Book } from '@/assets/js/data.js';
import $ from 'jquery';

console.info(findAllBooks());
console.info(findAllBookTypes());

let books = findAllBooks();
let bookTypes = findAllBookTypes();


[...books].map(book=> {
    $('tbody').append(
        `
           <tr>
                <td>${book.id}</td>
                <td>
                    ${renderBookType(book)}
                </td>
                <td class="name">
                    <input class="rounded border-2 focus:outline-none focus:border-green-500 p-1" type='text' id="bookName_${book.id}" value="${book.name}" />
                </td>
                <td class="price">
                    <input class="rounded border-2 focus:outline-none focus:border-green-500 p-1 w-full" type='number' id="bookPrice_${book.id}" value="${book.price}" />
                </td>
                <td class="stockQty">
                    <input class="rounded border-2 focus:outline-none focus:border-green-500 p-1 w-full" type='number' id="bookStockQty_${book.id}" value="${book.stockQty}" />
                </td>
                <td class="flex text-nowrap">
                    <button type="button" class="btn-success mx-1 update" data-book-id="${book.id}">更新</button>
                    <button type="button" class="btn-danger mx-1 delete" data-book-id="${book.id}">刪除</button>
                </td>
           </tr>
        `
    );
});

$('.update').on('click',function() {
    let bookId = Number($(this).attr('data-book-id'));
    let typeName = $('#typeName_'+bookId).attr('value');
    let bookName = String($('#bookName_'+bookId).val());
    let bookPrice = Number($('#bookPrice_'+bookId).val());
    let bookStockQty = Number($('#bookStockQty_'+bookId).val());
    let bookType = findBookTypeByTypeName(typeName);
    try {
        let rowUpdated = saveBook(Book.newInstance(bookId,bookType.typeId,bookType.typeName,bookType.color,bookName,bookPrice,bookStockQty));
        if(rowUpdated == 1) {
            alert(`更新成功: ${bookName} (${bookId})`);
        }
    } catch (error) {
        alert(error);
    }
    window.location.reload();
});

$('.delete').on('click',function() {
    let bookId = Number($(this).attr('data-book-id'));
    let bookName = String($('#bookName_'+bookId).val());
    try {
        if(confirm(`確定要刪除 ${bookName}?`)) {
            deleteBookById(bookId);
        }
    } catch (error) {
        alert(error);
    }
    window.location.reload();
});


$('.typeName').on('change',function(event){
    let value = $(event.target).val();
    $(event.target).attr('value',value.toString());
});

/**
 * 
 * @param {Book} book 
 * @returns { string} 
 */
function renderBookType(book) {
    
    let options = "";
    bookTypes.map(bookType => {
        options+= `<option value='${bookType.typeName}' ${book.type.typeName == bookType.typeName ? 'selected': ''}>${bookType.typeName}</option>`;
    });
    
    return `
    <select class="typeName" id="typeName_${book.id}" value='${book.type.typeName}'>
        ${options}
    </select>`;
}