import React, { useState } from 'react';
import { 
  BookOpen, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Search,
  X,
  Eye,
  FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BlogArticle } from '../../types';

export const AdminContentCMS: React.FC = () => {
  const { articles, addArticle, updateArticle, deleteArticle } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [editingArticle, setEditingArticle] = useState<BlogArticle | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // Form State for create/edit
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<BlogArticle['category']>('TNEA Counselling');
  const [formSummary, setFormSummary] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formCoverImage, setFormCoverImage] = useState('');
  const [formAuthorName, setFormAuthorName] = useState('Senior Admissions Strategist');
  const [formReadTime, setFormReadTime] = useState('6 min read');
  const [formPublished, setFormPublished] = useState(true);

  const filteredArticles = articles.filter(a =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startCreate = () => {
    setEditingArticle(null);
    setFormTitle('');
    setFormCategory('TNEA Counselling');
    setFormSummary('');
    setFormContent('');
    setFormCoverImage('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80');
    setFormAuthorName('Senior Admissions Strategist');
    setFormReadTime('5 min read');
    setFormPublished(true);
    setIsCreatingNew(true);
  };

  const startEdit = (article: BlogArticle) => {
    setEditingArticle(article);
    setFormTitle(article.title);
    setFormCategory(article.category);
    setFormSummary(article.summary);
    setFormContent(article.content);
    setFormCoverImage(article.coverImage);
    setFormAuthorName(article.author.name);
    setFormReadTime(article.readTime);
    setFormPublished(article.isPublished);
    setIsCreatingNew(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingArticle) {
      updateArticle({
        ...editingArticle,
        title: formTitle,
        category: formCategory,
        summary: formSummary,
        content: formContent,
        coverImage: formCoverImage,
        readTime: formReadTime,
        isPublished: formPublished,
        author: {
          ...editingArticle.author,
          name: formAuthorName
        },
        updatedDate: 'August 2026'
      });
    } else {
      const newArt: BlogArticle = {
        id: `art-${Date.now()}`,
        title: formTitle,
        slug: formTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        category: formCategory,
        summary: formSummary,
        content: formContent,
        coverImage: formCoverImage || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80',
        author: {
          name: formAuthorName,
          role: 'NEXTBLOCK Research Lead',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80'
        },
        readTime: formReadTime,
        publishedDate: 'August 2026',
        updatedDate: 'August 2026',
        isPublished: formPublished,
        seoTitle: `${formTitle} | NEXTBLOCK Guide`,
        seoDescription: formSummary,
        tags: ['TNEA 2026', 'Admissions Guide', 'Tamil Nadu']
      };
      addArticle(newArt);
    }
    setIsCreatingNew(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border-2 border-slate-800">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" /> Resources & Blog Content CMS
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Create, edit, publish, or schedule guides and cutoff research articles for the public platform.
          </p>
        </div>

        <button
          onClick={startCreate}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      {/* Search Filter */}
      <div className="relative">
        <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter published articles by title or category..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-medium focus:outline-none focus:border-cyan-500"
        />
      </div>

      {/* Articles Table */}
      <div className="bg-slate-900 rounded-3xl border-2 border-slate-800 overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 text-slate-400 uppercase font-black text-[10px] tracking-wider border-b border-slate-800">
            <tr>
              <th className="p-4">Article Title & Category</th>
              <th className="p-4">Author</th>
              <th className="p-4">Read Time</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-medium">
            {filteredArticles.map((art) => (
              <tr key={art.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="p-4 max-w-sm">
                  <span className="font-black text-white block">{art.title}</span>
                  <span className="text-[10px] text-cyan-400 font-bold uppercase">{art.category}</span>
                </td>
                <td className="p-4 text-slate-300">{art.author.name}</td>
                <td className="p-4 text-slate-400 font-mono">{art.readTime}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black border ${
                    art.isPublished 
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' 
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {art.isPublished ? 'PUBLISHED' : 'DRAFT'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => startEdit(art)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                      title="Edit"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteArticle(art.id)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create / Edit Modal */}
      {isCreatingNew && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-slate-900 max-w-2xl w-full rounded-3xl border-2 border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 my-auto custom-scrollbar max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-black text-white">
                {editingArticle ? 'Edit Resource Article' : 'Write New Resource Guide'}
              </h3>
              <button
                onClick={() => setIsCreatingNew(false)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-300 block">Article Title</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. 2026 TNEA Choice Filling Masterclass"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-medium focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300 block">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-medium focus:outline-none focus:border-cyan-500"
                  >
                    <option value="TNEA Counselling">TNEA Counselling</option>
                    <option value="Engineering Admissions">Engineering Admissions</option>
                    <option value="College Guides">College Guides</option>
                    <option value="Branch Selection">Branch Selection</option>
                    <option value="Scholarships & Aid">Scholarships & Aid</option>
                    <option value="Study Abroad">Study Abroad</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300 block">Read Time</label>
                  <input
                    type="text"
                    value={formReadTime}
                    onChange={(e) => setFormReadTime(e.target.value)}
                    placeholder="e.g. 6 min read"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300 block">Cover Image URL</label>
                <input
                  type="url"
                  value={formCoverImage}
                  onChange={(e) => setFormCoverImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300 block">Summary (Short Excerpt)</label>
                <textarea
                  rows={2}
                  required
                  value={formSummary}
                  onChange={(e) => setFormSummary(e.target.value)}
                  placeholder="Brief 2-sentence summary for search engines and card preview..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300 block">Full Article Content</label>
                <textarea
                  rows={6}
                  required
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder="Write the full comprehensive guide content here..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-medium leading-relaxed"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-white">
                  <input
                    type="checkbox"
                    checked={formPublished}
                    onChange={(e) => setFormPublished(e.target.checked)}
                    className="w-4 h-4 accent-cyan-500"
                  />
                  <span>Publish live to public website immediately</span>
                </label>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCreatingNew(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black"
                  >
                    Save Article
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
