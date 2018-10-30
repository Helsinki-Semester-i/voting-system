<template>
    <div>     
        <h3>{{poll.title}}</h3> Se cierra el: {{poll.closeDate}}   
    </div>
</template>
<script>
    export default{
        props:{
            poll:{
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>