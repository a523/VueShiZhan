<template>
    <main class="faq">
      <h1>Frenquently Asked Questions</h1>
      <div class="error" v-if="error">Can't load the questions</div>
      <Loading v-if="loading"/>
      <section class="list">
        <article v-for="question of questionLists">
          <h2 v-html="question.title"></h2>
          <p v-html="question.content"></p>
        </article>
      </section>
    </main>
</template>

<script>
    import RemoteData from "../mixins/RemoteData";

    export default {
        name: "FAQ",
        mixins: [
          RemoteData({questionLists: 'questions'}),
        ],
        data () {
          return {
            questions: [],
            error: null,
            loading: false,
          }
        },
      async created() {
          this.loading = true
          try {
              this.questions = await this.$fetch('questions')
          } catch (e) {
              this.error = e
          }
          this.loading = false
        },
    }
</script>

<style scoped>

</style>
