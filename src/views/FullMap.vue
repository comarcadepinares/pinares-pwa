<template>
  <div id="fullMap">
    <Map :category="category" @toggleContent="toggleContent"></Map>

    <!-- <button id="menuButton" type="button" class="btn btn-primary" @click="toggleMenu">Menu</button> -->
    <div id="menu">
      <div class="form-group">
        <select class="custom-select" @change="setCategory">
          <option value="activities" :selected="category == 'activities'">Activities</option>
          <option value="hotels" :selected="category == 'hotels'">Hotels</option>
          <option value="restaurants" :selected="category == 'restaurants'">Restaurants</option>
          <option value="services" :selected="category == 'services'">Services</option>
        </select>
      </div>
    </div>

    <div id="content">
      <ListRow v-for="entity in entities" :key="entity.id"
        :image="entity.image"
        :title="entity.name"
        :description="entity.description"
      ></ListRow>
    </div>

    <footer>
      <button id="toggleContent" type="button" class="btn btn-secondary btn-sm col-12" @click="toggleContent">
        {{toggleContentText()}}
      </button>
    </footer>
  </div>
</template>

<script>
import ws from '@/services/webservice'
import Map from '@/components/Map'
import ListRow from '@/components/ListRow'

export default {
  name: 'fullMap',
  data () {
    return {
      visible: true,
      category: 'activities'
    }
  },
  created () {
    if (this.$route.name !== 'home') {
      this.category = this.$route.name
    }

    this.getEntities()
  },
  mounted () {
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    if (w < 577) {
      this.toggleContent()
    }
  },
  computed: {
    entities () {
      return this.$store.state[this.category]
    }
  },
  methods: {
    getEntities () {
      if (!this.$store.state.activities || !this.$store.state.activities.length) {
        ws.request('get', '/activity', null, this.token)
          .then((response) => {
            this.$store.commit('setActivities', response.activities)
          })
          .catch((error) => {
            console.log('error', error)
          })
      }

      if (!this.$store.state.hotels || !this.$store.state.hotels.length) {
        ws.request('get', '/hotel', null, this.token)
          .then((response) => {
            this.$store.commit('setHotels', response.hotels)
          })
          .catch((error) => {
            console.log('error', error)
          })
      }

      if (!this.$store.state.restaurants || !this.$store.state.restaurants.length) {
        ws.request('get', '/restaurant', null, this.token)
          .then((response) => {
            this.$store.commit('setRestaurants', response.restaurants)
          })
          .catch((error) => {
            console.log('error', error)
          })
      }

      if (!this.$store.state.services || !this.$store.state.services.length) {
        ws.request('get', '/service', null, this.token)
          .then((response) => {
            this.$store.commit('setServices', response.services)
          })
          .catch((error) => {
            console.log('error', error)
          })
      }
    },

    toggleContent (mode = 'fast') {
      if (this.visible === true) {
        $("#content").fadeOut(mode)
        this.visible = false
      } else {
        $("#content").fadeIn(mode)
        this.visible = true
      }
    },

    toggleContentText () {
      if (this.visible === true) {
        return 'Ver mapa'
      } else {
        return 'Ver listado'
      }
    },

    setCategory (event) {
      const category = event.target.value
      if (this.category !== category) {
        this.category = category
        this.$router.push(category)
        this.$store.commit('setList', category)
      }
    }
  },
  components: {
    Map,
    ListRow
  }
}
</script>
