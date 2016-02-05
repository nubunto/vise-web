<script>
export default {
  ready () {
    this.loadLinks()
  },
  data () {
    return {
      userToken: localStorage.getItem('user-token') || '',
      days: 0,
      files: []
    }
  },
  computed: {
    viewFiles () {
      var ret = []
      for (var i = 0; i < this.files.length; i++) {
        ret.push({
          url: 'http://localhost:8090' + this.files[i],
          filename: this.files[i].substr(14)
        })
      }
      return ret
    }
  },
  methods: {
    uploadFile (e) {
      e.preventDefault()
      var file = this.$els.file.files[0]
      var days = this.days
      if (file && days) {
        var data = new FormData()
        data.append('user-token', this.userToken)
        data.append('days', this.days)
        data.append('file', this.$els.file.files[0])
        this.$http.post('http://localhost:8090/api/save', data).then((response, status, request) => {
          localStorage.setItem('user-token', response.data.user_token)
          this.$set('userToken', response.data.user_token)
          this.loadLinks()
        }).catch((data, status, request) => {
          console.log(data, status, request)
        })
      }
    },
    loadLinks () {
      var userToken = this.userToken
      var url = `http://localhost:8090/api/${userToken}/links`
      this.$http.get(url).then((response, status, request) => {
        this.$set('files', response.data.links)
      })
    }
  }
}
</script>
<template>
<h1>Vise</h1>
<form enctype="multipart/form-data" novalidate>
  <div class="file-field input-field">
    <div class="btn">
      <span>File</span>
      <input type="file" v-el:file name="file"><br><br>
    </div>
      <div class="file-path-wrapper">
      <input class="file-path" type="text" placeholder="Upload file">
    </div>
  </div>
  <p>
    <input id="day3" v-model="days" type="radio" name="days" value="3">
    <label for="day3">3 days</label>
  </p>
  <p>
    <input id="day9" v-model="days" type="radio" name="days" value="9">
    <label for="day9">9 days</label>
  </p>
  <p>
    <input id="day12" v-model="days" type="radio" name="days" value="12">
    <label for="day12">12 days</label>
  </p>
  <br>
  <hr>
  <button class="waves-effect waves-light btn" @click="uploadFile">
    Submit
  </button>
</form>
<div class="row">
  <div class="col s12">
    <h2>Uploaded Files</h2>
    <div id="links">
      <div v-for="file in viewFiles">
      <a href="{{file.url}}">{{file.filename}}</a>
    </div>
  </div>
</div>
</template>
