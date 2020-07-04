import { orders } from './initial-state.json';

const db = {
    getOrders: () => Promise.resolve([...orders]),
    create: payload => {
        const newOrder = {
            id: orders.length + 1,
            createdAt: (new Date()).toISOString(),
            products: [],
            ...payload
        };
        orders.push(newOrder);
        return newOrder;
    }
};

export default db;