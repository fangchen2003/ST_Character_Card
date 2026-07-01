# 角色卡计划：『感官会馆』

（草案，标注【待定】处需与作者确认后再细化）

## 一、设计思路

把性癖四元素（肉腿、肚脐、腋下、气味）融入一个以亲密体感为核心的可探索“大世界”，而非当成孤立标签。四元素本质都是身体觉察向的体感，因此用一个“亲密接触”场域承载最自然。

推荐设定：都市隐秘会馆。一座外表平平、实则专做“感官疗愈”的高端私人会馆，玩家作为新人理疗师入职，通过工作接触多位各具体态特征的顾客/同事。性癖既是世界观的一部分，也驱动角色行为、解锁度和剧情走向。

体质/体感贴合映射：
- 肉腿 → 理疗推拿/腿部护理房，角色多为丰腴体态
- 肚脐 → 改良式露脐制服、腹部护理项目
- 腋下 → 香氛/除毛护理部，抬手时自然暴露
- 气味 → 香薰调理房、汗蒸房，体味与情绪绑定

## 二、待确认问题

1. 题材：都市隐秘会馆 / 异世界温泉乡 / 奇幻冒险旅队 / 健身房更衣室 / 其他【待定】
2. 角色数量与分工：每位角色专注一种性癖，还是四元素集中在一个角色？核心角色 1~5 位【待定】
3. 露骨程度：暧昧擦边 / 直白成人内容【待定】
4. 角色由作者指定还是我原创【待定】
5. 玩家身份：理疗师（有职业理由主动接触身体）/ 住客 / 其他【待定】
6. 目标玩法：探索多房间多角色互动，还是单主推深关系线【待定】

## 三、模块结构（参照模板 MVU 角色卡文件夹）

角色卡/（配置名暂取“感官会馆”）：
- index.yaml 角色卡定义+世界书树+正则+脚本挂载
- schema.ts zod 4 变量结构；schema.json 生成产物
- 头像.png；感官会馆.png 打包导出物
- 世界书/：文风.yaml、交错频道.yaml、变量/（initvar/变量列表/变量更新规则/变量输出格式）、角色/（角色详情/角色阶段）、立即事件/*.yaml
- 第一条消息/0.txt
- 界面/状态栏/：index.ts、store.ts、App.vue、components/
- 脚本/：变量结构/index.ts、立即事件/index.ts、(可选)MVU/index.ts
- 更新日志.md

## 四、MVU 变量结构（schema.ts）草案

```ts
export const Schema = z.object({
  世界: z.object({ 当前时间: z.string(), 当前地点: z.string(), 近期事务: z.record(z.string().describe('事务名'), z.string()) }),
  主角: z.object({
    感官敏感度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    当前置装: z.string(),
    持有物品: z.record(z.string().describe('物品名'), z.object({ 描述: z.string(), 数量: z.coerce.number() })),
  }),
  `${角色别名}`: z.object({
    好感度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    性癖解锁: z.record(z.enum(['肉腿','肚脐','腋下','气味']), z.coerce.number().transform(v => _.clamp(v, 0, 100))),
    着装: z.record(z.enum(['上装','下装','内衣','袜子','鞋子','饰品']), z.string()),
    体态: z.string(),
    当前体味: z.string(),
    当前阶段: z.string(),
  }),
});
```

性癖解锁用 z.record(z.enum(...), number) 统一记录四元素进度，便于界面用进度条/雷达图呈现。

## 五、世界书要点

- 文风：第一人称+第三人称混合，强调体感/气味/触觉的细腻感官描写；尺度由待定露骨程度决定。
- 角色详情：每角色写 identity、体态特征（突出其代表的那种性癖）、性癖侧重、社交关系、采访段落（参照示例白娅 interview 风格）。
- 角色阶段：按好感度/性癖解锁度划分阶段，用 ejs 条件注入行为指导与文风分支（参照示例角色阶段.yaml 的 <%_ if ... _%>）。
- 变量更新规则：写出各角色好感度/性癖解锁/体味的更新 check，遵循 mvu 模板。
- 立即事件：绿灯关键词触发，设计为“私密情境邀请”，例如某角色主动暴露某部位邀请玩家。

## 六、前端状态栏界面规划

分页 Tabs：
1. 世界：当前时间/地点/近期事务
2. 角色情报：选中角色的体态、着装、好感度、性癖解锁雷达图（肉腿/肚脐/腋下/气味各带进度条）、当前体味、当前阶段与行为倾向
3. 玩家：感官敏感度、当前置装、持有物品

技术栈遵循模板：typescript+vue+pinia+zod，store 用 defineMvuDataStore(Schema, {type:'message', message_id: getCurrentMessageId()})；状态栏经 index.yaml 正则把 <StatusPlaceHolderImpl/> 替换为 $('body').load(远程界面 dist 地址)。iframe 适配遵循模板约束（width+aspect-ratio 控高，禁 vh/min-height/overflow:auto，主体禁 position:absolute）。

## 七、脚本

1. 变量结构脚本：import { Schema } from '../../schema'; registerMvuSchema(Schema)
2. 立即事件脚本：绿灯关键词后用 generate 补一段情境，再 parseMessage/replaceMvuData 更新变量（参照 mvu变量框架.mdc 自行解析流程）
3. （可选）MVU 主框架脚本：挂 MagVarUpdate 库，与示例一致

## 八、打包与预览

- 在 tavern_sync.yaml 的 配置: 下新增“感官会馆”项，类型角色卡，本地文件路径 示例/感官会馆/index，导出 示例/感官会馆/感官会馆
- pnpm watch 增量打包看实时预览；pnpm build 产出；node tavern_sync.mjs bundle 感官会馆 生成可导入 png
- 实时预览走 chrome-devtools MCP 连接酒馆网页热重载，不手动反复 build

## 九、推进顺序

1. 作者拍板第二节问题 → 确定题材/角色/尺度
2. 定 schema.ts 变量结构 → pnpm watch 生成 schema.json
3. 编写世界书：角色详情 → 角色阶段 → 变量更新规则 → initvar → 文风 → 立即事件
4. 写状态栏界面（store → App → components）
5. 写脚本（变量结构、立即事件）
6. 写 index.yaml 串起世界书树、正则、脚本挂载、第一条消息
7. pnpm build + bundle 生成导入文件，酒馆内联预览验证
