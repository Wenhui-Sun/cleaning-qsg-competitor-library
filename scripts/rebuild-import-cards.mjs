import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const indexPath = path.join(root, 'dist/index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// One entry is one physical material. Different angles/pages of the same item stay together.
const groups = [
  {
    brand: 'Lubluelu', model: 'H8-B', type: '黄箱', language: '英语',
    files: ['lubluelu-h8-b/IMG_2897.jpg', 'lubluelu-h8-b/IMG_2898.jpg', 'lubluelu-h8-b/IMG_2899.jpg', 'lubluelu-h8-b/IMG_2900.jpg', 'lubluelu-h8-b/IMG_2955.jpg', 'lubluelu-h8-b/IMG_2956.jpg'],
    note: '牛皮纸本色箱体以品牌、H8-B 型号、产品线稿和参数区建立层级；运输标签与不同箱面共同补充包装信息。'
  },
  {
    brand: 'Rowenta', model: 'Clean It IN5020F0', type: '彩箱', language: '英语、法语',
    files: ['lubluelu-h8-b/IMG_2901.jpg', 'rowenta-clean-it/IMG_2902.jpg', 'rowenta-clean-it/IMG_2903.jpg', 'rowenta-clean-it/IMG_2904.jpg', 'rowenta-clean-it/IMG_2905.jpg', 'rowenta-clean-it/IMG_2906.jpg'],
    note: '深蓝底色配合大幅整机图、品牌字标和场景卖点区；正背面、侧面与开箱角度呈现零售包装的信息分工。'
  },
  {
    brand: 'Rowenta', model: 'Clean It 清洁液 250 ml', type: '清洁液', language: '英语、法语',
    files: ['rowenta-clean-it/IMG_2907.jpg', 'rowenta-clean-it/IMG_2908.jpg', 'rowenta-clean-it/IMG_2909.jpg', 'rowenta-clean-it/IMG_2912.jpg', 'rowenta-clean-it/IMG_2913.jpg', 'rowenta-clean-it/IMG_2914.jpg'],
    note: '正面用蓝色信息块突出配方、适用表面和容量，背面及折叠标签集中承载多语种使用与安全说明。'
  },
  {
    brand: 'Rowenta', model: 'Clean It IN5020F0 首次使用折页', type: '快速入门指南', language: '英语、法语',
    files: ['rowenta-clean-it/IMG_2916.jpg', 'rowenta-clean-it/IMG_2917.jpg', 'rowenta-clean-it/IMG_2918.jpg'],
    note: '折页以编号线稿串联安装、使用和清洁动作，封面二维码提供视频入口，展开后形成连续任务路径。'
  },
  {
    brand: 'Rowenta', model: 'Clean It IN50 系列说明书', type: '快速入门指南', language: '英语、法语、德语、西班牙语',
    files: ['rowenta-clean-it/IMG_2926.jpg', 'rowenta-clean-it/IMG_2927.jpg', 'rowenta-clean-it/IMG_2928.jpg', 'rowenta-clean-it/IMG_2929.jpg', 'rowenta-clean-it/IMG_2930.jpg', 'rowenta-clean-it/IMG_2931.jpg', 'rowenta-clean-it/IMG_2932.jpg', 'rowenta-clean-it/IMG_2933.jpg'],
    note: '同一本说明书以产品结构图、步骤线稿和多语种短段落说明装配、加液、操作与维护；封面作为同一实物的辅助页保留。'
  },
  {
    brand: 'EYSin', model: 'C1011', type: '黄箱', language: '英语',
    files: ['eysin-c1011/IMG_2937.jpg', 'eysin-c1011/IMG_2938.jpg', 'eysin-c1011/IMG_2939.jpg', 'eysin-c1011/IMG_2940.jpg'],
    note: '主箱以牛皮纸本色、单色产品线稿、系列名和参数表组织信息；开箱角度补充箱体结构与内装位置。'
  },
  {
    brand: 'EYSin', model: 'C1011 操作说明书', type: '快速入门指南', language: '英语',
    files: ['eysin-c1011/IMG_2941.jpg', 'eysin-c1011/IMG_2942.jpg', 'eysin-c1011/IMG_2943.jpg'],
    note: '同一本说明书通过结构标注、编号图示和 How to use 分区说明首次操作；封面与内页合并为一个物料合集。'
  },
  {
    brand: 'EYSin', model: 'C1011 Wide Brush 配件', type: '黄箱', language: '英语',
    files: ['eysin-c1011/IMG_2946.jpg'],
    note: '配件小箱保持牛皮纸本色，以居中的刷头线稿和黑底名称标签实现快速识别。'
  },
  {
    brand: 'EYSin', model: 'C1011 Shoe Brush 配件', type: '黄箱', language: '英语、越南语',
    files: ['eysin-c1011/IMG_2947.jpg', 'eysin-c1011/IMG_2948.jpg', 'eysin-c1011/IMG_2949.jpg', 'eysin-c1011/IMG_2950.jpg'],
    note: '狭长牛皮纸盒用品牌块、配件名称和线稿确认内容物，侧面供应商标签补充合规信息。'
  },
  {
    brand: 'EYSin', model: 'Deep Cleaning Solution 250 ml', type: '清洁液', language: '英语',
    files: ['eysin-c1011/IMG_2951.jpg', 'eysin-c1011/IMG_2952.jpg'],
    note: '正面以淡蓝色液体背景、品名和容量建立识别，背面密集排列成分、适用范围、用法与警示。'
  },
  {
    brand: 'Lubluelu', model: 'H8-B 清水箱加液标识', type: '快速入门指南', language: '英语',
    files: ['lubluelu-h8-b/IMG_2957.jpg'],
    note: '贴在透明清水箱上的刻度与图标直接提示大小面积对应的水量和清洁液比例，使用时无需翻阅说明书。'
  },
  {
    brand: 'Lubluelu', model: 'H8-B Easy Fill 提示', type: '贴纸', language: '英语',
    files: ['lubluelu-h8-b/IMG_2958.jpg'],
    note: '白色高对比标签贴近加液入口，以倒液图标和短词提示加水位置。'
  },
  {
    brand: 'Lubluelu', model: 'H8-B 污水箱标识', type: '贴纸', language: '英语',
    files: ['lubluelu-h8-b/IMG_2959.jpg'],
    note: '污水箱正面的名称、水滴图标和 MAX 刻度共同标明容器用途与液位上限。'
  },
  {
    brand: 'Lubluelu', model: 'H8-B Lock System 提示', type: '贴纸', language: '英语',
    files: ['lubluelu-h8-b/IMG_2960.jpg'],
    note: '锁形图标与短词紧贴刷头锁止结构，帮助用户理解按键用途。'
  },
  {
    brand: 'Lubluelu', model: 'H8-B 快速操作卡', type: '快速入门指南', language: '英语',
    files: ['lubluelu-h8-b/IMG_2963.jpg'],
    note: '大幅单页用三段编号区域说明附件安装、开机操作和污水箱维护，线稿、箭头与粗体提醒形成清晰阅读顺序。'
  },
  {
    brand: 'Lubluelu', model: 'H8-B 附件收纳步骤标贴', type: '快速入门指南', language: '英语、德语、法语、西班牙语',
    files: ['lubluelu-h8-b/IMG_2964.jpg'],
    note: '机身顶盖标贴用两步线稿和多语种短句说明附件取出与收纳，属于贴在机身上的连续操作指南。'
  },
  {
    brand: 'Lubluelu', model: 'H8-B 操作说明书', type: '快速入门指南', language: '英语',
    files: ['lubluelu-h8-b/IMG_2965.jpg', 'lubluelu-h8-b/IMG_2966.jpg', 'lubluelu-h8-b/IMG_2967.jpg', 'lubluelu-h8-b/IMG_2968.jpg', 'lubluelu-h8-b/IMG_2969.jpg', 'lubluelu-h8-b/IMG_2970.jpg', 'lubluelu-h8-b/IMG_2971.jpg'],
    note: '同一本说明书以内页结构图、装配箭头和操作步骤覆盖附件、软管、水箱与维护；封面作为同一实物的辅助页保留。'
  },
  {
    brand: 'Simplus', model: 'Portable Carpet Cleaner', type: '黄箱', language: '英语',
    files: ['simplus-portable-carpet-cleaner/IMG_2976.jpg', 'simplus-portable-carpet-cleaner/IMG_2977.jpg', 'simplus-portable-carpet-cleaner/IMG_2978.jpg', 'simplus-portable-carpet-cleaner/IMG_2979.jpg'],
    note: '牛皮纸箱以黑色品牌标识、产品线稿、保修信息和参数表构成主要版面；开箱角度补充内装结构。'
  },
  {
    brand: 'Simplus', model: 'Portable Carpet Cleaner 用户手册入口卡', type: '快速入门指南', language: '英语',
    files: ['simplus-portable-carpet-cleaner/IMG_2980.jpg'],
    note: '独立纸卡以大面积二维码作为主视觉，明确引导用户扫码获取对应型号的用户手册。'
  },
  {
    brand: 'Simplus', model: 'Portable Carpet Cleaner 操作说明页', type: '快速入门指南', language: '印度尼西亚语',
    files: ['simplus-portable-carpet-cleaner/IMG_2982.jpg'],
    note: '单页用结构图、按键说明和步骤段落集中呈现产品组成与首次使用方法。'
  },
  {
    brand: 'Simplus', model: 'Portable Carpet Cleaner 清洁液警示', type: '贴纸', language: '英语',
    files: ['simplus-portable-carpet-cleaner/IMG_2984.jpg'],
    note: '污水箱正面的白色警示标签用红色三角符号和编号短句强调清洁液、液位与使用限制。'
  }
];

const escapeAttr = value => String(value)
  .replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

function card(group) {
  const photos = group.files.map(file => {
    const image = `images/imports/${file}`;
    const thumb = `thumbs/imports/${file}`;
    const imagePath = path.join(root, 'dist', image);
    const thumbPath = path.join(root, 'dist', thumb);
    if (!fs.existsSync(imagePath) || !fs.existsSync(thumbPath)) throw new Error(`Missing asset: ${file}`);
    return { image, thumb, note: group.note, language: group.language, size: '优化版（长边 1200px）', source: '' };
  });
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
            <div class="meta"><span class="image-size">图片尺寸 优化版（长边 1200px）</span></div>
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
if (!html.includes('data-value="Simplus"')) {
  html = html.replace('<button data-filter-type="brand" data-value="Tineco">Tineco</button>', '<button data-filter-type="brand" data-value="Simplus">Simplus</button><button data-filter-type="brand" data-value="Tineco">Tineco</button>');
}

// Baseline after removing the two Luwant materials (3 photos): one 黄箱 and one 铭牌.
const baseMaterials = 316;
const basePhotos = 368;
const baseStats = { 彩箱: 83, 黄箱: 100, 快速入门指南: 58, 贴纸: 45, 铭牌: 25, 清洁液: 5 };
const importedPhotoCount = groups.reduce((sum, group) => sum + group.files.length, 0);
const importedStats = groups.reduce((stats, group) => ({ ...stats, [group.type]: (stats[group.type] || 0) + 1 }), {});
const totalMaterials = baseMaterials + groups.length;
const totalPhotos = basePhotos + importedPhotoCount;

html = html.replace(/共收录 \d+ 份清洁家电竞品物料、\d+ 张照片/g, `共收录 ${totalMaterials} 份清洁家电竞品物料、${totalPhotos} 张照片`);
for (const [type, count] of Object.entries(baseStats)) {
  const total = count + (importedStats[type] || 0);
  html = html.replace(new RegExp(`<b>\\d+</b><span>${type}</span>`), `<b>${total}</b><span>${type}</span>`);
}

const marker = '</section>\n<section class="section"><h2>物料类型口径</h2>';
if (!html.includes(marker)) throw new Error('Grid end marker not found');
html = html.replace(marker, groups.map(card).join('') + marker);
fs.writeFileSync(indexPath, html);

process.stdout.write(JSON.stringify({ materials: groups.length, photos: importedPhotoCount, totalMaterials, totalPhotos, importedStats }) + '\n');
