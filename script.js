new Vue({
    el: "#notebook",
    data: {
        content: localStorage.getItem('content') || 'You can write in **markdown**',
        notes: JSON.parse(localStorage.getItem('notes')) || [],
        selectedId: localStorage.getItem('selected-id') || null,
    },
    computed: {
        selectedNote () {
            // We return the matching note with selectedId
            return this.notes.find(note => note.id === this.selectedId)
        },

        notePreview () {
            // Markdown rendered to HTML
            return this.selectedNote ? marked(this.selectedNote.content) : ''
        },
    },
    methods: {
        saveNote() {
            localStorage.setItem('content', this.content);
            this.reportOperation( 'saving')
        },
        saveNotes() {
            localStorage.setItem('notes', JSON.stringify(this.notes))
            console.log("Notes saved!", new Date())
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
        },
        selectNote(note){
            this.selectedId = note.id
        }
    },

    watch: {
        content: 'saveNote',
        notes: {
            handler: 'saveNotes',
            deep:true
        },
        selectedId(val) {
          localStorage.setItem('selected-id', val)
        },
    },
});


