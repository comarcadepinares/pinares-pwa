<template>
  <div id="map" :update="update" @click="mapClick"></div>
</template>

<script>
import L from 'leaflet'

export default {
  name: 'fullMap',
  props: {
    category: String
  },
  data () {
    return {
      map: null,
      tileLayer: null,
      icon: null,
      points: [],
      markers: [],

      clickCount: 0,
      clickTimer: null
    }
  },
  mounted() {
    this.initMap()
    this.initIcon()
    this.showPoints()
  },
  computed: {
    update () {
      this.points = this.$store.state[this.category]
      this.showPoints()
    }
  },
  methods: {
    initMap() {
      this.map = L.map('map').setView([41.9529987,-2.934864], 12)
      this.tileLayer = L.tileLayer(
        'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
        {
          maxZoom: 18,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
        }
      )
      this.tileLayer.addTo(this.map)
    },

    initIcon () {
      this.icon = L.icon({
        iconUrl: '/img/marker.png',
        iconSize:     [36, 60],
        iconAnchor:   [18, 54]
      });
    },

    showPoints () {
      if (this.map && this.points && this.points.length) {
        this.cleanMarkers()

        for (const point of this.points) {
          const marker = L.marker(
            [point.location.coordinates[1], point.location.coordinates[0]],
            { icon: this.icon }
          )
          this.markers.push(marker)
          marker.addTo(this.map)
        }
      }
    },

    cleanMarkers () {
      if (this.markers && this.markers.length) {
        this.markers.forEach(marker => {
          this.map.removeLayer(marker);
        })
      }
    },

    mapClick (event) {
      event.preventDefault()

      this.clickCount++

      if (this.clickCount === 1) {
        this.clickTimer = setTimeout(() => {
          this.clickCount = 0
          this.$emit('toggleMenu')
        }, 250)
      } else if (this.clickCount === 2) {
        clearTimeout(this.clickTimer)
        this.clickCount = 0
      }
    }
  }
}
</script>
