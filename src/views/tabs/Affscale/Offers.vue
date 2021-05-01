<template>
  <div>
    <OffersTable advert="321" />
  </div>
</template>

<script>
import OffersTable from "../../../components/OffersTable";

export default {
  name: "Offers",
  components: {OffersTable},

  methods: {
  }
}
</script>

<style scoped>
.header_item {
  margin: 10px;
}
</style>