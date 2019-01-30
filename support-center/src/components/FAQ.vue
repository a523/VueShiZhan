<template>
    <main class="faq">
      <h1>Frenquently Asked Questions</h1>
      <div class="error" v-if="hasRemoteErrors">Can't load the questions</div>
      <Loading v-if="remoteDataBusy"/>
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
    }
</script>

<style scoped>

</style>
