import { orders, orderItems } from '@/assets/js/data.js';
import { getSessionUser } from '@/assets/js/user.js';

export function findOrderByStatus(status) {
    return [...orders]
        .filter(order => order.userId == getSessionUser().id)
        .filter(order => {
            if (status == 0)
                return true;
            return order.status.id == status;
        });
}

export function findOrderItemsByOrderId(orderId) {
    return [...orderItems].filter(orderItem => orderItem.orderId == orderId);
}