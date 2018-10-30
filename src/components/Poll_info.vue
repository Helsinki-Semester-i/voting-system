<template>
    <div class="poll" @click="selectPoll">     
        <h5>{{poll.title}}</h5> 
        <div class="right-align">Se cierra el: {{poll.closeDate}}</div>
        <div v-if="selected">
            {{poll.description}}
            <div class="center-align" v-if="!poll.participation"><a class="waves-effect waves-light btn-small">Participar</a></div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                selected: false
            }
        },
        props:{
            poll:{
                type: Object,
                required: true
            },
            details:{
                type: Boolean,
                required: true
            }
        },
        methods:{
            selectPoll(){
                this.selected = !this.selected;
            }
        }
    }
</script>

<style scoped>
    .poll{

    }
</style>