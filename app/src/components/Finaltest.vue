<template>
<div v-if="loading=='yes'">
  <center><vue-loading spinner="circles"></vue-loading></center>
</div>
<div v-else>
<app-header></app-header>
	<b-container fluid>
		<b-row>
			<b-col sm="12" md="8" lg="8" style="background-color: white;">
				
				<div id="questionpara">
					<p style="margin-top: 6%;">Question {{activeques+1}} of 10</p>
				</div>
				<div id="quesheader">
					<a href="#" class="btn btn-primary" v-on:click="submition" style="padding: 10px;width: 120px;"><b>Submit</b></a>
				</div>
				<hr>
			
				<div>
					<p id="quesstart">
					<span><b>Q{{activeques+1}})</b></span>
					{{quesset[activeques].ques}}
					</p>
				</div>
				<div style="padding-left: 100px;font-size: 18px;font-weight: bold;">
					<b-form-textarea id="textarea1" v-model="currentans" placeholder="Enter your answer..." :rows="3">
	   				</b-form-textarea>
				</div>
				<br><br><br><br><hr>
				<b-row>
					<b-col sm="12" md="8" lg="8">
						
					</b-col>
					<b-col sm="12" md="2" lg="2">
						<center> <a v-if="activeques>0" v-on:click="decactiveques" href="#" class="btn btn-primary" style="padding: 10px;width: 120px;"><b><< Previous</b></a></center>
					</b-col>
					<b-col sm="12" md="2" lg="2">
						<center> <a href="#" class="btn btn-primary" style="padding: 10px;width: 120px;" v-if="activeques<9" v-on:click="incactiveques"><b>Next >></b></a></center>
					</b-col>
				</b-row><br>
			</b-col>

			<b-col sm="12" md="2" lg="2" style="background-color: #F0F3F4;">
				<p id="time">Summary</p>
				<hr>
				<div id="quesgrid" v-for="(singquesset,index) in quesset" :key="index">
					<a href="#" v-on:click="activeques=index" v-if="quesset[index].usrans==null"><p id="qusnum">{{index+1}}</p></a>
					<a href="#" v-on:click="activeques=index" v-else><p id="qusnumanswered">{{index+1}}</p></a>
				</div>
			</b-col>
		</b-row>
    </b-container fluid>
</div>
</template>
<script>
import Header from './Header.vue';
import secconvert from 'convert-seconds';
import axios from 'axios'

export default {
	name:'finaltest',
	components: {
    	'app-header': Header
    },
	data(){
    	return{
    		currentans:'',
    		sessioncontent : {
        		userid : this.$session.get('userid')
      		},
    		quesset:[{ques:'',usrans:''}],
    		activeques:0,
    		loading:'no'
		}
    },
    beforeCreate: function () {
    	if (!this.$session.get('userid')) {
      		this.$router.push('/');
    	}
  	},
    mounted(){
    	axios.post('http://localhost:3000/quesfetch',this.sessioncontent)
	    .then((response)=>{
	      this.quesset=response.data;
	      this.activeques=0;
	      this.currentans=this.quesset[this.activeques].usrans;
	    })
	    .catch((error)=>{
	      console.log(error);
	    });
    },
	methods:{
		incactiveques(){
			axios.post('http://localhost:3000/ansupdate',{userid:this.sessioncontent.userid,activeques:this.activeques+1,currentans:this.currentans})
		    .then((response)=>{
	      		this.quesset=response.data;
		    })
		    .catch((error)=>{
		      console.log(error);
		    });
			this.activeques=this.activeques+1;
			this.currentans=this.quesset[this.activeques].usrans;
		},
		decactiveques(){
			axios.post('http://localhost:3000/ansupdate',{userid:this.sessioncontent.userid,activeques:this.activeques+1,currentans:this.currentans})
		    .then((response)=>{
	      		this.quesset=response.data;
		    })
		    .catch((error)=>{
		      console.log(error);
		    });
			this.activeques=this.activeques-1;
			this.currentans=this.quesset[this.activeques].usrans;
		},
		submition(){
			if (confirm("If you submit the test, then you cannot re-attempt the test. Do you wish to submit?") == true) {
			    axios.post('http://localhost:3000/ansupdate',{userid:this.sessioncontent.userid,activeques:this.activeques+1,currentans:this.currentans})
			    .then((response)=>{
		      		this.quesset=response.data;
		      		this.$session.clear();
		      		this.$session.destroy();
		      		this.$router.push('/');
			    })
			    .catch((error)=>{
			      console.log(error);
			    });
    	    }
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
#quesstart {
	padding: 40px;
	background-color: lightgrey;
	border: 2px solid #F7F9F9;
}
#time {
	width: 180px;
	background-color: #0268ae;
	padding: 18px;
	text-align: center;
	margin-top: 10%;
	font-weight: bold;
	color: white;
}
#timeup {
	font-weight: bold;
	text-align: center;
	font-size: 23px;
}
#qusnum {
	padding: 5px;
	border: 1px solid #0268ae;
	width: 30px;
	color:#0268ae;
	margin-right: 3%;
	display: inline-block;
	text-align: center;
}
#quesgrid{
	display: inline-block;
	margin-right: 3%;
}
#qusnumanswered {
	background-color: #0268ae;
	border: 1px solid #0268ae;
	color:white;
	text-align: center;
	padding: 5px;
	width: 30px;
}

@keyframes click-wave {
  0% {
    height: 40px;
    width: 40px;
    opacity: 0.35;
    position: relative;
  }
  100% {
    height: 200px;
    width: 200px;
    margin-left: -100px;
    margin-top: -100px;
    opacity: 0;
  }
}

.option-input {
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  -o-appearance: none;
  appearance: none;
  position: relative;
  top: 4px;
  right: 0;
  bottom: 0;
  left: 0;
  height: 20px;
  width: 20px;
  transition: all 0.15s ease-out 0s;
  background: #ffffff;
  border: 1px solid #0268ae;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  margin-right: 0.5rem;
  outline: none;
  position: relative;
  z-index: 1000;
}
.option-input:hover {
  background: #9faab7;
}
.option-input:checked {
  background: #0268ae;
  border: 1px solid #0268ae;
}
.option-input:checked::before {
  height: 20px;
  width: 20px;
  position: absolute;
  content: '✔';
  display: inline-block;
  font-size: 13.33334px;
  text-align: center;
  line-height: 20px;
}
.option-input:checked::after {
  -webkit-animation: click-wave 0.65s;
  -moz-animation: click-wave 0.65s;
  animation: click-wave 0.65s;
  background: #0268ae;
  content: '';
  display: block;
  position: relative;
  z-index: 100;
}
.option-input.radio {
  border-radius: 50%;
}
.option-input.radio::after {
  border-radius: 50%;
}
</style>