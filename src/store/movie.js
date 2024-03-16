import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

const _defaultMessage = 'Search for the movie title!'
export default {
  // module ! 
  namespaced: true,
  // data! 
  state: () => ({
    movies: [],
    message: _defaultMessage,
    loading: false,
    theMovie: {}
  }), 
    // computed !
    getters: {},
    //data 수정 only
    mutations: {
      updateState(state, payload){
        //['movies',message','loading']
        Object.keys(payload).forEach(key => {
          state[key] = payload[key]
        })
    },
    //변이메소드
      resetMovies(state){
        state.movies = []
        state.message = _defaultMessage,
        state.loading = false
      }
  },
  actions: {
    async searchMovies({ state, commit }, payload) {
      if(state.loading)  return 
      commit('updateState', {
        message: '',
        loading: true
      })
      try {
        const res = await _fetchMovie({
          ...payload,
          page: 1
        })
        const { Search, totalResults } = res.data
        commit('updateState', {
          movies: _uniqBy(Search, 'imdbID')
        })
        console.log(totalResults)  // 268 => 27 페이지
        console.log(typeof totalResults) //String

        const total = parseInt(totalResults, 10)
        const pageLength = Math.ceil(total / 10) // ceil < 올림처리

        // 추가 요청 
        if(pageLength > 1) {
          for(let page = 2; page <= pageLength; page += 1){ 
            if(page > (payload.number / 10)) break
            const res = await _fetchMovie({
              ...payload,
              page
            })
            const { Search } = res.data
            commit('updateState', {
              movies: [...state.movies, 
              ..._uniqBy(Search, 'imdbID')]
            })
          }
        }
      } catch({ message }) {
        commit('updateState', {
          moives: [],
          message
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    },
    async searchMoviesWithId({ state, commit }, payload) {
      if(state.loading) return
      commit('updateState', {
        theMovie: {},
        loading: true     
      })
      try {
        const res = await _fetchMovie(payload)
        console.log(res.data)
        commit('updateState', {
          theMovie: res.data
        })
      } catch (error) {
        commit('updateState', {
          theMovie: {}
        })
        
      }finally {
        commit('updateState',  {
          loading: false
        })
      }
    }
  }
}

async function _fetchMovie(payload) {
  return await axios.post('/.netlify/functions/movie', payload)


  // const { title, type, page, year, id } = payload
  // const OMDB_API_KEY = '7035c60c'
  // const url = id 
  //  ? `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
  //  : `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`


  // return new Promise((resolve, reject) => {
  //   axios.get(url)
  //    .then(res => {
  //     if(res.data.Error) {
  //       reject(res.data.Error)
  //     }
  //      resolve(res)
  //    })
  //    .catch(err => {
  //      reject(err.message)
  //    })
  // })
}