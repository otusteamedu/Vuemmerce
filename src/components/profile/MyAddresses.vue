<template>
  <div class="container">
    <form @submit="addAddress">
      <input v-model="model.city" id="city" type="text" />
      <label for="city">City</label>

      <input v-model="model.street" id="street" type="text" />
      <label for="street">Street</label>

      <input v-model="model.building" id="building" type="number" />
      <label for="building">Building</label>

      <input v-model="model.apartment" id="apartment" type="number" />
      <label for="apartment">Apartment</label>

      <button type="submit">Add</button>
    </form>

    <div class="address" v-for="(address, index) in userInfo.addresses" :key="index">{{address}}</div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "MyAddresses",
  data() {
    return {
      model: {
        city: "",
        street: "",
        building: 0,
        apartment: 0
      }
    };
  },
  computed: mapState(["userInfo"]),
  methods: {
    addAddress() {
      if (
        this.model.city &&
        this.model.street &&
        this.model.building &&
        this.model.apartment
      ) {
        this.$store.commit(
          "addUserAddress",
          `${this.model.building} ${this.model.street} apt. ${this.model.apartment}, ${this.model.city}`
        );
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>