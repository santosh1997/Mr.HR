<template>
<div v-if="loading=='yes'">
  <center><vue-loading spinner="circles"></vue-loading></center>
</div>
<div v-else>

	<b-container fluid>
		<b-row>
			
				
				<div id="questionpara">
					<p style="margin-top: 6%;">{{resset[0].userid}} Results</p>
				</div>
				
				<hr>
				

				<table>
					<tr>
					<th>Tones Used</th>
					<th>Number of Answers</th>
					<th>Intensity</th>
					</tr>
					<tr v-for="res in resset">
					<td>{{res.tone}}</td>
					<td>{{res.toneans}}</td>
					<td>{{res.toneavg}}</td>
					</tr>
				</table>
				
		</b-row>
    </b-container fluid>
</div>
</template>
<script>
import axios from 'axios';
import VueLoading from 'vue-simple-loading';

export default {
	name:'usrresult',
	components : {
	    VueLoading
	},
    props:['resset'],
	data(){
    	return{
    		loading:'no'
		}
    }
}

</script>


<style>
table {
    border-collapse: collapse;
    width: 100%;
}

th, td {
    padding: 1%;
    padding-left:10%;
    border-bottom: 1px solid #ddd;
}

tr:hover {background-color:#f5f5f5;}
</style>