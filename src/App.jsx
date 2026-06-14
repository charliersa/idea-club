// App.jsx — 靈感俱樂部 main app (Riso Zine prototype)
import { useState, useEffect } from 'react';
import { CATEGORIES, POSTS, ARTWORKS, PHOTOS, MEMBERS, NAV, VERBS } from './data';
import { RisoImage, RisoDefs, CatIcon, Marquee, Overlay } from './ui';
import {
  useTweaks, TweaksPanel, TweakSection,
  TweakToggle, TweakColor, TweakRadio,
} from './TweaksPanel';

const TWEAK_DEFAULTS = {
  "dark": false,
  "primary": "#FF3D7F",
  "corners": "圓角",
  "scroll": "慢"
};

const catById = (id) => CATEGORIES.find((c) => c.id === id);

/* ===== Masthead (nav + big title band) ===== */
function Masthead({ dark, onToggleTheme, onJoin }) {
  const [vi, setVi] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setVi((v) => (v + 1) % VERBS.length), 2000);
    return () => clearInterval(t);
  }, []);
  return (
    <header className="mast">
      <div className="mast-top">
        <div className="hdr-brand">
          <image-slot id="club-logo" className="logo-slot" shape="rounded" radius="10" placeholder="放 Logo"></image-slot>
          <span className="brand-en">INSPIRATION&nbsp;CLUB</span>
        </div>
        <nav className="hdr-nav">
          {NAV.map((n) => <a key={n} className="nav-link" href="#" onClick={(e) => e.preventDefault()}>{n}</a>)}
        </nav>
        <div className="hdr-actions">
          <button className="icon-btn" onClick={onToggleTheme} aria-label="切換深淺色" title="切換深淺色">
            {dark ?
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4.5" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19" /></svg> :
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 14.5A8 8 0 0 1 9.5 4 7 7 0 1 0 20 14.5z" /></svg>}
          </button>
          <button className="btn-join" onClick={onJoin}>加入俱樂部</button>
        </div>
      </div>
      <div className="mast-title-row">
        <h1 className="mast-title">靈感俱樂部</h1>
        <p className="mast-tag">
          人人都能{' '}
          <span className="verb-rotor"><span key={vi} className="verb">{VERBS[vi]}</span></span>
          ，長出屬於自己的風格。
        </p>
      </div>
    </header>
  );
}

/* ===== Left rail : 自我學習 ===== */
function LeftRail({ active, onPick }) {
  return (
    <aside className="rail card">
      <div className="card-head">
        <h2 className="card-title">自我學習</h2>
        <span className="card-kicker">SELF&nbsp;STUDY</span>
      </div>
      <ul className="rail-list">
        {CATEGORIES.map((c) =>
          <li key={c.id}>
            <button className={`rail-item ink-${c.ink} ${active === c.id ? 'is-active' : ''}`} onClick={() => onPick(c.id)}>
              <span className="rail-no">{c.no}</span>
              <span className="rail-ico"><CatIcon id={c.id} /></span>
              <span className="rail-meta">
                <span className="rail-name">{c.name}</span>
                <span className="rail-blurb">{c.blurb}</span>
              </span>
              <span className="rail-arrow">→</span>
            </button>
          </li>
        )}
      </ul>
    </aside>
  );
}

/* ===== Center : 最新消息 / 成員介紹 ===== */
function PostCard({ post, onOpen }) {
  const cat = catById(post.cat);
  return (
    <button className="post" onClick={() => onOpen(post)}>
      <div className="post-thumb"><RisoImage seed={post.seed} inks={post.inks} /></div>
      <div className="post-body">
        <div className="post-top">
          <span className={`pill ink-${cat.ink}`}>{cat.name}</span>
          <span className="post-tag">{post.tag}</span>
        </div>
        <h3 className="post-title">{post.title}</h3>
        <p className="post-ex">{post.excerpt}</p>
        <div className="post-meta">{post.author}<span className="sep">·</span>{post.date}<span className="sep">·</span>{post.read}</div>
      </div>
    </button>
  );
}

function MemberCard({ m }) {
  return (
    <div className="member">
      <div className="member-av"><RisoImage seed={m.seed} inks={m.inks} /></div>
      <div className="member-body">
        <h3 className="member-name">{m.name}</h3>
        <span className="member-role">{m.role}</span>
        <p className="member-bio">{m.bio}</p>
      </div>
    </div>
  );
}

function Center({ view, filter, setFilter, onOpenPost }) {
  const tabs = [{ id: 'all', name: '全部' }, ...CATEGORIES.filter((c) => c.id !== 'member').map((c) => ({ id: c.id, name: c.name }))];
  const posts = filter === 'all' ? POSTS : POSTS.filter((p) => p.cat === filter);

  if (view === 'members') {
    return (
      <section className="center card">
        <div className="card-head">
          <h2 className="card-title">成員介紹</h2>
          <span className="card-kicker">MEMBERS · {MEMBERS.length}</span>
        </div>
        <div className="center-scroll">
          <div className="member-grid">{MEMBERS.map((m) => <MemberCard key={m.id} m={m} />)}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="center card">
      <div className="card-head">
        <h2 className="card-title">最新消息</h2>
        <span className="card-kicker">LATEST</span>
      </div>
      <div className="tabs">
        {tabs.map((t) =>
          <button key={t.id} className={`tab ${filter === t.id ? 'is-active' : ''}`} onClick={() => setFilter(t.id)}>{t.name}</button>
        )}
      </div>
      <div className="center-scroll">
        <div className="feed">
          {posts.length ? posts.map((p) => <PostCard key={p.id} post={p} onOpen={onOpenPost} />) :
            <div className="empty">這個分類還在醞釀中，敬請期待。</div>}
        </div>
      </div>
    </section>
  );
}

/* ===== Right : 作品導覽 (vertical auto-scroll) ===== */
function Right({ durationSec, onOpenArt }) {
  return (
    <aside className="right card">
      <div className="card-head">
        <h2 className="card-title">作品導覽</h2>
        <span className="card-kicker">↓ 自動捲動</span>
      </div>
      <div className="right-stream">
        <Marquee direction="vertical" durationSec={durationSec} gap={14}>
          {ARTWORKS.map((a) =>
            <button key={a.id} className="art" onClick={() => onOpenArt(a)}>
              <div className="art-img"><RisoImage seed={a.seed} inks={a.inks} /></div>
              <div className="art-cap">
                <span className="art-title">{a.title}</span>
                <span className="art-sub">{a.author} · {a.medium}</span>
              </div>
            </button>
          )}
        </Marquee>
        <div className="stream-fade stream-fade-top" />
        <div className="stream-fade stream-fade-bot" />
      </div>
    </aside>
  );
}

/* ===== Bottom : 活動花絮 (horizontal auto-scroll) ===== */
function PhotoStrip({ durationSec, onOpen }) {
  return (
    <section className="strip card">
      <div className="card-head">
        <h2 className="card-title">活動花絮</h2>
        <span className="card-kicker">→ 自動捲動・滑過暫停</span>
      </div>
      <div className="strip-rail">
        <Marquee direction="horizontal" durationSec={durationSec} gap={16}>
          {PHOTOS.map((ph) =>
            <button key={ph.id} className="photo" onClick={() => onOpen(ph)}>
              <div className="photo-img"><RisoImage seed={ph.seed} inks={ph.inks} /></div>
              <span className="photo-cap">{ph.caption}</span>
            </button>
          )}
        </Marquee>
      </div>
    </section>
  );
}

/* ===== Modals ===== */
function PostModal({ post, onClose }) {
  if (!post) return null;
  const cat = catById(post.cat);
  return (
    <Overlay open={!!post} onClose={onClose} wide>
      <div className="pm">
        <div className="pm-img"><RisoImage seed={post.seed} inks={post.inks} /></div>
        <div className="pm-body">
          <div className="post-top"><span className={`pill ink-${cat.ink}`}>{cat.name}</span><span className="post-tag">{post.tag}</span></div>
          <h2 className="pm-title">{post.title}</h2>
          <div className="post-meta">{post.author}<span className="sep">·</span>{post.date}<span className="sep">·</span>{post.read}</div>
          <p className="pm-text">{post.excerpt}</p>
          <p className="pm-text">這是一段示意內文，之後可替換成真正的文章。靈感俱樂部相信，學習是一場可以被分享的實驗 —— 把過程記錄下來，就是給下一個人的起點。</p>
          <div className="pm-actions">
            <button className="btn-join" onClick={onClose}>開始閱讀</button>
            <button className="btn-ghost" onClick={onClose}>收藏</button>
          </div>
        </div>
      </div>
    </Overlay>
  );
}

function ArtModal({ item, onClose }) {
  if (!item) return null;
  const title = item.title || item.caption;
  const sub = item.medium ? `${item.author} · ${item.medium}` : '活動花絮';
  return (
    <Overlay open={!!item} onClose={onClose} wide>
      <div className="am">
        <div className="am-img"><RisoImage seed={item.seed} inks={item.inks} /></div>
        <div className="am-cap"><h2 className="am-title">{title}</h2><span className="am-sub">{sub}</span></div>
      </div>
    </Overlay>
  );
}

function JoinModal({ open, onClose }) {
  const [done, setDone] = useState(false);
  useEffect(() => { if (open) setDone(false); }, [open]);
  return (
    <Overlay open={open} onClose={onClose}>
      <div className="join">
        {!done ?
          <>
            <span className="card-kicker">JOIN&nbsp;US</span>
            <h2 className="join-title">加入靈感俱樂部</h2>
            <p className="join-sub">留下聯絡方式，我們會邀請你參加下一次的共創聚會。</p>
            <form className="join-form" onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
              <label>你的名字<input required placeholder="怎麼稱呼你？" /></label>
              <label>Email<input required type="email" placeholder="you@example.com" /></label>
              <label>最感興趣的領域
                <select defaultValue="draw">
                  {CATEGORIES.filter((c) => c.id !== 'member').map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </label>
              <button className="btn-join btn-block" type="submit">送出申請</button>
            </form>
          </> :
          <div className="join-done">
            <div className="join-mark"><RisoImage seed={42} inks={['pink', 'blue']} /></div>
            <h2 className="join-title">收到了！</h2>
            <p className="join-sub">歡迎加入靈感俱樂部，我們很快會與你聯繫。</p>
            <button className="btn-join btn-block" onClick={onClose}>太好了</button>
          </div>
        }
      </div>
    </Overlay>
  );
}

/* ===== App ===== */
export default function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [filter, setFilter] = useState('all');
  const [view, setView] = useState('feed');
  const [openPost, setOpenPost] = useState(null);
  const [openArt, setOpenArt] = useState(null);
  const [joinOpen, setJoinOpen] = useState(false);

  useEffect(() => {
    const r = document.documentElement;
    r.dataset.theme = t.dark ? 'dark' : 'light';
    r.style.setProperty('--k-pink', t.primary);
    r.style.setProperty('--radius', t.corners === '直角' ? '0px' : '14px');
  }, [t.dark, t.primary, t.corners]);

  const speedMul = t.scroll === '快' ? 0.5 : t.scroll === '中' ? 0.72 : 1;
  const vDur = Math.round(ARTWORKS.length * 6 * speedMul);
  const hDur = Math.round(PHOTOS.length * 5 * speedMul);

  const pickCat = (id) => {
    if (id === 'member') { setView('members'); return; }
    setView('feed'); setFilter(id);
  };

  return (
    <div className="app">
      <RisoDefs />
      <Masthead dark={t.dark} onToggleTheme={() => setTweak('dark', !t.dark)} onJoin={() => setJoinOpen(true)} />
      <main className="grid">
        <LeftRail active={view === 'members' ? 'member' : filter} onPick={pickCat} />
        <Center view={view} filter={filter} setFilter={(f) => { setView('feed'); setFilter(f); }} onOpenPost={setOpenPost} />
        <Right durationSec={vDur} onOpenArt={setOpenArt} />
        <PhotoStrip durationSec={hDur} onOpen={setOpenArt} />
      </main>
      <footer className="foot">
        <div className="foot-word">靈感俱樂部</div>
        <p className="foot-line">人人都有學習的機會，創造屬於自己的風格。</p>
        <div className="foot-meta">© 2026 靈感俱樂部 · 由成員共同維護</div>
      </footer>

      <PostModal post={openPost} onClose={() => setOpenPost(null)} />
      <ArtModal item={openArt} onClose={() => setOpenArt(null)} />
      <JoinModal open={joinOpen} onClose={() => setJoinOpen(false)} />

      <TweaksPanel>
        <TweakSection label="主題" />
        <TweakToggle label="深色模式" value={t.dark} onChange={(v) => setTweak('dark', v)} />
        <TweakColor label="主色調" value={t.primary} options={['#FF3D7F', '#FF5A36', '#E5249A', '#7A4DFF']} onChange={(v) => setTweak('primary', v)} />
        <TweakSection label="樣式" />
        <TweakRadio label="卡片邊角" value={t.corners} options={['圓角', '直角']} onChange={(v) => setTweak('corners', v)} />
        <TweakRadio label="卷軸速度" value={t.scroll} options={['慢', '中', '快']} onChange={(v) => setTweak('scroll', v)} />
      </TweaksPanel>
    </div>
  );
}
