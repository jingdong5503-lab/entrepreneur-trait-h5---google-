export interface Option {
  text: string;
  score: number;
}

export interface Question {
  id: string;
  trait: string;
  subTrait: string;
  text: string;
  options: Option[];
}

export const ASSESSMENT_QUESTIONS: Question[] = [
  // 承诺和决心 (Commitment and Determination)
  {
    id: "base_com_001",
    trait: "承诺和决心",
    subTrait: "顽强和果断",
    text: "一个你很感兴趣但充满不确定性的新方向，在初步探索后，你的态度更接近？",
    options: [
      { text: "需要更多数据才能决定是否投入", score: 1 },
      { text: "先小步投入，边做边看", score: 2 },
      { text: "凭直觉快速决定是否加码", score: 3 }
    ]
  },
  {
    id: "base_com_002",
    trait: "承诺和决心",
    subTrait: "坚持不懈解决问题",
    text: "当面对一个极其复杂且枯燥的难题时，你的第一反应通常是？",
    options: [
      { text: "感到兴奋，像在打一个大Boss", score: 3 },
      { text: "有点头痛，但还是会硬着头皮上", score: 2 },
      { text: "先放一放，做点别的转换心情", score: 1 }
    ]
  },
  {
    id: "base_com_003",
    trait: "承诺和决心",
    subTrait: "愿意做出自我牺牲",
    text: "一个机会需要你投入未来三个月的全部周末，你的第一反应是？",
    options: [
      { text: "愿意投入时间去探索这种可能性", score: 3 },
      { text: "需要评估投入产出的可能性再决定", score: 2 },
      { text: "风险和成本太高，倾向于放弃", score: 1 }
    ]
  },
  {
    id: "base_com_004",
    trait: "承诺和决心",
    subTrait: "完全追随使命",
    text: "假设你在推进一件你认为极具价值的事，但短期内看不到任何明确的回报，你会？",
    options: [
      { text: "开始怀疑这件事的价值", score: 1 },
      { text: "只要相信，就愿意继续投入", score: 3 }
    ]
  },
  // 勇气 (Courage)
  {
    id: "base_cou_001",
    trait: "勇气",
    subTrait: "道德力量",
    text: "在一个重要的集体项目中，你无意中发现一个对结果有利，但可能存在误导性的数据呈现方式，你会？",
    options: [
      { text: "提出疑虑，建议用更客观的方式呈现", score: 3 },
      { text: "选择沉默，毕竟这对集体有利", score: 1 }
    ]
  },
  {
    id: "base_cou_002",
    trait: "勇气",
    subTrait: "勇于尝试",
    text: "对于一个新兴的、被很多人认为只是“噱头”的技术或概念，你的态度是？",
    options: [
      { text: "大概率是炒作，不浪费时间", score: 1 },
      { text: "保持好奇，会花点时间去了解它到底是什么", score: 3 }
    ]
  },
  {
    id: "base_cou_003",
    trait: "勇气",
    subTrait: "不畏冲突和失败",
    text: "在一个重要的小组讨论中，你的观点和一位更有资历的成员完全相反。此时，你的本能做法更倾向于？",
    options: [
      { text: "主动建议一起找找看有没有能达成共识的地方", score: 3 },
      { text: "避免直接对立，会后私下找机会再表达", score: 1 },
      { text: "寻求客观标准，看有没有外部数据或小实验验证", score: 2 }
    ]
  },
  {
    id: "base_cou_004",
    trait: "勇气",
    subTrait: "对风险具有强烈的好奇心",
    text: "当听到一个听起来很疯狂的商业想法时，你的第一反应是？",
    options: [
      { text: "觉得不切实际，一笑而过", score: 1 },
      { text: "好奇它万一能成，会是什么样子", score: 3 }
    ]
  },
  // 领导力 (Leadership)
  {
    id: "base_lea_001",
    trait: "领导力",
    subTrait: "积极主动",
    text: "一个项目按计划进行，但你突然发现一个能让它变得更好的新想法，你会？",
    options: [
      { text: "坚持原计划，避免节外生枝", score: 1 },
      { text: "评估新想法的可行性，可能调整计划", score: 3 }
    ]
  },
  {
    id: "base_lea_002",
    trait: "领导力",
    subTrait: "团队建设者",
    text: "在一个小组项目中，你更享受扮演什么样的角色？",
    options: [
      { text: "专注完成自己任务的核心成员", score: 1 },
      { text: "协调资源、鼓舞士气的组织者", score: 3 }
    ]
  },
  {
    id: "base_lea_003",
    trait: "领导力",
    subTrait: "推己及人,富有同理心",
    text: "一位和你协作的伙伴近期表现不佳，你的第一反应是？",
    options: [
      { text: "提醒他需要跟上进度", score: 1 },
      { text: "私下问问他是不是遇到了什么困难", score: 3 }
    ]
  },
  {
    id: "base_lea_004",
    trait: "领导力",
    subTrait: "与所有共同创造财富的人分享财富",
    text: "一个项目小有成果，可以申请一笔奖励，你会优先为谁申请？",
    options: [
      { text: "贡献最突出的个人", score: 2 },
      { text: "平均分配给所有参与者", score: 1 }
    ]
  },
  {
    id: "base_lea_005",
    trait: "领导力",
    subTrait: "诚实可信",
    text: "你承诺了搭档今天完成一件事，但临时出了意外很可能无法完成。你会？",
    options: [
      { text: "先尽力补救，到最后一刻再看情况说", score: 1 },
      { text: "立刻告知对方实情，并共同商议对策", score: 3 }
    ]
  },
  {
    id: "base_lea_006",
    trait: "领导力",
    subTrait: "卓越的学习者和老师",
    text: "当你接触一个全新领域时，你通常的学习方式是？",
    options: [
      { text: "先系统性地看书或上课", score: 2 },
      { text: "直接找该领域的专家或熟手请教", score: 3 },
      { text: "自己先动手尝试，在实践中摸索", score: 2 }
    ]
  },
  {
    id: "base_lea_007",
    trait: "领导力",
    subTrait: "既有耐心,又有紧迫感",
    text: "一个重要但非紧急的任务摆在你面前，你的习惯是？",
    options: [
      { text: "先求快，先解决“有无”问题", score: 2 },
      { text: "先求好，宁愿慢一点也要保证质量", score: 2 },
      { text: "先规划，按计划处理", score: 3 }
    ]
  },
  // 对机会的痴迷 (Obsession with Opportunity)
  {
    id: "base_opp_001",
    trait: "对机会的痴迷",
    subTrait: "塑造机会的领导力",
    text: "想象你接触到一个信息混乱的资料包或会议讨论，你的第一思维倾向是？",
    options: [
      { text: "思维会有些卡顿，希望有人能先帮忙提炼", score: 1 },
      { text: "开始在脑中或纸上对这些信息进行归类、排序", score: 2 },
      { text: "想先搞清楚“最关键的信息是什么?”，最终目的是什么", score: 3 }
    ]
  },
  {
    id: "base_opp_002",
    trait: "对机会的痴迷",
    subTrait: "熟知客户的需求与痛点",
    text: "当你听到身边有人抱怨某个产品或服务不好用时，你的第一反应更接近？",
    options: [
      { text: "会加入一起吐槽，当作闲聊来听", score: 1 },
      { text: "会好奇并且可能会问出具体是哪里不好用", score: 2 },
      { text: "会开始胡思乱想，思考会怎么改进", score: 3 }
    ]
  },
  {
    id: "base_opp_003",
    trait: "对机会的痴迷",
    subTrait: "市场驱动",
    text: "面对一个你很有热情去做的项目方向，但初步了解后发现，身边的大多数朋友对此似乎兴趣不大。你会？",
    options: [
      { text: "热情会减退，可能会重新考虑方向", score: 1 },
      { text: "觉得这可能是个机会，但需要验证", score: 3 },
      { text: "不太在意他们的看法，相信自己的判断", score: 2 }
    ]
  },
  {
    id: "base_opp_004",
    trait: "对机会的痴迷",
    subTrait: "着迷于价值创造和增长",
    text: "以下哪种情况更能持续地点燃你的工作热情？",
    options: [
      { text: "攻克一个复杂的技术或智力难题", score: 1 },
      { text: "看到自己的工作对他人产生了积极、具体的影响", score: 3 },
      { text: "看着自己负责项目的用户或收入数据持续增长", score: 2 }
    ]
  },
  // 对风险的容忍能力 (Tolerance for Risk)
  {
    id: "base_ris_001",
    trait: "对风险的容忍能力",
    subTrait: "承担权衡过的风险",
    text: "面对一个潜在机会，你的本能是？",
    options: [
      { text: "更多地关注那个“重大损失”的可能性", score: 1 },
      { text: "更多地关注那个“不错回报”的可能性", score: 3 }
    ]
  },
  {
    id: "base_ris_002",
    trait: "对风险的容忍能力",
    subTrait: "风险最小化",
    text: "当你脑中蹦出一个激动人心的新点子时，你的第一行动倾向是？",
    options: [
      { text: "花时间把它构思得更完美、更周全", score: 1 },
      { text: "马上找个朋友聊聊，看看他们的第一反应", score: 2 },
      { text: "思考用什么最简单的方式，先验证一下", score: 3 }
    ]
  },
  {
    id: "base_ris_003",
    trait: "对风险的容忍能力",
    subTrait: "风险分散",
    text: "在一段时间内，你更习惯如何分配你的精力？",
    options: [
      { text: "集中全部精力，只为一件最重要的事情奋斗", score: 2 },
      { text: "主要精力放在一件事上，同时也会花少量时间探索其他可能性", score: 3 }
    ]
  },
  {
    id: "base_ris_004",
    trait: "对风险的容忍能力",
    subTrait: "善于处理两难困境和冲突",
    text: "当一个决定需要你在“坚持原则”和“照顾他人感受”之间做选择时，你通常会？",
    options: [
      { text: "感到很纠结，决策过程会很漫长", score: 1 },
      { text: "倾向于找到一个能兼顾两者的“第三条路”", score: 3 },
      { text: "认为总得有一个更优先，会依据情况快速做出判断", score: 2 }
    ]
  },
  {
    id: "base_ris_005",
    trait: "对风险的容忍能力",
    subTrait: "能容忍不确定性和结构性缺陷",
    text: "你被临时安排参与一个新项目，但项目的目标、分工和流程都还没完全明确。你的第一感觉是？",
    options: [
      { text: "有点乱，希望能尽快清晰起来", score: 1 },
      { text: "感觉很正常，可以在混乱中边做边理顺", score: 2 },
      { text: "有点兴奋，这意味着有很大的定义和塑造空间", score: 3 }
    ]
  },
  {
    id: "base_ris_006",
    trait: "对风险的容忍能力",
    subTrait: "能承受压力和冲突",
    text: "当高强度的工作或学习让你感到筋疲力尽时，你的第一反应是？",
    options: [
      { text: "倾向于硬扛，告诉自己“坚持就是胜利”", score: 1 },
      { text: "会意识到这是个信号，主动强制自己休息或放松一下", score: 3 }
    ]
  },
  {
    id: "base_ris_007",
    trait: "对风险的容忍能力",
    subTrait: "能解决问题并整合解决方案",
    text: "面对一个从未遇到过的复杂问题，你的第一反应是？",
    options: [
      { text: "先自己研究，看能否独立解决", score: 2 },
      { text: "马上寻找可能解决这个问题的人或资源", score: 3 }
    ]
  },
  // 创造力 (Creativity)
  {
    id: "base_cre_001",
    trait: "创造力",
    subTrait: "不墨守陈规",
    text: "对于一个大家都在用的“标准”或“最佳”实践方法，你的态度更接近？",
    options: [
      { text: "先学习并遵循它，毕竟是经过验证的", score: 1 },
      { text: "会好奇它为什么会成为标准，并思考有没有可能被颠覆", score: 3 }
    ]
  },
  {
    id: "base_cre_002",
    trait: "创造力",
    subTrait: "不安于现状",
    text: "当你熟练掌握一项技能或一个流程，你的内心感受更接近？",
    options: [
      { text: "很有成就感，享受这种得心应手的感觉", score: 1 },
      { text: "立刻开始思考“下一步还能做什么”", score: 3 }
    ]
  },
  {
    id: "base_cre_003",
    trait: "创造力",
    subTrait: "能够调整、适应和改变",
    text: "一个你投入很多心血的计划，因为外部环境的突变而被打乱。你的第一反应是？",
    options: [
      { text: "感到很受挫，需要些时间来接受和调整", score: 1 },
      { text: "迅速开始思考：“好吧，那现在我能做什么?”", score: 3 }
    ]
  },
  {
    id: "base_cre_004",
    trait: "创造力",
    subTrait: "快速学习,无畏失败",
    text: "当你的团队或者身边的人犯错了，你的第一反应是对他们说什么？",
    options: [
      { text: "犯错是一种应该尽量避免的负面事件", score: 1 },
      { text: "犯错是学习过程中必然会付出的成本", score: 2 },
      { text: "犯错是了解事物运作规律的最佳途径", score: 3 }
    ]
  },
  {
    id: "base_cre_005",
    trait: "创造力",
    subTrait: "善于总结归纳",
    text: "一场信息量很大的交流之后，你的习惯是？",
    options: [
      { text: "记住一些印象深刻的要点", score: 1 },
      { text: "用自己的话把核心逻辑和要点重新梳理一遍", score: 3 }
    ]
  },
  // 追求卓越的动机 (Motivation to Excel)
  {
    id: "base_mot_001",
    trait: "追求卓越的动机",
    subTrait: "目标和结果导向",
    text: "当你开启一个新项目或个人目标时，你更倾向于？",
    options: [
      { text: "先投入地做起来，在过程中逐步明确方向", score: 1 },
      { text: "先花些时间定义清楚“成功”的样子是怎样的", score: 3 }
    ]
  },
  {
    id: "base_mot_002",
    trait: "追求卓越的动机",
    subTrait: "追求成就和成长",
    text: "对你个人而言，以下哪项更能持续地激励你？",
    options: [
      { text: "完成挑战后，来自外界的赞美和认可", score: 1 },
      { text: "在挑战过程中，感觉到自己的能力和认知在提升", score: 3 }
    ]
  },
  {
    id: "base_mot_003",
    trait: "追求卓越的动机",
    subTrait: "对地位和权力的需求较低",
    text: "在一个小组合作中，如果出现一个能力比你更强的成员，你的第一反应是？",
    options: [
      { text: "感到一丝压力或挑战", score: 1 },
      { text: "很兴奋，觉得是学习和让项目变得更好的机会", score: 3 }
    ]
  },
  {
    id: "base_mot_004",
    trait: "追求卓越的动机",
    subTrait: "相互支持",
    text: "看到身边与你相似的同伴取得了你尚未达到的成就，你的心态更接近？",
    options: [
      { text: "感到有些焦虑，觉得自己需要更努力", score: 1 },
      { text: "为他高兴，并把他当作激励或学习的榜样", score: 3 }
    ]
  },
  {
    id: "base_mot_005",
    trait: "追求卓越的动机",
    subTrait: "了解自己的弱点和优点",
    text: "当你收到关于自己的负面反馈时，你的第一反应通常是？",
    options: [
      { text: "解释情况或提供对方不知道的信息", score: 1 },
      { text: "先听着，然后思考“他说的是否有道理”", score: 3 }
    ]
  },
  {
    id: "base_mot_006",
    trait: "追求卓越的动机",
    subTrait: "具有看问题的不同视角,富有幽默感",
    text: "当一个计划因为一个意料之外的低级失误而被打乱时，你的第一反应是？",
    options: [
      { text: "感到懊恼，并开始复盘是谁的责任", score: 1 },
      { text: "有点无奈但又觉得有点好笑，然后迅速思考如何补救", score: 3 }
    ]
  }
];
