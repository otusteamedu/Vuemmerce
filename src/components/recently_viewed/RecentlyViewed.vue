<template>
  <div
    v-if="isLoaded && recentlyViewedProducts.length === 3"
    class="recently-viewed"
  >
    <h3>Недавно просмотренные товары</h3>

    <span
      @click="clearHistory"
      class="clear"
    >
      Очистить историю
    </span>

    <div class="products">
      <div
        v-for="product in recentlyViewedProducts"
        :key="product.id"
        class="product"
      >
        <div class="title">
          {{ product.title }}
        </div>

        {{ product.description }}

        <router-link
          :to="{ name: 'product-detail-component', params: { id: product.id }}"
          class="card-link"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'recently-viewed-component',

  data () {
    return {
      isLoaded: false,
      recentlyViewedProducts: [],
    };
  },

  mounted() {
    this.$store.dispatch('pseudoFetchViewedProducts')
      .then(products => {
        this.recentlyViewedProducts = products;
        this.isLoaded = true;
      })
      .catch(error => {
        console.log(error);
        this.isLoaded = true;
      });
  },

  methods: {
    clearHistory: function () {
      this.$store.dispatch('clearViewedProducts');
      this.recentlyViewedProducts = [];
    },
  },
};
</script>

<style lang="scss" scoped>
  .recently-viewed {
    position: relative;
    margin: 40px 1.5rem;
  }

  h3 {
    color: #363636;
    font-size: 20px;
  }

  .clear {
    position: absolute;
    right: 0;
    top: 4px;
    cursor: pointer;

    &:hover {
      color: #363636;
    }

    @media (max-width: 500px) {
      position: inherit;
    }
  }

  .products {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 8px 0 18px;

    .product {
      position: relative;
      box-sizing: border-box;
      width: 30%;
      padding: 16px 12px;
      margin: 12px 0;
      background: #fff;
      border: 1px solid #fff;
      box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);

      &:hover {
        border: 1px solid #51bafc;
      }

      @media (max-width: 500px) {
        width: 100%;
      }

      .title {
        margin: 0 0 12px;
        font-size: 16px;
        font-weight: bold;
      }

      a {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
      }
    }
  }
</style>
