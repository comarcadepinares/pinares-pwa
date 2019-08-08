<template>
  <div id="fullMap">
    <Map
      :points="[{coords:[41.9529987,-2.934864]}]"
    ></Map>

    <button id="menuButton" type="button" class="btn btn-primary" @click="toggleMenu">Menu</button>
    <div id="menu">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">PINARES</a>
      </nav>
      <div class="menuSection">
        <h5>Category</h5>
        <ul class="list-group list-group-flush">
          <li :class="getCategoryClass('activities')" @click="filterCategory('activities')">Activities</li>
          <li :class="getCategoryClass('hotels')" @click="filterCategory('hotels')">Hotels</li>
          <li :class="getCategoryClass('restaurants')" @click="filterCategory('restaurants')">Restaurants</li>
          <li :class="getCategoryClass('services')" @click="filterCategory('services')">Services</li>
        </ul>
      </div>
      <div class="menuSection">
        <h5>Filters</h5>
      </div>
    </div>
  </div>
</template>

<script>
import ws from '@/services/webservice'
import Map from '@/components/Map'

export default {
  name: 'fullMap',
  data () {
    return {
      menu: {
        visible: true,
        category: 'activities'
      }
    }
  },
  created () {
    ws.request('get', '/hotel', null, this.token)
      .then((response) => {
        this.$store.commit('setHotels', response.hotels)
      })
      .catch((error) => {
        console.log('error', error)
      })
  },
  computed: {
    hotels () {
      return this.$store.state.hotels
    }
  },
  methods: {
    toggleMenu () {
      if (this.menu.visible === true) {
        $("#menu").fadeOut("fast")
        this.menu.visible = false
      } else {
        $("#menu").fadeIn("fast")
        this.menu.visible = true
      }
    },

    filterCategory (category) {
      if (this.menu.category !== category) {
        this.menu.category = category
      }
    },

    getCategoryClass (category) {
      if (this.menu.category === category) {
        return 'list-group-item active'
      } else {
        return 'list-group-item'
      }
    }
  },
  components: {
    Map
  }
}
</script>
