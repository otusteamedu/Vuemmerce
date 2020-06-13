<template>
  <div class="container">
    <div class="form-row">
      <input v-model="model.city" id="city" type="text" />
      <label for="city">City</label>
    </div>

    <div class="form-row">
      <input v-model="model.street" id="street" type="text" />
      <label for="street">Street</label>
    </div>

    <div class="form-row">
      <input v-model="model.building" id="building" type="number" />
      <label for="building">Building</label>
    </div>

    <div class="form-row">
      <input v-model="model.apartment" id="apartment" type="number" />
      <label for="apartment">Apartment</label>
    </div>

    <button class="add-button" @click="addAddress">Add</button>

    <div class="address-block">
      <div class="address" v-for="(address, index) in userInfo.addresses" :key="index">
        {{address}}
        <span class="main-address" v-if="index == userInfo.mainAddress">(main)</span>
      </div>
    </div>
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
.container {
  width: fit-content;
  padding: 50px;

  .form-row {
    margin: 5px 0;

    input {
      margin-right: 15px;
      width: 200px;
    }
  }

  .add-button {
    margin-top: 25px;
    margin-bottom: 50px;
  }

  .address {
    .main-address {
      font-weight: bold;
    }
  }
}
</style>