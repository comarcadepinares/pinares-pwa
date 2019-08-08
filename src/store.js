import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let savedActivities
let savedHotels
let savedRestaurants
let savedServices

try {
  if (localStorage) {
    savedActivityTypes = JSON.parse(localStorage.getItem('activityTypes')) || []
    savedActivities = JSON.parse(localStorage.getItem('activities')) || []
    savedHotels = JSON.parse(localStorage.getItem('hotels')) || []
    savedServices = JSON.parse(localStorage.getItem('services')) || []
  }
} catch (error) {
  localStorage.clear()
}

export default new Vuex.Store({
  state: {
    activities: savedActivities,
    hotels: savedHotels,
    restaurants: savedRestaurants,
    services: savedServices,
    list: [],
  },
  mutations: {
    setList (state, category) {
      state.list = state[category]
    },
    setActivities (state, activities) {
      state.activities = activities
      localStorage.setItem('activities', JSON.stringify(state.activities))
    },
    setHotels (state, hotels) {
      state.hotels = hotels
      localStorage.setItem('hotels', JSON.stringify(state.hotels))
    },
    setRestaurants (state, restaurants) {
      state.restaurants = restaurants
      localStorage.setItem('restaurants', JSON.stringify(state.restaurants))
    },
    setServices (state, services) {
      state.services = services
      localStorage.setItem('services', JSON.stringify(state.services))
    }
  },
  actions: {

  }
})
