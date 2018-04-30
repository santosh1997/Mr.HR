<template>
  <div>
    <div v-if="loading=='yes'">
      <center><vue-loading spinner="circles"></vue-loading></center>
    </div>
    <div v-else class="d-block text-center">
      <b-col class="head1"><br>
          <p class="heed1">Let's Get Started</p><hr width="50px" color="red" height="50px"><br>
          <form v-on:submit.prevent="onSubmit">
          <input type="text" size="40" maxlength="40" v-model="formdata.userid" placeholder="Enter User ID"><br><br>
          <center><input type="submit" class="btn btn-primary" value="Login" style="padding:10px;width:120px;"></center><br>
          </form>
      </b-col>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import VueLoading from 'vue-simple-loading';
export default {
  name : 'signin',
  components : {
    VueLoading
  },
  data(){
    return{
      loading:'no',
      formdata:{
        userid:''
      }
    }
  },
  methods : {
    onSubmit : function(event){
      this.loading='yes';
      axios.post('http://localhost:3000/logging',this.formdata)
      .then((response)=>{
        this.otpstatus=response.data;
        if(this.otpstatus=="done"){
          this.$session.start();
          this.$session.set('userid',this.formdata.userid);
          this.$router.push('/finaltest');
        }
        else{
          alert("Network Problem");
          this.$router.push('/');
        }
      })
      .catch((error)=>{
        console.log(error);
      });
      this.loading='no';
    }
  }
}
</script> 