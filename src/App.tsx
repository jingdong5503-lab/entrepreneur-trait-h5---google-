import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Rocket, 
  ChevronRight, 
  ChevronLeft, 
  BrainCircuit, 
  ShieldCheck, 
  Zap, 
  Users, 
  Target,
  Loader2,
  Share2,
  RefreshCcw,
  CheckCircle2
} from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Markdown from 'react-markdown';
import { ASSESSMENT_QUESTIONS, type Question } from './constants';
import { analyzeEntrepreneurialTraits, type AssessmentResult } from './services/geminiService';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [step, setStep] = useState<'welcome' | 'quiz' | 'loading' | 'result'>('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [loadingText, setLoadingText] = useState('正在分析你的创业基因...');
  const [error, setError] = useState<string | null>(null);

  const handleStart = () => {
    setStep('quiz');
    setError(null);
  };

  const handleAnswer = (optionText: string) => {
    const question = ASSESSMENT_QUESTIONS[currentQuestionIndex];
    const newAnswers = { ...answers, [question.id]: optionText };
    setAnswers(newAnswers);

    if (currentQuestionIndex < ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleSubmit(newAnswers);
    }
  };

  const handleSubmit = async (finalAnswers: Record<string, string>) => {
    setStep('loading');
    setError(null);
    
    const loadingSteps = [
      '正在扫描性格特质...',
      '正在评估风险偏好...',
      '正在构建能力模型...',
      'AI 导师深度分析中...',
      '正在匹配商业原型...',
      '报告生成中...'
    ];
    
    let stepIdx = 0;
    const interval = setInterval(() => {
      if (stepIdx < loadingSteps.length) {
        setLoadingText(loadingSteps[stepIdx]);
        stepIdx++;
      }
    }, 1500);

    try {
      console.log('Submitting answers:', finalAnswers);
      
      // Add a race condition to handle potential long-hanging requests
      const analysisPromise = analyzeEntrepreneurialTraits(finalAnswers, ASSESSMENT_QUESTIONS);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('生成超时，请检查网络或重试')), 45000)
      );

      const analysis = await Promise.race([analysisPromise, timeoutPromise]) as AssessmentResult;
      
      console.log('Analysis received:', analysis);
      if (!analysis || typeof analysis !== 'object' || !analysis.traits) {
        throw new Error('AI 返回的报告格式不完整');
      }
      setResult(analysis);
      setStep('result');
    } catch (err) {
      console.error('Detailed Analysis Error:', err);
      setError(err instanceof Error ? err.message : '生成报告时发生未知错误');
      setStep('quiz');
    } finally {
      clearInterval(interval);
    }
  };

  const reset = () => {
    setStep('welcome');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] font-sans selection:bg-emerald-100">
      <AnimatePresence mode="wait">
        {step === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-md mx-auto px-6 py-12 flex flex-col items-center text-center min-h-screen justify-center"
          >
            <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center mb-8 shadow-sm">
              <Rocket className="w-10 h-10 text-emerald-600" />
            </div>
            <h1 className="text-4xl font-black tracking-tight mb-4 leading-tight">
              测一测：<br /><span className="text-emerald-600">你到底适不适合创业</span>
            </h1>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-widest mb-8">
              <ShieldCheck className="w-3.5 h-3.5" /> 顶级投资机构认可 · 7大特质
            </div>
            <p className="text-gray-500 mb-12 text-lg leading-relaxed">
              创业不是性格测试，而是一场行为体验。适合未来考虑创业的你来试试。
            </p>
            
            <div className="grid grid-cols-2 gap-4 w-full mb-12">
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
                <BrainCircuit className="w-6 h-6 text-emerald-500 mb-2" />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">37道题</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
                <Target className="w-6 h-6 text-emerald-500 mb-2" />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">雷达模型</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
                <ShieldCheck className="w-6 h-6 text-emerald-500 mb-2" />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">结果分档</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
                <Zap className="w-6 h-6 text-emerald-500 mb-2" />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">行动建议</span>
              </div>
            </div>

            <button
              onClick={handleStart}
              className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-emerald-200 hover:bg-emerald-700 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              开始深度测评 <ChevronRight className="w-5 h-5" />
            </button>
            <p className="mt-6 text-xs text-gray-400">专业报告含 7 大维度分析 · 已有 12,402 人付费解锁</p>
          </motion.div>
        )}

        {step === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-md mx-auto px-6 py-12 min-h-screen flex flex-col"
          >
            <div className="flex items-center justify-between mb-8">
              <button 
                onClick={() => currentQuestionIndex > 0 ? setCurrentQuestionIndex(prev => prev - 1) : setStep('welcome')}
                className="p-2 -ml-2 text-gray-400 hover:text-gray-600"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="flex-1 mx-4">
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-emerald-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestionIndex + 1) / ASSESSMENT_QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                {currentQuestionIndex + 1}/{ASSESSMENT_QUESTIONS.length}
              </span>
            </div>

            <div className="flex-1">
              {error && (
                <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-700 text-sm font-medium flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 shrink-0" />
                  <div>
                    <p className="font-bold">生成失败</p>
                    <p className="opacity-80">{error}</p>
                  </div>
                </div>
              )}
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-4 block">
                {ASSESSMENT_QUESTIONS[currentQuestionIndex].trait} / {ASSESSMENT_QUESTIONS[currentQuestionIndex].subTrait}
              </span>
              <h2 className="text-2xl font-bold mb-10 leading-snug text-gray-800">
                {ASSESSMENT_QUESTIONS[currentQuestionIndex].text}
              </h2>
              <div className="space-y-4">
                {ASSESSMENT_QUESTIONS[currentQuestionIndex].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(option.text)}
                    className="w-full text-left p-6 rounded-2xl border border-gray-100 bg-white hover:border-emerald-500 hover:bg-emerald-50/30 transition-all active:scale-[0.98] group relative overflow-hidden"
                  >
                    <div className="flex items-center gap-4">
                      <span className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-sm font-bold text-gray-400 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-lg font-medium text-gray-700 group-hover:text-emerald-900">
                        {option.text}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {step === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-md mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-screen text-center"
          >
            <div className="relative mb-8">
              <Loader2 className="w-16 h-16 text-emerald-600 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-emerald-100 rounded-full animate-pulse" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">{loadingText}</h3>
            <p className="text-gray-400 text-sm">正在为您生成价值 ¥199 的深度分析报告...</p>
          </motion.div>
        )}

        {step === 'result' && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto px-6 py-12 pb-32"
          >
            {/* Header Card */}
            <div className="bg-emerald-950 rounded-[2.5rem] p-8 text-white mb-8 shadow-2xl relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div className="px-3 py-1 bg-emerald-500/20 rounded-full text-[10px] font-bold uppercase tracking-widest border border-emerald-500/30">
                    Premium Report
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
                  </div>
                </div>
                
                <h2 className="text-3xl font-black mb-6 tracking-tight">{result.resultLevel}</h2>
                
                <div className="space-y-6 mb-8">
                  <div className="space-y-3">
                    {Array.isArray(result.levelDescription) ? result.levelDescription.map((desc, i) => (
                      <p key={i} className="text-emerald-400 text-sm font-medium leading-relaxed">
                        {desc}
                      </p>
                    )) : (
                      <p className="text-emerald-400 text-sm font-medium leading-relaxed">{result.levelDescription}</p>
                    )}
                  </div>
                  <p className="text-emerald-100 text-sm font-medium leading-relaxed italic border-l-2 border-emerald-500/30 pl-4">“{result.executiveSummary}”</p>
                </div>
                
                <div className="space-y-4 mb-10">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <p className="text-[11px] text-emerald-300/80 leading-relaxed">
                      <span className="font-bold text-emerald-400 block mb-1">为什么需要先了解定义？</span>
                      {result.whyUnderstandDefinitions}
                    </p>
                  </div>
                  <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 backdrop-blur-sm">
                    <p className="text-[11px] text-emerald-200 leading-relaxed">
                      <span className="font-bold text-emerald-400 block mb-1">为什么这7个特质至关重要？</span>
                      {result.whyTraitsMatter}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="flex flex-col">
                    <span className="text-5xl font-black text-white">{result.score}</span>
                    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">创业潜能分</span>
                  </div>
                  <div className="h-12 w-px bg-emerald-800" />
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-white">TOP 5%</span>
                    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">击败测试者</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dimension Definitions */}
            <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm mb-8">
              <h3 className="text-sm font-black mb-6 flex items-center gap-2 uppercase tracking-widest text-gray-400">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> 核心特质定义
              </h3>
              <div className="space-y-6">
                {Object.entries(result.dimensionExplanations).map(([key, values]) => {
                  const labels: Record<string, string> = {
                    determination: '承诺和决心',
                    courage: '勇气',
                    leadership: '领导力',
                    opportunity: '对机会的痴迷',
                    risk: '对风险、模糊性和不确定性的容忍能力',
                    creativity: '创造力、自我依赖和适应能力',
                    motivation: '追求卓越的动机'
                  };
                  return (
                    <div key={key} className="border-b border-gray-50 pb-6 last:border-0 last:pb-0">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="text-sm font-bold text-gray-800">{labels[key]}</h4>
                        <button 
                          onClick={() => alert('已复制该特质定义，快去分享给朋友吧！')}
                          className="p-1.5 hover:bg-gray-50 rounded-lg transition-colors group"
                        >
                          <Share2 className="w-3.5 h-3.5 text-gray-300 group-hover:text-emerald-500" />
                        </button>
                      </div>
                      <ul className="space-y-2">
                        {Array.isArray(values) ? values.map((v, i) => (
                          <li key={i} className="text-xs text-gray-500 leading-relaxed flex gap-2">
                            <span className="text-emerald-500 mt-1 shrink-0">•</span>
                            <span>{v}</span>
                          </li>
                        )) : (
                          <li className="text-xs text-gray-500 leading-relaxed">{values}</li>
                        )}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Radar Chart */}
            {result.traits && (
              <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm mb-8">
                <h3 className="text-sm font-black mb-8 flex items-center gap-2 uppercase tracking-widest text-gray-400">
                  <Target className="w-4 h-4 text-emerald-600" /> 七维特质雷达
                </h3>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                      { subject: '决心', A: result.traits.determination || 0 },
                      { subject: '勇气', A: result.traits.courage || 0 },
                      { subject: '领导', A: result.traits.leadership || 0 },
                      { subject: '机会', A: result.traits.opportunity || 0 },
                      { subject: '风险', A: result.traits.risk || 0 },
                      { subject: '创造', A: result.traits.creativity || 0 },
                      { subject: '成就', A: result.traits.motivation || 0 },
                    ]}>
                      <PolarGrid stroke="#F3F4F6" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#6B7280', fontSize: 10, fontWeight: 700 }} />
                      <Radar
                        name="Traits"
                        dataKey="A"
                        stroke="#059669"
                        fill="#10B981"
                        fillOpacity={0.4}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Deep Analysis */}
            <div className="space-y-8">
              <section className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
                <h3 className="text-sm font-black mb-6 flex items-center gap-2 uppercase tracking-widest text-gray-400">
                  <BrainCircuit className="w-4 h-4 text-emerald-600" /> 深度特质剖析
                </h3>
                <div className="prose prose-emerald text-gray-600 leading-relaxed text-sm">
                  <Markdown>{result.deepAnalysis}</Markdown>
                </div>
              </section>

              <section className="bg-emerald-900 rounded-[2rem] p-8 text-emerald-50 border border-emerald-800 shadow-inner">
                <h3 className="text-xs font-black mb-4 flex items-center gap-2 uppercase tracking-widest opacity-60">
                  <RefreshCcw className="w-4 h-4" /> 创业力成长框架
                </h3>
                <p className="text-sm leading-relaxed font-medium">
                  {result.growthMindsetNote}
                </p>
              </section>

              <div className="grid grid-cols-1 gap-6">
                <section className="bg-emerald-50 rounded-[2rem] p-8 border border-emerald-100">
                  <h3 className="text-sm font-black mb-4 flex items-center gap-2 uppercase tracking-widest text-emerald-700">
                    <Zap className="w-4 h-4" /> 核心竞争优势
                  </h3>
                  <p className="text-emerald-900 font-bold text-lg leading-snug">{result.competitiveAdvantage}</p>
                </section>

                <section className="bg-rose-50 rounded-[2rem] p-8 border border-rose-100">
                  <h3 className="text-sm font-black mb-4 flex items-center gap-2 uppercase tracking-widest text-rose-700">
                    <ShieldCheck className="w-4 h-4" /> 潜在致命盲点
                  </h3>
                  <p className="text-rose-900 font-bold text-lg leading-snug">{result.blindSpots}</p>
                </section>
              </div>

              {/* Roadmap */}
              <section className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
                <h3 className="text-sm font-black mb-8 flex items-center gap-2 uppercase tracking-widest text-gray-400">
                  <Target className="w-4 h-4 text-emerald-600" /> 创业进阶路线图
                </h3>
                <div className="space-y-6">
                  {result.roadmap.map((item, i) => (
                    <div key={i} className="flex gap-4 relative">
                      {i !== result.roadmap.length - 1 && <div className="absolute left-4 top-8 bottom-0 w-px bg-gray-100" />}
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-xs font-black text-emerald-600 shrink-0 z-10">
                        0{i + 1}
                      </div>
                      <div>
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{item.phase}</div>
                        <p className="text-gray-700 font-bold">{item.action}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Famous Match */}
              <section className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-[2.5rem] p-8 text-white shadow-xl">
                <div className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 opacity-60">商业基因原型匹配</div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                    <Users className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black">{result.famousMatch.name}</h4>
                    <p className="text-emerald-200 text-xs font-medium">精神导师匹配度 98%</p>
                  </div>
                </div>
                <p className="text-emerald-50 text-sm leading-relaxed mb-6 italic">“{result.famousMatch.quote}”</p>
                <div className="p-4 bg-white/10 rounded-2xl text-xs leading-relaxed border border-white/10">
                  {result.famousMatch.reason}
                </div>
              </section>
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-xl border-t border-gray-100 flex gap-4 max-w-md mx-auto z-50">
              <button 
                onClick={reset}
                className="flex-1 bg-gray-100 text-gray-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all text-sm"
              >
                <RefreshCcw className="w-4 h-4" /> 重新测评
              </button>
              <button 
                onClick={() => alert('已生成高清报告海报，长按可保存到相册')}
                className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-100 active:scale-95 transition-all text-sm"
              >
                <Share2 className="w-4 h-4" /> 保存报告
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
