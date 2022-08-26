<template>
<tr class="m-stockTableRow">
    <td>{{name}} LX인터네셔날</td>
    <td>210,000</td>
    <td>300.00%</td>
    <td>10.00%</td>
    <td>20.00%</td>
    <td>56.10</td>
</tr>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: "Index",
  props:{
    stock:Object
  },
  data() {
    if(this.stock){
        return {
            name:this.stock.name
        }
    }else{
        return {
            name:"없음"
        }
    }
  },
});
</script>
<style lang="scss">
.m-stockTableRow td{font-size:14px;padding:5px 0;}
</style>