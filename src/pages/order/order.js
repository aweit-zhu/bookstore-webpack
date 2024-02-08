import { toggleModal } from "@/assets/js/util.js";
import { findBookById } from "@/assets/js/book.js";
import { findOrderByStatus, findOrderItemsByOrderId } from "@/assets/js/order.js";
import $ from 'jquery';

$(document).ready(function () {
  $("#status button").click(function () {
    $("#status button").addClass("bg-gray-400");
    $(this).toggleClass("bg-gray-400");
    let status = $(this).attr("data-id"); // 1:全部,2:待出貨,3:已出貨,4:已到門市
    clickStatucBtn(status);
  });

  clickStatucBtn(0); // 訂單查詢(全部)

  $("#close,#overlay").click(function (event) {
    toggleModal();
  });
});

function clickStatucBtn(status) {
  $("#order tr").remove();
  findOrderByStatus(status).map((order) => {
    let tr = `
                    <tr>
                        <td>${order.orderId}</td>
                        <td>${order.orderTime}</td>
                        <td>${order.totalPrice}</td>
                        <td><button class='btn-primary text-nowrap btn-order-detail' data-orderId='${order.orderId}'>詳細資訊</button></td>
                        <td>${order.totalQty}</td>
                        <td>${order.status.name}</td>
                    </tr>
                `;
    $("#order").append(tr);
  });

  $(".btn-order-detail").click((event) => clickOrderDetailBtn(event));
}

function clickOrderDetailBtn(event) {
  $("#orderItem tr").remove();
  let orderId = event.target.getAttribute("data-orderId");
  findOrderItemsByOrderId(orderId).map((orderItem) => {
    $("#orderItem").append(
      `
                        <tr>
                            <td><img src="${findBookById(
                              orderItem.bookId
                            ).getImageUrl()}"/></td>
                            <td>${findBookById(orderItem.bookId).name}</td>    
                            <td>${orderItem.price}</td>    
                            <td>${orderItem.qty}</td>    
                            <td>${orderItem.total}</td>    
                            <td>${orderItem.status.name}</td>    
                        </tr>
                        `
    );
  });
  toggleModal();
}
