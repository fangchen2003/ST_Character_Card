<template>
  <nav class="pulse-tabs">
    <button
      v-for="tab in props.tabs"
      :key="tab.id"
      class="pulse-tab"
      :class="{ active: model === tab.id }"
      @click="toggleTab(tab.id)"
    >
      {{ tab.label }}
    </button>
  </nav>
</template>

<script setup lang="ts">
const props = defineProps<{
  tabs: { id: string; label: string }[];
}>();

const model = defineModel<string>({ required: true });

function toggleTab(id: string) {
  model.value = id;
}
</script>

<style lang="scss" scoped>
.pulse-tabs {
  display: flex;
  background: rgba(6, 16, 14, 0.7);
  border-bottom: 1px solid var(--c-border);
}

.pulse-tab {
  flex: 1;
  padding: 10px 6px;
  border: none;
  background: transparent;
  color: var(--c-muted);
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border-right: 1px solid var(--c-border);
  letter-spacing: 0.04em;
}

.pulse-tab:last-child {
  border-right: none;
}

.pulse-tab:hover {
  color: var(--c-text);
  background: rgba(45, 212, 191, 0.06);
}

.pulse-tab.active {
  color: var(--c-bg-deep);
  background: var(--c-pulse);
  box-shadow: 0 0 12px rgba(45, 212, 191, 0.25);
}
</style>
