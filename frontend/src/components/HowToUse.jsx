import React from 'react';
import { Shield, Target, Zap, Calculator, TrendingUp, Info, Swords } from 'lucide-react';
import { useTheme } from '../App';
import guardsmanImg from '../assets/howtouse_guardsman.png';
import monsterImg from '../assets/howtouse_monster.png';
import dragonImg from '../assets/howtouse_dragon.png';

export default function HowToUse() {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen transition-colors ${isDark ? 'theme-surface-dark' : 'theme-surface-light'}`}>
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold mb-4 ${isDark ? 'text-[#f5f7fa]' : 'text-[#1c1f1f]'}`}>
            How to Use Troop Optimizer
          </h1>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Master your army composition and dominate the battlefield
          </p>
        </div>

        {/* Goal Section */}
        <div className={`${isDark ? 'theme-card-dark' : 'theme-card-light'} rounded-xl p-6 mb-8 shadow-lg`}>
          <div className="flex items-start gap-4">
            <Target className={`w-8 h-8 flex-shrink-0 mt-1 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
            <div>
              <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-[#f5f7fa]' : 'text-[#1c1f1f]'}`}>
                What This Tool Does
              </h2>
              <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Troop Optimizer helps you find the <strong>best troop composition</strong> for your next attack by calculating the most efficient combination of units based on your health bonuses, leadership capacity, and army strength. Use it to <strong>maximize your valor points</strong> while ensuring optimal troop distribution.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Step 0 - New Understanding Basics Card */}
          <div className={`${isDark ? 'theme-card-dark' : 'theme-card-light'} rounded-xl p-6 shadow-lg`}>
            <h3 className={`text-2xl font-bold mb-4 flex items-center gap-3 ${isDark ? 'text-[#f5f7fa]' : 'text-[#1c1f1f]'}`}>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isDark ? 'bg-[#f5f7fa] text-[#1c1f1f]' : 'bg-[#1c1f1f] text-white'}`}>0</span>
              If You Don't Already Know...
            </h3>
            <div className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <p className="mb-3">Understanding unit types:</p>
              <ul className="space-y-2 ml-4">
                <li><strong className={isDark ? 'text-white' : 'text-gray-900'}>Ranged units</strong> are archers</li>
                <li><strong className={isDark ? 'text-white' : 'text-gray-900'}>Melee units</strong> are spearmen</li>
                <li><strong className={isDark ? 'text-white' : 'text-gray-900'}>Mounted units</strong> are riders</li>
                <li><strong className={isDark ? 'text-white' : 'text-gray-900'}>Flying units</strong> are birds from specialist and guardsman</li>
              </ul>
            </div>
            
            <div className={`rounded-lg p-4 ${isDark ? 'bg-blue-900/20 border border-blue-500/50' : 'bg-blue-50 border border-blue-300'}`}>
              <div className="flex items-start gap-3">
                <Info className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                <div className={`text-sm ${isDark ? 'text-blue-200' : 'text-blue-800'}`}>
                  <p className="mb-2">
                    <strong>Important:</strong> All these units have the same health bonuses (and strength too) across different levels. This means:
                  </p>
                  <ul className="space-y-1 ml-4">
                    <li>G1 spearman and G3 spearman will have the same health bonuses</li>
                    <li>So will G9 spearman</li>
                  </ul>
                  <p className="mt-3">
                    That is why there is only one section of health bonuses per troop type, and separate for monsters because it varies according to captain and research.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 1 */}
          <div className={`${isDark ? 'theme-card-dark' : 'theme-card-light'} rounded-xl p-6 shadow-lg`}>
            <h3 className={`text-2xl font-bold mb-4 flex items-center gap-3 ${isDark ? 'text-[#f5f7fa]' : 'text-[#1c1f1f]'}`}>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isDark ? 'bg-[#f5f7fa] text-[#1c1f1f]' : 'bg-[#1c1f1f] text-white'}`}>1</span>
              Select Your Troops
            </h3>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Choose your highest Guardsman and Specialist that you plan to attack with.
            </p>
            <div className="space-y-3 ml-4">
              <div className="flex items-start gap-3">
                <Shield className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                <div>
                  <strong className={isDark ? 'text-white' : 'text-gray-900'}>Guardsman Layer</strong>
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}> - You can add up to 3 Guardsman layers</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Target className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                <div>
                  <strong className={isDark ? 'text-white' : 'text-gray-900'}>Specialist Layer</strong>
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}> - You can add 2–3 Specialist layers</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Zap className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                <div>
                  <strong className={isDark ? 'text-white' : 'text-gray-900'}>Monster Layer</strong>
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}> - Add Monster layers as needed - they are optional but can improve total output</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className={`${isDark ? 'theme-card-dark' : 'theme-card-light'} rounded-xl p-6 shadow-lg`}>
            <h3 className={`text-2xl font-bold mb-4 flex items-center gap-3 ${isDark ? 'text-[#f5f7fa]' : 'text-[#1c1f1f]'}`}>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isDark ? 'bg-[#f5f7fa] text-[#1c1f1f]' : 'bg-[#1c1f1f] text-white'}`}>2</span>
              Input Bonuses
            </h3>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              You'll need to calculate and enter <strong className={isDark ? 'text-yellow-300' : 'text-yellow-600'}>Health Bonuses</strong> for your troops. To find them:
            </p>

            <h4 className={`text-lg font-semibold mb-3 mt-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>How to Find Your Health Bonuses:</h4>
            <ol className={`list-decimal list-inside space-y-2 mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <li className={isDark ? 'text-white' : 'text-gray-900'}>Attack a monster using your desired captain or <strong>better</strong> use recent report on any monster you attacked. (like Ancients or Ragnarock)</li>
              <li><strong className={isDark ? 'text-white' : 'text-gray-900'}>Open the battle report</strong> → look at Health bonus for each troop type (Melee, Ranged, Flying, Mounted) for both Guardsmen and Specialists</li>
              <li><strong className={isDark ? 'text-white' : 'text-gray-900'}>Enter those bonuses</strong> into the calculator</li>
            </ol>
            
            {/* Guardsman and Monster Images - Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Guardsman Bonus Image */}
              <div className={`${isDark ? 'bg-[#2d3030]' : 'bg-gray-100'} rounded-lg p-4 overflow-hidden`}>
                <img 
                  src={guardsmanImg}
                  alt="Guardsman stats showing health bonuses"
                  className="w-[302px] h-[545px] mx-auto rounded-lg shadow-lg object-contain"
                />
                <p className={`text-sm text-center mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Example: Guardsman troop showing health bonuses in battle report</p>
              </div>

              {/* Monster Bonus Image */}
              <div className={`${isDark ? 'bg-[#2d3030]' : 'bg-gray-100'} rounded-lg p-4 overflow-hidden`}>
                <img 
                  src={monsterImg}
                  alt="Monster stats showing health bonuses"
                  className="w-[302px] h-[545px] mx-auto rounded-lg shadow-lg object-contain"
                />
                <p className={`text-sm text-center mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Example: Monster troop health bonus in battle report</p>
              </div>
            </div>

            {/* Dragon Special Note - Side by Side Layout */}
            <div className={`rounded-lg p-4 mb-4 grid grid-cols-1 md:grid-cols-2 gap-4 ${isDark ? 'bg-green-900/20 border-2 border-green-500/50' : 'bg-green-50 border-2 border-green-300'}`}>
              {/* Left: Dragon Information */}
              <div className="flex items-start gap-3">
                <Zap className={`w-6 h-6 flex-shrink-0 mt-0.5 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                <div>
                  <h4 className={`text-lg font-bold mb-2 ${isDark ? 'text-green-300' : 'text-green-700'}`}>Special Note About Dragons:</h4>
                  <p className={`mb-3 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                    If you <strong>did not include your dragon</strong> in that monster attack, you need to manually add its health bonus:
                  </p>
                  <ol className={`list-decimal list-inside space-y-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                    <li>Go to your <strong>Dragon's Bonuses</strong> tab in game</li>
                    <li>Find the <strong>Health bonus granted by dragon</strong></li>
                    <li>Add this value to your troop's health bonuses manually in the calculator</li>
                  </ol>
                  <div className={`mt-3 p-3 rounded ${isDark ? 'bg-green-900/30' : 'bg-green-100'}`}>
                    <p className={`text-sm ${isDark ? 'text-green-200' : 'text-green-800'}`}>
                      <strong>Why?</strong> Players sometimes forget to add dragons on raids, so they might miss it in the report. This ensures you don't miss out on valuable health bonuses!
                    </p>
                  </div>
                  <div className={`mt-3 p-3 rounded ${isDark ? 'bg-yellow-900/30' : 'bg-yellow-100'}`}>
                    <p className={`text-sm ${isDark ? 'text-yellow-200' : 'text-yellow-800'}`}>
                      <strong>⚠️ Note:</strong> Ignore this if you have used dragon in the attack
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Right: Dragon Bonus Image */}
              <div className={`${isDark ? 'bg-[#2d3030]' : 'bg-gray-100'} rounded-lg p-4 overflow-hidden`}>
                <img 
                  src={dragonImg}
                  alt="Dragon bonuses tab showing health bonus"
                  className="w-[302px] h-[545px] mx-auto rounded-lg shadow-lg object-contain"
                />
                <p className={`text-sm text-center mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Example: Dragon's Bonuses tab showing health bonus to add</p>
              </div>
            </div>

            {/* Data Persistence Warning */}
            <div className={`rounded-lg p-4 flex items-start gap-3 ${isDark ? 'bg-red-900/20 border-2 border-red-500/50' : 'bg-red-50 border-2 border-red-300'}`}>
              <Info className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
              <div className={`text-sm ${isDark ? 'text-red-200' : 'text-red-800'}`}>
                <strong>⚠️ Important:</strong> Right now I am still figuring out how to preserve bonuses even during page reload. Till then you have to download and upload the JSON file, because reloading the page loses all that data.
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className={`${isDark ? 'theme-card-dark' : 'theme-card-light'} rounded-xl p-6 shadow-lg`}>
            <h3 className={`text-2xl font-bold mb-4 flex items-center gap-3 ${isDark ? 'text-[#f5f7fa]' : 'text-[#1c1f1f]'}`}>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isDark ? 'bg-[#f5f7fa] text-[#1c1f1f]' : 'bg-[#1c1f1f] text-white'}`}>3</span>
              Adjust Margin
            </h3>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              The <strong className={isDark ? 'text-white' : 'text-gray-900'}>Margin</strong> setting determines how you want your troops to die in battle.
            </p>
            
            <div className={`${isDark ? 'bg-[#2d3030]' : 'bg-gray-100'} rounded-lg p-4 mb-4`}>
              <p className={`mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <strong>What is Margin?</strong> Margin represents the <strong>difference between health of 2 consecutive troops</strong>. The more this gap is, the more is the probability of the healthier squad getting hit.
              </p>
              <p className={`mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                More margin ensures that troops die in a specific order. However, we do not allow margin more than 20%, as it would be meaningless and will not earn you any more valor points.
              </p>
              <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                A lower margin (1-5%) gives a tighter, more optimized lineup. A higher margin (5-20%) spreads the layers more evenly, giving safer but less aggressive results. Going over 5% reduces damage drastically.
              </p>
            </div>

            <div className={`rounded-lg p-3 flex items-start gap-2 ${isDark ? 'bg-blue-900/20 border border-blue-500/50' : 'bg-blue-50 border border-blue-300'}`}>
              <Info className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              <p className={`text-sm ${isDark ? 'text-blue-200' : 'text-blue-800'}`}>
                <strong>Recommendation:</strong> Keep margin between 1-5% for optimal results.
              </p>
            </div>
          </div>
          
          {/* Step 4 */}
          <div className={`${isDark ? 'theme-card-dark' : 'theme-card-light'} rounded-xl p-6 shadow-lg`}>
            <h3 className={`text-2xl font-bold mb-4 flex items-center gap-3 ${isDark ? 'text-[#f5f7fa]' : 'text-[#1c1f1f]'}`}>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isDark ? 'bg-[#f5f7fa] text-[#1c1f1f]' : 'bg-[#1c1f1f] text-white'}`}>4</span>
              Export or Import File
            </h3>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              If you want to avoid putting bonuses every time, then use the <strong className={isDark ? 'text-white' : 'text-gray-900'}>'Download Bonuses'</strong> option. If you already have an older file, you can also upload that here and then run allocation.
            </p>
            
            <div className={`${isDark ? 'bg-[#2d3030]' : 'bg-gray-100'} rounded-lg p-4 mb-4`}>
              <p className={`mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Your <strong>bonuses along with leadership and dominance caps</strong> will be saved in the file that you download after pressing 'Download Bonuses'. You can upload this file later as is, to calculate results.
              </p>
            </div>

            <div className={`rounded-lg p-3 flex items-start gap-2 ${isDark ? 'bg-yellow-900/20 border border-yellow-500/50' : 'bg-yellow-50 border border-yellow-300'}`}>
              <Info className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`} />
              <p className={`text-sm ${isDark ? 'text-yellow-200' : 'text-yellow-800'}`}>
                <strong>Please note:</strong> Guardsman, specialist and monster levels with desired layers won't be saved. Only bonuses and leadership and dominance capabilities are preserved.
              </p>
            </div>
          </div>

          {/* Steps 5 & 6 - Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Step 5 */}
            <div className={`${isDark ? 'theme-card-dark' : 'theme-card-light'} rounded-xl p-6 shadow-lg`}>
              <h3 className={`text-2xl font-bold mb-4 flex items-center gap-3 ${isDark ? 'text-[#f5f7fa]' : 'text-[#1c1f1f]'}`}>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isDark ? 'bg-[#f5f7fa] text-[#1c1f1f]' : 'bg-[#1c1f1f] text-white'}`}>5</span>
                Review the Summary Panel
              </h3>
              <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                The Summary Panel shows your final lineup overview:
              </p>
              
              <div className={`${isDark ? 'bg-[#2d3030]' : 'bg-gray-100'} rounded-lg p-4 mb-4`}>
                <ul className={`space-y-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li className="flex items-start gap-2">
                    <span className={isDark ? 'text-white' : 'text-gray-900'}>•</span>
                    <span><strong className={isDark ? 'text-white' : 'text-gray-900'}>Total Leadership used</strong> - How much of your army capacity is utilized</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={isDark ? 'text-white' : 'text-gray-900'}>•</span>
                    <span><strong className={isDark ? 'text-white' : 'text-gray-900'}>Dominance</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={isDark ? 'text-white' : 'text-gray-900'}>•</span>
                    <span><strong className={isDark ? 'text-white' : 'text-gray-900'}>Food Production</strong> - Expected valor points</span>
                  </li>
                </ul>
              </div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                This is your quick look at how efficient your army setup is. Pay attention to your food production rate. Going over it means more cost to train your army, which is bad!
              </p>
            </div>

            {/* Step 6 */}
            <div className={`${isDark ? 'theme-card-dark' : 'theme-card-light'} rounded-xl p-6 shadow-lg`}>
              <h3 className={`text-2xl font-bold mb-4 flex items-center gap-3 ${isDark ? 'text-[#f5f7fa]' : 'text-[#1c1f1f]'}`}>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isDark ? 'bg-[#f5f7fa] text-[#1c1f1f]' : 'bg-[#1c1f1f] text-white'}`}>6</span>
                Check the Results Table
              </h3>
              <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                The Results Table lists detailed calculations for every layer – you'll see each troop's leadership use, health, and overall strength contribution, allowing you to fine-tune your army before battle.
              </p>
            </div>
          </div>

          {/* Tips */}
          <div className={`rounded-xl p-6 shadow-lg ${isDark ? 'bg-green-900/30 border border-green-500/50' : 'bg-green-50 border border-green-300'}`}>
            <h3 className={`text-2xl font-bold mb-4 flex items-center gap-3 ${isDark ? 'text-[#f5f7fa]' : 'text-[#1c1f1f]'}`}>
              <TrendingUp className={`w-7 h-7 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
              Tips for Best Results
            </h3>
            <ol className={`list-decimal list-inside space-y-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
              <li className={isDark ? 'text-white' : 'text-gray-900'}>Keep guardsman layer between 2-3</li>
              <li className={isDark ? 'text-white' : 'text-gray-900'}>Keep specialists layer between 2-3 (2 is preferred)</li>
              <li className={isDark ? 'text-white' : 'text-gray-900'}>Keep monsters layer between 2-3 (2 is preferable)</li>
              <li className={isDark ? 'text-white' : 'text-gray-900'}>Use captains with strength bonuses (like Cleopatra, Beowulf, Hercules, Skadi, Aydae, etc.) against epics</li>
              <li className={isDark ? 'text-white' : 'text-gray-900'}>Keep margin between 1-5% - Going over 5% reduces the damage drastically</li>
            </ol>
          </div>

          {/* Footer CTA */}
          <div className={`rounded-xl p-8 text-center shadow-lg ${isDark ? 'bg-black border border-gray-700' : 'bg-gray-900 border border-gray-800'}`}>
            <div className="flex justify-center mb-3">
              <Swords className={`w-12 h-12 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
            </div>
            <h3 className={`text-3xl font-bold mb-3 ${isDark ? 'text-[#f5f7fa]' : 'text-[#1c1f1f]'}`}>
              What are you waiting for?
            </h3>
            <p className={`text-lg ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              Just go and kill the troops!!!
              That's how you earn valor points
            </p>
            <p className={`text-2xl font-bold mt-4 ${isDark ? 'text-red-300' : 'text-red-600'}`}>
              Good luck, Warrior!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
