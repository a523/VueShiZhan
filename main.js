new Vue({
    name: 'game',
    el: '#app',
    methods: {
        handlePlay(){
            console.log("You played a card")
        },

        testDrawCard() {
            const ids = Object.keys(cards)
            const randomId = ids[Math.floor(Math.random() * ids.length)]
            return {
                uid: cardUid++,
                id: randomId,
                def: cards[randomId],
            }
        },
        createsTestHand(){
            const cards = [];
            const ids = Object.keys(cards);

            for (let i = 0; i < 5; i++){
                cards.push(this.testDrawCard())
            }

            return cards
        },




    },
    template: `<div id="#app">
        <top-bar :turn="turn" :current-player-index="currentPlayerIndex" :players="players" />
        <card :def="testCard"  @play="handlePlay"/>
        <transition name="hand">
        <hand v-if="!activeOverlay" :cards="testHand"/>
        </transition>
        </div>`,
    data: state,

    computed: {
        testCard(){
            return cards.archers
        },
    },

    created:function () {
        this.testHand = this.createsTestHand()
    },

});

window.addEventListener('resize', () => {
    state.worldRatio = getWorldRatio()
});