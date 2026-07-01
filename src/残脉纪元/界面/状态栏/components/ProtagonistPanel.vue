<template>
  <div class="protagonist-panel">
    <section class="stats-section">
      <h2 class="section-title">
        <span class="title-icon">◈</span>
        导脉师状态
      </h2>
      <div class="fund-badge">
        <span class="fund-label">资金</span>
        <span class="fund-value">{{ store.data.主角.资金 }} 币</span>
      </div>
      <StatBar label="体力" :value="store.data.主角.体力" color="stamina" />
      <StatBar label="脉能负荷" :value="store.data.主角.脉能负荷" color="load" />
      <StatBar label="理智值" :value="store.data.主角.理智值" color="sanity" />
      <StatBar label="情欲值" :value="store.data.主角.情欲值" color="desire" />
      <StatBar label="导脉技巧" :value="store.data.主角.导脉技巧" color="skill" />
    </section>

    <InventoryPanel :items="store.data.主角.物品栏" />
  </div>
</template>

<script setup lang="ts">
import InventoryPanel from './InventoryPanel.vue';
import StatBar from './StatBar.vue';
import { useDataStore } from '../store';

const store = useDataStore();
</script>

<style lang="scss" scoped>
.protagonist-panel {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stats-section {
  background: rgba(6, 16, 14, 0.35);
  border: 1px solid var(--c-border);
  border-radius: 4px;
  padding: 12px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.92rem;
  color: var(--c-pulse);
  margin-bottom: 10px;
  padding-bottom: 6px;
  border-bottom: 1px dashed var(--c-border);
}

.title-icon {
  color: var(--c-pulse);
  font-size: 0.8rem;
}

.fund-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  padding: 5px 10px;
  background: rgba(245, 158, 11, 0.1);
  border: 1px solid rgba(245, 158, 11, 0.25);
  border-radius: 4px;
}

.fund-label {
  font-size: 0.7rem;
  color: var(--c-muted);
  text-transform: uppercase;
}

.fund-value {
  font-size: 0.9rem;
  font-weight: bold;
  color: #fbbf24;
}
</style>
