<template>
  <div>
    <el-container style="height: 100vh">
      <el-aside style="height: 100vh" width="50">
        <el-menu
            class="el-menu-vertical-demo"
            :default-active="$route.path"
            :router="true"
            :collapse="isCollapse"
            style="height: 100vh"
            background-color="rgb(67,74,80)"
            active-text-color="#46c5de"
            text-color="#fff"
        >
          <!-- #545c64    #ffd04b-->
          <div class="el-menu-head el-menu-logo">
          </div>
          <div v-bind:class="{ collapse: isCollapse }" class="el-menu-head">
            <router-link to="/profile" class="el-menu-head-avatar">
              <p>{{ this.$store.getters.username }}</p>
            </router-link>
          </div>
          <div v-for="menuItem in menu" :key="menuItem.title">
            <div v-if="menuItem.sub">
              <el-submenu index="sub">
                <template slot="title">
                  <i :class="menuItem.className"></i>
                  <span v-if="!isCollapse">{{ menuItem.title }}</span>
                </template>
                <div
                    v-for="subMenuItem in menuItem.sub"
                    :key="subMenuItem.title"
                >
                  <el-menu-item-group>
                    <div v-if="subMenuItem.url">
                      <el-menu-item
                          class="sub-menu-item"
                          :index="subMenuItem.url"
                      >{{ subMenuItem.title }}
                      </el-menu-item>
                    </div>
                  </el-menu-item-group>
<!--                  <div v-if="subMenuItem.sub">-->
<!--                    <el-submenu index="subSub">-->
<!--                      <template slot="title">-->
<!--                        <span class="sub-menu-title" v-if="!isCollapse">{{-->
<!--                            subMenuItem.title-->
<!--                          }}</span>-->
<!--                      </template>-->
<!--                      <div-->
<!--                          v-for="subSubMenuItem in subMenuItem.sub"-->
<!--                          :key="subSubMenuItem.title"-->
<!--                      >-->
<!--                        <el-menu-item-group>-->
<!--                          <el-menu-item-->
<!--                              style="text-align: center"-->
<!--                              class="sub-menu-item"-->
<!--                              :index="subSubMenuItem.url"-->
<!--                          >{{ subSubMenuItem.title }}-->
<!--                          </el-menu-item>-->
<!--                        </el-menu-item-group>-->
<!--                      </div>-->
<!--                    </el-submenu>-->
<!--                  </div>-->
                </div>
              </el-submenu>
            </div>
            <div v-else>
              <el-menu-item :index="menuItem.url">
                <i :class="menuItem.className"></i>
                <span v-bind:class="{ collapse: isCollapse }">{{
                    menuItem.title
                  }}</span>
              </el-menu-item>
            </div>
          </div>
        </el-menu>
      </el-aside>
      <el-container style="height: 100%">
        <el-header height="100">
          <div class="el-header-wrapper">
            <div>
              <a
                  href="#"
                  class="el-default-link"
                  v-on:click.prevent="toggleMenuButton"
              >
                <i class="el-icon-menu"></i>
              </a>
              <h1 class="el-header-title">
                {{ getPageTitle($route.params.filter) || $route.name }}
              </h1>
            </div>
          </div>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Admin",
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
    username: function () {
      return this.$store.getters.username;
    },
  },
  data() {
    return {
      menu: [
        {
          title: "Payments",
          className: "el-icon-s-cooperation menu-item",
          url: "/payments",
        },
        {
          title: "Partners",
          className: "el-icon-s-marketing menu-item",
            sub: [
              {
                title: "MyLandCRM",
                url: "/partners/my-land-crm",
              },
              {
                title: "RetailCRM",
                url: "/partners/retail-crm",
              },
              {
                title: "Affscale",
                url: "/partners/affscale",
              },
            ]
        },
        // {
        //   title: "Flows",
        //   className: "el-icon-guide menu-item",
        //   url: "/flows",
        // },
        // {
        //   title: "Integration",
        //   className: "el-icon-key menu-item",
        //   sub: [
        //     {
        //       title: "Api",
        //       url: "/integration/api",
        //     },
        //     {
        //       title: "Form",
        //       url: "/integration/form",
        //     },
        //     {
        //       title: "Domains",
        //       url: "/integration/domains",
        //     },
        //     {
        //       title: "Postback",
        //       sub: [
        //         {
        //           title: "Individual",
        //           url: "/integration/postback/individual",
        //         },
        //         {
        //           title: "Global",
        //           url: "/integration/postback/global",
        //         },
        //       ],
        //     },
        //   ],
        // },
        // {
        //   title: "Orders",
        //   className: "el-icon-takeaway-box menu-item",
        //   url: "/orders",
        // },
        // {
        //   title: "Finance",
        //   className: "el-icon-bank-card menu-item",
        //   url: "/finance",
        // },
      ],
      isCollapse: false,
    };
  },

  created() {
    document.title = this.$route.name;
    if (this.isLoggedIn) {
      let token = this.$store.state.token;
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.interceptors.response.use(
          (response) => response,
          (error) => {
            const { status } = error.response;
            if (status === 401) {
              this.logout();
            }
            return Promise.reject(error);
          }
      );
    } else {
      this.logout();
    }
  },

  methods: {
    logout: function () {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    },
    getPageTitle(filter) {
      switch (filter) {
        case "daily":
          return "Statistic by days";
        case "hourly":
          return "Statistics by hours";
        case "offer":
          return "Statistic by offers";
        case "flow":
          return "Statistic by flows";
        case "sub":
          return "Statistic by sub";
        case "sku":
          return "Delivery sku";
        case "offers-live":
          return "Offers live";
        case "geo-live":
          return "Geo live";
      }
    },
    toggleMenuButton() {
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
}

.collapse {
  display: none;
}

.el-menu-head {
  margin: 20px;
  text-align: center;
}

.el-menu--collapse .el-menu-logo {
  display: none;
}

.el-menu-logo {
  margin-bottom: 50px;
}

.el-menu-logo img {
  max-width: 100%;
  height: auto;
}

.el-menu-head-avatar {
  display: inline-block;
  color: white;
}

.header-item {
  display: inline-flex;
  /*margin-right: 50px;*/
  margin-left: 25px;
}

.menu-item {
  font-size: 2rem;
}

.el-menu-item,
.el-submenu__title {
  font-size: 14px;
  height: 45px;
  line-height: 16px;
  display: flex;
  align-items: center;
}

.el-submenu .sub-menu-item {
  margin-left: 0;
  font-size: 16px;
  height: 40px;
  line-height: 40px;
  list-style-type: none !important;
}

.sub-menu-title {
  text-align: center;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
}
</style>