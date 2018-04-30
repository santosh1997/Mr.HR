<template>
<div>
<b-navbar toggleable="md" type="dark" style="background-color: #030683">

<b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

<b-navbar-brand href="#" style="padding-left: 70px;">Mr.HR</b-navbar-brand>

<b-collapse is-nav id="nav_collapse">
 

      
  <b-navbar-nav class="ml-auto">
    <b-navbar-brand>&nbsp;<span id="profname"> {{user.userid}} &nbsp;&nbsp;&nbsp;<span style="color: #3b5da0;font-size: 20px;">|</span></span></b-navbar-brand>
    <b-nav-item-dropdown right>

      <template slot="button-content">
        <em style="background-color: black"></em>
      </template>
          
      <b-dropdown-item v-on:click="logoutredirect">Signout</b-dropdown-item>

    </b-nav-item-dropdown>

  </b-navbar-nav>
</b-collapse>

</b-navbar>

</div>
</template>
<script>
import axios from 'axios'

export default{
  data () {
    return{
      sessioncontent : {
        userid : this.$session.get('userid')
      },
      user : {}
    }
  },
  methods : {
    logoutredirect(){
      this.$session.clear();
      this.$session.destroy();
      this.$router.push('/');
    }
  }
}
</script>
<style >
#profname {
  font-weight: bold;
  font-size: 14px;
}
</style>