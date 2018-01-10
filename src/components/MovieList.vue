<template>
    <div id="movie-list">
        <div v-if="filteredMovies.length">
            <movie-item v-for="movie in filteredMovies" class="movie"
                        v-bind:movie="movie.movie">

                <div class="movie-sessions">
                    <div class="session-time-wrapper tooltip-wrapper" v-for="session in filteredSessions(movie.sessions)"
                    v-tooltip="{ seats: session.seats }">
                        <div class="session-time">{{ formatSessionTime(session.time) }}</div>
                    </div>
                </div>
            </movie-item>
        </div>
        <div v-else-if="movies.length === 0">
            Loading...
        </div>
        <div v-else>{{ noResults }}</div>
    </div>
</template>
<script>
import genres from '../util/genres'
import MovieItem from './MovieItem.vue'
import times from '../util/times'
export default {
  methods: {
    formatSessionTime (raw) {
      return this.$moment(raw).format('h:mm A')
    },
    filteredSessions (sessions) {
      return sessions.filter(this.sessionPassesTimeFilter)
    },
    moviePassesGenreFilter (movie) {
      if (!this.genre.length) {
        return true
      } else {
        let movieGenres = movie.movie.Genre.split(", ")
        let matched = true
        this.genre.forEach(function (genre) {
          if (movieGenres.indexOf(genre) === -1) {
            matched = false
          }
        })
        return matched
      }
    },
    sessionPassesTimeFilter(session) {
      if (!this.day.isSame(this.$moment(session.time), 'day')) {
        return false
      } else if (this.time.length === 0 || this.time.length === 2) {
        return true
      } else if (this.time[0] === times.AFTER_6PM) {
        return this.$moment(session.time).hour() >= 18
      } else {
        return this.$moment(session.time).hour() < 18
      }
      return true
    }
  },
  props: [ 'genre', 'times', 'movies', 'day', 'time' ],
  computed: {
    filteredMovies () {
      return this.movies
        .filter(this.moviePassesGenreFilter)
        .filter(movie => movie.sessions.find(this.sessionPassesTimeFilter))
    },
    noResults() {
      let times = this.time.join(', ')
      let genres = this.genre.join(', ')
      let comma = this.time.length > 0 ? ', ' : ''
      return `No result for ${times}${comma} ${genres}`
    }
  },
  components: {
    MovieItem
  }
}
</script>