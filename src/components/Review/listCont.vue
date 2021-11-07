<template>
  <div class="card shadow m-2 bg-white" @click="$emit('click')">
    <div class="card-body p-4">
      <div class="flex justify-between align-middle mb-2">
        <div>
          <button v-for="(item,idx) in vaccineList" :key="idx"
                  class="mr-2 btn btn-outline btn-primary btn-sm">
            {{ item }}
          </button>
        </div>
        <div class="text-2xs flex items-center">3분전</div>
      </div>
      <div>
        <button v-for="(item,idx) in bb" :key="idx"
                class="mr-2 mb-2 btn btn-outline btn-primary btn-sm">
          {{ item }}
        </button>
      </div>
      <p class="text-xs mb-2">
        내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListCont",
  data() {
    return {
      vaccineList: ['화이자 1차', '20대'],
      bb: ['발열'],

    }
  },
}
</script>

<style scoped>

</style>
