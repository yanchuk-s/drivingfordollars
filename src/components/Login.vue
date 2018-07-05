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
                <v-text-field :rules="passRules" type="password" v-model="user.password" label="Password"></v-text-field>
              </v-flex>
             <v-flex xs12>
                <v-btn
                    @click.prevent="login"
                    v-bind:disabled="showLoader == true"
                    class="submit-btn"
                    >
                    Login
                </v-btn>
                <!-- <fb-signin-button
                class="submit-btn facebook-login"
                    :params="fbSignInParams"
                    @success="onSignInSuccess"
                    @error="onSignInError">
                    Sign in with Facebook
                </fb-signin-button> -->
             </v-flex>
            </v-layout>
          </v-container>
    </v-form>
    </div>
</template>
<script>
    import qs from 'qs'

    export default{
        name: 'Login',
        data(){
            return{
                 fbSignInParams: {
                    scope: 'email,user_likes',
                    return_scopes: true
                },
                user: {
                    email_address: '',
                    password: ''
                },
                access_token: '',
                showLoader: false,
                loader: null,
                loading3: false,
                info: null,
                valid: false,
                email: '',
                pass:'',
                p: false,
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
                ],
                passRules: [
                     v => !!v || 'Password is required',
                ]
            }
        },
        methods:{
            onSignInSuccess (response) {
                var _this = this;
                FB.api('/me', dude => {
                    console.log(response.authResponse.accessToken)
                    this.access_token = response.authResponse.accessToken;
                    this.axios("https://drivingfordollars.com/clients/login/facebook",{
                        method:'POST',
                        data:qs.stringify(this.access_token),
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'X-Requested-With': 'XMLHttpRequest'
                        },
                        withCredentials: true
                    })
                    .then(function (response) {
                        //  _this.$cookie.set('auth_token', response.data.auth_token, 1);
                        //  _this.$router.push('/')
                    })
                    .catch((error) => {
                        _this.$cookie.set('auth_token', _this.access_token, 1);
                         _this.$router.push('/')
                        // this.$toastr('error', 'Enter the correct E-mail and Password', 'Error');
                    })

                })
            },
            onSignInError (error) {
                console.log('OH NOES', error)
            },
            login () {
                this.showLoader = true;
                if(this.valid == true && this.user.email_address != '' && this.user.password != '') {
                    var _this = this;
                    this.axios("https://drivingfordollars.com/clients/login",{
                        method:'POST',
                        data:qs.stringify(this.user),
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'X-Requested-With': 'XMLHttpRequest'
                        },
                        withCredentials: true
                    })
                    .then(function (response) {
                        _this.showLoader = false;
                         _this.$cookie.set('auth_token', response.data.auth_token, 1);
                         _this.$router.push('/')
                    })
                    .catch((error) => {
                         _this.showLoader = false;
                        this.$toastr('error', 'Enter the correct E-mail and Password', 'Error');
                    })
                }else{
                    this.showLoader = false;
                    this.$toastr('error', 'E-mail or Password is required', 'Error');
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

    .facebook-login{
        text-align: center;
        font-size: 16px;
        font-weight: 500;
        padding: 6px 0;
        border-radius: 4px;
        -webkit-box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
        box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
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

