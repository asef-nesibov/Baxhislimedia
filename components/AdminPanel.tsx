import React, { useState, useEffect } from 'react';
import { Settings, X, Save, Download, Plus, Trash2, Image, Type } from 'lucide-react';
import { useCMS } from './CMSContext';
import { SiteData } from '../types';

export const AdminPanel: React.FC = () => {
  const { data, updateData } = useCMS();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<keyof SiteData | 'export'>('hero');

  // Hidden CMS Logic: Listen for #admin in URL
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin') {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    // Check on initial load
    checkHash();

    // Listen for hash changes
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const handleExport = () => {
    // 1. Serialize current data
    const jsonData = JSON.stringify(data, null, 2);
    
    // 2. Clone the current document
    const htmlContent = document.documentElement.outerHTML;
    
    // 3. Parse and inject data
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    
    // 4. Update the script tag in the virtual DOM
    const scriptTag = doc.getElementById('site-data');
    if (scriptTag) {
      scriptTag.textContent = jsonData;
    } else {
      const newScript = doc.createElement('script');
      newScript.id = 'site-data';
      newScript.type = 'application/json';
      newScript.textContent = jsonData;
      doc.head.appendChild(newScript);
    }

    // 5. Clean the root
    const root = doc.getElementById('root');
    if (root) root.innerHTML = '';

    // 6. Generate Blob and Download
    const finalHtml = doc.documentElement.outerHTML;
    const blob = new Blob([finalHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const closeAdmin = () => {
    setIsOpen(false);
    // Optionally remove hash when closing, or just hide modal
    window.history.pushState("", document.title, window.location.pathname + window.location.search);
  };

  if (!isOpen) {
    return null; // Totally hidden if no hash
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-[#111] w-full max-w-5xl h-[85vh] rounded-xl shadow-2xl border border-neutral-800 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-neutral-800 flex justify-between items-center bg-[#0a0a0a]">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-indigo-900/30 rounded-lg">
                <Settings className="text-indigo-400" size={20} />
             </div>
             <div>
               <h2 className="text-white font-bold tracking-wide text-sm">CMS DASHBOARD</h2>
               <p className="text-xs text-gray-500">Editing Mode Active</p>
             </div>
          </div>
          <button onClick={closeAdmin} className="text-gray-400 hover:text-white p-2 hover:bg-white/5 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-56 bg-[#0a0a0a] border-r border-neutral-800 flex flex-col overflow-y-auto">
            <div className="p-4 text-xs font-bold text-gray-600 uppercase tracking-widest">Sections</div>
            {(Object.keys(data) as Array<keyof SiteData>).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-4 py-3 text-left text-sm font-medium transition-all border-l-2 ${
                  activeTab === key 
                    ? 'bg-indigo-500/10 text-white border-indigo-500' 
                    : 'text-gray-400 hover:text-white border-transparent hover:bg-white/5'
                }`}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
            
            <div className="mt-auto p-4 border-t border-neutral-800">
                <button
                onClick={() => setActiveTab('export')}
                className={`w-full py-3 px-4 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                    activeTab === 'export' 
                    ? 'bg-green-600 text-white shadow-lg shadow-green-900/20' 
                    : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700'
                }`}
                >
                <Save size={16} />
                Finish & Save
                </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto bg-[#111]">
            
            {activeTab === 'export' ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-12 space-y-8 animate-in zoom-in-95 duration-300">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-900/50">
                  <Download size={48} className="text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-3">Ready to Publish?</h3>
                  <p className="text-gray-400 max-w-lg mx-auto leading-relaxed">
                    This will generate a standalone <code className="text-indigo-400 bg-indigo-900/30 px-2 py-1 rounded">index.html</code> file with all your changes baked in.
                  </p>
                </div>
                
                <div className="p-6 bg-neutral-900/50 rounded-xl border border-neutral-800 max-w-lg w-full text-left space-y-4">
                    <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wider">Instructions:</h4>
                    <ol className="list-decimal list-inside text-sm text-gray-500 space-y-2">
                        <li>Click the download button below.</li>
                        <li>Locate the downloaded file (usually in 'Downloads').</li>
                        <li>Rename it to <span className="text-white">index.html</span> if needed.</li>
                        <li>Upload it to your hosting provider or replace your local file.</li>
                    </ol>
                </div>

                <button
                  onClick={handleExport}
                  className="px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all transform hover:scale-105 shadow-xl flex items-center gap-3"
                >
                  <Download size={20} />
                  DOWNLOAD SITE FILE
                </button>
              </div>
            ) : (
              <div className="p-8 max-w-3xl mx-auto">
                <div className="mb-8 flex items-end justify-between border-b border-neutral-800 pb-4">
                    <div>
                        <h3 className="text-2xl font-bold text-white uppercase tracking-tight">
                        {activeTab}
                        </h3>
                        <p className="text-gray-500 text-sm mt-1">Edit content for the {activeTab} section</p>
                    </div>
                </div>
                
                <div className="space-y-8">
                {Object.entries(data[activeTab as keyof SiteData]).map(([field, value]) => {
                  
                  // Arrays (Songs, Images, Paragraphs)
                  if (Array.isArray(value)) {
                    return (
                      <div key={field} className="space-y-4 pt-4 border-t border-neutral-800/50 first:border-0 first:pt-0">
                        <div className="flex justify-between items-center">
                            <label className="text-xs text-indigo-400 uppercase font-bold tracking-wider">{field}</label>
                            {field !== 'bioParagraphs' && (
                                <span className="text-xs text-gray-600">{value.length} items</span>
                            )}
                        </div>
                        
                        {/* Songs List */}
                        {activeTab === 'music' && field === 'tracks' ? (
                          <div className="grid gap-3">
                             {(value as any[]).map((song, idx) => (
                               <div key={idx} className="flex gap-3 items-center bg-neutral-900/80 p-3 rounded-lg border border-neutral-800 group hover:border-neutral-700 transition-colors">
                                  <div className="w-8 h-8 flex items-center justify-center bg-neutral-800 rounded text-gray-500 text-xs font-mono">
                                    {idx + 1}
                                  </div>
                                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 flex-1">
                                    <input 
                                      className="bg-black/50 border border-neutral-700 rounded px-3 py-2 text-white text-sm focus:border-indigo-500 focus:outline-none placeholder-gray-700"
                                      value={song.title} 
                                      onChange={(e) => {
                                        const newTracks = [...data.music.tracks];
                                        newTracks[idx].title = e.target.value;
                                        updateData({...data, music: {...data.music, tracks: newTracks}});
                                      }}
                                      placeholder="Title"
                                    />
                                    <input 
                                      className="bg-black/50 border border-neutral-700 rounded px-3 py-2 text-white text-sm focus:border-indigo-500 focus:outline-none placeholder-gray-700"
                                      value={song.album} 
                                      onChange={(e) => {
                                        const newTracks = [...data.music.tracks];
                                        newTracks[idx].album = e.target.value;
                                        updateData({...data, music: {...data.music, tracks: newTracks}});
                                      }}
                                      placeholder="Album"
                                    />
                                    <input 
                                      className="bg-black/50 border border-neutral-700 rounded px-3 py-2 text-white text-sm focus:border-indigo-500 focus:outline-none placeholder-gray-700"
                                      value={song.duration} 
                                      onChange={(e) => {
                                        const newTracks = [...data.music.tracks];
                                        newTracks[idx].duration = e.target.value;
                                        updateData({...data, music: {...data.music, tracks: newTracks}});
                                      }}
                                      placeholder="Duration"
                                    />
                                    <input 
                                      className="bg-black/50 border border-neutral-700 rounded px-3 py-2 text-white text-sm focus:border-indigo-500 focus:outline-none placeholder-gray-700"
                                      value={song.plays} 
                                      onChange={(e) => {
                                        const newTracks = [...data.music.tracks];
                                        newTracks[idx].plays = e.target.value;
                                        updateData({...data, music: {...data.music, tracks: newTracks}});
                                      }}
                                      placeholder="Plays"
                                    />
                                  </div>
                                  <button 
                                    onClick={() => {
                                        const newTracks = data.music.tracks.filter((_, i) => i !== idx);
                                        updateData({...data, music: {...data.music, tracks: newTracks}});
                                    }}
                                    className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors"
                                  >
                                    <Trash2 size={18} />
                                  </button>
                               </div>
                             ))}
                             <button 
                                onClick={() => {
                                    const newSong = { id: Date.now(), title: "New Track", album: "New Album", duration: "0:00", plays: "0" };
                                    updateData({...data, music: {...data.music, tracks: [...data.music.tracks, newSong]}});
                                }}
                                className="w-full py-3 border border-dashed border-neutral-700 text-gray-400 hover:text-white hover:border-gray-500 rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-white/5 transition-all"
                             >
                                <Plus size={16} /> Add Track
                             </button>
                          </div>
                        ) : activeTab === 'gallery' ? (
                           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                             {(value as string[]).map((url, idx) => (
                               <div key={idx} className="relative group aspect-square">
                                 <img src={url} className="w-full h-full object-cover rounded-lg bg-neutral-900 border border-neutral-800" />
                                 <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                                     <button 
                                      onClick={() => {
                                        const newUrl = prompt("Update Image URL:", url);
                                        if (newUrl) {
                                            const newImages = [...(data.gallery.images as string[])];
                                            newImages[idx] = newUrl;
                                            updateData({...data, gallery: {...data.gallery, images: newImages}});
                                        }
                                      }}
                                      className="p-2 bg-neutral-800 text-white rounded hover:bg-indigo-600"
                                     >
                                         <Settings size={14} />
                                     </button>
                                     <button 
                                        onClick={() => {
                                            const newImages = (data.gallery.images as string[]).filter((_, i) => i !== idx);
                                            updateData({...data, gallery: {...data.gallery, images: newImages}});
                                        }}
                                        className="p-2 bg-neutral-800 text-white rounded hover:bg-red-600"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                 </div>
                               </div>
                             ))}
                             <button 
                                onClick={() => {
                                    const url = prompt("Enter Image URL (Unsplash, etc):");
                                    if(url) {
                                        updateData({...data, gallery: {...data.gallery, images: [...data.gallery.images, url]}});
                                    }
                                }}
                                className="aspect-square border border-dashed border-neutral-700 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:text-white hover:border-gray-500 hover:bg-white/5 transition-all"
                             >
                                <Plus size={24} />
                                <span className="text-xs mt-2 font-medium">Add Image</span>
                             </button>
                           </div>
                        ) : (
                          // Text Arrays (Bio)
                           <div className="space-y-3">
                             {(value as string[]).map((text, idx) => (
                               <div key={idx} className="relative">
                                    <textarea
                                    className="w-full bg-neutral-900 border border-neutral-800 text-white p-4 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none resize-y min-h-[100px] text-sm leading-relaxed"
                                    rows={3}
                                    value={text}
                                    onChange={(e) => {
                                        const newArr = [...(value as string[])];
                                        newArr[idx] = e.target.value;
                                        if (activeTab === 'about' && field === 'bioParagraphs') {
                                            updateData({...data, about: {...data.about, bioParagraphs: newArr}});
                                        }
                                    }}
                                    />
                                    <div className="absolute top-2 right-2 flex gap-1">
                                        <button 
                                            onClick={() => {
                                                const newArr = (value as string[]).filter((_, i) => i !== idx);
                                                if (activeTab === 'about' && field === 'bioParagraphs') {
                                                    updateData({...data, about: {...data.about, bioParagraphs: newArr}});
                                                }
                                            }}
                                            className="p-1 text-neutral-600 hover:text-red-500 bg-neutral-800 rounded hover:bg-neutral-700"
                                            title="Delete Paragraph"
                                        >
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                               </div>
                             ))}
                             <button
                                onClick={() => {
                                    const newArr = [...(value as string[]), "New paragraph..."];
                                    if (activeTab === 'about' && field === 'bioParagraphs') {
                                        updateData({...data, about: {...data.about, bioParagraphs: newArr}});
                                    }
                                }}
                                className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                             >
                                <Plus size={12} /> ADD PARAGRAPH
                             </button>
                           </div>
                        )}
                      </div>
                    );
                  }

                  // Standard Strings
                  return (
                    <div key={field} className="space-y-2">
                      <label className="text-xs text-gray-500 uppercase font-bold flex items-center gap-2 tracking-wider">
                        {field.includes('Image') ? <Image size={14}/> : <Type size={14}/>}
                        {field.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      {field.includes('Image') ? (
                         <div className="flex gap-4 p-3 bg-neutral-900/50 rounded-lg border border-neutral-800">
                            <img src={value as string} className="w-16 h-16 object-cover rounded bg-neutral-800 shrink-0" />
                            <div className="flex-1 flex flex-col justify-center gap-2">
                                <input
                                type="text"
                                className="w-full bg-black/50 border border-neutral-700 text-white px-3 py-2 rounded text-sm focus:border-indigo-500 focus:outline-none"
                                value={value as string}
                                onChange={(e) => {
                                    const currentSection = data[activeTab as keyof SiteData] as any;
                                    updateData({
                                        ...data,
                                        [activeTab]: {
                                            ...currentSection,
                                            [field]: e.target.value
                                        }
                                    });
                                }}
                                />
                                <p className="text-[10px] text-gray-600">Enter a URL from Unsplash or your hosting.</p>
                            </div>
                         </div>
                      ) : (
                        <input
                          type="text"
                          className="w-full bg-neutral-900 border border-neutral-800 text-white px-4 py-3 rounded-lg focus:border-indigo-500 focus:outline-none transition-all focus:bg-neutral-900"
                          value={value as string}
                          onChange={(e) => {
                            const currentSection = data[activeTab as keyof SiteData] as any;
                            updateData({
                                ...data,
                                [activeTab]: {
                                    ...currentSection,
                                    [field]: e.target.value
                                }
                            });
                          }}
                        />
                      )}
                    </div>
                  );
                })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};