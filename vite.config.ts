import { defineConfig, loadEnv, type Plugin } from 'vite';
import tailwindcss from '@tailwindcss/vite';

// Redes sociais (WhatsApp, LinkedIn, Facebook) só leem a prévia com endereço absoluto.
// Defina SITE_URL no build, ex.: SITE_URL=https://joyce.adv.br npm run build
function socialMeta(siteUrl: string): Plugin {
  const base = siteUrl.replace(/\/+$/, '');
  return {
    name: 'social-meta',
    transformIndexHtml(html) {
      if (!base) return html.replace(/\s*<!-- social-absolute -->/, '');
      const tags = [
        `<meta property="og:url" content="${base}/" />`,
        `<link rel="canonical" href="${base}/" />`,
      ].join('\n    ');
      return html
        .replaceAll('content="./assets/social-card.png"', `content="${base}/assets/social-card.png"`)
        .replace('<!-- social-absolute -->', tags);
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return { base: './', plugins: [tailwindcss(), socialMeta(env.SITE_URL ?? '')], build: { outDir: 'dist' } };
});
