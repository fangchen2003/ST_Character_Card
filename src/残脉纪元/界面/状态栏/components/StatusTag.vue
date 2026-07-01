<template>
  <div class="status-tag" :class="variantClass">
    <span class="tag-label">{{ label }}</span>
    <span class="tag-value">{{ value }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string;
  value: string;
  variant?: 'normal' | 'info' | 'warning' | 'danger' | 'success' | 'pulse';
}>();

const variantClass = computed(() => {
  switch (props.variant) {
    case 'info':
      return 'tag-info';
    case 'warning':
      return 'tag-warning';
    case 'danger':
      return 'tag-danger';
    case 'success':
      return 'tag-success';
    case 'pulse':
      return 'tag-pulse';
    default:
      return 'tag-normal';
  }
});
</script>

<style lang="scss" scoped>
.status-tag {
  display: inline-flex;
  flex-direction: column;
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid var(--c-border);
  background: rgba(226, 240, 236, 0.04);
}

.tag-label {
  font-size: 0.65rem;
  color: var(--c-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.tag-value {
  font-size: 0.86rem;
  font-weight: 600;
  color: var(--c-text);
  margin-top: 2px;
}

.tag-info .tag-value {
  color: #60a5fa;
}

.tag-warning .tag-value {
  color: #fbbf24;
}

.tag-danger .tag-value {
  color: #f87171;
}

.tag-success .tag-value {
  color: #34d399;
}

.tag-pulse .tag-value {
  color: var(--c-pulse);
}
</style>
