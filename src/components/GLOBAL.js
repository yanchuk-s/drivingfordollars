import Vue from 'vue';
export default new Vue({
    data: {
        lists:[]
        // lists:[
        //     {
        //        id: 1, 
        //        title: 'List 1',
        //        users: [
        //            {
        //                name: 'John 1',
        //                phone: '800-500-12-1212',
        //                address: '1 Main St, NY'
        //            },
        //            {
        //                 name: 'John 2',
        //                 phone: '800-500-12-1212',
        //                 address: '1 Main St, NY'
        //            },
        //            {
        //                 name: 'John 3',
        //                 phone: '800-500-12-1212',
        //                 address: '1 Main St, NY'
        //            }
        //        ]
        //     },
        //     {
        //         id: 2,
        //         title: 'List 2',
        //         users: [
        //             {
        //                 name: 'John 4',
        //                 phone: '800-500-12-1212',
        //                 address: '1 Main St, NY'
        //             },
        //             {
        //                  name: 'John 5',
        //                  phone: '800-500-12-1212',
        //                  address: '1 Main St, NY'
        //             },
        //             {
        //                  name: 'John 6',
        //                  phone: '800-500-12-1212',
        //                  address: '1 Main St, NY'
        //             }
        //         ]
        //      },
        //      {
        //         id: 3,
        //         title: 'List 3',
        //         users: [
        //             {
        //                 name: 'John 7',
        //                 phone: '800-500-12-1212',
        //                 address: '1 Main St, NY'
        //             },
        //             {
        //                  name: 'John 8',
        //                  phone: '800-500-12-1212',
        //                  address: '1 Main St, NY'
        //             },
        //             {
        //                  name: 'John 9',
        //                  phone: '800-500-12-1212',
        //                  address: '1 Main St, NY'
        //             }
        //         ]
        //      },
        // ]
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
                name
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
        addUser(listId,name,phone,address){
            this.lists[listId].users.push({
                name,
                phone,
                address
            })
        },
        deleteUser(listId,userId){
            this.lists[listId].users.splice(userId, 1)
        }
    }
});