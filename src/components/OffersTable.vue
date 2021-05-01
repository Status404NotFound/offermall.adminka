<template>
<div>
  <el-table
      :data="offers"
      border
  >
    <el-table-column
        prop="offer_id"
        label="Offer ID"
        width="80"
    />
    <el-table-column
        prop="offer_name"
        label="Offer Name"
        width="180"
    />
    <el-table-column
        label="Offer Image"
        width="180"
    >
      <template slot-scope="scope">
        <el-image style="width: 150px" v-if="scope.row.img !== ''" :src="scope.row.img" lazy/>
        <el-image v-else lazy>
          <div slot="error" class="image-slot">
            <i style="font-size: 10rem" class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </template>
    </el-table-column>
    <el-table-column
        label="Offer Status"
        width="180"
    >
      <template slot-scope="scope">
          <span v-if="scope.row.offer_status === 1">
            On air
          </span>
        <span v-if="scope.row.offer_status === 0">
            On pause
          </span>
        <span v-if="scope.row.offer_status === 10">
            Archived
          </span>
      </template>
    </el-table-column>
    <el-table-column
        label="Geo"
        width="180"
    >
      <template slot-scope="scope">
        <ul v-for="geo in scope.row.geo" :key="geo.geo_id">
          <li>{{ geo.geo_iso + '_' + geo.geo_name }}</li>
        </ul>
      </template>
    </el-table-column>
    <el-table-column
        label="Slug"
    >
      <template slot-scope="scope">
        <el-input label="test" v-model="scope.row.partner_offer_hash"/>
        <el-button style="margin: 10px" type="primary" @click="saveSlug(scope.row)">Save</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "OffersTable",
  props: ['advert'],
  data() {
    return {
      offers: [],
      loading: true,
    }
  },
  created() {
    this.updateTable();
  },
  methods: {
    updateTable() {
      axios('http://back.w.crmka.net/api/partners/offers?advertID='+this.advert).then(resp => {
        this.offers = resp.data.data;
      })
    },
    saveSlug(offer) {
      delete offer.img
      offer.slug = offer.partner_offer_hash
      axios({
        url: 'http://back.w.crmka.net/api/partners/save-slug',
        method: 'post',
        data: offer
      }).then(() => {
        this.updateTable()
      }).catch(err => {
        console.log(err)
      })
    },
  }
}
</script>

<style scoped>

</style>