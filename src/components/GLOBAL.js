import Vue from 'vue';
export default new Vue({
    data: {
        lists:[
            {
                name: 'List 1',
                uuid: 1,
                users: [
                    {
                       name: 'John 1',
                       phone: '800-500-12-1212',
                       address: '1 Main St, NY' 
                    }
                ]
            }
        ]
    },
    methods: {
        addList(name){
            var uuid;
            if(this.lists.length == 0){
                uuid = 1
            }else{
                uuid = this.lists[this.lists.length-1].uuid + 1;
            }
            this.lists.push({
                uuid,
                name,
                users: []
            })
        },
        deleteList(index){
            var _this = this;
            this.lists.forEach(function(item, i, arr) {
                for(var key in item){
                   if(item[key] == index){
                       _this.lists.splice(i, 1);
                   }  
                }
            });
        },
        addUser(uuid,name,phone,address){
            var _this = this;
            this.lists.forEach(function(item, i, arr) {
                for(var key in item){
                   if(item[key] == uuid){
                       _this.lists[i].users.push({
                        name,
                        phone,
                        address
                    })
                   }  
                }
            });
        },
        deleteUser(listId,userId){
            this.lists[listId].users.splice(userId, 1)
        }
    }
});