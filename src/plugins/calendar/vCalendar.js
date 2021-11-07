import Vue from 'vue'
import vCalendar from 'v-calendar'
// import 'v-calendar/lib/v-calendar.min.css';
Vue.use(vCalendar, {             // second is optional
  datePickerTintColor: '#F00',
  datePickerShowDayPopover: false,
})
