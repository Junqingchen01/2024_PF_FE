<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="10">
        <v-sheet class="d-flex " height="54">
          <v-row justify="end">
            <v-col cols="3">
              <v-select
                v-model="type"
                :items="types"
                class="ma-2"
                label="View Mode"
                variant="outlined"
                dense
                hide-details
              ></v-select>
            </v-col>
            <v-col cols="3">
              <v-select
                v-model="weekday"
                :items="weekdays"
                class="ma-2"
                label="weekdays"
                variant="outlined"
                dense
                hide-details
              ></v-select>
            </v-col>
          </v-row>
        </v-sheet>
        <v-sheet class="text-center">
          <v-calendar
          ref="calendar"
          v-model="value"
          :events="events"
          :view-mode="type"
          :weekdays="weekday"
          :interval-minutes="120" 
        ></v-calendar>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import { useDate } from 'vuetify'

export default {
  data() {
    return {
      type: 'week',
      types: ['month', 'week', 'day'],
      weekday: [1, 2, 3, 4, 5],
      weekdays: [
        { title: 'Domingo - Sabado', value: [0, 1, 2, 3, 4, 5, 6] },
        { title: 'Segunda-feira  - Sexta-feira  ', value: [1, 2, 3, 4, 5] },
      ],
      value: [new Date()],
      events: [],
    }
  },
  mounted() {
    const adapter = useDate()
    this.getEvents({
      start: adapter.startOfDay(adapter.startOfMonth(new Date())),
      end: adapter.endOfDay(adapter.endOfMonth(new Date())),
    })
  },
  methods: {
  getEvents({ start, end }) {
    const events = [];

    function getNextDayOfWeek(day, hour, minute) {
      const today = new Date();
      const diff = day - today.getDay();
      const nextDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + diff);
      nextDay.setHours(hour, minute);
      return nextDay;
    }

    events.push({
      title: 'Jantar de Segunda-feira',
      start: getNextDayOfWeek(1, 19, 0),
      end: getNextDayOfWeek(1, 22, 0),
      color: 'red',
      disponivel:40,
    });

    events.push({
      title: 'Almoço de Terça-feira',
      start: getNextDayOfWeek(2, 11, 0), 
      end: getNextDayOfWeek(2, 13, 0),
      color: 'red',
    });

    this.events = events;
  },
},




}
</script>

<style scoped>
.red-border {
  border: 2px solid red;
}
</style>
