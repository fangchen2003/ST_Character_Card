<template>
  <div class="pulse-journal">
    <header class="journal-header">
      <div class="header-glyph"></div>
      <div class="header-text">
        <h1 class="journal-title">残脉纪元</h1>
        <span class="journal-subtitle">导脉师手记 · 鸣野城</span>
      </div>
      <div class="header-glyph flipped"></div>
    </header>

    <TabNav v-model="active_tab" :tabs="tabs" />

    <main class="journal-body">
      <ProtagonistPanel v-if="active_tab === '主角'" />
      <HeroinePanel v-else-if="active_tab === '莉赛尔'" name="莉赛尔" :data="store.data.莉赛尔" />
      <HeroinePanel v-else-if="active_tab === '迦叶'" name="迦叶" :data="store.data.迦叶" />
      <HeroinePanel v-else-if="active_tab === '希尔薇'" name="希尔薇" :data="store.data.希尔薇" />
    </main>
  </div>
</template>

<script setup lang="ts">
import HeroinePanel from './components/HeroinePanel.vue';
import ProtagonistPanel from './components/ProtagonistPanel.vue';
import TabNav from './components/TabNav.vue';
import { useDataStore } from './store';

const store = useDataStore();

const tabs = [
  { id: '主角', label: '主角' },
  { id: '莉赛尔', label: '莉赛尔' },
  { id: '迦叶', label: '迦叶' },
  { id: '希尔薇', label: '希尔薇' },
];

const active_tab = useLocalStorage<string>('残脉纪元:状态栏:active_tab', '主角');
</script>

<style lang="scss" scoped>
.pulse-journal {
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
  background: var(--c-card);
  border: 1px solid var(--c-border);
  border-radius: 6px;
  box-shadow: 0 0 18px rgba(45, 212, 191, 0.08);
  overflow: hidden;
}

.journal-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 14px 16px;
  background: linear-gradient(90deg, transparent, rgba(45, 212, 191, 0.08), transparent);
  border-bottom: 1px solid var(--c-border);
}

.header-glyph {
  width: 32px;
  height: 32px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232dd4bf' stroke-width='1.2'%3E%3Cpath d='M12 2C7 2 4 7 4 12s3 10 8 10 8-5 8-10-3-10-8-10z'/%3E%3Cpath d='M12 6v6l4 2'/%3E%3Cpath d='M8 14c1.5 2 4.5 2 6 0'/%3E%3Cpath d='M7 10c2-1 5-1 7 0'/%3E%3Cpath d='M6 17c3 2 7 2 10 0'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  opacity: 0.7;
}

.header-glyph.flipped {
  transform: scaleX(-1);
}

.header-text {
  text-align: center;
}

.journal-title {
  font-size: 1.35rem;
  font-weight: bold;
  color: var(--c-pulse);
  letter-spacing: 0.15em;
  text-shadow: 0 0 8px rgba(45, 212, 191, 0.35);
}

.journal-subtitle {
  display: block;
  font-size: 0.72rem;
  color: var(--c-muted);
  letter-spacing: 0.08em;
  margin-top: 2px;
}

.journal-body {
  padding: 14px;
}
</style>
