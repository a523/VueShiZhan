Vue.filter('date', time => moment(time).format('DD/MM/YY, HH:mm'));
app = new Vue({
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
        sortedNotes(){
            return this.notes.slice().sort((a, b) => a.created - b.create)
                .sort((a, b) => (a.favorite === b.favorite) ? 0: a.favorite ? -1 : 1)
        },
        linesCount(){
            if (this.selectedNote){
                // 计算换行符的个数
                 return this.selectedNote.content.split(/\r\n|\r|\n/).length
            }
        },
        wordsCount() {
            var s = this.selectedNote.content
            // Turn new line cahracters into white-spaces
            s = s.replace(/\n/g, ' ')
            // Exclude start and end white-spaces
            s = s.replace(/(^\s*)|(\s*$)/gi, '')
            // Turn 2 or more duplicate white-spaces into 1
            s = s.replace(/[ ]{2,}/gi, ' ')
            // Return the number of spaces
            return s.split(' ').length
        },

        charactersCount(){
            if (this.selectedNote) {
                return this.selectedNote.content.split('').length
            }
        }
    },
    methods: {
        saveNote() {
            localStorage.setItem('content', this.content);
            this.reportOperation( 'saving')
        },
        saveNotes() {
            localStorage.setItem('notes', JSON.stringify(this.notes));
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
        },
        removeNote(){
            if (this.selectedNote && confirm('Delete the note?')){
                const index = this.notes.indexOf(this.selectedNote);
                if (index !== -1) {
                    this.notes.splice(index, 1)
                }
            }
        },
        favoriteNote(){
            this.selectedNote.favorite = !this.selectedNote.favorite
        },
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


