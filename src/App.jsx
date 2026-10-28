import React, { useState } from 'react';
import { 
  BookOpen, Clock, Users, ChevronRight, Check, Search, 
  Sparkles, Heart, Utensils, Award, Flame, ChefHat, 
  HelpCircle, ExternalLink, Terminal, ArrowLeft
} from 'lucide-react';

const RECIPES = [
  {
    id: 'lasana',
    title: 'Lasaña Clásica Bolognesa',
    category: 'Italiana',
    time: '1h 30 min',
    difficulty: 'Intermedio',
    servings: 6,
    calories: '650 kcal',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=800',
    description: 'Capas de pasta suave, rica salsa boloñesa con carne y jitomate, salsa bechamel cremosa y queso gratinado al horno.',
    tags: ['Pasta', 'Horno', 'Confort Food'],
    ingredients: [
      { name: 'Láminas de pasta para lasaña', amount: 12, unit: 'láminas' },
      { name: 'Carne molida mixta (res y cerdo)', amount: 500, unit: 'g' },
      { name: 'Salsa de tomate pelado / Puré', amount: 800, unit: 'g' },
      { name: 'Queso Mozzarella rallado', amount: 300, unit: 'g' },
      { name: 'Queso Parmesano rallado', amount: 100, unit: 'g' },
      { name: 'Cebolla picada', amount: 1, unit: 'pieza' },
      { name: 'Dientes de ajo', amount: 2, unit: 'dientes' },
      { name: 'Mantequilla', amount: 50, unit: 'g' },
      { name: 'Harina de trigo', amount: 50, unit: 'g' },
      { name: 'Leche entera', amount: 500, unit: 'ml' },
      { name: 'Nuez moscada', amount: 0.5, unit: 'cdta' },
      { name: 'Aceite de oliva, sal y pimienta', amount: 1, unit: 'al gusto' }
    ],
    instructions: [
      'Pica la cebolla y los ajos finamente. En una sartén amplia con aceite de oliva, sofríelos hasta que estén transparentes.',
      'Añade la carne molida, salpimenta y cocina a fuego medio hasta que pierda el color crudo.',
      'Vierte la salsa de tomate, reduce el fuego y deja simar durante 25 minutos hasta que espese.',
      'Para la bechamel: derrite la mantequilla en un cazo, añade la harina y cocina 2 minutos. Agrega la leche caliente poco a poco sin dejar de batir con varillas. Sazona con sal, pimienta y nuez moscada hasta espesar.',
      'En una fuente para horno, coloca una base de bechamel, una capa de pasta, salsa boloñesa y queso. Repite las capas hasta terminar.',
      'Cubre con abundante mozzarella y parmesano. Hornea a 200°C durante 30 minutos hasta que el queso se dore.'
    ],
    chefTips: [
      'Si usas pasta que no requiere cocción previa, asegúrate de que las salsas estén bastante jugosas.',
      'Deja reposar la lasaña 10-15 minutos antes de cortar para que las capas no se desarmen.'
    ]
  },
  {
    id: 'pozole',
    title: 'Pozole Rojo de Cerdo',
    category: 'Mexicana',
    time: '2h 30 min',
    difficulty: 'Avanzado',
    servings: 8,
    calories: '520 kcal',
    image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=80&w=800',
    description: 'Tradicional caldo mexicano a base de maíz cacahuazintle con carne de cerdo y un reconfortante adobo de chiles secos.',
    tags: ['Tradicional', 'Fiesta', 'Picante Moderado'],
    ingredients: [
      { name: 'Maíz precocido para pozole', amount: 1, unit: 'kg' },
      { name: 'Carne de cerdo (pulpa y lomo)', amount: 1, unit: 'kg' },
      { name: 'Chile Guajillo desvenado', amount: 6, unit: 'piezas' },
      { name: 'Chile Ancho desvenado', amount: 2, unit: 'piezas' },
      { name: 'Cabeza de ajo entera', amount: 1, unit: 'pieza' },
      { name: 'Cebolla blanca grande', amount: 1, unit: 'pieza' },
      { name: 'Orégano seco mexicano', amount: 2, unit: 'cdas' },
      { name: 'Hojas de laurel', amount: 3, unit: 'piezas' },
      { name: 'Lechuga picada, rábanos y limones', amount: 1, unit: 'para acompañar' },
      { name: 'Tostadas de maíz y crema', amount: 1, unit: 'para servir' }
    ],
    instructions: [
      'Lava muy bien el maíz precocido y ponlo a cocer en una olla grande con abundante agua, media cebolla y la cabeza de ajo durante 1 hora o hasta que los granos florezcan.',
      'Añade la carne de cerdo cortada en cubos medianos y las hojas de laurel. Cocina a fuego medio-alto por 45 minutos más removiendo la espuma superior.',
      'Hidrata los chiles guajillo y ancho en agua caliente durante 15 minutos. Licúalos con 1/4 de cebolla, 2 dientes de ajo y un poco del agua de remojo.',
      'Cuela el adobo de chiles sobre la olla del pozole para darle su característico tono rojo.',
      'Agrega el orégano estrujándolo con tus manos y sazona con sal gruesa. Deja hervir 20 minutos más a fuego lento para integrar sabores.',
      'Sirve bien caliente acompañado de lechuga rebanada, rábanos, orégano extra, unas gotas de limón y tostadas.'
    ],
    chefTips: [
      'Si el caldo baja mucho durante la cocción, agrega agua hirviendo para no romper el hervor.',
      'El pozole sabe aún mejor al día siguiente cuando los sabores del adobo reposan bien.'
    ]
  }
];

export default function App() {
  const [selectedRecipe, setSelectedRecipe] = useState(RECIPES[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('ingredients');
  const [servingsMultiplier, setServingsMultiplier] = useState(1);
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [showDeployGuide, setShowDeployGuide] = useState(false);

  const filteredRecipes = RECIPES.filter(r => 
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.ingredients.some(i => i.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const toggleIngredient = (name) => {
    setCheckedIngredients(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="min-h-screen bg-amber-50/50 text-slate-800 font-sans antialiased">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-amber-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-tr from-amber-500 to-orange-500 p-2.5 rounded-xl shadow-md text-white">
              <ChefHat className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-amber-700 to-orange-600 bg-clip-text text-transparent">
                SaborAuténtico
              </h1>
              <p className="text-xs text-amber-700/70 font-medium">Recetario Digital React</p>
            </div>
          </div>

          <button 
            onClick={() => setShowDeployGuide(!showDeployGuide)}
            className="flex items-center space-x-2 bg-slate-900 text-amber-400 px-3.5 py-2 rounded-xl text-xs font-semibold hover:bg-slate-800 transition-all shadow-sm cursor-pointer"
          >
            <Terminal className="w-4 h-4" />
            <span className="hidden sm:inline">Guía de Publicación</span>
          </button>
        </div>
      </header>

      {/* Deploy Modal Guide */}
      {showDeployGuide && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 shadow-2xl border border-amber-100 relative">
            <button 
              onClick={() => setShowDeployGuide(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
            >
              ✕
            </button>
            <div className="flex items-center space-x-2 text-amber-600 mb-2">
              <Terminal className="w-5 h-5" />
              <span className="font-bold text-sm tracking-wide uppercase">Guía para subir a GitHub Pages</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Comandos de despliegue paso a paso</h2>

            <div className="space-y-4 text-sm text-slate-600">
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                <p className="font-semibold text-amber-900 mb-1">1. Instala el paquete de GitHub Pages:</p>
                <code className="bg-slate-900 text-amber-300 block p-2 rounded text-xs font-mono">npm install gh-pages --save-dev</code>
              </div>

              <div>
                <p className="font-semibold text-slate-800 mb-1">2. Edita tu <span className="font-mono text-amber-600">package.json</span>:</p>
                <p className="text-xs mb-1">Agrega la propiedad homepage arriba y los dos scripts de despliegue:</p>
                <pre className="bg-slate-900 text-slate-200 p-3 rounded-lg text-xs font-mono overflow-x-auto">
{`"homepage": "https://TU_USUARIO.github.io/recetario-app",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist",
  ...
}`}
                </pre>
              </div>

              <div>
                <p className="font-semibold text-slate-800 mb-1">3. Inicializa tu repositorio e ingresa tus comandos Git:</p>
                <pre className="bg-slate-900 text-slate-200 p-3 rounded-lg text-xs font-mono overflow-x-auto">
{`git init
git add .
git commit -m "Inicializar app de recetario React"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/recetario-app.git
git push -u origin main`}
                </pre>
              </div>

              <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                <p className="font-semibold text-emerald-900 mb-1">4. ¡Publica tu aplicación online!</p>
                <code className="bg-slate-900 text-emerald-400 block p-2 rounded text-xs font-mono">npm run deploy</code>
              </div>
            </div>

            <button 
              onClick={() => setShowDeployGuide(false)}
              className="mt-6 w-full bg-slate-900 text-white font-medium py-2.5 rounded-xl hover:bg-slate-800 transition-colors"
            >
              Entendido, volver a la app
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar / Recipe List */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text"
                placeholder="Buscar platillo o ingrediente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-amber-200/80 rounded-xl shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
            </div>

            <div className="space-y-3">
              {filteredRecipes.map((recipe) => {
                const isSelected = selectedRecipe.id === recipe.id;
                return (
                  <div 
                    key={recipe.id}
                    onClick={() => {
                      setSelectedRecipe(recipe);
                      setServingsMultiplier(1);
                      setCheckedIngredients({});
                    }}
                    className={`group cursor-pointer rounded-2xl p-3.5 transition-all duration-200 border ${
                      isSelected 
                        ? 'bg-white border-amber-500 shadow-md ring-1 ring-amber-500/20' 
                        : 'bg-white/60 hover:bg-white border-amber-100/80 hover:border-amber-200 shadow-sm'
                    }`}
                  >
                    <div className="flex gap-4">
                      <img 
                        src={recipe.image} 
                        alt={recipe.title} 
                        className="w-24 h-24 rounded-xl object-cover shadow-inner group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="flex-1 flex flex-col justify-between py-0.5">
                        <div>
                          <span className="text-[10px] font-bold tracking-wider uppercase bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                            {recipe.category}
                          </span>
                          <h3 className="font-bold text-slate-800 mt-1 line-clamp-1 group-hover:text-amber-600 transition-colors">
                            {recipe.title}
                          </h3>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-amber-500" /> {recipe.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <Flame className="w-3.5 h-3.5 text-orange-500" /> {recipe.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recipe Details View */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-amber-100 shadow-xl overflow-hidden">
              
              {/* Cover Header */}
              <div className="relative h-64 sm:h-72">
                <img 
                  src={selectedRecipe.image} 
                  alt={selectedRecipe.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {selectedRecipe.category}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold mt-2 leading-tight">
                    {selectedRecipe.title}
                  </h2>
                </div>
              </div>

              {/* Quick Info Bar */}
              <div className="grid grid-cols-3 border-b border-slate-100 bg-amber-50/30 divide-x divide-slate-100 text-center py-3 text-xs sm:text-sm">
                <div className="p-1">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Tiempo</span>
                  <span className="font-bold text-slate-700 flex items-center justify-center gap-1 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-amber-500" /> {selectedRecipe.time}
                  </span>
                </div>
                <div className="p-1">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Porciones Base</span>
                  <span className="font-bold text-slate-700 flex items-center justify-center gap-1 mt-0.5">
                    <Users className="w-3.5 h-3.5 text-amber-500" /> {selectedRecipe.servings} personas
                  </span>
                </div>
                <div className="p-1">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Dificultad</span>
                  <span className="font-bold text-slate-700 flex items-center justify-center gap-1 mt-0.5">
                    <Award className="w-3.5 h-3.5 text-amber-500" /> {selectedRecipe.difficulty}
                  </span>
                </div>
              </div>

              {/* Tabs Navigation */}
              <div className="p-6">
                <div className="flex border-b border-slate-200 gap-8 text-sm font-semibold mb-6">
                  <button 
                    onClick={() => setActiveTab('ingredients')}
                    className={`pb-3 transition-colors relative ${
                      activeTab === 'ingredients' 
                        ? 'text-amber-600 font-bold border-b-2 border-amber-500' 
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    Ingredientes
                  </button>
                  <button 
                    onClick={() => setActiveTab('instructions')}
                    className={`pb-3 transition-colors relative ${
                      activeTab === 'instructions' 
                        ? 'text-amber-600 font-bold border-b-2 border-amber-500' 
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    Instrucciones
                  </button>
                  <button 
                    onClick={() => setActiveTab('tips')}
                    className={`pb-3 transition-colors relative ${
                      activeTab === 'tips' 
                        ? 'text-amber-600 font-bold border-b-2 border-amber-500' 
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    Consejos del Chef
                  </button>
                </div>

                {/* Tab: Ingredientes */}
                {activeTab === 'ingredients' && (
                  <div className="space-y-4">
                    {/* Multiplicador de Porciones */}
                    <div className="bg-amber-50/60 p-4 rounded-2xl flex items-center justify-between border border-amber-100">
                      <div>
                        <span className="text-xs font-bold text-amber-800 uppercase tracking-wide">Ajustar porciones</span>
                        <p className="text-xs text-slate-500">Calcula automáticamente los ingredientes</p>
                      </div>
                      <div className="flex items-center space-x-2 bg-white rounded-xl border border-amber-200 p-1 shadow-sm">
                        {[0.5, 1, 2].map(multiplier => (
                          <button 
                            key={multiplier}
                            onClick={() => setServingsMultiplier(multiplier)}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                              servingsMultiplier === multiplier 
                                ? 'bg-amber-500 text-white shadow' 
                                : 'text-slate-600 hover:bg-amber-50'
                            }`}
                          >
                            {selectedRecipe.servings * multiplier} p.
                          </button>
                        ))}
                      </div>
                    </div>

                    <ul className="divide-y divide-slate-100">
                      {selectedRecipe.ingredients.map((ing, idx) => {
                        const isChecked = !!checkedIngredients[ing.name];
                        const calculatedAmount = typeof ing.amount === 'number' 
                          ? (ing.amount * servingsMultiplier).toLocaleString('es-MX', { maximumFractionDigits: 1 })
                          : ing.amount;

                        return (
                          <li 
                            key={idx} 
                            onClick={() => toggleIngredient(ing.name)}
                            className="py-3 flex items-center justify-between cursor-pointer group hover:bg-slate-50/80 px-2 rounded-xl transition-colors"
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                                isChecked ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 group-hover:border-amber-400'
                              }`}>
                                {isChecked && <Check className="w-3.5 h-3.5" />}
                              </div>
                              <span className={`text-sm font-medium ${isChecked ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                                {ing.name}
                              </span>
                            </div>
                            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100">
                              {calculatedAmount} {ing.unit}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                {/* Tab: Instrucciones */}
                {activeTab === 'instructions' && (
                  <ol className="space-y-4">
                    {selectedRecipe.instructions.map((step, idx) => (
                      <li key={idx} className="flex gap-4 p-3 rounded-2xl hover:bg-amber-50/30 transition-colors">
                        <span className="flex-shrink-0 w-7 h-7 bg-amber-500 text-white font-bold rounded-xl flex items-center justify-center text-xs shadow-sm">
                          {idx + 1}
                        </span>
                        <p className="text-sm text-slate-600 leading-relaxed pt-0.5">
                          {step}
                        </p>
                      </li>
                    ))}
                  </ol>
                )}

                {/* Tab: Consejos */}
                {activeTab === 'tips' && (
                  <div className="space-y-3">
                    {selectedRecipe.chefTips.map((tip, idx) => (
                      <div key={idx} className="flex gap-3 bg-amber-50/50 border border-amber-100 p-4 rounded-2xl">
                        <Sparkles className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-slate-700 italic leading-relaxed">
                          "{tip}"
                        </p>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}