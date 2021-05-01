<template>
<div>
  <el-button
      type="primary"
      @click="comment"
  >
    Comment Status
  </el-button>
  <el-table
      :data="orders"
      :loading="loading"
  >
    <el-table-column
        prop="order_id"
        label="Order ID"
    />
    <el-table-column
        prop="order_hash"
        label="Order Hash"
    />
    <el-table-column
        label="Order Data"
    />
    <el-table-column
        label="Status"
    >
      <template slot-scope="scope">
        <span v-if="scope.row.status === 0">PENDING</span>
        <span v-if="scope.row.status === 1">REJECT</span>
        <span v-if="scope.row.status === 2">ACCEPT</span>
      </template>
    </el-table-column>
    <el-table-column
        label="Response"
        prop="crm_resp"
    />
    <el-table-column
        label="Action"
    >
    </el-table-column>
  </el-table>
          <el-button
              type="primary"
              @click="send('all')"
          >Send</el-button>
</div>

</template>

<script>
import axios from "axios";

export default {
  name: "Orders",
  data(){
    return {
      orders: [],
      loading: true
    }
  },
  created() {
    this.getOrders()
  },
  methods: {
    getOrders(){
      axios('http://back.w.crmka.net/api/partners/orders?advertId=321')
          .then(resp => {
            this.orders = resp.data.data
            this.loading = false
          }).catch(err => {
            console.log(err)
      })
    },
    send(id){
      axios({
        url: 'http://back.w.crmka.net/api/partners/send',
        method: 'post',
        data: id
      }).then(resp => {
        console.log(resp)
      }).catch( err => {
        console.log(err)
      })
    },
    comment() {
      axios('http://back.w.crmka.net/api/partners/save-comment').then(resp => {
        console.log(resp)
      }).catch( err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>