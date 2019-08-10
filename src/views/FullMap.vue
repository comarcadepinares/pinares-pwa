<template>
  <div id="fullMap">
    <Map :category="category"></Map>

    <button id="menuButton" type="button" class="btn btn-primary" @click="toggleMenu">Menu</button>
    <div id="menu">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">PINARES</a>
      </nav>
      <div class="menuSection">
        <h5>Category</h5>
        <div class="form-group">
          <select class="custom-select" @change="setCategory">
            <option value="activities" :selected="category == 'activities'">Activities</option>
            <option value="hotels" :selected="category == 'hotels'">Hotels</option>
            <option value="restaurants" :selected="category == 'restaurants'">Restaurants</option>
            <option value="services" :selected="category == 'services'">Services</option>
          </select>
        </div>
      </div>
      <div class="menuSection">
        <div class="list-row">
          <div class="img">
            <img style="width: 100%; display: block;" src="/img/Duruelo.png" alt="Card image">
          </div>
          <div class="text">
            <h6>La lalala</h6>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
        </div>
        <div class="list-row">
          <div class="img">
            <img style="width: 100%; display: block;" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22318%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20318%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_158bd1d28ef%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A16pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_158bd1d28ef%22%3E%3Crect%20width%3D%22318%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22129.359375%22%20y%3D%2297.35%22%3EImage%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" alt="Card image">
          </div>
          <div class="text">
            <h6>La lalala</h6>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
        </div>
        <div class="list-row">
          <div class="img">
            <img style="width: 100%; display: block;" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22318%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20318%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_158bd1d28ef%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A16pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_158bd1d28ef%22%3E%3Crect%20width%3D%22318%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22129.359375%22%20y%3D%2297.35%22%3EImage%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" alt="Card image">
          </div>
          <div class="text">
            <h6>La lalala</h6>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
        </div>
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

    toggleMenu (mode = 'fast') {
      if (this.visible === true) {
        $("#menu").fadeOut(mode)
        this.visible = false
      } else {
        $("#menu").fadeIn(mode)
        this.visible = true
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
    Map
  }
}
</script>
