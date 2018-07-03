<template>
    <div>
        <div class="list-item">
            <div class="list-header">
                <div class="list-header-top">
                    <div class="left-side" @click="showLists">
                        <!-- <div class="count-list">{{count}}, {{listId}}</div> -->
                        <div class="list-title">{{title}}, {{listId}}</div>
                    </div>
                    <div class="right-side">
                        <div class="add-user">
                            <button @click="addUser = !addUser"><i class="fas fa-plus"></i></button>
                        </div>
                        <div class="sort-link">
                            <a href=""><i class="fas fa-sort"></i></a>
                        </div>
                        <div class="delete-list">
                            <button @click="deletelist(listId)"><i class="fas fa-times"></i></button>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="add-user-form" v-if="addUser">
                        <form>
                            <v-text-field 
                            v-model="user.name"
                            :rules="nameRulers"
                            label="Client Name">
                            </v-text-field>
                             <v-text-field 
                             v-model="user.phone"
                            :rules="phoneRulers"
                            label="Client Phone">
                            </v-text-field>
                             <v-text-field 
                             v-model="user.address"
                            :rules="addressRulers"
                            label="Client Address">
                            </v-text-field>
                            <v-btn @click="addClient" class="submit-btn add-btn">Save</v-btn>
                        </form>
                    </div>
                </div>
            </div>
            <div class="list-body" v-if="showList">
                <div class="user-list">
                    <v-container fluid grid-list-xl class="user-list-header">
                        <v-layout row justify-space-between >
                            <v-flex xs3>
                                <div class="user-name-header">
                                    Name
                                </div>
                            </v-flex>
                            <v-flex xs3>
                                <div class="user-phone-header">
                                    Phone
                                </div>
                            </v-flex>
                            <v-flex xs3>
                                <div class="user-address-header">
                                    Address(*)
                                </div>
                            </v-flex>
                            <v-flex xs3>
                                
                            </v-flex>
                        </v-layout>
                    </v-container>

                    <v-container fluid grid-list-xl class="user-item" v-for="(user, i) in users" :key="user.id">
                        <v-layout row justify-space-between class="user-info"  >
                            <v-flex xs3>
                                 <div class="user-name">
                                    {{user.name}}
                                </div>
                            </v-flex>
                            <v-flex xs3>
                                <div class="user-phone">
                                    {{user.phone}}
                                </div>
                            </v-flex>
                            <v-flex xs3>
                                <div class="user-address">
                                    {{user.address}}
                                </div>
                            </v-flex>
                            <v-flex xs3>
                                <div class="user-btn">
                                    <div class="btn-p">
                                        P
                                    </div>
                                    <div class="user-link">
                                        <a href=""><i class="fas fa-sort"></i></a>
                                    </div>
                                    <div class="user-delete">
                                        <button @click="deleteClient(i)"><i class="fas fa-times"></i></button>
                                    </div>
                                </div>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import GLOBAL from './GLOBAL';
    export default{
        name: 'ListItem',
        props: {
          title: {
              type: String
          },
          count:{
              type: Number
          },
          id:{
              type: Number
          },
          users:{
              type: Array
          },
          listId: {
              type: String
          }
        },
        data(){
            return{
                user: [],
                showList:false,
                addUser:false,
                valid: false,
                nameRulers: [
                    v => !!v || 'enter the name'
                ],
                phoneRulers: [
                    v => !!v || 'enter the phone'
                ],
                addressRulers: [
                    v => !!v || 'enter the address'
                ]
            }
        },
        methods: {
            showLists(){
                this.showList = !this.showList;

                this.axios.get("https://drivingfordollars.com/contacts/marketing_list/"+this.listId)
                .then(function (response) {
                    console.log(response.data);
                    _this.lists = response.data;

                })
                
            },
            deletelist(index){
                GLOBAL.deleteList(index)
            },
            addClient(){
                if(this.user.name != undefined && this.user.phone != undefined && this.user.address != undefined){
                    GLOBAL.addUser(this.id,this.user.name,this.user.phone,this.user.address)
                    this.user.name = undefined;
                    this.user.phone = undefined;
                    this.user.address = undefined;
                }
                
            },
            deleteClient(id){
                GLOBAL.deleteUser(this.id,id)
            }
        }
    }
</script>

<style lang="scss">
    .list-item{
       border-bottom: 1px solid #ccc; 
        margin-top: 1px;
    }

    .add-user-form{
        border-top: 1px solid #ccc;
        border-right: 1px solid #ccc;
        border-left: 1px solid #ccc;
        padding: 0 20px;
    }

    .list-header-top{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0;
        border: 1px solid #ccc;
        border-bottom: none;
        .add-user-form{
            width: 100%;
        }
        .left-side{
            display: flex;
            align-items: center;
            width: 50%;
            cursor: pointer;
        }
        .right-side{
            display: flex;
            align-items: center;
        }
        .count-list{
            display: flex;
            width: 41px;
            height: 40px;
            align-items: center;
            justify-content: center;
            border-right: 1px solid #ccc;
        }

        .list-title{
            padding-left: 20px;
            font-size: 18px;
            font-weight: 600;
        }

        .add-user button{
            display: flex;
            width: 40px;
            height: 40px;
            align-items: center;
            justify-content: center;
            outline: none;
        }

        .sort-link a{
            display: flex;
            width: 40px;
            height: 40px;
            align-items: center;
            justify-content: center;
            text-decoration: none;
        }

        .delete-list button{
            display: flex;
            width: 40px;
            height: 40px;
            align-items: center;
            justify-content: center;
            outline: none;
        }
    }
    .list-body{
        border-right: 1px solid #ccc;
        border-left: 1px solid #ccc;
        border-top: 1px solid #ccc;
        .user-list-header{
            display: flex;
            align-items: center;
            border: 1px solid #eee;
            padding: 0;
            .user-name-header{
                font-size: 16px;
                font-weight: 600;
                border-right: 1px solid #eee;
                text-align: center;
                padding: 10px 0;
            }
            .user-phone-header{
                font-size: 16px;
                font-weight: 600;
                border-right: 1px solid #eee;
                text-align: center;
                padding: 10px 0;
            }
            .user-address-header{
                font-size: 16px;
                font-weight: 600;
                border-right: 1px solid #eee;
                text-align: center;
                padding: 10px 0;
            }
        }
        .user-item{
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-left: 1px solid #eee;
            border-right: 1px solid #eee;
            border-bottom: 1px solid #eee;
            padding: 0;
            .user-info{
                display: flex;
                align-items: center;
                width: 100%;
                .user-name{
                    text-align: center;
                }
                 .user-phone{
                    text-align: center;
                }
                 .user-address{
                    text-align: center;
                }
            }
            .user-btn{
                display: flex;
                justify-content: flex-end;
                .btn-p{
                    display: flex;
                    width: 40px;
                    height: 40px;
                    align-items: center;
                    justify-content: center;
                    border-right: 1px solid #ccc;
                    border-left: 1px solid #ccc;
                    outline: none;
                }
                .user-link a{
                    display: flex;
                    width: 40px;
                    height: 40px;
                    align-items: center;
                    justify-content: center;
                    border-right: 1px solid #ccc;
                    text-decoration: none;
                }

                .user-delete button{
                    display: flex;
                    width: 40px;
                    height: 40px;
                    align-items: center;
                    justify-content: center;
                    outline: none;
                } 
            }
        }
    }
</style>
