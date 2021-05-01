<template>
  <div>
    <el-button type="primary" @click="transferPayment()">Transfer Payment</el-button>
    <el-row>
      <el-col :span="12">
        <el-card
            class="box-card"
            shadow="hover"
        >
          <div slot="header" class="clearfix">
            <span>Pending orders</span>
          </div>
          <el-table
              :data="paymentOrders"
              :loading="loading"
          >
            <el-table-column
                prop="wm_checkout_id"
                label="ID"
                width="50"
            >
            </el-table-column>
            <el-table-column
                prop="wm_username"
                label="Username"
            >
            </el-table-column>
            <el-table-column
                prop="amount"
                label="Amount"
            >
            </el-table-column>
            <el-table-column
                prop="comment"
                label="Comment"
            >
            </el-table-column>
            <el-table-column
                prop="created_at"
                label="Date"
            >
            </el-table-column>
            <el-table-column
                label="Action">
              <template slot-scope="scope">
                <el-button style="display: block;margin-left: auto;margin-right: auto"
                           @click="changeToPaidOut(scope.row)" :disabled="scope.row.status === 1" size="small"
                           type="success" round>PAID OUT
                </el-button>
                <el-button style="display: block;margin-left: auto;margin-right: auto"
                           @click="changeToRejected(scope.row)" :disabled="scope.row.status === 2" size="small"
                           type="danger" round>REJECTED
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card
            class="box-card"
            shadow="hover">
          <div slot="header" class="clearfix">
            <span>Processed orders</span>
          </div>
          <el-table
              :data="donePaymentOrders"
              :loading="loading"
          >
            <el-table-column
                prop="wm_checkout_id"
                label="ID"
                width="50"
            >
            </el-table-column>
            <el-table-column
                prop="wm_username"
                label="Username"
            >
            </el-table-column>
            <el-table-column
                prop="amount"
                label="Amount"
            >
            </el-table-column>
            <el-table-column
                prop="comment"
                label="Comment"
            >

            </el-table-column>
            <el-table-column
                label="Status"
            >
              <template slot-scope="scope">{{ getStatusName(scope.row.status) }}</template>
            </el-table-column>
            <el-table-column
                prop="created_at"
                label="Created at"
            >
            </el-table-column>
            <el-table-column
                prop="updated_at"
                label="Updated at"
            >
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import axios from "axios";

export default {
name: "Payment",
  data() {
    return {
      loading: true,
      paymentOrders: [],
      donePaymentOrders: []
    }
  },
  mounted() {
  this.getTableData()
  },
  methods: {
    transferPayment(){
      axios({
        url: 'http://back.w.crmka.net/wm_api/finance/translate'
      }).then(resp => {
        console.log(resp.data)
      })
    },
    changeToPaidOut(payOrd) {
      axios({
        url: 'http://back.w.crmka.net/api/orders/change-payment-status',
        method: 'post',
        data: {
          id: payOrd.wm_checkout_id,
          newStatus: 1
        }
      }).then(() => {
        this.getTableData();
        this.loading = false;
      })
    },
    changeToRejected(payOrd) {
      axios({
        url: 'http://back.w.crmka.net/api/orders/change-payment-status',
        method: 'post',
        data: {
          id: payOrd.wm_checkout_id,
          newStatus: 2
        }
      }).then(() => {
        this.getTableData();
        this.loading = false;
      })
    },
    getStatusName(statusId) {
      switch (statusId) {
        case 0:
          return 'PROCESSING';
        case 1:
          return 'PAID OUT';
        case 2:
          return 'REJECTED';
      }
    },
    getTableData() {
      let urlPayment = 'http://back.w.crmka.net/api/orders/payment'
      let urlDonePayment = 'http://back.w.crmka.net/api/orders/done-payment'

      const promisePayment = axios.get(urlPayment)
      const promiseDonePayment = axios.get(urlDonePayment)
      axios.all([promisePayment, promiseDonePayment]).then(resp => {
        this.paymentOrders = resp[0].data.data
        this.donePaymentOrders = resp[1].data.data
        this.loading = false;
      })
    },
  }
}
</script>

<style scoped>

</style>