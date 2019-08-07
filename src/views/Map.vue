<template>
  <div id="fullMap">
    <div id="map"></div>

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
// @ is an alias to /src
import L from 'leaflet'

export default {
  name: 'fullMap',
  data () {
    return {
      map: null,
      tileLayer: null,
      menu: {
        visible: true,
        category: 'activities'
      }
    }
  },
  mounted() {
    this.initMap()
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

    initMap() {
      this.map = L.map('map').setView([41.9529987,-2.934864], 13)

      this.tileLayer = L.tileLayer(
        'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
        {
          maxZoom: 18,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
        }
      )
      this.tileLayer.addTo(this.map)
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
}
</script>
