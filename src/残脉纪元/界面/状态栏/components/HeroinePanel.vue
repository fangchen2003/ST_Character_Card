<template>
  <div class="heroine-panel">
    <section class="stats-section">
      <h2 class="section-title">
        <span class="title-icon">◈</span>
        {{ name }} · 状态
      </h2>
      <div class="tag-row">
        <StatusTag label="身体状况" :value="data.身体状况" :variant="bodyVariant" />
        <StatusTag label="气味浓度" :value="data.气味浓度" :variant="scentVariant" />
      </div>
      <StatBar label="好感度" :value="data.好感度" color="goodwill" />
      <StatBar label="侵蚀度" :value="data.侵蚀度" color="erosion" />
      <StatBar label="理智值" :value="data.理智值" color="sanity" />
      <StatBar label="情欲值" :value="data.情欲值" color="desire" />
    </section>

    <section class="text-section">
      <h2 class="section-title">
        <span class="title-icon">◈</span>
        对主角态度
      </h2>
      <p class="text-block">{{ data.对主角态度 }}</p>
    </section>

    <section class="text-section">
      <h2 class="section-title">
        <span class="title-icon">◈</span>
        当前着装
      </h2>
      <p class="text-block">{{ data.当前着装 }}</p>
    </section>

    <section class="text-section">
      <h2 class="section-title">
        <span class="title-icon">◈</span>
        身体部位描写
      </h2>
      <p class="text-block">{{ data.身体部位描写 }}</p>
    </section>

    <section class="stats-section">
      <h2 class="section-title">
        <span class="title-icon">◈</span>
        敏感度开发
      </h2>
      <StatBar label="腿部" :value="data.腿部敏感度" color="desire" />
      <StatBar label="肚脐" :value="data.肚脐敏感度" color="desire" />
      <StatBar label="腋下" :value="data.腋下敏感度" color="desire" />
    </section>
  </div>
</template>

<script setup lang="ts">
import StatBar from './StatBar.vue';
import StatusTag from './StatusTag.vue';
import type { z } from 'zod';
import type { Schema } from '../../../脚本/变量结构/schema';

type HeroineData = z.infer<typeof Schema>['莉赛尔'];

const props = defineProps<{
  name: string;
  data: HeroineData;
}>();

const bodyVariant = computed(() => {
  switch (props.data.身体状况) {
    case '正常':
      return 'success';
    case '脉毒微积':
      return 'warning';
    case '深度侵蚀':
      return 'danger';
    case '雌堕发情':
      return 'danger';
    default:
      return 'normal';
  }
});

const scentVariant = computed(() => {
  switch (props.data.气味浓度) {
    case '清新':
      return 'success';
    case '微汗':
      return 'info';
    case '浓郁体香':
      return 'warning';
    case '甜腻催情':
      return 'danger';
    default:
      return 'normal';
  }
});
</script>

<style lang="scss" scoped>
.heroine-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.stats-section,
.text-section {
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

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
}

.text-block {
  font-size: 0.82rem;
  color: var(--c-text);
  line-height: 1.6;
  white-space: pre-wrap;
}
</style>

