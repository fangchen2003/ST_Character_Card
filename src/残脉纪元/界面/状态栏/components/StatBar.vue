<template>
  <div class="stat-row">
    <span class="stat-label">{{ label }}</span>
    <div class="stat-track">
      <div
        class="stat-fill"
        :class="fillClass"
        :style="{ width: clampedValue + '%' }"
      ></div>
    </div>
    <span v-if="showValue" class="stat-value">{{ clampedValue }}</span>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label: string;
    value: number;
    color?: 'pulse' | 'stamina' | 'load' | 'sanity' | 'desire' | 'goodwill' | 'erosion' | 'skill';
    showValue?: boolean;
  }>(),
  {
    color: 'pulse',
    showValue: true,
  },
);

const clampedValue = computed(() => _.clamp(props.value, 0, 100));

const fillClass = computed(() => {
  switch (props.color) {
    case 'stamina':
      return 'fill-stamina';
    case 'load':
      return 'fill-load';
    case 'sanity':
      return 'fill-sanity';
    case 'desire':
      return 'fill-desire';
    case 'goodwill':
      return 'fill-goodwill';
    case 'erosion':
      return 'fill-erosion';
    case 'skill':
      return 'fill-skill';
    default:
      return 'fill-pulse';
  }
});
</script>

<style lang="scss" scoped>
.stat-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 0;
}

.stat-label {
  width: 72px;
  flex-shrink: 0;
  font-size: 0.8rem;
  color: var(--c-muted);
}

.stat-track {
  flex: 1;
  height: 8px;
  background: rgba(226, 240, 236, 0.08);
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--c-border);
}

.stat-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.35s ease;
}

.fill-pulse {
  background: linear-gradient(90deg, var(--c-pulse-dim), var(--c-pulse));
  box-shadow: 0 0 6px rgba(45, 212, 191, 0.3);
}

.fill-stamina {
  background: linear-gradient(90deg, #0e7490, var(--c-stamina));
}

.fill-load {
  background: linear-gradient(90deg, #c2410c, var(--c-load));
}

.fill-sanity {
  background: linear-gradient(90deg, #4338ca, var(--c-sanity));
}

.fill-desire {
  background: linear-gradient(90deg, #be185d, var(--c-desire));
}

.fill-goodwill {
  background: linear-gradient(90deg, #047857, var(--c-goodwill));
}

.fill-erosion {
  background: linear-gradient(90deg, var(--c-erosion-low), var(--c-erosion-high));
}

.fill-skill {
  background: linear-gradient(90deg, #7c3aed, var(--c-skill));
}

.stat-value {
  width: 34px;
  flex-shrink: 0;
  text-align: right;
  font-size: 0.8rem;
  font-weight: bold;
  color: var(--c-text);
}
</style>
