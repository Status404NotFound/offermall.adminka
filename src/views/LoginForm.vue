<template>
  <div class="center">
    <el-card shadow="hover">
      <div slot="header">
        <span>Login Form</span>
      </div>
      <el-form ref="form" label-width="120px">
        <el-form-item label="Username">
          <el-input
              placeholder="Please input your username"
              v-model.trim="username"
          >
            <label>Username</label>
            <small class="helper-text invalid">Username</small>
          </el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input rules="required" placeholder="Please input your password" show-password
                    v-model="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">Login</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>

</template>
<script>
// import { required } from 'vuelidate/lib/validators'
export default {
  // validations: {
  //   username: {required},
  //   password: {required},
  // },
  created() {
    document.title = "CRMKA Login Form"
  },
  data() {
    return {
      username: '',
      password: '',
      errorMassage: '',
      errorCode: '',
    }
  },
  computed: {
    authStatus() {
      return this.$store.getters.authStatus
    },
    authError() {
      return this.$store.getters.authError
    }
  },
  methods: {
    // validateLoginForm() {
    //   if (this.authStatus === "error") {
    //     console.log("Error")
    //     this.errorMassage = this.authError
    //     this.errorCode = this.getStatusCodeByMessage()
    //     if(this.errorCode === "422"){
    //       this.$message({
    //         message: 'Please, check your inputs and try again',
    //         type: 'error'
    //       });
    //     }
    //     if(this.$v.$invalid){
    //       console.log(this.$v)
    //       this.$v.$touch()
    //       this.$message({
    //         message: 'Username and password are required',
    //         type: 'error'
    //       });
    //     }
    //   }
    // },
    getStatusCodeByMessage() {
      if (~this.errorMassage.indexOf("status code 422")) {
        return 422
      }
    },
    login() {
      let username = this.username
      let password = this.password
      this.$store.dispatch('login', {username, password})
          .then(() => {
            this.$router.push('/')
          })
          // .catch(() => {
          //   this.validateLoginForm()
          // })
    }
  }
}
</script>
<style>
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%)
}
</style>