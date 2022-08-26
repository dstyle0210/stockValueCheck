<!-- src/page/stock.vue -->
<template>
  <section class="s-dataGrid">
    <table cellpadding="0" cellspacing="0">
      <thead>
        <tr>
            <th>종목명</th>
            <th>종가</th>
            <th>안전마진</th>
            <th>배당률</th>
            <th>영업률</th>
            <th>RSI</th>
        </tr>
      </thead>
      <tbody>
        <StockRow v-for="stock in stockList" :stock="stock"></StockRow>
      </tbody>
    </table>
  </section>
</template>
<script>
import { defineComponent } from "vue";
import StockRow from "../components/StockRow.vue";
// https://api.finance.naver.com/siseJson.naver?symbol=035420&requestType=1&startTime=20220825&endTime=20220825&timeframe=day

export default defineComponent({
  name: "Index",
  components:{StockRow},
  data() {
    return {
      routerTest: "/test",
      stockList:[{name:"이름1"},{name:"이름2"},{name:"이름3"},{name:"이름1"},{name:"이름2"},{name:"이름3"},{name:"이름2"},{name:"이름3"},{name:"이름1"},{name:"이름2"},{name:"이름3"},{name:"이름2"},{name:"이름3"},{name:"이름1"},{name:"이름2"},{name:"이름3"},{name:"이름2"},{name:"이름3"},{name:"이름1"},{name:"이름2"},{name:"이름3"},{name:"이름2"},{name:"이름3"},{name:"이름1"},{name:"이름2"},{name:"이름3"},{name:"이름2"},{name:"이름3"},{name:"이름1"},{name:"이름2"},{name:"이름3"},{name:"이름2"},{name:"이름3"},{name:"이름1"},{name:"이름2"},{name:"이름3"},{name:"이름2"},{name:"이름3"},{name:"이름1"},{name:"이름2"},{name:"이름3"},{name:"이름2"},{name:"이름3"},{name:"이름1"},{name:"이름2"},{name:"이름3"}]
    };
  },
});
</script>

<style lang="scss">
.s-dataGrid{
    table{width:100%;}
    thead{background:yellow;
        th{color:#333;padding:5px 0;text-align:center;font-size:16px;}
    }
}
</style>