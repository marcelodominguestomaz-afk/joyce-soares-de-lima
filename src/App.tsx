import { useEffect, useRef, useState, type ReactNode } from 'react';
import { siteContent as content } from './data/siteContent';

const emailLink = `mailto:${content.email}?subject=${encodeURIComponent('Contato pelo site — Joyce Soares de Lima')}`;
const navigation = [
  ['inicio', 'Início'], ['sobre', 'Sobre'], ['atuacao', 'Atuação'],
  ['comunidade', 'Comunidade'], ['formacao', 'Formação'],
] as const;

function Arrow({ diagonal = false, className = '' }: { diagonal?: boolean; className?: string }) {
  return <svg className={`icon ${className}`} width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? 'M6 18 18 6M6 6h12v12' : 'M4 12h16m-6-6 6 6-6 6'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function Chevron() {
  return <svg className="icon chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function Leaf({ className = '' }: { className?: string }) {
  return <svg className={className} width="48" height="58" viewBox="0 0 48 58" fill="none" aria-hidden="true"><path d="M9 53C17 40 33 23 36 5M35 8C18 6 7 16 11 30c13 2 23-6 24-22Zm-13 33c1-12 10-18 22-17-1 13-9 19-22 17Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function SectionLabel({ number, children, light = false }: { number: string; children: ReactNode; light?: boolean }) {
  return <p className={`section-label ${light ? 'light' : ''}`}><span>{number}</span><span className="label-line" />{children}</p>;
}
function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('inicio');
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    // Guarda o estado de todas as seções: o callback só recebe as que mudaram,
    // então decidir apenas a partir delas deixava o menu preso ao rolar rápido.
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'));
    const visible = new Set<string>();
    const navIds = new Set<string>(navigation.map(([id]) => id));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.isIntersecting ? visible.add(entry.target.id) : visible.delete(entry.target.id));
      const current = sections.find(section => visible.has(section.id) && navIds.has(section.id));
      if (current) setActive(current.id);
      else if (sections.some(section => visible.has(section.id))) setActive('');
    }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    function onEscape(event: KeyboardEvent) { if (event.key === 'Escape' && open) { setOpen(false); menuButton.current?.focus(); } }
    function onResize() { if (window.innerWidth > 1080) setOpen(false); }
    window.addEventListener('keydown', onEscape);
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('keydown', onEscape); window.removeEventListener('resize', onResize); };
  }, [open]);
  return <header className="site-header">
    <div className="container header-inner">
      <a href="#inicio" className="wordmark" aria-label="Joyce Soares de Lima — início" onClick={() => setOpen(false)}>
        <span className="wordmark-name">Joyce Soares de Lima</span><span className="wordmark-description">ADVOCACIA & EDUCAÇÃO</span>
      </a>
      <a className="header-mail" href={emailLink} aria-label={`Enviar e-mail para ${content.email}`}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="5.5" width="18" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg></a>
      <button ref={menuButton} className={`menu-toggle ${open ? 'is-open' : ''}`} aria-expanded={open} aria-controls="primary-navigation" aria-label={open ? 'Fechar menu de navegação' : 'Abrir menu de navegação'} onClick={() => setOpen(!open)}><span /><span /></button>
      <nav id="primary-navigation" className={`main-navigation ${open ? 'is-open' : ''}`} aria-label="Navegação principal">
        {navigation.map(([id, label]) => <a key={id} className={active === id ? 'active' : ''} href={`#${id}`} aria-current={active === id ? 'location' : undefined} onClick={() => setOpen(false)}>{label}</a>)}
        <a href="#contato" className="header-contact" onClick={() => setOpen(false)}>Contato <Arrow diagonal /></a>
      </nav>
    </div>
  </header>;
}
function Hero() {
  return <section id="inicio" className="hero" aria-labelledby="hero-heading">
    <div className="container hero-grid">
      <div className="hero-copy">
        <p className="eyebrow"><span className="small-sun" aria-hidden="true">✳</span> JOYCE SOARES DE LIMA · ADVOGADA E EDUCADORA</p>
        <h1 id="hero-heading">Advocacia com<br /><em>escuta</em>, diálogo<br />e responsabilidade<br className="desktop-line" /> social.</h1>
        <p className="hero-description">{content.hero.description}</p>
        <div className="hero-actions"><a className="button button-primary" href={emailLink}>Enviar e-mail <Arrow diagonal /></a><a href="#atuacao" className="text-link">Conhecer a atuação <Arrow /></a></div>
        <p className="hero-footnote"><span /> UM OLHAR PARA AS PESSOAS E SUAS RELAÇÕES</p>
      </div>
      <div className="hero-art">
        <div className="hero-image-frame"><img className="hero-image" src="./assets/hero-nature.webp" alt="Luz do sol atravessando folhas verdes. Fotografia ilustrativa." width="1200" height="1800" fetchPriority="high" /></div>
        <span className="image-side-caption">ESCUTA · DIÁLOGO · CULTURA DE PAZ</span>
        <div className="hero-note"><Leaf /><div><span className="note-eyebrow">O PONTO DE PARTIDA</span><p>Cada história<br />merece ser ouvida.</p></div></div>
        <div className="hero-outline" aria-hidden="true" />
      </div>
    </div>
    <div className="container hero-bottom"><span>DIREITO QUE CONSIDERA O CONTEXTO</span><a href="#sobre" aria-label="Descer para conhecer Joyce">Continue a leitura <span aria-hidden="true">↓</span></a></div>
  </section>;
}
function About() {
  return <section id="sobre" className="about section-space" aria-labelledby="about-heading">
    <div className="container about-grid">
      <div><SectionLabel number="01">SOBRE JOYCE</SectionLabel><h2 id="about-heading">Entre o direito,<br />a educação e as<br /><em>relações humanas.</em></h2>{content.portrait && <figure className="about-portrait"><img src={content.portrait.src} alt={content.portrait.alt} width={content.portrait.width} height={content.portrait.height} loading="lazy" /></figure>}</div>
      <div className="about-copy"><p className="lead">Uma atuação que parte da escuta e considera o conflito para além do dano jurídico.</p><p>Joyce Soares de Lima é advogada e educadora. Sua trajetória reúne atuação jurídica, formações em comunicação e educação e vivências comunitárias.</p><p>No direito civil, nas relações de consumo, na família e nos contratos, a proposta é compreender os elementos humanos, sociais e jurídicos de cada situação e orientar com responsabilidade.</p><a href="#trajetoria" className="text-link">Conhecer a trajetória <Arrow /></a></div>
    </div>
    <div className="container principles" aria-label="Princípios de atuação">
      <div><span className="principle-number">I.</span><h3>Escuta ativa</h3><p>Espaço para compreender a história e o contexto de cada pessoa.</p></div>
      <div><span className="principle-number">II.</span><h3>Diálogo</h3><p>Atenção às relações e às possibilidades de resolução de conflitos.</p></div>
      <div><span className="principle-number">III.</span><h3>Responsabilidade social</h3><p>Um olhar para os vínculos, a comunidade e a cultura de paz.</p></div>
    </div>
  </section>;
}
function PracticeCard({ area, index }: { area: (typeof content.practiceAreas)[number]; index: number }) {
  return <details className="practice-card">
    <summary><span className="card-top"><span className="card-index">{String(index + 1).padStart(2, '0')}</span><span className="plus-icon" aria-hidden="true" /></span><h3>{area.title}</h3><p>{area.description}</p><span className="card-action"><span className="closed-text">Ver assuntos</span><span className="open-text">Recolher assuntos</span><Chevron /></span></summary>
    <div className="practice-details"><ul>{area.items.map(item => <li key={item}>{item}</li>)}</ul></div>
  </details>;
}
function PracticeAreas() {
  let counter = 0;
  return <section id="atuacao" className="practice section-space" aria-labelledby="practice-heading">
    <div className="container">
      <div className="section-heading-row"><div><SectionLabel number="02">ÁREAS DE ATUAÇÃO</SectionLabel><h2 id="practice-heading">O direito faz parte<br />da <em>vida cotidiana.</em></h2></div><p>Proteção de vínculos, análise de contratos e orientação em momentos de mudança. Conheça os assuntos de cada área.</p></div>
      {content.audiences.map(audience => {
        const areas = content.practiceAreas.filter(area => area.audience === audience.id);
        return <div className="practice-group" key={audience.id} aria-labelledby={`audience-${audience.id}`}>
          <div className="practice-group-intro"><h3 id={`audience-${audience.id}`}>{audience.label}</h3><p>{audience.description}</p></div>
          <div className="practice-grid">{areas.map(area => <PracticeCard key={area.id} area={area} index={counter++} />)}</div>
        </div>;
      })}
      <p className="practice-note">Cada situação exige análise própria. As informações desta página apresentam áreas de atuação e não substituem orientação jurídica individualizada.</p>
    </div>
  </section>;
}
function Process() {
  return <section id="atendimento" className="process section-space" aria-labelledby="process-heading"><div className="container">
    <div className="section-heading-row"><div><SectionLabel number="06">COMO FUNCIONA</SectionLabel><h2 id="process-heading">Do primeiro contato<br />à <em>orientação.</em></h2></div><p>Um caminho simples, sem cadastro e sem compromisso no primeiro contato.</p></div>
    <ol className="process-steps">{content.process.map((step, index) => <li key={step.title}><span className="process-number">{String(index + 1).padStart(2, '0')}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
    <a className="button button-primary process-cta" href={emailLink}>Escrever para Joyce <Arrow diagonal /></a>
  </div></section>;
}
function Articles() {
  if (content.articles.length === 0) return null;
  const format = (date: string) => new Date(`${date}T12:00:00`).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
  return <section id="conteudos" className="articles section-space" aria-labelledby="articles-heading"><div className="container">
    <div className="section-heading-row"><div><p className="eyebrow">CONTEÚDOS</p><h2 id="articles-heading">Para entender <em>seus direitos.</em></h2></div><p>Textos curtos de orientação geral. Não substituem a análise do seu caso.</p></div>
    <div className="articles-grid">{content.articles.map(article => <a key={article.url} className="article-card" href={article.url} target="_blank" rel="noreferrer"><time dateTime={article.date}>{format(article.date)}</time><h3>{article.title}</h3><p>{article.summary}</p><span className="card-action">Ler artigo <Arrow diagonal /></span></a>)}</div>
  </div></section>;
}
function Community() {
  return <section id="comunidade" className="community section-space" aria-labelledby="community-heading">
    <div className="container community-top"><SectionLabel number="03" light>ADVOCACIA COMUNITÁRIA</SectionLabel><span className="community-top-note">DIREITO COMO CIÊNCIA DO SOCIAL</span></div>
    <div className="container community-grid">
      <div className="community-visual"><div className="community-image-wrap"><img src="./assets/vivencia-1.webp" alt="Grupo de pessoas reunidas em um salão." width="1600" height="1200" loading="lazy" /></div><span className="photo-caption">VIVÊNCIAS, ENCONTROS E CONSTRUÇÃO COLETIVA</span><div className="community-stamp" aria-hidden="true"><Leaf /><span>CULTURA<br />DE PAZ</span></div></div>
      <div className="community-copy"><h2 id="community-heading">O conflito também tem<br />uma dimensão <em>humana.</em></h2><p className="community-intro">Escutar o que atravessa as relações é parte do caminho para compreender um conflito.</p><p>Desde 2019, Joyce desenvolve um projeto de pesquisa e atuação com o Direito como ciência do social, considerando sua capacidade de promover a recondução de relacionamentos interpessoais e de parcerias por meio do diálogo, da arte e da filantropia.</p><p>A proposta valoriza a escuta ativa e a compreensão dos elementos do conflito para além do dano jurídico, buscando estimular uma cultura de paz.</p><div className="volunteer-note"><span className="volunteer-symbol" aria-hidden="true">↗</span><p>Desde 2023, realiza trabalho voluntário na Associação Comunitária Monte Azul, em serviços voltados a pessoas em extrema vulnerabilidade social.</p></div></div>
    </div>
  </section>;
}
function Timeline() {
  return <section id="trajetoria" className="timeline-section section-space" aria-labelledby="timeline-heading"><div className="container timeline-grid">
    <div className="timeline-intro"><SectionLabel number="04">TRAJETÓRIA</SectionLabel><h2 id="timeline-heading">Experiências que<br />ampliam o <em>olhar.</em></h2><p>Um percurso por diferentes contextos do direito, dos contratos às demandas sociais.</p><Leaf className="timeline-leaf" /></div>
    <ol className="timeline">{content.timeline.map(item => <li key={item.date}><span className="timeline-dot" aria-hidden="true" /><div className="timeline-date">{item.date}</div><h3>{item.name}</h3><p>{item.text}</p></li>)}</ol>
  </div></section>;
}
function Education() {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  function handleTabKey(event: React.KeyboardEvent, index: number) {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % content.education.length;
    else if (event.key === 'ArrowLeft') next = (index + content.education.length - 1) % content.education.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = content.education.length - 1;
    else return;
    event.preventDefault(); setSelected(next); tabs.current[next]?.focus();
  }
  return <section id="formacao" className="education section-space" aria-labelledby="education-heading"><div className="container education-grid">
    <div className="education-copy"><SectionLabel number="05">FORMAÇÃO E VIVÊNCIAS</SectionLabel><h2 id="education-heading">Conhecimento<br />em <em>diálogo.</em></h2><p className="education-description">O percurso formativo aproxima a base jurídica, a comunicação e a educação comunitária.</p>
      <div className="education-tabs" role="tablist" aria-label="Áreas de formação">{content.education.map((group, index) => <button type="button" key={group.category} ref={el => { tabs.current[index] = el; }} id={`tab-${index}`} role="tab" aria-selected={selected === index} aria-controls={`panel-${index}`} tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={event => handleTabKey(event, index)}>{group.category}</button>)}</div>
      {content.education.map((group, index) => <div className="education-panel" id={`panel-${index}`} key={group.category} role="tabpanel" aria-labelledby={`tab-${index}`} tabIndex={0} hidden={selected !== index}><p className="education-panel-label">{group.label}</p><ul>{group.items.map(item => <li key={item.title}><h3>{item.title}</h3><p>{item.institution}</p>{item.detail && <span>{item.detail}</span>}</li>)}</ul></div>)}
    </div>
    <figure className="education-image"><img src="./assets/education-reading.webp" alt="Livro aberto junto a uma janela com luz natural. Fotografia ilustrativa." width="1200" height="1800" loading="lazy" /><figcaption>APRENDER TAMBÉM É AMPLIAR FORMAS DE ESCUTAR.</figcaption></figure>
  </div></section>;
}
function Modal({ open, onClose, title, children, wide = false }: { open: boolean; onClose: () => void; title: string; children: ReactNode; wide?: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const element = dialog.current;
    if (open && element && !element.open) { returnFocus.current = document.activeElement as HTMLElement; element.showModal(); }
    else if (!open && element?.open) element.close();
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; returnFocus.current?.focus(); };
  }, [open]);
  return <dialog ref={dialog} className={`modal ${wide ? 'modal-wide' : ''}`} aria-label={title} onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="modal-inner"><div className="modal-top"><span>{title}</span><button type="button" className="icon-button close-button" onClick={onClose} aria-label="Fechar janela">×</button></div>{children}</div>
  </dialog>;
}
function Gallery() {
  const [current, setCurrent] = useState<number | null>(null);
  useEffect(() => {
    if (current === null) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === 'ArrowRight') setCurrent(value => value === null ? null : (value + 1) % content.gallery.length);
      if (event.key === 'ArrowLeft') setCurrent(value => value === null ? null : (value + content.gallery.length - 1) % content.gallery.length);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current]);
  const photo = current !== null ? content.gallery[current] : null;
  return <section className="gallery-section section-space" aria-labelledby="gallery-heading"><div className="container">
    <div className="gallery-heading"><div><p className="eyebrow">REGISTROS DE VIVÊNCIAS</p><h2 id="gallery-heading">Estar junto também<br />é uma forma de <em>aprender.</em></h2></div><p>Registros de encontros,<br />arte e convivência.</p></div>
    <div className="gallery-grid">{content.gallery.map((item, index) => <button className="gallery-item" key={item.src} type="button" onClick={() => setCurrent(index)} aria-label={`Ampliar fotografia — ${item.caption}`}><span className="gallery-image"><img src={item.src} alt={item.alt} loading="lazy" width={item.width} height={item.height} /><span className="gallery-expand" aria-hidden="true"><Arrow diagonal /></span></span><span className="gallery-item-caption"><span>0{index + 1}</span>{item.caption}</span></button>)}</div>
    <Modal open={current !== null} onClose={() => setCurrent(null)} title="Registros de vivências" wide>{photo && <><figure className="lightbox-figure"><img src={photo.src} alt={photo.alt} /><figcaption>{photo.caption}</figcaption></figure><div className="lightbox-controls"><button type="button" className="button button-outline" aria-label="Fotografia anterior" onClick={() => setCurrent(value => value === null ? 0 : (value + content.gallery.length - 1) % content.gallery.length)}>← Anterior</button><span aria-live="polite">{(current ?? 0) + 1} / {content.gallery.length}</span><button type="button" className="button button-outline" aria-label="Próxima fotografia" onClick={() => setCurrent(value => value === null ? 0 : (value + 1) % content.gallery.length)}>Próxima →</button></div></>}</Modal>
  </div></section>;
}
function Testimonials() {
  if (content.testimonials.length === 0) return null;
  return <section className="container section-space" aria-label="Depoimentos autorizados">{content.testimonials.map(item => <blockquote key={item.author}><p>{item.text}</p><cite>{item.author}</cite></blockquote>)}</section>;
}
function Contact() {
  const [status, setStatus] = useState('');
  async function copyEmail() {
    try { await navigator.clipboard.writeText(content.email); setStatus('E-mail copiado.'); }
    catch { setStatus('Selecione e copie o endereço de e-mail acima.'); }
  }
  return <section id="contato" className="contact" aria-labelledby="contact-heading"><div className="container contact-grid">
    <div><SectionLabel number="07" light>CONTATO</SectionLabel><h2 id="contact-heading">Um espaço para<br /><em>ouvir sua questão.</em></h2><p>Para enviar dúvidas, solicitar orientação inicial ou apresentar uma situação jurídica, entre em contato por e-mail.</p></div>
    <div className="contact-box"><span className="contact-label">ESCREVA PARA JOYCE</span><a href={emailLink} className="email-address">{content.email}<Arrow diagonal /></a><div className="contact-actions"><a href={emailLink} className="button button-light">Enviar e-mail <Arrow diagonal /></a><button type="button" onClick={copyEmail} className="copy-email">Copiar endereço <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M16 8V4H4v12h4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg></button></div><p className="copy-status" role="status">{status}</p><p className="contact-disclaimer">Não envie documentos sensíveis ou informações sigilosas antes da confirmação de atendimento. O envio de uma mensagem não cria, por si só, relação advogado-cliente.</p></div>
  </div><div className="contact-decoration" aria-hidden="true"><Leaf /></div></section>;
}
function Footer() {
  const [modal, setModal] = useState<'privacy' | 'credits' | null>(null);
  return <><footer className="site-footer"><div className="container footer-top"><a href="#inicio" className="wordmark"><span className="wordmark-name">Joyce Soares de Lima</span><span className="wordmark-description">ADVOGADA E EDUCADORA</span></a><nav className="footer-links" aria-label="Seções do site">{navigation.slice(1).map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}<a href="#contato">Contato</a></nav><a href="#inicio" className="back-to-top">Voltar ao início ↑</a></div><div className="container footer-bottom"><p>© {new Date().getFullYear()} Joyce Soares de Lima{content.oab && <> · {content.oab}</>}<span>Conteúdo meramente informativo.</span></p><div><button type="button" onClick={() => setModal('privacy')}>Privacidade</button><button type="button" onClick={() => setModal('credits')}>Créditos das imagens</button></div></div></footer>
    <Modal open={modal === 'privacy'} onClose={() => setModal(null)} title="Privacidade"><div className="prose"><h2>Contato e privacidade</h2><p>Esta página apresenta informações profissionais e disponibiliza contato por e-mail. Não há formulário, envio de documentos ou cadastro de visitantes nesta página.</p><h3>Ao enviar uma mensagem</h3><p>O botão de contato abre o seu aplicativo de e-mail. O conteúdo da mensagem é enviado ao endereço {content.email} e não é recebido ou armazenado pelo código desta página.</p><p>Compartilhe apenas as informações necessárias para apresentar sua solicitação. Aguarde a confirmação do atendimento antes de enviar documentos sensíveis ou informações sigilosas.</p><h3>Navegação</h3><p>O código desta página não instala cookies de publicidade e não integra ferramentas de análise de navegação. Fotografias e fontes são servidas junto ao site. A infraestrutura de hospedagem pode processar dados técnicos necessários ao acesso e à segurança.</p><h3>Solicitações sobre dados pessoais</h3><p>Para apresentar dúvidas sobre o tratamento de informações enviadas por e-mail, escreva para <a href={`mailto:${content.email}`}>{content.email}</a>.</p><p className="muted">O contato inicial não representa contratação de serviços ou promessa de resultado.</p></div></Modal>
    <Modal open={modal === 'credits'} onClose={() => setModal(null)} title="Créditos das imagens"><div className="prose"><h2>Fotografias e origens</h2><p>As fotografias de natureza e leitura são ilustrativas. Não representam Joyce, seu escritório ou seus atendimentos.</p><ul className="credits-list"><li><strong>Nina Schneider</strong><span>Folhas iluminadas pelo sol · 13 de maio de 2024</span><a href="https://unsplash.com/photos/sunlight-shining-through-the-leaves-of-a-tree-tmMfjl4cadA" target="_blank" rel="noreferrer">Fotografia no Unsplash ↗</a></li><li><strong>Ioann-Mark Kuznietsov</strong><span>Livro junto à janela · 24 de maio de 2017</span><a href="https://unsplash.com/photos/book-near-glass-window-F_cHIM0Kcy4" target="_blank" rel="noreferrer">Fotografia no Unsplash ↗</a></li><li><strong>Mstudio</strong><span>Detalhe de folhas · 13 de julho de 2018</span><a href="https://www.pexels.com/photo/selective-focus-photography-of-green-leaf-plant-1235686/" target="_blank" rel="noreferrer">Fotografia no Pexels ↗</a></li></ul><p>As imagens ilustrativas são utilizadas sob as licenças <a href="https://unsplash.com/license" target="_blank" rel="noreferrer">Unsplash</a> e <a href="https://www.pexels.com/license/" target="_blank" rel="noreferrer">Pexels</a>.</p><p>As fotografias de vivências foram fornecidas para o projeto. Não são utilizadas como depoimentos de clientes ou registros de resultados jurídicos.</p></div></Modal>
  </>;
}
export default function App() {
  return <><a className="skip-link" href="#main">Pular para o conteúdo</a><Header /><main id="main" tabIndex={-1}><Hero /><About /><PracticeAreas /><Community /><Timeline /><Education /><div className="nature-interlude" aria-hidden="true"><img src="./assets/nature-detail.webp" alt="" loading="lazy" width="1600" height="1067" /><div><span>ESCUTA. DIÁLOGO. COMUNIDADE.</span></div></div><Gallery /><Testimonials /><Articles /><Process /><Contact /></main><Footer /></>;
}
