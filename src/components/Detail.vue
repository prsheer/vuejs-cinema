<template>
  <div id="detail" v-if="movie">
    <movie-item v-bind:movie="movie">
      <div class="movie-details">
        <p class="movie-genre">
          {{ movie.Genre }}
        </p>
        <p class="movie-plot">
          {{ movie.Plot }}
        </p>
        <table>
          <tr>
            <td>Released date: {{ movie.Released }}</td>
            <td>Running time: {{ movie.Runtime }}</td>
            <td>Director: {{ movie.Director }}</td>
            <td>Cast: {{ movie.Actors}}</td>
          </tr>
        </table>
      </div>
    </movie-item>
    <div class="home">
      <router-link v-bind:to="{ name: 'home'}">Back to home</router-link>
    </div>
  </div>
</template>
<script>
  import MovieItem from './MovieItem.vue'
  export default {
    props: ['movies'],
    computed: {
      movie() {
        let movie = this.movies.find(movie => movie.id === this.$route.params.id)
        return movie ? movie.movie : null
      }
    },
    components: {
      MovieItem
    }
  }
</script>