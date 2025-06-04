<script setup lang="ts">
import { ref, watch } from 'vue'
import { useNoteStore } from '@/stores/noteStore'

const store = useNoteStore()

const props = defineProps<{
  noteId?: string
}>()

const title = ref('')
const content = ref('')
const category = ref('')

const resetForm = () => {
  title.value = ''
  content.value = ''
  category.value = ''
}

const handleSave = () => {
  if (props.noteId) {
    store.updateNote(props.noteId, title.value, content.value, category.value)
  } else {
    store.addNote(title.value, content.value, category.value)
    resetForm()
  }
}

watch(
  () => props.noteId,
  (newId) => {
    if (newId) {
      const note = store.notes.find(n => n.id === newId)
      if (note) {
        title.value = note.title
        content.value = note.content
        category.value = note.category
      }
    } else {
      resetForm()
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="note-editor">
    <div class="editor-header">
      <input
        v-model="title"
        type="text"
        placeholder="Note title"
        class="title-input"
      />
      <select v-model="category" class="category-select">
        <option value="">Select category</option>
        <option
          v-for="cat in store.categories"
          :key="cat"
          :value="cat"
        >
          {{ cat }}
        </option>
        <option value="new">+ New Category</option>
      </select>
    </div>
    <textarea
      v-model="content"
      placeholder="Start writing your note..."
      class="content-input"
    ></textarea>
    <div class="editor-actions">
      <button
        class="save-button"
        @click="handleSave"
        :disabled="!title || !content"
      >
        {{ props.noteId ? 'Update' : 'Save' }} Note
      </button>
      <button
        v-if="props.noteId"
        class="delete-button"
        @click="store.deleteNote(props.noteId)"
      >
        Delete Note
      </button>
    </div>
  </div>
</template>

<style scoped>
.note-editor {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.editor-header {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.title-input {
  flex: 1;
  font-size: 1.5rem;
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
}

.category-select {
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background-color: white;
}

.content-input {
  flex: 1;
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  resize: none;
  font-family: inherit;
  margin-bottom: 1rem;
}

.editor-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.save-button,
.delete-button {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: bold;
}

.save-button {
  background-color: #4A90E2;
  color: white;
}

.save-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.delete-button {
  background-color: #ff4444;
  color: white;
}
</style>
