<template>
<div style="background-color: #f2f3f4;">
	{{value}}
</div>
</template>

<script>

import axios from 'axios'
export default {       
	name: 'test',
	data () {
		return {
			value : "hi",
			formdata : {
				value : "Yeah, I have got some problem with my peer but now I'm healing by experience."
			}
		}
	},
	mounted () {
    	axios.post('http://localhost:3000/test',this.formdata)
        .then((response)=>{
        this.value=response.data;
        })
        .catch((error)=>{
          console.log(error);
        });
    }
}

</script>

<style>
</style>