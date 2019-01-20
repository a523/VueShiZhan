new Vue({
    el: "#notebook",
    data: {
        content: localStorage.getItem('content') || 'You can write in **markdown**',
        notes: [],
    },
    computed: {
      // Markdown 渲染为HTML
      notePreview () {
          return marked(this.content)
      }
    },
    methods: {
        saveNote() {
            localStorage.setItem('content', this.content);
            this.reportOperation( 'saving')
        },
        reportOperation(opName) {
            console.log('The', opName, 'operation was completed!')
        },
        addNote(){
            const time = Date.now();
            const note = {
                id: String(time),
                title: 'New note ' + (this.notes.length + 1),
                content: '**Hi**',
                created: time,
                favorite: false,
                };
            this.notes.push(note)
        }
    },

    watch: {
        content: 'saveNote'
    },
});


