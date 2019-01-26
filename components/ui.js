Vue.component('top-bar',{
    props: ['players', 'currentPlayerIndex', 'turn'],
    template: `<div class="top-bar" :class="'player-' + currentPlayerIndex">
        <div class="player p0">{{ players[0].name }}</div>
        
        <div class="turn-counter">
            <img class="arrow" src="svg/turn.svg"/>
            <div class="turn">Turn {{ turn }}</div>
        </div>
        
        <div class="player p1">{{ players[1].name }}</div>
</div>`,
    created() {
        console.log(this.players)
    }
})

Vue.component('card', {
    methods: {
      play() {
          this.$emit('play')
      },
    },
    template: `<div class="card" :class="'type-' + def.type" @click="play">
        <div class="title">{{ def.title }}</div>
        <img class="separator" src="svg/card-separator.svg">
        <div class="description"><div v-html="def.note"></div></div>
        <div class="note" v-if="def.note"><div v-html="def.note"></div></div>
</div>`,
    props: ['def'],
});

Vue.component('hand', {
    template: `<div class="hand">
<div class="wrapper">
    <card v-for="card of cards" :def="card.def"/> 
</div>
</div>`,
    props: ['cards'],
});