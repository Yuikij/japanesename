export const dashboardHtml = `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>名前 — 数据管理</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;500;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#faf9f7;--bg-card:#fff;--bg-hover:#f5f3ef;--bg-sidebar:#18181b;
  --text:#1a1a1e;--text-muted:#8c8a85;--text-sidebar:#a1a1aa;
  --accent:#c4523e;--accent-light:#f0ddd8;--accent-dark:#a83d2b;
  --border:#e8e5df;--border-light:#f0ede8;
  --success:#3c8a5e;--warning:#c49a3e;--danger:#c4523e;--info:#4a7fb5;
  --radius:8px;--radius-lg:14px;
  --shadow:0 1px 3px rgba(0,0,0,.04),0 4px 12px rgba(0,0,0,.03);
  --shadow-lg:0 4px 20px rgba(0,0,0,.06);
  --font-serif:'Noto Serif JP',serif;
  --font-sans:'Inter',system-ui,sans-serif;
  --font-mono:'JetBrains Mono',monospace;
  --sidebar-w:240px;
}
html{font-size:14px;-webkit-font-smoothing:antialiased}
body{font-family:var(--font-sans);background:var(--bg);color:var(--text);min-height:100vh}
.layout{display:flex;min-height:100vh}
.sidebar{width:var(--sidebar-w);min-height:100vh;background:var(--bg-sidebar);padding:28px 0 20px;display:flex;flex-direction:column;position:fixed;left:0;top:0;z-index:100}
.sidebar-brand{padding:0 24px;margin-bottom:36px;display:flex;align-items:baseline;gap:8px}
.sidebar-brand h1{font-family:var(--font-serif);font-weight:700;font-size:1.3rem;color:#fff;letter-spacing:-.02em}
.sidebar-brand span{font-family:var(--font-serif);font-size:.8rem;color:var(--accent);font-weight:300}
.sidebar-nav{flex:1;display:flex;flex-direction:column;gap:2px;padding:0 10px}
.nav-label{font-size:.65rem;letter-spacing:.08em;color:#52525b;padding:18px 14px 6px;font-weight:600}
.nav-item{display:flex;align-items:center;gap:10px;padding:9px 14px;border-radius:var(--radius);color:var(--text-sidebar);cursor:pointer;transition:all .15s;font-size:.85rem;font-weight:400;border:none;background:none;width:100%;text-align:left}
.nav-item:hover{background:rgba(255,255,255,.06);color:#e4e4e7}
.nav-item.active{background:rgba(196,82,62,.12);color:var(--accent);font-weight:500}
.nav-item svg{width:17px;height:17px;opacity:.5;flex-shrink:0}
.nav-item.active svg{opacity:1}
.sidebar-foot{padding:14px 24px;border-top:1px solid #27272a}
.sidebar-foot p{font-size:.68rem;color:#52525b;line-height:1.5}
.mobile-nav{display:none;position:sticky;top:0;z-index:100;background:var(--bg-sidebar);padding:0 16px;border-bottom:2px solid #27272a}
.mobile-nav-inner{display:flex;align-items:center;gap:4px;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none}
.mobile-nav-inner::-webkit-scrollbar{display:none}
.mobile-brand{font-family:var(--font-serif);font-weight:700;font-size:1.1rem;color:#fff;padding:12px 8px 12px 0;margin-right:12px;white-space:nowrap;flex-shrink:0;border-right:1px solid #27272a}
.mobile-brand i{color:var(--accent);font-style:normal;font-weight:300;font-size:.8rem;margin-left:6px}
.mnav{padding:10px 14px;border:none;background:none;color:var(--text-sidebar);font-size:.8rem;font-family:var(--font-sans);font-weight:400;cursor:pointer;white-space:nowrap;border-bottom:2px solid transparent;margin-bottom:-2px;transition:all .15s}
.mnav:hover{color:#e4e4e7}
.mnav.active{color:var(--accent);border-bottom-color:var(--accent);font-weight:500}
.main{margin-left:var(--sidebar-w);flex:1;min-height:100vh;display:flex;flex-direction:column}
.topbar{padding:18px 36px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--border-light);background:var(--bg-card);position:sticky;top:0;z-index:50}
.topbar-left{display:flex;align-items:center;gap:12px}
.topbar-title{font-family:var(--font-serif);font-size:1.2rem;font-weight:500;letter-spacing:-.01em}
.topbar-count{font-size:.78rem;color:var(--text-muted);background:var(--bg);padding:2px 10px;border-radius:12px}
.search-bar{display:flex;align-items:center;gap:8px;background:var(--bg);border:1px solid var(--border);border-radius:var(--radius);padding:7px 14px;transition:border-color .2s;width:260px}
.search-bar:focus-within{border-color:var(--accent)}
.search-bar svg{width:15px;height:15px;color:var(--text-muted);flex-shrink:0}
.search-bar input{border:none;background:none;outline:none;font-family:var(--font-sans);font-size:.82rem;width:100%;color:var(--text)}
.search-bar input::placeholder{color:var(--text-muted)}
.content{padding:28px 36px;flex:1}
.stats-row{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:28px}
.stat-card{background:var(--bg-card);border:1px solid var(--border-light);border-radius:var(--radius-lg);padding:22px;box-shadow:var(--shadow);transition:box-shadow .2s,transform .2s}
.stat-card:hover{box-shadow:var(--shadow-lg);transform:translateY(-1px)}
.stat-label{font-size:.7rem;letter-spacing:.05em;color:var(--text-muted);margin-bottom:6px;font-weight:500}
.stat-value{font-family:var(--font-serif);font-size:1.9rem;font-weight:700;letter-spacing:-.03em}
.stat-sub{font-size:.75rem;color:var(--text-muted);margin-top:3px}
.panel{background:var(--bg-card);border:1px solid var(--border-light);border-radius:var(--radius-lg);box-shadow:var(--shadow);overflow:hidden;margin-bottom:20px}
.panel-header{padding:18px 22px;border-bottom:1px solid var(--border-light);display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap}
.panel-title{font-family:var(--font-serif);font-size:1rem;font-weight:500}
.panel-body{padding:0}
.filter-row{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.filter-select{padding:6px 10px;border:1px solid var(--border);border-radius:var(--radius);font-size:.78rem;font-family:var(--font-sans);background:var(--bg);color:var(--text);cursor:pointer;outline:none;transition:border-color .2s;-webkit-appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%238c8a85'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 8px center;padding-right:24px}
.filter-select:focus{border-color:var(--accent)}
.data-table{width:100%;border-collapse:collapse;font-size:.82rem}
.data-table th{text-align:left;padding:10px 14px;font-weight:500;font-size:.72rem;letter-spacing:.05em;color:var(--text-muted);background:var(--bg);border-bottom:1px solid var(--border)}
.data-table td{padding:10px 14px;border-bottom:1px solid var(--border-light);vertical-align:middle;max-width:260px}
.data-table tbody tr{transition:background .1s;cursor:pointer}
.data-table tbody tr:hover{background:var(--bg-hover)}
.badge{display:inline-block;padding:2px 9px;border-radius:20px;font-size:.68rem;font-weight:500;letter-spacing:.02em;white-space:nowrap}
.badge-accent{background:var(--accent-light);color:var(--accent-dark)}
.badge-success{background:#ddf0e4;color:var(--success)}
.badge-warning{background:#f5eed4;color:#8a6f1e}
.badge-info{background:#d8e8f5;color:var(--info)}
.badge-muted{background:var(--bg);color:var(--text-muted);border:1px solid var(--border)}
.tag-group{display:flex;flex-wrap:wrap;gap:3px}
.btn{display:inline-flex;align-items:center;gap:5px;padding:6px 14px;border-radius:var(--radius);font-size:.78rem;font-family:var(--font-sans);font-weight:500;cursor:pointer;transition:all .15s;border:1px solid transparent}
.btn-ghost{background:transparent;color:var(--text);border-color:var(--border)}
.btn-ghost:hover{background:var(--bg-hover);border-color:var(--text-muted)}
.pagination{display:flex;align-items:center;justify-content:space-between;padding:14px 22px;border-top:1px solid var(--border-light)}
.pagination-info{font-size:.76rem;color:var(--text-muted)}
.pagination-btns{display:flex;gap:6px}
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.35);backdrop-filter:blur(4px);z-index:200;display:none;align-items:center;justify-content:center;padding:32px}
.modal-overlay.open{display:flex}
.modal{background:var(--bg-card);border-radius:var(--radius-lg);width:100%;max-width:680px;max-height:85vh;overflow:auto;box-shadow:0 20px 60px rgba(0,0,0,.15)}
.modal-header{padding:22px 26px 14px;display:flex;align-items:flex-start;justify-content:space-between;border-bottom:1px solid var(--border-light);position:sticky;top:0;background:var(--bg-card);z-index:1}
.modal-header h2{font-family:var(--font-serif);font-size:1.2rem;font-weight:500}
.modal-close{width:30px;height:30px;border-radius:50%;border:none;background:var(--bg);cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--text-muted);font-size:1rem;transition:background .15s}
.modal-close:hover{background:var(--border);color:var(--text)}
.modal-body{padding:22px 26px}
.detail-grid{display:grid;grid-template-columns:100px 1fr;gap:6px 14px;font-size:.82rem}
.detail-label{color:var(--text-muted);font-weight:500;padding:5px 0}
.detail-value{padding:5px 0;word-break:break-word}
.tag-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px;padding:20px 22px}
.tag-card{border:1px solid var(--border);border-radius:var(--radius);padding:16px 18px;transition:box-shadow .2s}
.tag-card:hover{box-shadow:var(--shadow-lg)}
.tag-card-title{font-family:var(--font-serif);font-size:.9rem;font-weight:500;margin-bottom:10px;text-transform:capitalize;display:flex;align-items:center;justify-content:space-between}
.tag-card-count{font-size:.7rem;color:var(--text-muted);font-weight:400;font-family:var(--font-sans)}
.tag-card-values{display:flex;flex-wrap:wrap;gap:4px}
.loading{display:flex;align-items:center;justify-content:center;padding:50px;color:var(--text-muted);gap:8px}
.spinner{width:16px;height:16px;border:2px solid var(--border);border-top-color:var(--accent);border-radius:50%;animation:spin .6s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.empty-state{text-align:center;padding:50px 30px;color:var(--text-muted)}
.empty-state p{font-size:.85rem;margin-top:6px}
.auth-bar{display:flex;align-items:center;gap:8px;margin-left:12px}
.auth-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0}
.auth-dot.ok{background:var(--success)}
.auth-dot.no{background:var(--danger)}
.auth-btn{padding:4px 10px;border:1px solid var(--border);border-radius:var(--radius);font-size:.72rem;font-family:var(--font-sans);background:var(--bg);color:var(--text-muted);cursor:pointer;transition:all .15s;white-space:nowrap}
.auth-btn:hover{border-color:var(--accent);color:var(--text)}
.section{display:none}
.section.active{display:block}
.kanji-lg{font-family:var(--font-serif);font-size:1.5rem;font-weight:700;letter-spacing:.02em}
.reading-sm{font-size:.75rem;color:var(--text-muted);margin-left:3px}
::-webkit-scrollbar{width:5px;height:5px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:var(--border);border-radius:3px}
.overview-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}
@media(max-width:960px){
  .sidebar{display:none}.main{margin-left:0}.mobile-nav{display:block}
  .content{padding:20px 16px}.topbar{padding:14px 16px}
  .stats-row{grid-template-columns:repeat(2,1fr);gap:10px}
  .overview-grid{grid-template-columns:1fr}.search-bar{width:180px}
}
</style>
</head>
<body>

<nav class="mobile-nav">
  <div class="mobile-nav-inner">
    <div class="mobile-brand">名前<i>管理</i></div>
    <button class="mnav active" data-section="overview">总览</button>
    <button class="mnav" data-section="names">名字库</button>
    <button class="mnav" data-section="keywords">关键词</button>
    <button class="mnav" data-section="tags">标签</button>
  </div>
</nav>

<div class="layout">
<aside class="sidebar">
  <div class="sidebar-brand"><h1>名前</h1><span>管理</span></div>
  <nav class="sidebar-nav">
    <div class="nav-label">总览</div>
    <button class="nav-item active" data-section="overview">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>
      数据总览
    </button>
    <div class="nav-label">数据管理</div>
    <button class="nav-item" data-section="names">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      名字库
    </button>
    <button class="nav-item" data-section="keywords">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M4 12h10M4 17h12"/></svg>
      关键词库
    </button>
    <button class="nav-item" data-section="tags">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
      标签枚举
    </button>
  </nav>
  <div class="sidebar-foot"><p>Workers + D1 · Hono</p></div>
</aside>

<div class="main">
  <div class="topbar">
    <div class="topbar-left">
      <div class="topbar-title" id="page-title">数据总览</div>
      <div class="topbar-count" id="page-count"></div>
    </div>
    <div style="display:flex;align-items:center;gap:12px">
      <div class="search-bar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        <input type="text" placeholder="搜索名字、关键词…" id="search-input">
      </div>
      <div class="auth-bar" id="auth-bar">
        <span class="auth-dot no" id="auth-dot"></span>
        <button class="auth-btn" id="auth-btn" title="设置 API 密钥">未认证</button>
      </div>
    </div>
  </div>

  <div class="content">

    <div class="section active" id="section-overview">
      <div class="stats-row">
        <div class="stat-card"><div class="stat-label">名字总数</div><div class="stat-value" id="stat-names">&mdash;</div><div class="stat-sub" id="stat-names-sub"></div></div>
        <div class="stat-card"><div class="stat-label">关键词总数</div><div class="stat-value" id="stat-keywords">&mdash;</div><div class="stat-sub" id="stat-keywords-sub"></div></div>
        <div class="stat-card"><div class="stat-label">标签维度</div><div class="stat-value" id="stat-tags">&mdash;</div><div class="stat-sub" id="stat-tags-sub"></div></div>
        <div class="stat-card"><div class="stat-label">已完成</div><div class="stat-value" id="stat-complete">&mdash;</div><div class="stat-sub" id="stat-complete-sub"></div></div>
      </div>
      <div class="overview-grid">
        <div class="panel">
          <div class="panel-header"><div class="panel-title">按状态分布</div></div>
          <div class="panel-body" id="overview-status-chart" style="padding:20px 22px"></div>
        </div>
        <div class="panel">
          <div class="panel-header"><div class="panel-title">按性别分布</div></div>
          <div class="panel-body" id="overview-gender-chart" style="padding:20px 22px"></div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-header"><div class="panel-title">最近更新</div></div>
        <div class="panel-body" id="overview-recent"></div>
      </div>
    </div>

    <div class="section" id="section-names">
      <div class="panel">
        <div class="panel-header">
          <div class="panel-title">名字库</div>
          <div class="filter-row">
            <select class="filter-select" id="filter-gender"><option value="">全部性别</option><option value="male">男性</option><option value="female">女性</option><option value="unisex">中性</option></select>
            <select class="filter-select" id="filter-name-part"><option value="">全部类型</option><option value="given_name">名</option><option value="family_name">姓</option></select>
            <select class="filter-select" id="filter-status"><option value="">全部状态</option><option value="raw">原始</option><option value="llm_enriched">LLM 已填充</option><option value="reviewed">已审核</option><option value="complete">已完成</option></select>
          </div>
        </div>
        <div class="panel-body"><div id="names-table-wrap"></div><div class="pagination" id="names-pagination"></div></div>
      </div>
    </div>

    <div class="section" id="section-keywords">
      <div class="panel">
        <div class="panel-header">
          <div class="panel-title">关键词库</div>
          <div class="filter-row">
            <select class="filter-select" id="filter-kw-strategy"><option value="">全部策略</option><option value="category_page">分类页</option><option value="blog_post">博客文章</option><option value="tool_page">工具页</option><option value="homepage_seo">首页 SEO</option></select>
            <select class="filter-select" id="filter-kw-status"><option value="">全部状态</option><option value="draft">草稿</option><option value="seo_ready">SEO 就绪</option><option value="filter_ready">筛选就绪</option><option value="quiz_ready">问答就绪</option><option value="published">已发布</option></select>
          </div>
        </div>
        <div class="panel-body"><div id="keywords-table-wrap"></div><div class="pagination" id="keywords-pagination"></div></div>
      </div>
    </div>

    <div class="section" id="section-tags">
      <div class="panel">
        <div class="panel-header"><div class="panel-title">标签枚举库</div><div class="topbar-count" id="tag-total-count"></div></div>
        <div class="panel-body" id="tags-content"></div>
      </div>
    </div>

  </div>
</div>
</div>

<div class="modal-overlay" id="modal-overlay">
  <div class="modal">
    <div class="modal-header"><h2 id="modal-title"></h2><button class="modal-close" id="modal-close">&times;</button></div>
    <div class="modal-body" id="modal-body"></div>
  </div>
</div>

<script>
const API='';
const S={section:'overview',np:0,kp:0,lim:30};

let apiSecret=localStorage.getItem('api_secret')||'';
function updateAuthUI(){
  const dot=document.getElementById('auth-dot');
  const btn=document.getElementById('auth-btn');
  if(apiSecret){dot.className='auth-dot ok';btn.textContent='已认证'}
  else{dot.className='auth-dot no';btn.textContent='未认证'}
}
document.getElementById('auth-btn').onclick=()=>{
  const v=prompt('请输入 API 密钥：',apiSecret||'');
  if(v===null)return;
  apiSecret=v.trim();
  if(apiSecret)localStorage.setItem('api_secret',apiSecret);
  else localStorage.removeItem('api_secret');
  updateAuthUI();
  navigate(S.section);
};
updateAuthUI();

function navigate(section){
  document.querySelectorAll('.nav-item,.mnav').forEach(b=>b.classList.toggle('active',b.dataset.section===section));
  document.querySelectorAll('.section').forEach(el=>el.classList.remove('active'));
  document.getElementById('section-'+section).classList.add('active');
  const labels={overview:'数据总览',names:'名字库',keywords:'关键词库',tags:'标签枚举'};
  document.getElementById('page-title').textContent=labels[section]||section;
  document.getElementById('page-count').textContent='';
  S.section=section;
  if(section==='overview')loadOverview();
  else if(section==='names')loadNames();
  else if(section==='keywords')loadKeywords();
  else if(section==='tags')loadTags();
}
document.querySelectorAll('.nav-item,.mnav').forEach(btn=>{
  btn.addEventListener('click',()=>navigate(btn.dataset.section));
});

const modal=document.getElementById('modal-overlay');
document.getElementById('modal-close').onclick=()=>modal.classList.remove('open');
modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('open')});
document.addEventListener('keydown',e=>{if(e.key==='Escape')modal.classList.remove('open')});
function showModal(t,h){document.getElementById('modal-title').textContent=t;document.getElementById('modal-body').innerHTML=h;modal.classList.add('open')}

async function api(p,o={}){
  if(!o.headers)o.headers={};
  if(apiSecret)o.headers['X-API-Secret']=apiSecret;
  const r=await fetch(API+p,o);
  if(r.status===401){
    apiSecret='';localStorage.removeItem('api_secret');updateAuthUI();
    throw new Error('认证失败，请重新设置密钥');
  }
  return r.json();
}

function stBadge(s){
  const m={raw:'badge-muted',llm_enriched:'badge-info',reviewed:'badge-warning',complete:'badge-success',draft:'badge-muted',seo_ready:'badge-info',filter_ready:'badge-warning',quiz_ready:'badge-accent',published:'badge-success'};
  const zh={raw:'原始',llm_enriched:'LLM已填充',reviewed:'已审核',complete:'已完成',draft:'草稿',seo_ready:'SEO就绪',filter_ready:'筛选就绪',quiz_ready:'问答就绪',published:'已发布',male:'男',female:'女',unisex:'中性'};
  return '<span class="badge '+(m[s]||'badge-muted')+'">'+(zh[s]||s)+'</span>';
}
function strBadge(s){
  const m={category_page:'badge-accent',blog_post:'badge-info',tool_page:'badge-warning',homepage_seo:'badge-success'};
  const zh={category_page:'分类页',blog_post:'博客',tool_page:'工具页',homepage_seo:'首页SEO'};
  return '<span class="badge '+(m[s]||'badge-muted')+'">'+(zh[s]||s||'\\u2014')+'</span>';
}
function tgs(arr){
  if(!arr||!arr.length)return'<span style="color:var(--text-muted)">\\u2014</span>';
  const a=typeof arr==='string'?(arr?JSON.parse(arr):[]):arr;
  return '<div class="tag-group">'+a.slice(0,4).map(v=>'<span class="badge badge-muted">'+v+'</span>').join('')+(a.length>4?'<span class="badge badge-muted">+' +(a.length-4)+'</span>':'')+'</div>';
}
function e(s){return s?String(s).replace(/</g,'&lt;').replace(/>/g,'&gt;'):''}
function bar(items,total){
  if(!items.length)return'<p style="color:var(--text-muted)">暂无数据</p>';
  const zh={complete:'已完成',llm_enriched:'LLM已填充',raw:'原始',reviewed:'已审核',male:'男性',female:'女性',unisex:'中性'};
  return items.map(it=>{
    const pct=total?Math.round(it.count/total*100):0;
    return '<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px"><div style="width:100px;font-size:.78rem;font-weight:500;color:var(--text)">'+(zh[it.label]||it.label)+'</div><div style="flex:1;background:var(--bg);border-radius:4px;height:20px;overflow:hidden"><div style="height:100%;width:'+pct+'%;background:linear-gradient(90deg,var(--accent),#d4735c);border-radius:4px;transition:width .6s;min-width:2px"></div></div><div style="width:55px;text-align:right;font-size:.75rem;color:var(--text-muted)">'+it.count+'<span style="opacity:.6"> ('+pct+'%)</span></div></div>';
  }).join('');
}

async function loadOverview(){
  try{
    const [ns,kd,td]=await Promise.all([api('/api/names/stats/summary'),api('/api/keywords?limit=1'),api('/api/tags')]);
    document.getElementById('stat-names').textContent=ns.total||0;
    const bs=ns.by_status||[];
    const comp=bs.find(s=>s.status==='complete');
    document.getElementById('stat-complete').textContent=comp?comp.count:0;
    if(ns.total)document.getElementById('stat-complete-sub').textContent='占总数 '+Math.round((comp?comp.count:0)/ns.total*100)+'%';
    const bg=ns.by_gender||[];
    document.getElementById('stat-names-sub').textContent=bg.map(g=>({male:'男',female:'女',unisex:'中性'}[g.gender]||g.gender)+':'+g.count).join(' · ');
    document.getElementById('stat-keywords').textContent=kd.total||0;
    const dims=Object.keys(td.data||{});
    document.getElementById('stat-tags').textContent=dims.length;
    document.getElementById('stat-tags-sub').textContent=(td.total||0)+' 个枚举值';
    document.getElementById('overview-status-chart').innerHTML=bar(bs.map(s=>({label:s.status,count:s.count})),ns.total);
    document.getElementById('overview-gender-chart').innerHTML=bar(bg.map(g=>({label:g.gender,count:g.count})),ns.total);
    const recent=await api('/api/names?limit=8');
    if(recent.data&&recent.data.length){
      let h='<table class="data-table"><thead><tr><th>汉字</th><th>罗马音</th><th>性别</th><th>状态</th></tr></thead><tbody>';
      recent.data.forEach(n=>{h+='<tr onclick="nameDetail(\\''+n.id+'\\')"><td><span class="kanji-lg">'+e(n.kanji)+'</span><span class="reading-sm">'+e(n.reading)+'</span></td><td>'+e(n.romaji)+'</td><td>'+stBadge(n.gender)+'</td><td>'+stBadge(n.status)+'</td></tr>'});
      h+='</tbody></table>';
      document.getElementById('overview-recent').innerHTML=h;
    }else{document.getElementById('overview-recent').innerHTML='<div class="empty-state"><p>数据库中暂无名字数据，请通过 API 导入。</p></div>'}
  }catch(err){console.error(err);document.getElementById('overview-recent').innerHTML='<div class="empty-state"><p>无法加载数据，请确认 API 是否正常运行。</p></div>'}
}

async function loadNames(){
  const w=document.getElementById('names-table-wrap');
  w.innerHTML='<div class="loading"><div class="spinner"></div>加载中…</div>';
  const g=document.getElementById('filter-gender').value;
  const np=document.getElementById('filter-name-part').value;
  const st=document.getElementById('filter-status').value;
  const q=new URLSearchParams({limit:S.lim,offset:S.np*S.lim});
  if(g)q.set('gender',g);if(np)q.set('name_part',np);if(st)q.set('status',st);
  try{
    const r=await api('/api/names?'+q);
    document.getElementById('page-count').textContent='共 '+r.total+' 条';
    if(!r.data||!r.data.length){w.innerHTML='<div class="empty-state"><p>未找到名字</p></div>';namesPg(0);return}
    let h='<table class="data-table"><thead><tr><th>汉字 / 读音</th><th>罗马音</th><th>性别</th><th>类型</th><th>推定人数</th><th>气质</th><th>状态</th></tr></thead><tbody>';
    r.data.forEach(n=>{
      const v=typeof n.vibe==='string'?(n.vibe?JSON.parse(n.vibe):[]):n.vibe;
      const pop=n.estimated_population?Number(n.estimated_population).toLocaleString():'';
      h+='<tr onclick="nameDetail(\\''+n.id+'\\')"><td><span class="kanji-lg">'+e(n.kanji)+'</span><span class="reading-sm">'+e(n.reading)+'</span></td><td>'+e(n.romaji)+'</td><td>'+stBadge(n.gender)+'</td><td><span class="badge badge-muted">'+(n.name_part==='given_name'?'名':'姓')+'</span></td><td style="font-size:.78rem;color:var(--text-muted)">'+pop+'</td><td>'+tgs(v)+'</td><td>'+stBadge(n.status)+'</td></tr>';
    });
    h+='</tbody></table>';w.innerHTML=h;namesPg(r.total);
  }catch(err){w.innerHTML='<div class="empty-state"><p>加载失败</p></div>'}
}
function namesPg(total){
  const el=document.getElementById('names-pagination');const pages=Math.ceil(total/S.lim);
  if(!total){el.innerHTML='';return}
  el.innerHTML='<div class="pagination-info">第 '+(S.np*S.lim+1)+'\\u2013'+Math.min((S.np+1)*S.lim,total)+' 条，共 '+total+' 条</div><div class="pagination-btns">'
    +(S.np>0?'<button class="btn btn-ghost" onclick="S.np--;loadNames()">\\u2190 上一页</button>':'')
    +(S.np<pages-1?'<button class="btn btn-ghost" onclick="S.np++;loadNames()">下一页 \\u2192</button>':'')+'</div>';
}
['filter-gender','filter-name-part','filter-status'].forEach(id=>{document.getElementById(id).onchange=()=>{S.np=0;loadNames()}});

async function nameDetail(id){
  const r=await api('/api/names/'+id);if(!r.data)return;const n=r.data;
  const p=v=>{if(!v)return[];if(typeof v==='string'){try{return JSON.parse(v)}catch{return[]}}return v};
  let h='<div class="detail-grid">';
  [['ID',n.id],['罗马音',n.romaji],['汉字','<span class="kanji-lg">'+e(n.kanji)+'</span>'],['读音',n.reading],
   ['性别',stBadge(n.gender)],['类型','<span class="badge badge-muted">'+(n.name_part==='given_name'?'名':'姓')+'</span>'],
   ['推定人数',n.estimated_population?Number(n.estimated_population).toLocaleString()+' 人':'\\u2014'],
   ['音节数',n.syllable_count],['年代',n.era||'\\u2014'],['流行度',n.popularity||'\\u2014'],['来源',n.origin_region||'\\u2014'],
   ['书写体系',tgs(p(n.script))],['使用场景',tgs(p(n.use_case))],['气质',tgs(p(n.vibe))],['主题元素',tgs(p(n.element))],
   ['汉字含义',tgs(p(n.kanji_meaning_tags))],
   ['含义 (EN)',e(n.meaning_en)||'\\u2014'],['含义 (ZH)',e(n.meaning_zh)||'\\u2014'],
   ['描述 (EN)','<div style="line-height:1.6">'+e(n.description_en||'\\u2014')+'</div>'],
   ['描述 (ZH)','<div style="line-height:1.6">'+e(n.description_zh||'\\u2014')+'</div>'],
   ['知名人物',p(n.famous_bearers).map(f=>f.name+' ('+f.context+')').join(', ')||'\\u2014'],
   ['家纹',n.kamon_url?'<img src="'+e(n.kamon_url)+'" alt="家纹" style="width:64px;height:64px;object-fit:contain;border-radius:4px;border:1px solid var(--border)">':'\\u2014'],
   ['家纹提示词','<div style="line-height:1.6;font-size:0.85em">'+e(n.kamon_prompt||'\\u2014')+'</div>'],
   ['相关名字',tgs(p(n.related_names))],['状态',stBadge(n.status)],['数据来源',n.source||'\\u2014'],
   ['创建时间',n.created_at],['更新时间',n.updated_at]
  ].forEach(([l,v])=>{h+='<div class="detail-label">'+l+'</div><div class="detail-value">'+v+'</div>'});
  h+='</div>';showModal(n.romaji+' \\u00b7 '+n.kanji,h);
}
window.nameDetail=nameDetail;

async function loadKeywords(){
  const w=document.getElementById('keywords-table-wrap');
  w.innerHTML='<div class="loading"><div class="spinner"></div>加载中…</div>';
  const st=document.getElementById('filter-kw-strategy').value;
  const ss=document.getElementById('filter-kw-status').value;
  const q=new URLSearchParams({limit:S.lim,offset:S.kp*S.lim});
  if(st)q.set('strategy',st);if(ss)q.set('status',ss);
  try{
    const r=await api('/api/keywords?'+q);
    document.getElementById('page-count').textContent='共 '+r.total+' 条';
    if(!r.data||!r.data.length){w.innerHTML='<div class="empty-state"><p>未找到关键词</p></div>';kwPg(0);return}
    let h='<table class="data-table"><thead><tr><th>关键词</th><th>搜索量</th><th>难度</th><th>策略</th><th>路径</th><th>优先级</th><th>状态</th></tr></thead><tbody>';
    r.data.forEach(k=>{
      h+='<tr onclick="kwDetail(\\''+k.id+'\\')"><td style="font-weight:500">'+e(k.keyword)+'</td><td>'+(k.search_volume!=null?Number(k.search_volume).toLocaleString():'\\u2014')+'</td><td>'+(k.kd!=null?k.kd:'\\u2014')+'</td><td>'+strBadge(k.strategy)+'</td><td style="font-family:var(--font-mono);font-size:.74rem;color:var(--text-muted)">'+e(k.path||'\\u2014')+'</td><td><span class="badge badge-muted">P'+k.priority+'</span></td><td>'+stBadge(k.status)+'</td></tr>';
    });
    h+='</tbody></table>';w.innerHTML=h;kwPg(r.total);
  }catch(err){w.innerHTML='<div class="empty-state"><p>加载失败</p></div>'}
}
function kwPg(total){
  const el=document.getElementById('keywords-pagination');const pages=Math.ceil(total/S.lim);
  if(!total){el.innerHTML='';return}
  el.innerHTML='<div class="pagination-info">第 '+(S.kp*S.lim+1)+'\\u2013'+Math.min((S.kp+1)*S.lim,total)+' 条，共 '+total+' 条</div><div class="pagination-btns">'
    +(S.kp>0?'<button class="btn btn-ghost" onclick="S.kp--;loadKeywords()">\\u2190 上一页</button>':'')
    +(S.kp<pages-1?'<button class="btn btn-ghost" onclick="S.kp++;loadKeywords()">下一页 \\u2192</button>':'')+'</div>';
}
['filter-kw-strategy','filter-kw-status'].forEach(id=>{document.getElementById(id).onchange=()=>{S.kp=0;loadKeywords()}});

async function kwDetail(id){
  const r=await api('/api/keywords/'+id);if(!r.data)return;const k=r.data;
  const p=v=>{if(!v)return null;return typeof v==='string'?JSON.parse(v):v};
  let h='<div class="detail-grid">';
  [['ID',k.id],['关键词','<strong>'+e(k.keyword)+'</strong>'],
   ['搜索量',k.search_volume!=null?Number(k.search_volume).toLocaleString():'\\u2014'],
   ['难度',k.kd!=null?k.kd:'\\u2014'],['CPC',k.cpc!=null?'$'+k.cpc:'\\u2014'],['意图',k.intent||'\\u2014'],
   ['策略',strBadge(k.strategy)],['路径','<code style="font-family:var(--font-mono);font-size:.78rem">'+e(k.path||'\\u2014')+'</code>'],
   ['优先级','<span class="badge badge-accent">P'+k.priority+'</span>'],['状态',stBadge(k.status)]
  ].forEach(([l,v])=>{h+='<div class="detail-label">'+l+'</div><div class="detail-value">'+v+'</div>'});
  const seo=p(k.seo);
  if(seo){h+='<div class="detail-label">SEO 标题</div><div class="detail-value">'+e(seo.title||'\\u2014')+'</div><div class="detail-label">H1</div><div class="detail-value">'+e(seo.h1||'\\u2014')+'</div><div class="detail-label">描述</div><div class="detail-value" style="line-height:1.6">'+e(seo.description||'\\u2014')+'</div>'}
  const fr=p(k.filter_rule);
  if(fr){h+='<div class="detail-label">筛选规则</div><div class="detail-value"><pre style="font-family:var(--font-mono);font-size:.74rem;background:var(--bg);padding:10px;border-radius:var(--radius);overflow-x:auto;white-space:pre-wrap">'+e(JSON.stringify(fr,null,2))+'</pre></div>'}
  if(k.seo_guidance){h+='<div class="detail-label">SEO 指导</div><div class="detail-value" style="line-height:1.6">'+e(k.seo_guidance)+'</div>'}
  const al=p(k.keyword_aliases);
  if(al&&al.length){h+='<div class="detail-label">别名</div><div class="detail-value"><div class="tag-group">'+al.map(a=>'<span class="badge badge-muted">'+(typeof a==='string'?a:a.keyword||JSON.stringify(a))+'</span>').join('')+'</div></div>'}
  h+='<div class="detail-label">创建时间</div><div class="detail-value">'+k.created_at+'</div><div class="detail-label">更新时间</div><div class="detail-value">'+k.updated_at+'</div></div>';
  showModal(k.keyword,h);
}
window.kwDetail=kwDetail;

async function loadTags(){
  const el=document.getElementById('tags-content');
  el.innerHTML='<div class="loading"><div class="spinner"></div>加载中…</div>';
  try{
    const r=await api('/api/tags');const g=r.data||{};
    const dimZh={gender:'性别',name_part:'名字类型',era:'年代',popularity:'流行度',origin_region:'来源',script:'书写体系',use_case:'使用场景',vibe:'气质',element:'主题元素'};
    document.getElementById('tag-total-count').textContent=Object.keys(g).length+' 个维度，'+(r.total||0)+' 个枚举值';
    let h='<div class="tag-grid">';
    for(const[dim,vals] of Object.entries(g)){
      h+='<div class="tag-card"><div class="tag-card-title">'+(dimZh[dim]||dim)+'<span class="tag-card-count">'+vals.length+'</span></div><div class="tag-card-values">';
      vals.forEach(v=>{h+='<span class="badge badge-muted" title="'+e(v.label_en||'')+' / '+e(v.label_zh||'')+'">'+e(v.label_zh||v.value)+'</span>'});
      h+='</div></div>';
    }
    h+='</div>';el.innerHTML=h;
  }catch(err){el.innerHTML='<div class="empty-state"><p>加载标签失败</p></div>'}
}

let searchT;
document.getElementById('search-input').addEventListener('input',ev=>{
  clearTimeout(searchT);const q=ev.target.value.trim();if(!q)return;
  searchT=setTimeout(async()=>{
    navigate('names');
    const w=document.getElementById('names-table-wrap');
    w.innerHTML='<div class="loading"><div class="spinner"></div>搜索中…</div>';
    try{
      const r=await api('/api/names?limit=100&offset=0');
      const d=(r.data||[]).filter(n=>n.romaji.toLowerCase().includes(q.toLowerCase())||n.kanji.includes(q)||n.reading.includes(q));
      document.getElementById('page-count').textContent=d.length+' 条结果';
      if(!d.length){w.innerHTML='<div class="empty-state"><p>未找到 "'+e(q)+'" 的相关结果</p></div>';return}
      let h='<table class="data-table"><thead><tr><th>汉字 / 读音</th><th>罗马音</th><th>性别</th><th>类型</th><th>推定人数</th><th>气质</th><th>状态</th></tr></thead><tbody>';
      d.forEach(n=>{
        const v=typeof n.vibe==='string'?(n.vibe?JSON.parse(n.vibe):[]):n.vibe;
        const pop=n.estimated_population?Number(n.estimated_population).toLocaleString():'';
        h+='<tr onclick="nameDetail(\\''+n.id+'\\')"><td><span class="kanji-lg">'+e(n.kanji)+'</span><span class="reading-sm">'+e(n.reading)+'</span></td><td>'+e(n.romaji)+'</td><td>'+stBadge(n.gender)+'</td><td><span class="badge badge-muted">'+(n.name_part==='given_name'?'名':'姓')+'</span></td><td style="font-size:.78rem;color:var(--text-muted)">'+pop+'</td><td>'+tgs(v)+'</td><td>'+stBadge(n.status)+'</td></tr>';
      });
      h+='</tbody></table>';w.innerHTML=h;
    }catch(err){w.innerHTML='<div class="empty-state"><p>搜索失败</p></div>'}
  },300);
});

loadOverview();
</script>
</body>
</html>`;
