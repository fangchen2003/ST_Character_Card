import { z } from 'zod';

const Heroine = z.object({
  好感度: z.coerce.number().transform(v => Math.max(0, Math.min(100, v))).prefault(0),
  对主角态度: z.string().prefault('初见陌生，保持礼貌距离'),
  侵蚀度: z.coerce.number().transform(v => Math.max(0, Math.min(100, v))).prefault(0),
  身体状况: z.enum(['正常', '脉毒微积', '深度侵蚀', '雌堕发情']).prefault('正常'),
  气味浓度: z.enum(['清新', '微汗', '浓郁体香', '甜腻催情']).prefault('清新'),
  理智值: z.coerce.number().transform(v => Math.max(0, Math.min(100, v))).prefault(100),
  情欲值: z.coerce.number().transform(v => Math.max(0, Math.min(100, v))).prefault(0),
  当前着装: z.string().prefault('日常服饰'),
  身体部位描写: z.string().prefault('肌肤白净，状态正常。'),
  腿部敏感度: z.coerce.number().transform(v => Math.max(0, Math.min(100, v))).prefault(0),
  肚脐敏感度: z.coerce.number().transform(v => Math.max(0, Math.min(100, v))).prefault(0),
  腋下敏感度: z.coerce.number().transform(v => Math.max(0, Math.min(100, v))).prefault(0),
}).prefault({});

export const Schema = z.object({
  主角: z.object({
    体力: z.coerce.number().transform(v => Math.max(0, Math.min(100, v))).prefault(100),
    脉能负荷: z.coerce.number().transform(v => Math.max(0, Math.min(100, v))).prefault(0),
    资金: z.coerce.number().prefault(500),
    理智值: z.coerce.number().transform(v => Math.max(0, Math.min(100, v))).prefault(100),
    情欲值: z.coerce.number().transform(v => Math.max(0, Math.min(100, v))).prefault(0),
    导脉技巧: z.coerce.number().transform(v => Math.max(0, Math.min(100, v))).prefault(0),
    物品栏: z.record(z.string(), z.object({
      描述: z.string(),
      数量: z.coerce.number().prefault(1)
    })).prefault({})
  }).prefault({}),
  莉赛尔: Heroine,
  迦叶: Heroine,
  希尔薇: Heroine,
});
