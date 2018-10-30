<template>
	<div class="container">
		<h1 class="center-align">Tus votaciones abiertas</h1>
		<div class="card-panel purple lighten-3 hoverable" v-for="(poll, index) in completedPolls">
			<Poll_info :poll=poll :details=false />
		</div>
		<div class="card-panel light-green lighten-4 hoverable" v-for="(poll, index) in pendingPolls">
			<Poll_info :poll=poll :details=false />
		</div>
	</div>
</template>
<script>
	import Poll_info from './Poll_info.vue'
	export default{
		components:{
			Poll_info
		},
		data(){
			return{
				polls: [
	                {
	                    id: 1, 
	                    title: 'Definición de reglamento', 
	                    description: 'En esta votación se definirá si se aceptan o no las nuevas reglas para formar parte de la asamblea de Wikipolítica. Entre ellas están: Haber participado por lo menos en 3 proyectos sociales \n Completar todo registro de nuevos asambleistas \n Proponer una idea nueva', 
	                    closeDate: '11/01/2018',
	                    participation: false
	                },
	                {
	                	id: 2, 
	                    title: 'Definición de reglamento 2', 
	                    description: 'En esta votación se definirá si se aceptan o no las nuevas reglas para formar parte de la asamblea de Wikipolítica. Entre ellas están: Haber participado por lo menos en 3 proyectos sociales \n Completar todo registro de nuevos asambleistas \n Proponer una idea nueva', 
	                    closeDate: '11/01/2018',
	                    participation: true
	                },
	                {
	                    id: 3, 
	                    title: 'Selección de presidencia de Wikipolítica periodo 2019', 
	                    description: 'Se decidirá quien será el nuevo presidente de la organización durante el siguiente año.', 
	                    closeDate: '11/02/2018',
	                    participation: false
	                },
	                {
	                    id: 4, 
	                    title: 'Sanción para Juan Perez', 
	                    description: 'El ex-tesorero de Wikipolítica, Juan Perez, fue sorprendido gastando dinero de la organización en objetos personales. En esta votación decidiremos que tipo de sanción darle.', 
	                    closeDate: '11/01/2018',
	                    participation: false
	                },
	                {
	                    id: 6,
	                    title: 'Reforma de regla para conferencias',
	                    description: 'Decidiremos que reglas añadir al reglamento para poder crear una conferencia y llevarla a cabo en orden',
	                    closeDate: '11/01/2018',
	                    participation: true
	                }
            	],
			}
		},
		computed:{
			completedPolls (){
				return this.polls.filter(poll => !poll.participation)
			},
			pendingPolls (){
				return this.polls.filter(poll => poll.participation)
			}
		}
	}
</script>