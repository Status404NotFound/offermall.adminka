<template>
  <div>
    <el-tabs
        v-model="activeTab"
        type="border-card"
        @tab-click="handleClick"
    >
      <el-tab-pane
          v-for="tab in tabs"
          :key="tab.tabName"
          :name="tab.tabName"
          :label="tab.title"
          :disabled="disableActive(tab)"
      />
      <router-view v-show="activeTab"/>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "MyLandCRM",

  data() {
    return {
      activeTab: "",
      tabs: [
        {
          title: "Offers",
          tabUrl: "/partners/my-land-crm/offers",
          tabName: "MyLandCRM Offers",
        },
        {
          title: "Orders",
          tabUrl: "/partners/my-land-crm/orders",
          tabName: "MyLandCRM Orders",
        },
      ],
    }
  },
  methods: {
    handleClick(obj) {
      this.$router.push({name: obj.$vnode.key});
    },
    disableActive(tab) {
      return tab.tabName === this.activeTab;
    },
  }
}
</script>

<style scoped>

</style>