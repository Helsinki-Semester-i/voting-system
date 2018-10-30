<template>
	<div>
		<h1 class="center-align">Tus votaciones abiertas</h1>
		<div class="card-panel teal lighten-2" v-for="(poll, index) in polls">
			<Poll_info :poll= poll />
		</div>
	</div>
</template>
<script>
	import Poll_info from './Poll_info'
	export default{
		components:{
			Poll_info
		},
		data(){
			return{
				polls: [
                {
                    id: 1, title: 'Definición de reglamento', description: 'En esta votación se definirá si se aceptan o no las nuevas reglas para formar parte de la asamblea de Wikipolítica. Entre ellas están: Haber participado por lo menos en 3 proyectos sociales \n Completar todo registro de nuevos asambleistas \n Proponer una idea nueva', closeDate: '11/01/2018'
                },
                {
                    id: 3, title: 'Selección de presidencia de Wikipolítica periodo 2019', description: 'Se decidirá quien será el nuevo presidente de la organización durante el siguiente año.', closeDate: '11/02/2018'},
                {
                    id: 4, title: 'Sanción para Juan Perez', description: 'El ex-tesorero de Wikipolítica, Juan Perez, fue sorprendido gastando dinero de la organización en objetos personales. En esta votación decidiremos que tipo de sanción darle.', closeDate: '11/01/2018'},
            ]
			}  
        }
	}
</script>