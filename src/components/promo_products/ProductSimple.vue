<template>
  <div class="top-margin bottom-margin">
    <table>
      <tr>
        <td class="is-hidden-mobile">
          <div class="card-image">
            <figure class="image">
              <img src="https://bulma.io/images/placeholders/480x480.png" alt="Placeholder image">
            </figure>
          </div>
        </td>
        <td class="is-hidden-tablet">
          <div class="card-image">
            <figure class="image">
              <img src="https://bulma.io/images/placeholders/128x128.png" alt="Placeholder image">
            </figure>
          </div>
        </td>
        <td>
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-6">{{ product.title }}</p>
              </div>
            </div>
            <div class="content is-clearfix">
              <div class="is-pulled-left box1">
                <b-rate v-model="overallRating"
                        :icon-pack="packs"
                        :disabled="isDisabled"
                        size="is-small">
                </b-rate>
              </div>
              <p class="is-pulled-left">
                <span class="title is-6"><strong>&euro; {{ product.price }}</strong></span>
              </p>
            </div>
          </div>
        </td>
      </tr>
    </table>
    
    <router-link
      class="details"
      :to="{
        path: '/product-detail',
        name: 'product-detail-component',
        params: {
          id: product.id,
          title: product.title,
          price: product.price,
          rating: product.ratings,
          reviews: product.reviews,
          category: product.category,
          isAddedBtn: product.isAddedBtn
        }
      }"
    >
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'product-simple',

  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  
  data () {
    return {
      packs: 'fas',
      isDisabled: true,
    };
  },

  computed: {
    overallRating () {
      return this.$store.getters.getOverallRatingProductById(this.product.id);
    },
  },

  methods: {
  },
}
</script>

<style lang="scss" scoped>
  .details {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;

    &:hover {
      border: 1px solid #51bafc;
    }
  }
  .box1 {
    position: relative;
    min-height: 50px;
  }
</style>
