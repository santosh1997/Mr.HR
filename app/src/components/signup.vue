<template>
  <div>
  <div v-if="loading=='yes'">
    <center><vue-loading spinner="circles"></vue-loading></center>
  </div>
    <div v-else class="d-block text-center">
    <form v-on:submit.prevent="onSubmit">
      <b-col class="head2">

        <p class="heed1">Come With Us</p>

        <input type="text" size="40" maxlength="20" id="name" v-model="formdata.userid" placeholder="Enter Recruiter ID"><br><br>

        <input type="text" size="40" maxlength="30" id="email" v-model="formdata.userpass" placeholder="Enter Password"><br><br>
      
      </b-col>

    <br>
    <center><input type="submit" class="btn btn-primary" value="Signup" style="padding:10px;width:120px;"></center><br>
    </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import VueLoading from 'vue-simple-loading';

export default {
  name : 'signup',
  components : {
    VueLoading,
  },
  data () {
    return{

      loading: 'no',
      otpstatus:'',
      formdata:{}
    }
  },
  methods : {
    onSubmit : function(event){
      this.loading='yes';
      if(this.formdata.userid=="admin"){
        this.$session.start();
        this.$session.set('userid',this.formdata.userid);
        this.$router.push('/recruit');
      }
      else{
        this.$forceUpdate();
      }
      this.loading='no';
    }
  }
}
</script>