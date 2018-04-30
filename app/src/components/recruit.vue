<template>
<div>
<app-header></app-header>
	<b-container fluid>
		<b-row>
			<b-col sm="12" md="8" lg="8" style="background-color: white;">
				
				<div id="questionpara">
					<p style="margin-top: 6%;">Candidate List</p>
				</div>
				
				<hr>
				<div>

					<table>
						<tr>
						<th>User ID</th>
						<th>Results</th>
						</tr>
						<tr v-for="user in userset">
						<td>{{user.userid}}</td>
						<td>
						<a v-on:click="showresultModal(user.userid)" class="btn btn-primary" style="padding: 10px;width: 150px;margin-left: 40%;color:white;">View Results</a>
						</td>
						</tr>
					</table>
				</div>
				<br><br><br><br><hr>
				<b-row>
					<b-col sm="12" md="8" lg="8">
						
					</b-col>
				</b-row><br>
			</b-col>

			
		</b-row>
    </b-container fluid>
    <b-modal ref="resultmodal" hide-footer><component :resset="resset" is="usrresult"></component></b-modal>
</div>
</template>
<script>
import Header from './Header.vue';
import axios from 'axios'
import usrresult from "./usrresult.vue";

export default {
	name:'recruit',
	components: {
    	'app-header': Header,
    	'usrresult':usrresult
    },
	data(){
    	return{
    		sessioncontent : {
        		userid : this.$session.get('userid')
      		},
    		userset:[{userid:''}],
    		loading:'no',
    		usercontent:{
    			userid:''
    		},
    		resset:[{}]
		}
    },
    mounted(){
    	axios.post('http://localhost:3000/userfetch',this.sessioncontent)
	    .then((response)=>{
	      this.userset=response.data;
	      this.usercontent.userid=this.userset[0].userid;
	    })
	    .catch((error)=>{
	      console.log(error);
	    });
    },
	methods:{
		showresultModal (usrid) {
			this.usercontent.userid=usrid;
			axios.post('http://localhost:3000/resfetch',this.usercontent)
		    .then((response)=>{
		      this.resset=response.data;
		       console.log(this.resset);
		    })
		    .catch((error)=>{
		      console.log(error);
		    });
      		this.$refs.resultmodal.show();
        }
	}
}

</script>


<style>
#unanswered{
	background-color: #000000;
}
#answered{
	background-color: #ffffff;
	color: #000000;
}
#questionpara {
	background-color: #0268ae;
	width: 200px;
	padding: 6px;
	text-align: center;
	margin-top: 2%;
	font-weight: bold;
	color: white;
	display: inline-block;
}
#quesheader {
	display: inline-block;
	float:right;
	margin-top: 3%;
	font-weight: bold;
}
#questionpara1 {
	background-color: #0268ae;
	width: 180px;
	padding: 6px;

	text-align: center;
	
	font-weight: bold;
	color: white;

}
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