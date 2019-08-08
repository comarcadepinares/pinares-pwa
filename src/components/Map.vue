<template>
  <div id="map" :update="list"></div>
</template>

<script>
// @ is an alias to /src
import L from 'leaflet'

export default {
  name: 'fullMap',
  props: {
    points: Array,
    lines: Array,
    polygons: Array
  },
  data () {
    return {
      map: null,
      tileLayer: null,
      icon: null,
      markers: []
    }
  },
  mounted() {
    this.initMap()
    this.initIcon()
    this.showPoints()
  },
  computed: {
    list () {
      this.points = this.$store.state.list
      this.showPoints()
    }
  },
  methods: {
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

    initIcon () {
      this.icon = L.icon({
        iconUrl: '/img/marker.png',
        iconSize:     [36, 60],
        iconAnchor:   [18, 54]
      });
    },

    showPoints () {
      if (this.points && this.points.length) {
        this.cleanMarkers()

        this.points.forEach(point => {
          this.markers.push(
            L.marker(
              [point.location.coordinates[1], point.location.coordinates[0]],
              { icon: this.icon }
            ).addTo(this.map)
          )
        })
      }
    },

    cleanMarkers () {
      if (this.markers && this.markers.length) {
        this.markers.forEach(marker => {
          this.map.removeLayer(marker);
        })
      }
    }
  }
}
</script>
