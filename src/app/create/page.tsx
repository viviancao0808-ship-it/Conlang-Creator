"use client";

import { useState } from 'react';
// Step 7 state (Extras) and all other code remain below
// Helper to format the prompt for AI
function buildConlangPrompt(answers: any) {
  return `Create a conlang with these features:\n${JSON.stringify(answers, null, 2)}`;
}
// Multi-step form entry point for conlang creation

const steps = [
  'Starting Point',
  'Writing System',
  'Phonology',
  'Morphology',
  'Grammar',
  'Lexicon',
  'Extras',
  'Summary',
];

export default function CreateConlang() {
  // Step 7 state (Extras)
  const [allowLoanwords, setAllowLoanwords] = useState<string | null>(null);
  const [loanwordSource, setLoanwordSource] = useState('');
  const [safetyFilter, setSafetyFilter] = useState<string | null>(null);
  // AI generation state
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<string | null>(null);
  // Step 5 state (Grammar)
  const [wordOrder, setWordOrder] = useState<string | null>(null);
  const [plurals, setPlurals] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);
  const [tense, setTense] = useState<string | null>(null);
  const [caseMarking, setCaseMarking] = useState<string | null>(null);
  // Step 6 state (Lexicon)
  const [rootWordCount, setRootWordCount] = useState<string | null>(null);
  const [lexiconTopics, setLexiconTopics] = useState<string[]>([]);
  const [step, setStep] = useState(0);
  const [startingPoint, setStartingPoint] = useState<'existing_idea' | 'random_new' | null>(null);
  const [ideaText, setIdeaText] = useState('');

  // Step 2 state
  const [scriptType, setScriptType] = useState<string | null>(null);
  const [visualStyles, setVisualStyles] = useState<string[]>([]);
  const [writingDirection, setWritingDirection] = useState<string | null>(null);

  function handleVisualStyleChange(style: string) {
    setVisualStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
  }

  // Step 4 state (Morphology)
  const [morphologyType, setMorphologyType] = useState<string | null>(null);
  const [wordFormation, setWordFormation] = useState<string | null>(null);
  const [wordFeel, setWordFeel] = useState<string[]>([]);
  // Extra questions
  const [honorifics, setHonorifics] = useState<string | null>(null);
  const [uniquePunctuation, setUniquePunctuation] = useState<string | null>(null);
  const [punctuationDesc, setPunctuationDesc] = useState('');
  const [pronounceEase, setPronounceEase] = useState<string | null>(null);
  const [consonantClusters, setConsonantClusters] = useState<string | null>(null);
  const [vowelCount, setVowelCount] = useState<string | null>(null);
  const [specialSounds, setSpecialSounds] = useState<string[]>([]);

  function handleSpecialSoundChange(sound: string) {
    setSpecialSounds((prev) =>
      prev.includes(sound) ? prev.filter((s) => s !== sound) : [...prev, sound]
    );
  }

  function renderStepContent() {
    if (step === 0) {
      return (
        <div className="w-full flex flex-col items-center">
          <p className="mb-4 text-lg font-medium text-center text-gray-800">Do you already have your own idea of a language, or do you want to start fresh?</p>
          <div className="flex flex-col gap-4 w-full max-w-md">
            <label className={`border rounded-lg p-4 cursor-pointer flex items-center gap-3 ${startingPoint === 'existing_idea' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}> 
              <input
                type="radio"
                name="startingPoint"
                value="existing_idea"
                checked={startingPoint === 'existing_idea'}
                onChange={() => setStartingPoint('existing_idea')}
                className="accent-blue-600"
              />
              <span className="text-gray-900">I have an idea for my language</span>
            </label>
            {startingPoint === 'existing_idea' && (
              <textarea
                className="w-full border rounded p-2 mt-2 text-gray-900 placeholder-gray-400"
                placeholder="Describe your idea..."
                value={ideaText}
                onChange={e => setIdeaText(e.target.value)}
                rows={3}
              />
            )}
            <label className={`border rounded-lg p-4 cursor-pointer flex items-center gap-3 ${startingPoint === 'random_new' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}> 
              <input
                type="radio"
                name="startingPoint"
                value="random_new"
                checked={startingPoint === 'random_new'}
                onChange={() => setStartingPoint('random_new')}
                className="accent-blue-600"
              />
              <span className="text-gray-900">Start fresh (generate a random new language)</span>
            </label>
          </div>
        </div>
      );
    }
    if (step === 1) {
      return (
        <div className="w-full flex flex-col items-center">
          <p className="mb-4 text-lg font-medium text-center text-gray-800">What type of script should your language use?</p>
          <div className="flex flex-col gap-2 w-full max-w-md mb-6">
                {['alphabetic','abugida','abjad','syllabary','logographic','none'].map((type) => {
                  let description = '';
                  switch(type) {
                    case 'alphabetic':
                      description = ' (like English or Spanish: each letter is a sound)';
                      break;
                    case 'abugida':
                      description = ' (like Hindi: each symbol is a consonant+vowel)';
                      break;
                    case 'abjad':
                      description = ' (like Arabic or Hebrew: only consonants are written)';
                      break;
                    case 'syllabary':
                      description = ' (like Japanese kana: each symbol is a syllable)';
                      break;
                    case 'logographic':
                      description = ' (like Chinese: each symbol is a word or idea)';
                      break;
                    case 'none':
                      description = ' (Spoken Only)';
                      break;
                    default:
                      break;
                  }
                  return (
                    <label key={type} className={`border rounded-lg p-3 cursor-pointer flex items-center gap-3 ${scriptType === type ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                      <input
                        type="radio"
                        name="scriptType"
                        value={type}
                        checked={scriptType === type}
                        onChange={() => setScriptType(type)}
                        className="accent-blue-600"
                      />
                      <span className="capitalize text-gray-900">{type === 'none' ? 'None (spoken only)' : type + description}</span>
                    </label>
                  );
                })}
          </div>
          <p className="mb-2 text-lg font-medium text-center text-gray-800">What visual style should the writing have? <span className="text-sm text-gray-500">(choose multiple)</span></p>
          <div className="flex flex-wrap gap-2 w-full max-w-md mb-6">
            {['curvy','angular','blocky','calligraphic','digital'].map((style) => (
              <label key={style} className={`border rounded-lg px-3 py-2 cursor-pointer flex items-center gap-2 ${visualStyles.includes(style) ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                <input
                  type="checkbox"
                  name="visualStyle"
                  value={style}
                  checked={visualStyles.includes(style)}
                  onChange={() => handleVisualStyleChange(style)}
                  className="accent-blue-600"
                />
                <span className="capitalize text-gray-900">{style}</span>
              </label>
            ))}
          </div>
          <p className="mb-2 text-lg font-medium text-center text-gray-800">Which direction should writing go?</p>
          <div className="flex flex-col gap-2 w-full max-w-md">
            {[
              { value: 'ltr', label: 'left→right (LTR)' },
              { value: 'rtl', label: 'right→left (RTL)' },
              { value: 'ttb', label: 'top→bottom (TTB)' },
              { value: 'none', label: 'none' },
            ].map((dir) => (
              <label key={dir.value} className={`border rounded-lg p-3 cursor-pointer flex items-center gap-3 ${writingDirection === dir.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                <input
                  type="radio"
                  name="writingDirection"
                  value={dir.value}
                  checked={writingDirection === dir.value}
                  onChange={() => setWritingDirection(dir.value)}
                  className="accent-blue-600"
                />
                <span className="text-gray-900">{dir.label}</span>
              </label>
            ))}
          </div>
        </div>
      );
    }
    if (step === 2) {
      return (
        <div className="w-full flex flex-col items-center">
          <p className="mb-4 text-lg font-medium text-center text-gray-800">Phonology (Sounds)</p>
          <div className="flex flex-col gap-4 w-full max-w-md">
            <div>
              <p className="font-semibold mb-2 text-gray-800">How easy should it be to pronounce?</p>
              {['easy','medium','hard'].map((level) => (
                <label key={level} className={`border rounded-lg p-3 cursor-pointer flex items-center gap-3 ${pronounceEase === level ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                  <input
                    type="radio"
                    name="pronounceEase"
                    value={level}
                    checked={pronounceEase === level}
                    onChange={() => setPronounceEase(level)}
                    className="accent-blue-600"
                  />
                  <span className="capitalize text-gray-900">{level}</span>
                </label>
              ))}
            </div>
            <div>
              <p className="font-semibold mb-2 text-gray-800">Do you want consonant clusters?</p>
              {[
                { value: 'none', label: 'None' },
                { value: 'light', label: 'Light (CV / CVC)' },
                { value: 'heavy', label: 'Heavy (CCV / CCVC / etc.)' },
              ].map((opt) => (
                <label key={opt.value} className={`border rounded-lg p-3 cursor-pointer flex items-center gap-3 ${consonantClusters === opt.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                  <input
                    type="radio"
                    name="consonantClusters"
                    value={opt.value}
                    checked={consonantClusters === opt.value}
                    onChange={() => setConsonantClusters(opt.value)}
                    className="accent-blue-600"
                  />
                  <span className="text-gray-900">{opt.label}</span>
                </label>
              ))}
            </div>
            <div>
              <p className="font-semibold mb-2 text-gray-800">How many vowels should it have?</p>
              {[
                { value: 'tiny', label: 'Tiny (3)' },
                { value: 'small', label: 'Small (5)' },
                { value: 'medium', label: 'Medium (7–8)' },
                { value: 'large', label: 'Large (10+)' },
              ].map((opt) => (
                <label key={opt.value} className={`border rounded-lg p-3 cursor-pointer flex items-center gap-3 ${vowelCount === opt.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                  <input
                    type="radio"
                    name="vowelCount"
                    value={opt.value}
                    checked={vowelCount === opt.value}
                    onChange={() => setVowelCount(opt.value)}
                    className="accent-blue-600"
                  />
                  <span className="text-gray-900">{opt.label}</span>
                </label>
              ))}
            </div>
            <div>
              <p className="font-semibold mb-2 text-gray-800">Should the language include special sounds? <span className="text-sm text-gray-500">(choose multiple)</span></p>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'clicks', label: 'Clicks (like the sound you make to call a horse)' },
                  { value: 'tones', label: 'Tones (words change meaning if you say them higher or lower)' },
                  { value: 'uvular', label: 'Uvular (sounds made far back in your throat)' },
                  { value: 'retroflex', label: 'Retroflex (sounds made by curling your tongue back)' },
                  { value: 'nasal vowels', label: 'Nasal Vowels (vowels said through your nose, like in French “bon”)' },
                ].map((sound) => (
                  <label key={sound.value} className={`border rounded-lg px-3 py-2 cursor-pointer flex items-center gap-2 ${specialSounds.includes(sound.value) ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                    <input
                      type="checkbox"
                      name="specialSounds"
                      value={sound.value}
                      checked={specialSounds.includes(sound.value)}
                      onChange={() => handleSpecialSoundChange(sound.value)}
                      className="accent-blue-600"
                    />
                    <span className="capitalize text-gray-900">{sound.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (step === 3) {
      return (
        <div className="w-full flex flex-col items-center">
          <p className="mb-4 text-lg font-medium text-center text-gray-800">Morphology (Word Building)</p>
          <div className="flex flex-col gap-4 w-full max-w-md">
            <div>
              <p className="font-semibold mb-2 text-gray-800">What type of morphology should it use?</p>
              {['isolating','agglutinative','fusional','polysynthetic'].map((type) => (
                <label key={type} className={`border rounded-lg p-3 cursor-pointer flex items-center gap-3 ${morphologyType === type ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                  <input
                    type="radio"
                    name="morphologyType"
                    value={type}
                    checked={morphologyType === type}
                    onChange={() => setMorphologyType(type)}
                    className="accent-blue-600"
                  />
                  <span className="capitalize text-gray-900">{type}</span>
                </label>
              ))}
            </div>
            <div>
              <p className="font-semibold mb-2 text-gray-800">How should new words be formed?</p>
              {['compounding','affixes','both'].map((type) => (
                <label key={type} className={`border rounded-lg p-3 cursor-pointer flex items-center gap-3 ${wordFormation === type ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                  <input
                    type="radio"
                    name="wordFormation"
                    value={type}
                    checked={wordFormation === type}
                    onChange={() => setWordFormation(type)}
                    className="accent-blue-600"
                  />
                  <span className="capitalize text-gray-900">{type}</span>
                </label>
              ))}
            </div>
            <div>
              <p className="font-semibold mb-2 text-gray-800">What “feel” should the words have? <span className="text-sm text-gray-500">(choose multiple)</span></p>
              <div className="flex flex-wrap gap-2">
                {['soft','harsh','flowing','staccato'].map((feel) => (
                  <label key={feel} className={`border rounded-lg px-3 py-2 cursor-pointer flex items-center gap-2 ${wordFeel.includes(feel) ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                    <input
                      type="checkbox"
                      name="wordFeel"
                      value={feel}
                      checked={wordFeel.includes(feel)}
                      onChange={() => setWordFeel(prev => prev.includes(feel) ? prev.filter(f => f !== feel) : [...prev, feel])}
                      className="accent-blue-600"
                    />
                    <span className="capitalize text-gray-900">{feel}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Extra question 1 */}
            <div>
              <p className="font-semibold mb-2 text-gray-800">Should your language have honorifics or special speech levels?</p>
              {['none','simple','complex'].map((level) => (
                <label key={level} className={`border rounded-lg p-3 cursor-pointer flex items-center gap-3 ${honorifics === level ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                  <input
                    type="radio"
                    name="honorifics"
                    value={level}
                    checked={honorifics === level}
                    onChange={() => setHonorifics(level)}
                    className="accent-blue-600"
                  />
                  <span className="capitalize text-gray-900">{level === 'none' ? 'None' : level.charAt(0).toUpperCase() + level.slice(1)}</span>
                </label>
              ))}
            </div>
            {/* Extra question 2 */}
            <div>
              <p className="font-semibold mb-2 text-gray-800">Would you like your language to have unique punctuation or sentence-ending markers?</p>
              <div className="flex flex-col gap-2">
                <label className={`border rounded-lg p-3 cursor-pointer flex items-center gap-3 ${uniquePunctuation === 'yes' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                  <input
                    type="radio"
                    name="uniquePunctuation"
                    value="yes"
                    checked={uniquePunctuation === 'yes'}
                    onChange={() => setUniquePunctuation('yes')}
                    className="accent-blue-600"
                  />
                  <span className="text-gray-900">Yes</span>
                </label>
                <label className={`border rounded-lg p-3 cursor-pointer flex items-center gap-3 ${uniquePunctuation === 'no' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                  <input
                    type="radio"
                    name="uniquePunctuation"
                    value="no"
                    checked={uniquePunctuation === 'no'}
                    onChange={() => setUniquePunctuation('no')}
                    className="accent-blue-600"
                  />
                  <span className="text-gray-900">No</span>
                </label>
                {uniquePunctuation === 'yes' && (
                  <textarea
                    className="w-full border rounded p-2 mt-2 text-gray-900 placeholder-gray-400"
                    placeholder="Describe your unique punctuation or markers..."
                    value={punctuationDesc}
                    onChange={e => setPunctuationDesc(e.target.value)}
                    rows={2}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (step === 4) {
      return (
        <div className="w-full flex flex-col items-center">
          <p className="mb-4 text-lg font-medium text-center text-gray-800">Grammar</p>
          <div className="flex flex-col gap-4 w-full max-w-md">
            <div>
              <p className="font-semibold mb-2 text-gray-800">What is the basic word order?</p>
              {['SVO','SOV','VSO','free'].map((order) => (
                <label key={order} className={`border rounded-lg p-3 cursor-pointer flex items-center gap-3 ${wordOrder === order ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                  <input
                    type="radio"
                    name="wordOrder"
                    value={order}
                    checked={wordOrder === order}
                    onChange={() => setWordOrder(order)}
                    className="accent-blue-600"
                  />
                  <span className="text-gray-900">{order === 'free' ? 'Free (flexible order)' : order}</span>
                </label>
              ))}
            </div>
            <div>
              <p className="font-semibold mb-2 text-gray-800">How should plurals work?</p>
              {[
                { value: 'none', label: 'None' },
                { value: 's', label: 'Plural -s (add suffix)' },
                { value: 'vowel', label: 'Plural via vowel change' },
                { value: 'particles', label: 'Particles (add separate word)' },
              ].map((opt) => (
                <label key={opt.value} className={`border rounded-lg p-3 cursor-pointer flex items-center gap-3 ${plurals === opt.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                  <input
                    type="radio"
                    name="plurals"
                    value={opt.value}
                    checked={plurals === opt.value}
                    onChange={() => setPlurals(opt.value)}
                    className="accent-blue-600"
                  />
                  <span className="text-gray-900">{opt.label}</span>
                </label>
              ))}
            </div>
            <div>
              <p className="font-semibold mb-2 text-gray-800">Should it have gender or noun classes?</p>
              {[
                { value: 'none', label: 'None' },
                { value: '2', label: '2 genders' },
                { value: 'classes', label: 'Noun classes (>2)' },
              ].map((opt) => (
                <label key={opt.value} className={`border rounded-lg p-3 cursor-pointer flex items-center gap-3 ${gender === opt.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                  <input
                    type="radio"
                    name="gender"
                    value={opt.value}
                    checked={gender === opt.value}
                    onChange={() => setGender(opt.value)}
                    className="accent-blue-600"
                  />
                  <span className="text-gray-900">{opt.label}</span>
                </label>
              ))}
            </div>
            <div>
              <p className="font-semibold mb-2 text-gray-800">What about verb tense/aspect?</p>
              {[
                { value: 'none', label: 'None' },
                { value: 'simple', label: 'Simple past/present/future' },
                { value: 'rich', label: 'Rich aspect (continuous, perfect, etc.)' },
              ].map((opt) => (
                <label key={opt.value} className={`border rounded-lg p-3 cursor-pointer flex items-center gap-3 ${tense === opt.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                  <input
                    type="radio"
                    name="tense"
                    value={opt.value}
                    checked={tense === opt.value}
                    onChange={() => setTense(opt.value)}
                    className="accent-blue-600"
                  />
                  <span className="text-gray-900">{opt.label}</span>
                </label>
              ))}
            </div>
            <div>
              <p className="font-semibold mb-2 text-gray-800">Should there be case marking?</p>
              {[
                { value: 'none', label: 'None' },
                { value: 'light', label: 'Light' },
                { value: 'rich', label: 'Rich' },
              ].map((opt) => (
                <label key={opt.value} className={`border rounded-lg p-3 cursor-pointer flex items-center gap-3 ${caseMarking === opt.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                  <input
                    type="radio"
                    name="caseMarking"
                    value={opt.value}
                    checked={caseMarking === opt.value}
                    onChange={() => setCaseMarking(opt.value)}
                    className="accent-blue-600"
                  />
                  <span className="text-gray-900">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      );
    }
    if (step === 5) {
      return (
        <div className="w-full flex flex-col items-center">
          <p className="mb-4 text-lg font-medium text-center text-gray-800">Lexicon (Vocabulary)</p>
          <div className="flex flex-col gap-4 w-full max-w-md">
            <div>
              <p className="font-semibold mb-2 text-gray-800">How many root vocabulary words should we generate now?</p>
              {['30','50','100'].map((count) => (
                <label key={count} className={`border rounded-lg p-3 cursor-pointer flex items-center gap-3 ${rootWordCount === count ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                  <input
                    type="radio"
                    name="rootWordCount"
                    value={count}
                    checked={rootWordCount === count}
                    onChange={() => setRootWordCount(count)}
                    className="accent-blue-600"
                  />
                  <span className="text-gray-900">{count}</span>
                </label>
              ))}
            </div>
            <div>
              <p className="font-semibold mb-2 text-gray-800">Which topics should be prioritized? <span className="text-sm text-gray-500">(choose multiple)</span></p>
              <div className="flex flex-wrap gap-2">
                {['nature','family','tech','school','travel'].map((topic) => (
                  <label key={topic} className={`border rounded-lg px-3 py-2 cursor-pointer flex items-center gap-2 ${lexiconTopics.includes(topic) ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                    <input
                      type="checkbox"
                      name="lexiconTopics"
                      value={topic}
                      checked={lexiconTopics.includes(topic)}
                      onChange={() => setLexiconTopics(prev => prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic])}
                      className="accent-blue-600"
                    />
                    <span className="capitalize text-gray-900">{topic}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (step === 6) {
      return (
        <div className="w-full flex flex-col items-center">
          <p className="mb-4 text-lg font-medium text-center text-gray-800">Extras</p>
          <div className="flex flex-col gap-4 w-full max-w-md">
            <div>
              <p className="font-semibold mb-2 text-gray-800">Should your language allow loanwords from an existing language?</p>
              <div className="flex flex-col gap-2">
                <label className={`border rounded-lg p-3 cursor-pointer flex items-center gap-3 ${allowLoanwords === 'no' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                  <input
                    type="radio"
                    name="allowLoanwords"
                    value="no"
                    checked={allowLoanwords === 'no'}
                    onChange={() => setAllowLoanwords('no')}
                    className="accent-blue-600"
                  />
                  <span className="text-gray-900">No</span>
                </label>
                <label className={`border rounded-lg p-3 cursor-pointer flex items-center gap-3 ${allowLoanwords === 'yes' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                  <input
                    type="radio"
                    name="allowLoanwords"
                    value="yes"
                    checked={allowLoanwords === 'yes'}
                    onChange={() => setAllowLoanwords('yes')}
                    className="accent-blue-600"
                  />
                  <span className="text-gray-900">Yes</span>
                </label>
                {allowLoanwords === 'yes' && (
                  <input
                    className="w-full border rounded p-2 mt-2 text-gray-900 placeholder-gray-400"
                    type="text"
                    placeholder="Specify which language (e.g., English, Mandarin)"
                    value={loanwordSource}
                    onChange={e => setLoanwordSource(e.target.value)}
                  />
                )}
              </div>
            </div>
            <div>
              <p className="font-semibold mb-2 text-gray-800">What level of safety filter should we apply?</p>
              {['strict','medium','off'].map((level) => (
                <label key={level} className={`border rounded-lg p-3 cursor-pointer flex items-center gap-3 ${safetyFilter === level ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                  <input
                    type="radio"
                    name="safetyFilter"
                    value={level}
                    checked={safetyFilter === level}
                    onChange={() => setSafetyFilter(level)}
                    className="accent-blue-600"
                  />
                  <span className="capitalize text-gray-900">{level}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      );
    }
    // End of steps: show summary/results
    const answers = {
      startingPoint: startingPoint === 'existing_idea' ? ideaText : 'random_new',
      scriptType, visualStyles, writingDirection,
      pronounceEase, consonantClusters, vowelCount, specialSounds,
      morphologyType, wordFormation, wordFeel, honorifics, uniquePunctuation, punctuationDesc,
      wordOrder, plurals, gender, tense, caseMarking,
      rootWordCount, lexiconTopics,
      allowLoanwords, loanwordSource, safetyFilter
    };
    return (
      <div className="w-full flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4 text-center">Your Conlang Summary</h2>
        <div className="bg-white rounded-xl shadow p-6 w-full max-w-xl text-gray-800">
          <ul className="space-y-2">
            <li><b>Starting Point:</b> {startingPoint === 'existing_idea' ? `Existing idea: ${ideaText || '(no description)'}` : 'Random new'}</li>
            <li><b>Script Type:</b> {scriptType}</li>
            <li><b>Visual Style:</b> {visualStyles.length ? visualStyles.join(', ') : 'None'}</li>
            <li><b>Writing Direction:</b> {writingDirection}</li>
            <li><b>Pronounce Ease:</b> {pronounceEase}</li>
            <li><b>Consonant Clusters:</b> {consonantClusters}</li>
            <li><b>Vowel Count</b> (how many vowel sounds): {vowelCount}</li>
            <li><b>Special Sounds</b> (unique or rare sounds): {specialSounds.length ? specialSounds.join(', ') + ' (these are uncommon sounds in languages)' : 'None'}</li>
            <li><b>Morphology Type</b> (how words change form, e.g., adding endings): {morphologyType} {morphologyType ? `(this means words ${morphologyType === 'isolating' ? 'don’t change much' : morphologyType === 'agglutinative' ? 'use lots of endings' : morphologyType === 'fusional' ? 'change form in complex ways' : ''})` : ''}</li>
            <li><b>Word Formation</b> (how new words are created): {wordFormation} {wordFormation ? `(e.g., combining roots, adding prefixes/suffixes)` : ''}</li>
            <li><b>Word Feel</b> (the mood or vibe of words): {wordFeel.length ? wordFeel.join(', ') + ' (these describe the style or emotion of the words)' : 'None'}</li>
            <li><b>Honorifics/Speech Levels</b> (special words for respect or formality): {honorifics} {honorifics ? '(e.g., polite forms, titles)' : ''}</li>
            <li><b>Unique Punctuation</b> (special marks or symbols): {uniquePunctuation === 'yes' ? (punctuationDesc ? punctuationDesc + ' (custom punctuation)' : 'Yes (custom punctuation)') : 'No'}</li>
            <li><b>Word Order</b> (the usual order of subject, verb, object): {wordOrder} {wordOrder ? `(e.g., SVO means Subject-Verb-Object like "I eat apples")` : ''}</li>
            <li><b>Plurals</b> (how words show more than one): {plurals} {plurals ? '(e.g., adding -s for plural)' : ''}</li>
            <li><b>Gender/Noun Classes</b> (categories for nouns, like masculine/feminine): {gender} {gender ? '(e.g., Spanish has masculine/feminine nouns)' : ''}</li>
            <li><b>Verb Tense/Aspect</b> (how verbs show time or completion): {tense} {tense ? '(e.g., past, present, future)' : ''}</li>
            <li><b>Case Marking</b> (word endings that show a noun’s role, like subject or object): {caseMarking} {caseMarking ? '(e.g., “he” vs. “him” in English)' : ''}</li>
            <li><b>Root Word Count</b> (number of basic words to build from): {rootWordCount}</li>
            <li><b>Lexicon Topics</b> (main themes for vocabulary): {lexiconTopics.length ? lexiconTopics.join(', ') + ' (these are the main topics for your words)' : 'None'}</li>
            <li><b>Allow Loanwords</b> (can you borrow words from other languages?): {allowLoanwords === 'yes' ? `Yes (${loanwordSource || 'not specified'})` : 'No'}</li>
            <li><b>Safety Filter</b> (content filter level): {safetyFilter}</li>
          </ul>
        </div>
        {aiResult && (
          <>
            <div className="my-6 w-full max-w-xl flex items-center justify-center">
              <div className="bg-blue-100 border border-blue-300 rounded px-6 py-3 text-blue-800 text-lg font-semibold shadow-sm text-center">
                🎉 Here is your brand new language, crafted just for you!
              </div>
            </div>
            <div className="bg-green-50 border border-green-300 rounded p-4 w-full max-w-xl text-green-900 whitespace-pre-wrap">
              <b>AI Generated Language:</b>
              <div className="mt-2">{aiResult}</div>
            </div>
          </>
        )}
        {aiLoading && (
          <div className="mt-6 text-blue-700">Generating language with AI...</div>
        )}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
            onClick={async () => {
              setAiLoading(true);
              setAiResult(null);
              try {
                const res = await fetch('/api/generate', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ prompt: buildConlangPrompt(answers) }),
                });
                const data = await res.json();
                if (data.result) {
                  setAiResult(data.result);
                } else {
                  setAiResult('Error: ' + (data.error || 'No result from OpenAI.'));
                }
              } catch (err) {
                setAiResult('Error contacting API.');
              }
              setAiLoading(false);
            }}
            disabled={aiLoading}
          >
            {aiLoading ? 'Generating...' : 'Generate Language'}
          </button>
          <button
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            onClick={() => window.location.reload()}
            disabled={aiLoading}
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  // Disable next if nothing selected for current step
  let canGoNext = true;
  if (step === 0) canGoNext = startingPoint !== null;
  if (step === 1) canGoNext = scriptType !== null && writingDirection !== null;
  if (step === 2) canGoNext = pronounceEase !== null && consonantClusters !== null && vowelCount !== null;
  if (step === 3) canGoNext = morphologyType !== null && wordFormation !== null && honorifics !== null && uniquePunctuation !== null;
  if (step === 4) canGoNext = wordOrder !== null && plurals !== null && gender !== null && tense !== null && caseMarking !== null;
  if (step === 5) canGoNext = rootWordCount !== null;
  if (step === 6) canGoNext = allowLoanwords !== null && safetyFilter !== null;

  return (
  <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-blue-200">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full flex flex-col items-center">
  <h2 className="text-2xl font-bold mb-2 text-pink-600">Conlang Creator</h2>
  <div className="mb-6 text-gray-600">Step {step + 1} of {steps.length}: <span className="font-semibold">{steps[Math.min(step, steps.length - 1)]}</span></div>
        {renderStepContent()}
        <div className="flex gap-4 mt-8">
          {step > 0 && (
            <button
              className="px-4 py-2 bg-gray-200 text-gray-900 rounded hover:bg-gray-300"
              onClick={() => setStep(step - 1)}
            >
              Back
            </button>
          )}
          {step < steps.length - 1 ? (
            <button
              className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${!canGoNext ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => canGoNext && setStep(step + 1)}
              disabled={!canGoNext}
            >
              Next
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => setStep(step + 1)}
            >
              Finish
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
