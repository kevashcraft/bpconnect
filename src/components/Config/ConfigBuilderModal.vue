<template>
  <div class="ui tiny modal">
    <i class="close icon"></i>
    <div class="header">{{ method }} Builder</div>
    <div class="content">
      <form class="ui form">
        <div class="field">
          <label>Builder Name</label>
          <input type="text" v-model="builder.name" placeholder="Builder Name">
        </div>
        <div class="field">
          <label>Phone Number</label>
          <input type="text" v-model="builder.phone" placeholder="Phone number">
        </div>
        <div class="field">
          <label>Email Address</label>
          <input type="email" v-model="builder.email" placeholder="Email address">
        </div>
        <div class="field">
          <label>Street Address</label>
          <input type="text" v-model="builder.address" placeholder="Street address">
        </div>
        <div class="field">
          <label>City, State & ZIP</label>
          <div class="ui search" ref="locations">
            <input type="text" class="prompt" placeholder="Location">
            <div class="results"></div>
          </div>
        </div>
      </form>
    </div>
    <div class="actions">
      <div class="ui left floated black deny button">Exit</div>
      <div class="ui left floated red button" @click="deleteIt" v-show="!builder.deleted && method != 'Create'">Delete</div>
      <div class="ui left floated blue button" @click="undelete" v-show="builder.deleted">UnDelete</div>
      <div class="ui green labeled icon button" @click="post">
        {{ this.method }}
        <i class="checkmark icon"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import Modal from '../Modal/Modal'

  export default {
    mixins: [ Modal ],
    data () {
      return {
        meta: {
          name: 'ConfigBuilderModal'
        },
        method: '',
        builder: {},
        updating: false,
      }
    },
    mounted () {
      $(this.$el).find('.prompt').on('focus', function() { this.select() })
      $(this.$refs.locations).search({
        selectFirstResult: true,
        apiSettings: {
          responseAsync: (settings, callback) => {
            let route = 'Locations:search'
            let data = { query: settings.urlData.query }
            this.$root.req(route, data).then(callback)
          }
        },
        onSelect: (value) => {
          this.builder.zipcodeId = value.id
        }
      })
    },
    methods: {
      afterOpen (builder) {
        if (builder) {
          this.builder = builder
          $(this.$refs.locations).search('set value', builder.citystate)
          this.method = 'Update'
        } else {
          this.method = 'Create'
          this.builder = {
            name: '',
          }
          $(this.$refs.locations).search('set value', '')
        }
      },
      post () {
        let method = this.method.toLowerCase()
        if (this.validate()) {
          this[method]()
        }
      },
      validate () {
        let valid = true
        this.builder.name = this.builder.name.trim()
        if (!this.builder.name.length) {
          this.$root.noty('Provide a builder name', 'warning')
          valid = false
        }

        return valid
      },
      create () {
        this.$root.req('Builders:create', this.builder).then((response) => {
          if (response) {
            this.close()
            this.$emit('update')
            this.$root.noty(`Builder has been created`)
          } else {
            this.$root.noty('Could not create the builder', 'error')
          }
        })
      },
      deleteIt () {
        this.$root.req('Builders:delete', this.builder).then((response) => {
          if (response) {
            this.close()
            this.$emit('update')
            this.$root.noty(`Builder has been deleted`)
          } else {
            this.$root.noty('Could not undelete the builder', 'error')
          }
        })
      },
      undelete () {
        this.$root.req('Builders:undelete', this.builder).then((response) => {
          if (response) {
            this.close()
            this.$emit('update')
            this.$root.noty(`Builder has been undeleted`)
          } else {
            this.$root.noty('Could not undelete the builder', 'error')
          }
        })
      },
      update (event) {
        this.$root.req('Builders:update', this.builder).then((response) => {
          if (response) {
            this.close()
            this.$emit('update')
            this.$root.noty(`Builder has been updated`)
          } else {
            this.$root.noty('Could not update the builder', 'error')
          }
        })
      },
    },
  }
</script>
