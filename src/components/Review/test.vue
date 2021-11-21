<template>
  <div class="p-3">
    <div>{{selectedList}}</div>
    <div v-for="(value, key) in getSideEffects" :key="key" class="m-1 btn btn-outline btn-primary btn-sm"
         :class="selectedList.includes(key)?'bg-red-500':'bg-white'"
         :style="{
           backgroundColor:selectedList.includes(key)?'#65C3C8 !important':'white !important',
           color:selectedList.includes(key)?'white !important':'#65C3C8 !important'
         }"
         @click="test(key)"
    >
      <label>{{value}}</label>
      <input type="checkbox" class="toggle"
             style="display: none"
             :checked="selectedList.includes(key)"
      >
      <!--      style="display: none"-->
    </div>
    <div>{{selectedItem}}</div>
    <div v-for="(value, key) in getSideEffects" :key="key" class="m-1 btn btn-outline btn-primary btn-sm"
         :class="selectedItem===key?'bg-red-500':'bg-white'"
         :style="{
           backgroundColor:selectedItem===key?'#65C3C8 !important':'white !important',
           color:selectedItem===key?'white !important':'#65C3C8 !important'
         }"
         @click="test2(key)"
    >
      <label>{{value}}</label>
      <input type="checkbox" class="toggle"
             style="display: none"
             :checked="selectedItem===key"
      >
    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "DetailCont",
  props: {
    id: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      checked:false,
      YNList: {
        true: '있음',
        false: '없음',
      },
      form:{
        detailDisc: "",
        diseaseDisc: "",
        haveDisease: false,
        inoculatedDate: new Date,
        sideEffects: [
        ],
        vaccine: "",
      },
      selectedList:[],
      selectedItem:'',
    }
  },
  computed: {
    ...mapGetters({
      getSideEffects: 'Review/sideEffectsList/getListContents',
      getVaccine: 'Review/vaccineList/getListContents',
    }),
  },
  created() {
    this.fetchSideEffects();
    this.fetchVaccine();
  },

  methods: {
    ...mapActions({
      fetchSideEffects: 'Review/sideEffectsList/fetchListContents',
      fetchVaccine: 'Review/vaccineList/fetchListContents',

    }),
    test(key){
      if(this.selectedList.includes(key)){
        const idx = this.selectedList.findIndex((r)=>r===key);
        this.selectedList.splice(idx,1);
      }else{
        this.selectedList.push(key);
      }
    },
    test2(key){
      this.selectedItem = key;
    },
  },
}
</script>

<style scoped>

</style>
