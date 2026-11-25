import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const indexPath = path.join(root, 'dist/index.html');
let html = fs.readFileSync(indexPath, 'utf8');

const groups = [
  {
    dir: 'rowenta-clean-it', brand: 'Rowenta', model: 'Clean It IN5020F0', type: '快速入门指南', language: '英语',
    note: '实拍合集覆盖包装、配套清洁液、欢迎卡、保修与操作说明；不同角度共同呈现开箱后的信息触达顺序。'
  },
  {
    dir: 'eysin-c1011', brand: 'EYSin', model: 'C1011', type: '铭牌', language: '英语',
    note: '实拍合集覆盖产品身份铭牌、说明书、配件与清洁液；铭牌可辨识型号、电压、频率、重量和尺寸。'
  },
  {
    dir: 'lubluelu-h8-b', brand: 'Lubluelu', model: 'H8-B', type: '铭牌', language: '英语',
    note: '实拍合集覆盖外箱、型号标识、机身提示与操作细节；图片中可辨识品牌及 H8-B 型号。'
  },
  {
    dir: 'simplus-portable-carpet-cleaner', brand: 'Simplus', model: 'Portable Carpet Cleaner', type: '快速入门指南', language: '英语、印度尼西亚语',
    note: '实拍合集覆盖包装、用户手册、保修卡与会员二维码，使用高对比黑白版式组织操作和服务入口。'
  }
];

const escapeAttr = value => String(value)
  .replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

function card(group) {
  const imageDir = path.join(root, 'dist/images/imports', group.dir);
  const files = fs.readdirSync(imageDir).filter(name => name.endsWith('.jpg')).sort();
  const photos = files.map(name => ({
    image: `images/imports/${group.dir}/${name}`,
    thumb: `thumbs/imports/${group.dir}/${name}`,
    note: group.note,
    language: group.language,
    size: '4284×5712',
    source: ''
  }));
  const thumbs = photos.map((photo, index) => `<button class="thumb-button${index === 0 ? ' selected' : ''}" type="button" data-index="${index}" aria-label="查看第 ${index + 1} 张照片"><img loading="lazy" src="${photo.thumb}" alt=""></button>`).join('');
  const first = photos[0];
  return `
        <article class="card" data-brand="${group.brand}" data-category="布艺清洗机" data-material="${group.type}" data-photos="${escapeAttr(JSON.stringify(photos))}">
          <button class="image-link gallery-open" type="button" aria-label="打开照片合集"><img loading="lazy" src="${first.thumb}" alt="${group.brand} ${group.model} ${group.type}"></button>
          <div class="thumb-strip">${thumbs}</div>
          <div class="body">
            <div class="eyebrow"><span>${group.brand}</span><span>布艺清洗机</span><span>${group.model}</span></div>
            <p class="carrier">${group.type} <span class="photo-count">${photos.length} 张照片</span></p>
            <p class="analysis-label">设计排版</p><p class="note">${group.note}</p>
            <p class="language">可辨识文字语言：${group.language}</p>
            <div class="meta"><span class="image-size">图片尺寸 4284×5712</span></div>
            <div class="links"><a class="original-link" href="${first.image}" target="_blank">查看原图</a><a class="source-link" hidden>来源页面</a></div>
          </div>
        </article>`;
}

html = html.replace(/<button data-filter-type="brand" data-value="Luwant">Luwant<\/button>/g, '');
html = html.replace(/\s*<article class="card" data-brand="Luwant"[\s\S]*?<\/article>/g, '');
html = html.replace(/\s*<article class="card"[^>]*data-photos="[^"]*images\/imports[\s\S]*?<\/article>/g, '');

if (!html.includes('data-value="EYSin"')) {
  html = html.replace('<button data-filter-type="brand" data-value="Hoover">Hoover</button>', '<button data-filter-type="brand" data-value="Hoover">Hoover</button><button data-filter-type="brand" data-value="EYSin">EYSin</button>');
}
if (!html.includes('data-value="Lubluelu"')) {
  html = html.replace('<button data-filter-type="brand" data-value="PerySmith">PerySmith</button>', '<button data-filter-type="brand" data-value="Lubluelu">Lubluelu</button><button data-filter-type="brand" data-value="PerySmith">PerySmith</button>');
}

html = html.replace('共收录 318 份清洁家电竞品物料、371 张照片', '共收录 322 份清洁家电竞品物料、451 张照片');
html = html.replace('<b>58</b><span>快速入门指南</span>', '<b>60</b><span>快速入门指南</span>');
html = html.replace('<b>26</b><span>铭牌</span>', '<b>28</b><span>铭牌</span>');

const marker = '</section>\n<section class="section"><h2>物料类型口径</h2>';
if (!html.includes(marker)) throw new Error('Grid end marker not found');
html = html.replace(marker, groups.map(card).join('') + marker);
fs.writeFileSync(indexPath, html);
