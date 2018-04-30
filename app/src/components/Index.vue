<template>
	<div style="background-image: url('https://i.imgur.com/oYpqfF1.png');width:100%;height:auto;">
	<b-row style="width:100%;">
	<b-col>
		<img src="../assets/mrhr.png" style="padding:4%;width:40%;height:auto;">
	</b-col>
	<b-col>
<p style="padding-top:15%;margin-left:5%;font-family: sans-serif;font-size: 3.5em;line-height: 1.11111111111111111111;text-align: left; letter-spacing: -1px;margin: auto;color: #40404C;font-weight:bold;">Smart Recruiter's<br>Smart Choice</p>		
	</b-col>
	</b-row>
	<b-container fluid>
			<b-row>
				<b-col style="margin-bottom:4%;">
					<p style="font-family: times new roman; color: white;font-size: 22px;padding: 30px;text-align: justify;">&nbsp;&nbsp;&nbsp;Our simple goal is to make hiring easy. To help businesses get the talent they need to succeed. Recruiting is a frustrated opaque process undermined by outdated technology that turns off candidates and hiring managers. Now imagine a world where its easy to find candidates, it's easy for people to show interest in jobs, it's easy for hiring teams to collaborate and your recruiting vendors are just a click away.</p>
					<b-row>
					<b-col>
					 	<center><a  @click="showModal" class="btn btn-primary" style="padding: 10px;width: 150px;color:white;">Talent Spot</a></center>
					</b-col>
					<b-col>
					 	<center><a  @click="showModal1" class="btn btn-primary" style="padding: 10px;width: 150px;color:white;">Interact</a></center>
				 	</b-col>
					</b-row>
				</b-col>
				<b-col>
				<img src="../assets/costsaving.gif" style="width:80%;height:auto;margin-top:5%;">
				</b-col>
			</b-row>

	</b-container fluid>
 	<b-modal ref="myModalRef" hide-footer title="Signup" ><component is="signup"></component></b-modal>
 	<b-modal ref="myModalRef1" hide-footer ><component is="signin"></component></b-modal>

	</div>

</template>
<script>
import signup from "./signup.vue";
import signin from "./signin.vue";

export default {
    components:{
    	'signup': signup,
        'signin': signin
    },
    methods: {
    	showModal () {
      		this.$refs.myModalRef.show()
        },
        hideModal () {
        	this.$refs.myModalRef.hide()
        },
  		showModal1 () {
  			this.$refs.myModalRef1.show()
  		},
  		hideModal1 () {
  			this.$refs.myModalRef1.hide()
        }
  	}
}
</script>