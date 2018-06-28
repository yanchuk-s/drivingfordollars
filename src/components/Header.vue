<template>
  <v-toolbar dark color="primary">
      <v-container>
           <v-menu offset-y>
                  <v-toolbar-side-icon slot="activator"></v-toolbar-side-icon>
                <v-list>
                   <ul>
                       <li>
                           <router-link  class="drop-link" to="/">Home</router-link
                       </li>
                       <li>
                           <router-link class="drop-link" to="/list">Lists Contact (Email Link)</router-link>
                       </li>
                       <li>
                           <router-link class="drop-link" to="/topup">Top-up</router-link>
                       </li>
                       <li>
                           <a @click="logout" class="drop-link" to="/">Sign Out </a>
                       </li>
                   </ul>
                </v-list>
            </v-menu>
        <div class="title">
            <h1>{{title}}</h1>
        </div>
      </v-container>
  </v-toolbar>
</template>

<script>
    export default {
        name: 'Header',
        props: {
          title: {
              type: String
          }  
        },
        data(){
            return{
                burgerNav: false
            }
        },
        methods: {
            changeTitle(page){
                this.$router.push(page)
            },
            logout(){
                this.$cookie.delete('test');
                this.headerTitle = 'Login'
                this.$router.push('/login')
            }
        }
    }
</script>


<style lang="scss">
    .toolbar{
        background-color: #1867c0;
        border: 1px solid #1867c0;
        position: fixed;
        z-index: 99999;
        .menu{
            position: initial;
            .menu__content{
                width: 100%!important;
                left: 0!important;
                top: 65px!important;
            }
        }
        .menu__activator{
            position: absolute;
            top: 10px;
            .btn__content{
                i{
                    font-size: 40px;
                }
            }
        }
        .title{
            text-align: center;
            width: 100%;
            h1{
                color: #fff;
            }
        }
        .btn-burger {
            position: absolute;
            top: 20px;
           a{
            text-decoration: none;
                i{
                    font-size: 40px;
                }
            } 
        }
        
        .toolbar__content{
            min-height: 56px;
            height: auto!important;
            .list{
                background-color: #fff;
                ul li .drop-link{
                display: block;
                padding: 10px;
                color: #000;
                text-decoration: none;
                cursor: pointer;
                    &:hover{
                        background-color: rgba(0,0,0,0.1);
                        text-decoration: none;
                    }
                }
            }
        }
        .burger-nav ul{
            list-style: none;
            margin-top: 20px;
        }

        .burger-nav ul li a{
            display: block;
            width: 100%;
            padding: 10px 0;
            border-top: 1px solid #eee;
            color: #fff;
            text-decoration: none;
        }
        .container{
            position: relative;
            // margin-top: -25px;
            display: flex;
            align-items: center;
        }
    }

    @media only screen and (max-width: 600px){
        .toolbar{
            .menu__activator{
                top: 20px;
            }
        }
    }

</style>

