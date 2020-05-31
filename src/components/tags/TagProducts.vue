<template>
  <div class="tags-content">
    <breadcrumbs :items="path" />
    <div class="tags-content__header">
      <h1 class="tags-content__title">{{ tag.title }}</h1>
      <p class="tags-content__description">{{ tag.description }}</p>
    </div>
    <pagination :items="products">
      <template slot="itemsOnPage" slot-scope="{ itemsOnPage: products }">
        <div class="columns is-centered is-multiline">
          <div class="card column is-one-quarter" v-for="product in products" :key="product.id">
            <products :product="product"></products>
          </div>
          <div class="section" v-if="!products.length">
            <p>{{ noProductLabel }}</p>
          </div>
        </div>
      </template>
    </pagination>
  </div>
</template>

<script>
import Breadcrumbs from "../Breadcrumbs";
import Pagination from "../pagination/Pagination";
import Products from "../Products";

export default {
  name: "tag-products-component",

  components: {
    Breadcrumbs,
    Pagination,
    Products
  },

  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },

  data() {
    return {
      noProductLabel: "Not products found by this tag",
      products: []
    };
  },

  computed: {
    tag() {
      return this.$store.getters.getTagById(this.id);
    },

    path() {
      return [
        {
          text: "Home",
          to: { path: "/" }
        },
        {
          text: this.tag.title
        }
      ];
    }
  },

  mounted() {
    this.pseudoLoadPage();
  },

  methods: {
    pseudoLoadPage() {
      const loadingComponent = this.$buefy.loading.open({
        container: this.$refs.loader
      });

      this.$store
        .dispatch("pseudoFetchProductsByTagId", this.id)
        .then(products => {
          this.products = products;
          loadingComponent.close();
        });
    }
  },

  watch: {
    $route(to, from) {
      this.pseudoLoadPage();
    }
  },

  metaInfo() {
    let title = "Tag";
    if (this.tag && this.tag.title) {
      title = this.tag.title;
    }
    return {
      title: `Vuemmerce | ${title}`
    };
  }
};
</script>

<style lang="scss" scoped>
.card {
  margin: 0.75rem;
}
.tags-content {
  padding: 0.75rem;

  &__title {
    font-size: 1.5rem;
  }
}
</style>