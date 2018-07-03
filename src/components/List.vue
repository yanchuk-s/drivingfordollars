<template>
    <div>
        <div class="list-section-header">
            <div>
                <h1>List</h1>
            </div>
            <div class="add-list">
                <v-btn class="submit-btn add-btn" @click="addShow = !addShow">Add List</v-btn>
            </div>
        </div>

        <div class="add-list-form" v-if="addShow">
            <form>
                <v-text-field 
                v-model="lists.title"
                :rules="emailRules"
                label="List Title">
                </v-text-field>
                <v-btn @click="addList" class="submit-btn add-btn">Save</v-btn>
            </form>
        </div>
        
        <div class="list-section">
            <div>
                <ListItem
                    v-for="(list, i) in lists" :key="list.id" 
                    :title="list.name"
                    :count="i+1"
                    :id="i"
                    :listId="list.uuid"
                    :users="list.users"
                >
                </ListItem>
            </div>
        </div>
    </div>
</template>
<script>
import ListItem from '@/components/ListItem'
import GLOBAL from './GLOBAL.js';
import qs from 'qs'
    export default{
        name: 'List',
        components:{
            ListItem
        },
        data(){
            return{
                lists: [],
                showList:false,
                addShow: false,
                valid: false,
                title: '',
                emailRules: [
                    v => !!v || 'enter the name of the list'
                ]
            }
        },
        methods: {
            showLists(){
                this.showList = !this.showList;
            },
            addList(){
                if(this.lists.title != undefined){
                    GLOBAL.addList(this.lists.title)
                    this.lists.title = undefined;
                     
                    // this.axios("https://drivingfordollars.com/clients/marketing_lists/add",{
                    //     method:'POST',
                    //     data:this.lists.title,
                    //     headers: {
                    //         'Content-Type': 'application/x-www-form-urlencoded',
                    //         'X-Requested-With': 'XMLHttpRequest'
                    //     },
                    //     withCredentials: true
                    // })
                    // .then(function (response) {
                    //     console.log(response)
                    // })
                    // var _this = this;
                    // this.axios.get("https://drivingfordollars.com/marketing_lists")
                    // .then(function (response) {
                    //     console.log(response.data);
                    //     GLOBAL.lists = response.data;
                    //     _this.lists =  GLOBAL.lists

                    // })
                    
                }
            }
        },
        mounted: function () {
             // this.lists = GLOBAL.lists;
            // console.log(this.lists)
            var auth_token = this.$cookie.get('auth_token');
            this.axios("https://drivingfordollars.com/marketing_lists",{
                        method:'GET',
                        headers: {
                            'Authorization': 'Bearer ' + auth_token
                        }
                    })
                    .then(function (response) {
                       
                    })
                    .catch((error) => {
                        
                    })



            // var _this = this;
            // this.axios.get("https://drivingfordollars.com/marketing_lists")
            // .then(function (response) {
            //     GLOBAL.lists = response.data;
            //     _this.lists =  GLOBAL.lists

            // })
        }
    }
</script>

<style lang="scss">
.list-section-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;
}

.add-btn{
    background-color: #2196f3;
    color: #fff;
    height: auto;
    z-index: 0;
    width: 200px;
    margin: 10px 0;
 }

.input-group__input input{
    border-bottom: 1px solid #ccc;
}

.input-group__details:after{
    background-color: #3b84d6;
}

.add-list-form {
    margin-bottom: 30px;
}

</style>

