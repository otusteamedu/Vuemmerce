<template>
  <div ref="loader" class="top-margin bottom-margin">
    <div class="title is-4">
      Promoted products
    </div>
    <pagination-component :items="products" :grid="3" :grid-is-constant="true">
      <template slot="itemsOnPage"
                slot-scope="{ itemsOnPage: products }">
        <div class="columns is-centered is-multiline">
          <div class="card column is-one-quarter"
               v-for="product in products"
               :key="product.id">
            <product-simple :product="product"></product-simple>
          </div>
          <div class="section" v-if="products.length === 0">
            <p>{{ noProductLabel }}</p>
          </div>
        </div>
      </template>
    </pagination-component>
  </div>
</template>

<script>
import ProductSimple from './ProductSimple';
import PaginationComponent from '../pagination/Pagination';

export default {
  name: 'promo-products',

  components: {
    ProductSimple,
    PaginationComponent,
  },

  data () {
    return {
      noProductLabel: 'Come here later to see our promoted products.',
      products: [],
    };
  },

  mounted() {
    this.pseudoLoadingPage();
  },

  watch: {
    $route(to, from) {
      this.pseudoLoadingPage();
    }
  },

  methods: {
    pseudoLoadingPage() {
      this.$store.dispatch('pseudoFetchPromoProducts')
        .then(products => this.products = products);
    }
  },
};
</script>

<style lang="scss" scoped>
  .top-margin {
    margin-top: 10px;
  }
  .bottom-margin {
    margin-bottom: 10px;
  }
  .card {
    margin: 10px;
  }
  .title {
    text-align: center;
  }
</style>
