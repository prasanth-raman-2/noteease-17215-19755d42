<script setup lang="ts">
import { ref } from 'vue'
import { useNoteStore } from '@/stores/noteStore'
import NoteList from './NoteList.vue'
import NoteEditor from './NoteEditor.vue'

const store = useNoteStore()
const selectedNoteId = ref<string | undefined>()

const handleNoteSelect = (noteId: string) => {
  selectedNoteId.value = noteId
}

const handleNewNote = () => {
  selectedNoteId.value = undefined
}
</script>

<template>
  <div class="main-container">
    <div class="top-bar">
      <input
        type="text"
        v-model="store.searchQuery"
        placeholder="Search notes..."
        class="search-input"
      />
      <select
        v-model="store.selectedCategory"
        class="category-filter"
      >
        <option value="">All Categories</option>
        <option
          v-for="category in store.categories"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>
      <button class="new-note-button" @click="handleNewNote">
        New Note
      </button>
    </div>
    <div class="content-area">
      <div class="sidebar">
        <NoteList @selectNote="handleNoteSelect" />
      </div>
      <div class="editor-container">
        <NoteEditor :noteId="selectedNoteId" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #F5F7FA;
}

.top-bar {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background-color: white;
  border-bottom: 1px solid var(--color-border);
}

.search-input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
}

.category-filter {
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background-color: white;
}

.new-note-button {
  padding: 0.5rem 1rem;
  background-color: #4A90E2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.content-area {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.sidebar {
  width: 300px;
  background-color: white;
  border-right: 1px solid var(--color-border);
  overflow-y: auto;
}

.editor-container {
  flex: 1;
  background-color: white;
  overflow-y: auto;
}
</style>
