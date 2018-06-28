<template>
    <div>
        <div class="login-header">
            Please log in to continue        
        </div>
    
    <v-form v-model="valid">
        <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field :rules="emailRules" v-model="user.email_address" label="Email address"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field type="password" v-model="user.password" label="Password"></v-text-field>
              </v-flex>
             <v-flex xs12>
                <!-- <v-btn class="submit-btn" @click.prevent="login">Login</v-btn> -->

                <v-btn
                    @click.prevent="login"
                    class="submit-btn"
                    :loading="loading3"
                    :disabled="loading3"
                    @click.native="loader = 'loading3'"
                    >
                    Login
                </v-btn>

             </v-flex>
            </v-layout>
          </v-container>
    </v-form>
    </div>
</template>
<script>
    export default{
        name: 'Login',
        data(){
            return{
                user: {
                    email_address: '',
                    password: ''
                },
                loader: null,
                loading3: false,
                info: null,
                valid: false,
                email: '',
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
                ]
            }
        },
        watch: {
            loader () {
                const l = this.loader
                this[l] = !this[l]

                setTimeout(() => (this[l] = false), 3000)

                this.loader = null
            }
        },
        methods:{
            login () {
                if(this.valid == true){
                    this.$cookie.set('test', true, 1);
                    this.$router.push('/')
                    this.axios.post("https://drivingfordollars.com/clients/login", this.user)
                    .then(response => {console.log(response)})
                }
            }
        }
    }
</script>

<style lang="scss">
    .login-header{
        padding: 20px 0;
        text-align: center;
        border-bottom: 1px solid #ccc;
        font-size: 20px;
        margin-bottom: 30px;
        color: #999;
    }
    .submit-btn{
        background-color: #2196f3;
        color: #fff;
        height: auto;
        z-index: 0;
        width: 100%;
        margin: 10px 0;
    }

    .input-group__input input{
        border-bottom: 1px solid #ccc;
    }

    .input-group__details:after{
        background-color: #3b84d6;
    }

     .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

</style>

