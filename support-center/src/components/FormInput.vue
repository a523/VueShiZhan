<template>
   <div class="row">
     <input
       class="input"
       :class="inputClass"
       :name="name"
       :type="type"
       :value.prop="value"
       :placeholder="placeholder"
       @input="update"
     />
   </div>
</template>

<script>
    export default {
        name: "FormInput",
        props: {
          name: {
            type: String,
          },
          type: {
            type: String,
            default: 'text'
          },
          value: {
            required: true,
          },
          placeholder: {
            type: String,
          },
          invalid: {
            type: Boolean,
            default: false,
          },
        },
        computed: {
          inputClass (){
            return {
              'invalid': this.invalid,
            }
          }
        },
        methods:{
          update (event) {
            this.$emit('input', event.currentTarget.value)
          },
        },
    }
</script>

<style scoped>

</style>
