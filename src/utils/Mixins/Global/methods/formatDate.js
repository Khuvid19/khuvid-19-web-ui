export default {
  methods: {
    mm_formatDate(date) {
      const currentYear = this.$dayjs().format('YYYY')
      const dateYear = this.$dayjs(date).format('YYYY')

      if(currentYear === dateYear) {
        return this.$dayjs(date).format('MM/DD hh:mm')
      }
      return this.$dayjs(date).format('YYYY/MM/DD hh:mm')
    },
  },
}