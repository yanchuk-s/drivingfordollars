<template>
    <div>
        <h1>List</h1>
        <div class="list-section">
            <div>
                <ListItem
                    :title="'yes'"
                    :count="1"
                >
                </ListItem>
                <ListItem 
                    :title="'no'"
                    :count="2"
                >
                </ListItem>
            </div>
        </div>
    </div>
</template>
<script>
import ListItem from '@/components/ListItem'
    export default{
        name: 'List',
        components:{
            ListItem
        },
        data(){
            return{
                showList:false
            }
        },
        methods: {
            showLists(){
                this.showList = !this.showList;
            }
        }
    }
</script>

<style lang="scss">
   
</style>

