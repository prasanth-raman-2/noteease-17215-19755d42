import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface Note {
  id: string
  title: string
  content: string
  category: string
  createdAt: Date
  updatedAt: Date
}

export const useNoteStore = defineStore('notes', () => {
  const notes = ref<Note[]>([])
  const searchQuery = ref('')
  const selectedCategory = ref('')

  const filteredNotes = computed(() => {
    let filtered = notes.value

    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(
        note =>
          note.title.toLowerCase().includes(query) ||
          note.content.toLowerCase().includes(query)
      )
    }

    if (selectedCategory.value) {
      filtered = filtered.filter(note => note.category === selectedCategory.value)
    }

    return filtered.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
  })

  const categories = computed(() => {
    const categorySet = new Set(notes.value.map(note => note.category))
    return Array.from(categorySet)
  })

  function addNote(title: string, content: string, category: string) {
    const newNote: Note = {
      id: Date.now().toString(),
      title,
      content,
      category,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    notes.value.push(newNote)
  }

  function updateNote(id: string, title: string, content: string, category: string) {
    const note = notes.value.find(n => n.id === id)
    if (note) {
      note.title = title
      note.content = content
      note.category = category
      note.updatedAt = new Date()
    }
  }

  function deleteNote(id: string) {
    const index = notes.value.findIndex(n => n.id === id)
    if (index !== -1) {
      notes.value.splice(index, 1)
    }
  }

  function setSearchQuery(query: string) {
    searchQuery.value = query
  }

  function setSelectedCategory(category: string) {
    selectedCategory.value = category
  }

  return {
    notes,
    filteredNotes,
    categories,
    searchQuery,
    selectedCategory,
    addNote,
    updateNote,
    deleteNote,
    setSearchQuery,
    setSelectedCategory
  }
})
