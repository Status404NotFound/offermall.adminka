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
  name: "Affscale",

  data() {
    return {
      activeTab: "",
      tabs: [
        {
          title: "Offers",
          tabUrl: "/partners/affscale/offers",
          tabName: "Affscale Offers",
        },
        {
          title: "Orders",
          tabUrl: "/partners/affscale/orders",
          tabName: "Affscale Orders",
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