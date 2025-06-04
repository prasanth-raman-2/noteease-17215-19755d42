<script setup lang="ts">
import { useNoteStore } from '@/stores/noteStore'

const store = useNoteStore()

const emit = defineEmits(['selectNote'])

const handleNoteClick = (noteId: string) => {
  emit('selectNote', noteId)
}
</script>

<template>
  <div class="note-list">
    <div
      v-for="note in store.filteredNotes"
      :key="note.id"
      class="note-item"
      @click="handleNoteClick(note.id)"
    >
      <h3>{{ note.title }}</h3>
      <p class="note-preview">{{ note.content.substring(0, 100) }}...</p>
      <div class="note-meta">
        <span class="category">{{ note.category }}</span>
        <span class="date">{{ new Date(note.updatedAt).toLocaleDateString() }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.note-list {
  height: 100%;
  overflow-y: auto;
  padding: 1rem;
}

.note-item {
  padding: 1rem;
  border-bottom: 1px solid var(--color-border);
  cursor: pointer;
  transition: background-color 0.2s;
}

.note-item:hover {
  background-color: var(--color-background-soft);
}

.note-preview {
  color: var(--color-text-light);
  font-size: 0.9rem;
  margin: 0.5rem 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.note-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: var(--color-text-light);
}

.category {
  background-color: #4A90E2;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.date {
  color: var(--color-text-light);
}
</style>
