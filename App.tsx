/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  ShieldAlert, Shield, Zap, Hand, CheckCircle2, 
  Copy, AlertTriangle, ArrowRight, RefreshCw 
} from 'lucide-react';
import { relationTypes, toneTypes, scriptsDB, type RelationId, type ToneId } from './data';

interface ResultItem {
  id: string;
  title: string;
  icon: any;
  text: string;
  color: string;
  bg: string;
}

export default function App() {
  const [relation, setRelation] = useState<RelationId | ''>('');
  const [tone, setTone] = useState<ToneId | ''>('');
  const [results, setResults] = useState<ResultItem[] | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    try {
      const savedState = localStorage.getItem('limitesSinCulpa_appState');
      if (savedState) {
        const parsed = JSON.parse(savedState);
        if (parsed.relation) setRelation(parsed.relation);
        if (parsed.tone) setTone(parsed.tone);
      }
    } catch (e) {
      console.error("Error loading state", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('limitesSinCulpa_appState', JSON.stringify({ relation, tone }));
    } catch (e) {
      console.error("Error saving state", e);
    }
  }, [relation, tone]);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!relation || !tone) return;

    setIsGenerating(true);
    setResults(null);
    
    setTimeout(() => {
      const selectedScripts = scriptsDB[relation as RelationId][tone as ToneId];
      setResults([
        { 
          id: 'diplomatic', 
          title: 'Suave pero Firme', 
          icon: Shield, 
          text: selectedScripts.diplomatic, 
          color: 'text-blue-600', 
          bg: 'bg-blue-50' 
        },
        { 
          id: 'direct', 
          title: 'Directa y Clara', 
          icon: Zap, 
          text: selectedScripts.direct, 
          color: 'text-indigo-600', 
          bg: 'bg-indigo-50' 
        },
        { 
          id: 'boundary', 
          title: 'Límite Estricto', 
          icon: Hand, 
          text: selectedScripts.boundary, 
          color: 'text-rose-600', 
          bg: 'bg-rose-50' 
        }
      ]);
      setIsGenerating(false);
    }, 600);
  };

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Error al copiar', err);
      // Fallback seguro
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
      } catch (e) {
        console.error('Error fallback copiar', e);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="bg-slate-50 text-slate-900 p-4 md:p-8 font-sans min-h-screen flex justify-center items-start">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 px-6 py-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-indigo-500"></div>
          <ShieldAlert className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Simulador "Cero Excusas"
          </h1>
          <p className="text-slate-300 text-sm md:text-base max-w-md mx-auto">
            Deja de improvisar justificaciones. Selecciona el escenario y obtén respuestas listas para copiar, pegar y recuperar tu paz mental.
          </p>
        </div>

        <div className="p-6 md:p-8">
          <form onSubmit={handleGenerate} className="space-y-8">
            
            {/* Step 1: Quién */}
            <div className="space-y-4">
              <label className="flex items-center text-sm font-bold text-slate-800 uppercase tracking-wider">
                <span className="bg-slate-100 text-slate-600 w-6 h-6 rounded-full flex items-center justify-center mr-2 text-xs">1</span>
                ¿A quién le vas a decir NO?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {relationTypes.map((type) => {
                  const Icon = type.icon;
                  const isSelected = relation === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setRelation(type.id)}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] active:scale-95 ${
                        isSelected
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <Icon className={`w-6 h-6 mb-2 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`} />
                      <span className="text-sm font-semibold">{type.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Step 2: Tono */}
            <div className="space-y-4">
              <label className="flex items-center text-sm font-bold text-slate-800 uppercase tracking-wider">
                <span className="bg-slate-100 text-slate-600 w-6 h-6 rounded-full flex items-center justify-center mr-2 text-xs">2</span>
                ¿Cuál es el tono de la persona?
              </label>
              <div className="space-y-3">
                {toneTypes.map((t) => {
                  const isSelected = tone === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTone(t.id)}
                      className={`w-full flex items-center text-left p-4 rounded-xl border-2 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] ${
                        isSelected
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 mr-4 flex-shrink-0 flex items-center justify-center ${isSelected ? 'border-emerald-500' : 'border-slate-300'}`}>
                        {isSelected && <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>}
                      </div>
                      <div>
                        <div className={`font-bold ${isSelected ? 'text-emerald-800' : 'text-slate-800'}`}>{t.label}</div>
                        <div className={`text-sm mt-0.5 ${isSelected ? 'text-emerald-600' : 'text-slate-500'}`}>{t.desc}</div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Action Button */}
            <button
              type="submit"
              disabled={!relation || !tone || isGenerating}
              className={`w-full py-4 px-6 rounded-xl font-bold text-white shadow-md transition-all duration-300 flex items-center justify-center space-x-2 ${
                !relation || !tone
                ? 'bg-slate-300 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg hover:scale-[1.01] active:scale-[0.98]'
              }`}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Procesando guiones...</span>
                </>
              ) : (
                <>
                  <span>Generar Respuestas Anti-Culpa</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {results && (
            <div className="mt-8 pt-8 border-t border-slate-200 space-y-6 animate-fade-in-up">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-slate-800">Tus Respuestas Listas</h3>
                <p className="text-sm text-slate-500">Copia la que mejor se adapte a tu nivel de comodidad.</p>
              </div>

              <div className="space-y-4">
                {results.map((res, index) => {
                  const ResIcon = res.icon;
                  return (
                    <div key={res.id} className={`p-5 rounded-xl border ${res.bg} border-slate-200/50 relative group`}>
                      <div className="flex items-center mb-2">
                        <ResIcon className={`w-5 h-5 mr-2 ${res.color}`} />
                        <span className={`text-sm font-bold uppercase tracking-wider ${res.color}`}>
                          {res.title}
                        </span>
                      </div>
                      <p className="text-slate-700 text-base leading-relaxed pr-12">
                        "{res.text}"
                      </p>
                      <button
                        onClick={() => copyToClipboard(res.text, index)}
                        className="absolute top-1/2 -translate-y-1/2 right-4 p-3 bg-white rounded-lg shadow-sm border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-200 transition-all active:scale-90"
                        title="Copiar texto"
                      >
                        {copiedIndex === index ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        ) : (
                          <Copy className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  )
                })}
              </div>

              {/* Upsell Context Block */}
              <div className="mt-8 bg-amber-50 rounded-xl p-5 border border-amber-200 flex items-start space-x-4">
                <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-amber-900 text-sm">¿La culpa no te deja enviar el mensaje?</h4>
                  <p className="text-sm text-amber-800 mt-1">
                    Saber qué decir es solo el primer paso. Si sientes ansiedad después de poner un límite, necesitas el <strong>Protocolo Anti-Culpa de 5 Minutos</strong> incluido en el programa <em>Límites Sin Culpa</em>.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
