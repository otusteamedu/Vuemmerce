<template>
  <div class="section">
    <h3 class="title">Recently viewed</h3>
    <div class="columns is-centered is-multiline">
      <div class="card column is-one-quarter" v-for="product in products" :key="product.id">
        <products-component :product="product"></products-component>
      </div>
      <div class="section" v-if="products.length === 0">
        <p>{{ noProductLabel }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import ProductsComponent from "../Products";
export default {
  name: "recently-viewed",
  components: {
    "products-component": ProductsComponent
  },
  data() {
    return {
      id: "",
      noProductLabel: "No product found",
      productsFiltered: []
    };
  },
  created() {
    if (
      localStorage.getItem("viewedProducts") !== null &&
      this.$store.state.viewedProductsArr.length === 0
    ) {
      let arr = localStorage.getItem("viewedProducts").split(",");
      for (let item of arr) {
        if (this.repeatedItem(item) === false) {
          this.$store.commit("changeViewedProductsArr", parseInt(item));
        }
      }
    }
  },
  computed: {
    products() {
      let viewedProducts = [];
      const passports = this.$store.state.products.map(products => {
        if (
          products.id === this.$store.state.viewedProductsArr[0] ||
          products.id === this.$store.state.viewedProductsArr[1] ||
          products.id === this.$store.state.viewedProductsArr[2]
        ) {
          viewedProducts.push(products);
        }
      });
      return viewedProducts;
    }
  },
  methods: {
    repeatedItem(item) {
      let viewedProductsArr = this.$store.state.viewedProductsArr;
      for (let i = 0; i < viewedProductsArr.length; i++) {
        if (viewedProductsArr[i] === parseInt(item)) {
          return true;
        }
      }
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
  text-transform: capitalize;
}
.card {
  margin: 10px;
}
</style>


