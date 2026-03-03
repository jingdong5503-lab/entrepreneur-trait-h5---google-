import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface AssessmentResult {
  resultLevel: string;
  levelDescription: string[];
  score: number;
  traits: {
    determination: number;
    courage: number;
    leadership: number;
    opportunity: number;
    risk: number;
    creativity: number;
    motivation: number;
  };
  whyUnderstandDefinitions: string;
  whyTraitsMatter: string;
  dimensionExplanations: {
    determination: string[];
    courage: string[];
    leadership: string[];
    opportunity: string[];
    risk: string[];
    creativity: string[];
    motivation: string[];
  };
  executiveSummary: string;
  deepAnalysis: string;
  competitiveAdvantage: string;
  blindSpots: string;
  growthMindsetNote: string;
  roadmap: {
    phase: string;
    action: string;
  }[];
  famousMatch: {
    name: string;
    reason: string;
    quote: string;
  };
}

export async function analyzeEntrepreneurialTraits(answers: Record<string, string>, questions: any[]): Promise<AssessmentResult> {
  const simplifiedData = questions.map(q => ({
    q: q.text,
    a: answers[q.id]
  }));

  const prompt = `用户测评数据: ${JSON.stringify(simplifiedData)}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: `你是一位顶级的商业心理学家和创业导师。请基于用户的测评回答，生成一份详尽、专业且具有付费价值的深度分析报告。

        结果分档标准（必须从中选择一个作为 resultLevel）：
        1. 不适合创业
        2. 有兴趣但准备不足
        3. 具备潜力、可以试水
        4. 高度适合
        5. 一流创始人级别

        维度定义参考（请在 dimensionExplanations 中，将以下定义整理成字符串数组形式，每个要点为一个数组项）：
        - 承诺和决心：顽强和果断，能快速做出承诺或再承诺；坚持不懈解决问题，严格自理；愿意做出自我牺牲；完全追随使命。
        - 勇气：道德力量；勇于尝试；不畏冲突和失败；对风险具有强烈的好奇心。
        - 领导力：积极主动，严格要求但不是完美主义者；团队建设者，英雄塑造者，激励他人；推己及人，富有同理心；与所有共同创造财富的人分享财富；诚实可信，建立信任，注重公平；不是孤军奋战，卓越的学习者和老师；既有耐心，又有紧迫感。
        - 对机会的痴迷：塑造机会的领导力；熟知客户的需求与痛点；市场驱动；着立于价值创造和增长。
        - 对风险、模糊性和不确定性的容忍能力：承担权衡过的风险；风险最小化；风险分散；善于处理两难困境和冲突；能容忍不确定性和结构性缺陷；能承受压力和冲突；能解决问题并整合解决方案。
        - 创造力、自我依赖和适应能力：不墨守陈规，开放，横向思维（直升机思维）；不安于现状；能够调整、适应和改变，创造性的问题解决者；快速学习，无畏失败；善于总结归纳，提炼概念，注重细节。
        - 追求卓越的动机：目标和结果导向，目标高远但不脱离实际；追求成就和成长；对地位和权力的需求较低；相互支持（非相互竞争）；了解自己的弱点和优点；具有看问题的不同视角，富有幽默感。

        必须严格返回 JSON 格式。报告应包含：
        - resultLevel: 结果分档名称
        - levelDescription: 对该分档的深度解读，必须是字符串数组格式（2-3个短句/段落），确保排版有呼吸感。
        - score: 综合分 (0-100)
        - traits: 七维特质分 (0-100)
        - whyUnderstandDefinitions: 解释为什么在看报告前需要先了解核心特质的定义。
        - whyTraitsMatter: 解释为什么这7个特质对创业成功至关重要。
        - dimensionExplanations: 整理后的七个维度的定义说明，必须是字符串数组格式。
        - executiveSummary: 一句话核心洞察
        - deepAnalysis: 深度分析 (约300字)
        - competitiveAdvantage: 核心杀手锏
        - blindSpots: 致命弱点分析
        - growthMindsetNote: 强调创业者特质可后天提升。
        - roadmap: 基于分档结果的提升计划（三阶段）
        - famousMatch: 匹配名人

        要求：语气专业、犀利、富有启发性。`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            resultLevel: { type: Type.STRING },
            levelDescription: { type: Type.ARRAY, items: { type: Type.STRING } },
            score: { type: Type.NUMBER },
            traits: {
              type: Type.OBJECT,
              properties: {
                determination: { type: Type.NUMBER },
                courage: { type: Type.NUMBER },
                leadership: { type: Type.NUMBER },
                opportunity: { type: Type.NUMBER },
                risk: { type: Type.NUMBER },
                creativity: { type: Type.NUMBER },
                motivation: { type: Type.NUMBER },
              },
              required: ["determination", "courage", "leadership", "opportunity", "risk", "creativity", "motivation"]
            },
            whyUnderstandDefinitions: { type: Type.STRING },
            whyTraitsMatter: { type: Type.STRING },
            dimensionExplanations: {
              type: Type.OBJECT,
              properties: {
                determination: { type: Type.ARRAY, items: { type: Type.STRING } },
                courage: { type: Type.ARRAY, items: { type: Type.STRING } },
                leadership: { type: Type.ARRAY, items: { type: Type.STRING } },
                opportunity: { type: Type.ARRAY, items: { type: Type.STRING } },
                risk: { type: Type.ARRAY, items: { type: Type.STRING } },
                creativity: { type: Type.ARRAY, items: { type: Type.STRING } },
                motivation: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ["determination", "courage", "leadership", "opportunity", "risk", "creativity", "motivation"]
            },
            executiveSummary: { type: Type.STRING },
            deepAnalysis: { type: Type.STRING },
            competitiveAdvantage: { type: Type.STRING },
            blindSpots: { type: Type.STRING },
            growthMindsetNote: { type: Type.STRING },
            roadmap: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  phase: { type: Type.STRING },
                  action: { type: Type.STRING }
                },
                required: ["phase", "action"]
              }
            },
            famousMatch: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                reason: { type: Type.STRING },
                quote: { type: Type.STRING }
              },
              required: ["name", "reason", "quote"]
            }
          },
          required: ["resultLevel", "levelDescription", "score", "traits", "whyUnderstandDefinitions", "whyTraitsMatter", "dimensionExplanations", "executiveSummary", "deepAnalysis", "competitiveAdvantage", "blindSpots", "growthMindsetNote", "roadmap", "famousMatch"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("AI 响应超时或为空");

    return JSON.parse(text.replace(/```json\n?|\n?```/g, "").trim());
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("报告生成服务繁忙，请稍后重试或检查网络连接");
  }
}
