import React, { useState } from 'react';

const LearningJournal = () => {
  const [entries, setEntries] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [currentEntry, setCurrentEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    topic: '',
    learned: '',
    application: '',
    questions: '',
    nextSteps: '',
    energyLevel: 3
  });
  const [view, setView] = useState('new');

  const handleChange = (field, value) => {
    setCurrentEntry(prev => ({ ...prev, [field]: value }));
  };

  const saveEntry = () => {
    if (currentEntry.topic && currentEntry.learned) {
      setEntries(prev => [{ ...currentEntry, id: Date.now() }, ...prev]);
      setCurrentEntry({
        date: new Date().toISOString().split('T')[0],
        topic: '',
        learned: '',
        application: '',
        questions: '',
        nextSteps: '',
        energyLevel: 3
      });
      setView('history');
    }
  };

  const EnergyIndicator = ({ level, onChange, readonly = false }) => (
    <div className="flex items-center gap-2">
      <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Energy:</span>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(n => (
          <button
            key={n}
            onClick={() => !readonly && onChange && onChange(n)}
            className={`w-8 h-8 rounded-full text-sm font-medium transition-all ${
              n <= level
                ? 'bg-emerald-500 text-white'
                : darkMode 
                  ? 'bg-slate-600 text-slate-400' 
                  : 'bg-gray-200 text-gray-500'
            } ${readonly ? 'cursor-default' : 'hover:scale-110'}`}
            disabled={readonly}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );

  // Theme classes
  const theme = {
    bg: darkMode ? 'bg-slate-900' : 'bg-gradient-to-br from-slate-50 to-slate-100',
    card: darkMode ? 'bg-slate-800' : 'bg-white',
    text: darkMode ? 'text-slate-100' : 'text-slate-800',
    textMuted: darkMode ? 'text-slate-400' : 'text-slate-500',
    textLabel: darkMode ? 'text-slate-300' : 'text-slate-700',
    input: darkMode 
      ? 'bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400' 
      : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400',
    inputBg: darkMode ? 'bg-slate-700' : 'bg-slate-50',
    border: darkMode ? 'border-slate-700' : 'border-slate-100',
    navActive: darkMode ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-white',
    navInactive: darkMode 
      ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' 
      : 'bg-white text-slate-600 hover:bg-slate-100',
  };

  return (
    <div className={`min-h-screen ${theme.bg} p-6 transition-colors duration-300`}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 relative">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`absolute right-0 top-0 p-3 rounded-full transition-all ${
              darkMode 
                ? 'bg-slate-700 text-yellow-400 hover:bg-slate-600' 
                : 'bg-white text-slate-600 hover:bg-slate-100 shadow-sm'
            }`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>

          <h1 className={`text-3xl font-light ${theme.text} mb-2`}>Learning Journal</h1>
          <p className={theme.textMuted}>Capture insights. Reflect. Grow.</p>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setView('new')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              view === 'new' ? theme.navActive : theme.navInactive
            }`}
          >
            + New Entry
          </button>
          <button
            onClick={() => setView('history')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              view === 'history' ? theme.navActive : theme.navInactive
            }`}
          >
            History ({entries.length})
          </button>
        </div>

        {view === 'new' ? (
          /* New Entry Form */
          <div className={`${theme.card} rounded-2xl shadow-sm p-8 space-y-6 transition-colors duration-300`}>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className={`block text-sm font-medium ${theme.textLabel} mb-2`}>Date</label>
                <input
                  type="date"
                  value={currentEntry.date}
                  onChange={e => handleChange('date', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${theme.input}`}
                />
              </div>
              <div className="flex-1">
                <label className={`block text-sm font-medium ${theme.textLabel} mb-2`}>Topic / Source</label>
                <input
                  type="text"
                  value={currentEntry.topic}
                  onChange={e => handleChange('topic', e.target.value)}
                  placeholder="e.g., Leadership workshop, Book chapter..."
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${theme.input}`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium ${theme.textLabel} mb-2`}>
                🧠 What did I learn?
              </label>
              <textarea
                value={currentEntry.learned}
                onChange={e => handleChange('learned', e.target.value)}
                placeholder="Key insights, concepts, or skills..."
                rows={3}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none ${theme.input}`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${theme.textLabel} mb-2`}>
                🔧 How can I apply this?
              </label>
              <textarea
                value={currentEntry.application}
                onChange={e => handleChange('application', e.target.value)}
                placeholder="Specific ways to use this in work or life..."
                rows={3}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none ${theme.input}`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${theme.textLabel} mb-2`}>
                ❓ Questions that arose
              </label>
              <textarea
                value={currentEntry.questions}
                onChange={e => handleChange('questions', e.target.value)}
                placeholder="What am I still curious about? What needs clarification?"
                rows={2}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none ${theme.input}`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${theme.textLabel} mb-2`}>
                ➡️ Next steps
              </label>
              <textarea
                value={currentEntry.nextSteps}
                onChange={e => handleChange('nextSteps', e.target.value)}
                placeholder="Actions I'll take based on this learning..."
                rows={2}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none ${theme.input}`}
              />
            </div>

            <div className={`flex justify-between items-center pt-4 border-t ${theme.border}`}>
              <EnergyIndicator
                level={currentEntry.energyLevel}
                onChange={level => handleChange('energyLevel', level)}
              />
              <button
                onClick={saveEntry}
                disabled={!currentEntry.topic || !currentEntry.learned}
                className="px-8 py-3 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Entry
              </button>
            </div>
          </div>
        ) : (
          /* History View */
          <div className="space-y-4">
            {entries.length === 0 ? (
              <div className={`${theme.card} rounded-2xl shadow-sm p-12 text-center transition-colors duration-300`}>
                <p className={`${theme.textMuted} text-lg`}>No entries yet</p>
                <p className={`${theme.textMuted} mt-2`}>Start capturing your learning!</p>
              </div>
            ) : (
              entries.map(entry => (
                <div key={entry.id} className={`${theme.card} rounded-2xl shadow-sm p-6 transition-colors duration-300`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className={`font-semibold ${theme.text} text-lg`}>{entry.topic}</h3>
                      <p className={`text-sm ${theme.textMuted}`}>{entry.date}</p>
                    </div>
                    <EnergyIndicator level={entry.energyLevel} readonly />
                  </div>
                  
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className={`font-medium ${theme.textMuted} mb-1`}>🧠 Learned</p>
                      <p className={`${theme.textLabel} ${theme.inputBg} p-3 rounded-lg`}>{entry.learned}</p>
                    </div>
                    
                    {entry.application && (
                      <div>
                        <p className={`font-medium ${theme.textMuted} mb-1`}>🔧 Application</p>
                        <p className={`${theme.textLabel} ${theme.inputBg} p-3 rounded-lg`}>{entry.application}</p>
                      </div>
                    )}
                    
                    {entry.questions && (
                      <div>
                        <p className={`font-medium ${theme.textMuted} mb-1`}>❓ Questions</p>
                        <p className={`${theme.textLabel} ${theme.inputBg} p-3 rounded-lg`}>{entry.questions}</p>
                      </div>
                    )}
                    
                    {entry.nextSteps && (
                      <div>
                        <p className={`font-medium ${theme.textMuted} mb-1`}>➡️ Next Steps</p>
                        <p className={`${theme.textLabel} ${theme.inputBg} p-3 rounded-lg`}>{entry.nextSteps}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Footer tip */}
        <p className={`text-center ${theme.textMuted} text-sm mt-8`}>
          💡 Tip: Review your entries weekly to reinforce learning
        </p>
      </div>
    </div>
  );
};

export default LearningJournal;
