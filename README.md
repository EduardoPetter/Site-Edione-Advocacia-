# Edione de Moraes Advocacia — Site Institucional

Site institucional one-page: HTML5 + Tailwind CSS (CDN) + CSS customizado + JavaScript puro (sem frameworks, sem dependências de build).

## Estrutura de arquivos

```
index.html    → marcação, conteúdo e metadados de SEO/Open Graph/Schema.org
styles.css    → tokens visuais, componentes e animações
script.js     → menu mobile, scroll reveal, FAQ, carrossel de depoimentos, formulário
robots.txt    → diretivas para buscadores
sitemap.xml   → mapa do site
README.md     → este guia
```

## Como visualizar localmente

Não é necessário build. Basta servir a pasta com qualquer servidor estático, por exemplo:

```bash
python3 -m http.server 8000
```

E abrir `http://localhost:8000` no navegador. (Abrir o `index.html` direto por `file://` também funciona, exceto pelo mapa, que alguns navegadores bloqueiam por CORS em `file://`.)

## Checklist antes de publicar

Itens que dependem de informação real do escritório e hoje estão como
conteúdo institucional/placeholder profissional (todos marcados no código
com comentários `AVISO PARA PUBLICAÇÃO`):

- [ ] **Depoimentos** (seção "Avaliações do Google"): os 4 cartões são exemplos de layout. Substituir pelos comentários reais do Google Meu Negócio (com autorização de uso) e remover o selo vermelho "Exemplo".
- [ ] **Foto da equipe/fachada**: a seção "Sobre" usa um bloco navy com iniciais no lugar da foto. Substituir por imagem real.
- [ ] **Número de inscrição na OAB/ES**: hoje aparece apenas o texto genérico "OAB/ES" no selo e na seção Sobre — inserir o número real de registro.
- [ ] **Política de primeira consulta** (gratuita, paga ou avaliação caso a caso): item que muda a copy de conversão do formulário e do FAQ — confirmar com o escritório.
- [ ] **Domínio definitivo**: atualizar as URLs em `sitemap.xml`, `robots.txt` e nas tags `canonical`/Open Graph do `index.html` (hoje usam `edionemoraesadvocacia.com.br` como placeholder).
- [ ] **Imagem de Open Graph** (`/assets/og-cover.jpg`): criar e hospedar a imagem de compartilhamento (1200×630px) referenciada nas meta tags.
- [ ] **Integração real do formulário**: hoje o formulário de contato valida os campos e abre o WhatsApp com a mensagem pronta (não depende de backend). Se desejar também receber por e-mail, é necessário integrar um serviço de envio (ex.: Formspree, backend próprio) — não incluído neste projeto.

## Recursos já implementados

- Hero com selo/carimbo animado (nota 5,0 · 131 avaliações)
- Seções: Sobre, Áreas de Atuação, Diferenciais, Como Funciona, Depoimentos, FAQ, Contato (formulário + mapa), Rodapé completo
- Botão flutuante de WhatsApp com pulso, mensagens pré-preenchidas por área de atuação
- Menu mobile acessível, header com transição ao rolar
- Scroll reveal via `IntersectionObserver`, com respeito a `prefers-reduced-motion`
- FAQ em acordeão acessível (`aria-expanded`)
- Carrossel de depoimentos responsivo (1 card no mobile, 2 no desktop)
- Formulário com validação client-side e envio via WhatsApp
- Mapa do Google Maps incorporado (endereço: Rua Resplendor, 54 — Universal, Viana/ES)
- SEO: meta title/description, palavras-chave locais, canonical, Open Graph, Twitter Card
- Dados estruturados Schema.org (`LegalService`) com endereço, telefone, área de atendimento e `aggregateRating`
- Acessibilidade: skip-link, foco visível, `aria-label`s, contraste AA, navegação por teclado
- Performance: sem frameworks pesados, fontes com `preconnect`, mapa e imagens com `loading="lazy"`

## Aviso de conformidade OAB

Os textos foram redigidos evitando promessas de resultado e superlativos
indevidos, em linha com o Código de Ética da OAB para publicidade da
advocacia (Provimento 205/2021). Revisar com o responsável técnico antes
de publicar.
