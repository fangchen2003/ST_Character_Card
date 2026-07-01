<template>
  <section class="inventory-section">
    <h2 class="section-title">
      <span class="title-icon">◈</span>
      物品栏
    </h2>
    <div v-if="!_.isEmpty(items)" class="inventory-list">
      <div v-for="(item, name) in items" :key="name" class="inventory-item">
        <div class="item-icon">{{ iconFor(name as string) }}</div>
        <div class="item-info">
          <span class="item-name">{{ name }}</span>
          <span class="item-desc">{{ item.描述 }}</span>
        </div>
        <span class="item-qty">×{{ item.数量 }}</span>
      </div>
    </div>
    <div v-else class="inventory-empty">背包空空，只余脉合油的残香。</div>
  </section>
</template>

<script setup lang="ts">
import _ from 'lodash';

const props = defineProps<{
  items: Record<string, { 描述: string; 数量: number }>;
}>();

function iconFor(name: string): string {
  if (name.includes('药') || name.includes('剂')) return '药';
  if (name.includes('油')) return '油';
  if (name.includes('织物') || name.includes('衣')) return '织';
  if (name.includes('脉')) return '脉';
  if (name.includes('武器') || name.includes('刃')) return '刃';
  if (name.includes('食物') || name.includes('粮')) return '粮';
  if (name.includes('钥匙') || name.includes('凭证')) return '钥';
  if (name.includes('币') || name.includes('钱')) return '钱';
  return name.substring(0, 1);
}
</script>

<style lang="scss" scoped>
.inventory-section {
  margin-top: 12px;
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

.inventory-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 8px;
}

.inventory-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background: rgba(6, 16, 14, 0.5);
  border: 1px solid var(--c-border);
  border-radius: 4px;
}

.item-icon {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(45, 212, 191, 0.12);
  color: var(--c-pulse);
  border: 1px solid var(--c-border);
  border-radius: 3px;
  font-size: 0.78rem;
  font-weight: bold;
}

.item-info {
  flex: 1;
  min-width: 0;
}

.item-name {
  display: block;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--c-text);
}

.item-desc {
  display: block;
  font-size: 0.7rem;
  color: var(--c-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-qty {
  font-size: 0.78rem;
  color: var(--c-pulse);
  font-weight: bold;
}

.inventory-empty {
  text-align: center;
  padding: 18px;
  color: var(--c-muted);
  font-size: 0.82rem;
  font-style: italic;
  border: 1px dashed var(--c-border);
  border-radius: 4px;
}
</style>
