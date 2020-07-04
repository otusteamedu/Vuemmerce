<template>
    <div class="container">
        <div
            v-if="allOrders.length === 0"
            class="notification is-warning"
        >You have not ordered anything yet</div>

        <b-table v-else
            :data="allOrders"
            ref="table"
            paginated
            per-page="10"
            detailed
            detail-key="id"
            :show-detail-icon="true">

            <template slot-scope="props">

                <b-table-column field="id" label="Order Id" width="100" numeric>
                    {{ props.row.id }}
                </b-table-column>

                <b-table-column field="createdAt" label="Buy date" sortable centered>
                    {{ props.row.createdAt | formatDate }}
                </b-table-column>

                <b-table-column field="sum" label="Sum" sortable numeric>
                    <span class="tag is-success">{{ props.row.sum | formatCurrency }}</span>
                </b-table-column>

            </template>

            <template slot="detail" slot-scope="props">
                <article class="media">
                    <div class="media-content">
                        <ul>
                            <li v-for="product in props.row.products" :key="product.id">
                                <div class="columns">
                                    <div class="column is-1">
                                    <figure v-if="product.image" class="image is-64x64">
                                        <img :src="product.image.src" :alt="product.image.title">
                                    </figure>
                                    <figure v-else class="image is-64x64">
                                        <img src="https://bulma.io/images/placeholders/64x64.png">
                                    </figure>
                                    </div>
                                    <div class="column">
                                        <router-link :to="{name: 'product-detail-component', params: { id: product.id}}">
                                            {{ products[product.id].title }}
                                        </router-link>
                                        <br>
                                        {{ product.price | formatCurrency }}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </article>
            </template>
        </b-table>

    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { ACTIONS } from '../../store/modules/orders/types';
import moment from 'moment';
import '@mdi/font/css/materialdesignicons.css'
import 'buefy/dist/buefy.css'

export default {
    name: 'MyOrders',
    computed: {
        ...mapGetters(['allOrders', 'getProductsList', 'getProductImages']),
        products() {
            if (!this.allOrders.length || !this.getProductsList.length) {
                return {};
            }

            const products = this.allOrders
                .map(order => order.products)
                .flat(Infinity)
                .map(curProduct => {
                    const product = this.getProductsList.find(
                        ({ id }) => id === curProduct.id
                    );
                    curProduct.image = this.getProductImages(curProduct.id)[0];
                    return Object.assign({ title: product.title }, curProduct);
                })
                .map(product => [product.id, product]);

            return Object.fromEntries(products);
        }
    },
    methods: {
        ...mapActions([ACTIONS.FETCH_ALL])
    },
    created() {
        if (this.allOrders.length === 0) {
            this[ACTIONS.FETCH_ALL]();
        }
    },
    filters: {
        formatDate: function (value) {
            if (!value) return '';
            return moment(String(value)).format('DD MMM YYYY HH:mm');
        },
        formatCurrency: function (value) {
            if (typeof value !== "number") return value;
            const formatter = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'EUR'});
            return formatter.format(value);
        }
    }
};
</script>