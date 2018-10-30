<template>
    <div class="poll">     
        <h5>{{poll.title}}</h5> 
        <div class="right-align">Se cierra el: {{poll.closeDate}}</div>
        <div v-if="details">
            {{poll.description}}
            <div class="center-align"><a class="waves-effect waves-light btn-small">Participar</a></div>
        </div>
    </div>
</template>
<script>
    export default{
        props:{
            poll:{
                type: Object,
                required: true
            },
            details:{
                type: Boolean,
                required: true
            }
        }
    }
</script>

<style scoped>
    .poll{}
</style>