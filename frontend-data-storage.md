# 纯前端日本姓氏数据库存储方案

## 概述

由于是纯前端Next.js项目，数据库需要采用静态数据文件的方式存储，通过构建时预处理和运行时动态加载来实现高效的数据访问。

## 存储方案对比

### 方案一：静态JSON文件（推荐）

#### 优点
- 📦 **部署简单**：直接打包到静态资源
- ⚡ **访问快速**：CDN缓存，首次加载后本地缓存
- 🔧 **开发友好**：直接编辑，版本控制友好
- 💰 **成本低**：无需数据库服务器

#### 缺点
- 📈 **文件大小**：所有数据打包到应用中
- 🔄 **更新复杂**：需要重新部署

#### 实现方式

```typescript
// data/surnames/index.ts
export interface SurnameData {
  basic: SurnameRecord[];      // 基础信息
  detailed: SurnameDetail[];   // 详细信息
  historical: HistoricalData[]; // 历史数据
  statistics: StatisticsData;   // 统计数据
}

// 分片加载策略
export const surnameDataLoader = {
  // 核心数据（首次加载）
  async loadCore(): Promise<CoreSurnameData> {
    const { default: coreData } = await import('./core-surnames.json');
    return coreData;
  },
  
  // 详细数据（按需加载）
  async loadDetails(surnameId: string): Promise<DetailedSurnameData> {
    const { default: detailData } = await import(`./details/${surnameId}.json`);
    return detailData;
  },
  
  // 历史数据（按需加载）
  async loadHistorical(): Promise<HistoricalData[]> {
    const { default: historicalData } = await import('./historical.json');
    return historicalData;
  }
};
```

### 方案二：IndexedDB本地数据库

#### 优点
- 🗄️ **大容量存储**：可存储大量结构化数据
- ⚡ **查询性能好**：支持索引和复杂查询
- 🔄 **增量更新**：支持部分数据更新

#### 缺点
- 🔧 **实现复杂**：需要数据同步逻辑
- 🌐 **兼容性**：部分老浏览器支持有限

#### 实现方式

```typescript
// lib/database/indexeddb.ts
import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface SurnameDB extends DBSchema {
  surnames: {
    key: string;
    value: SurnameRecord;
    indexes: { 
      'by-origin': string;
      'by-frequency': number;
      'by-region': string;
    };
  };
  names: {
    key: string;
    value: NameRecord;
    indexes: { 
      'by-gender': string;
      'by-era': string;
    };
  };
}

class SurnameDatabase {
  private db: IDBPDatabase<SurnameDB> | null = null;

  async init() {
    this.db = await openDB<SurnameDB>('surname-db', 1, {
      upgrade(db) {
        // 创建姓氏存储
        const surnameStore = db.createObjectStore('surnames', {
          keyPath: 'id'
        });
        surnameStore.createIndex('by-origin', 'origin');
        surnameStore.createIndex('by-frequency', 'frequency');
        surnameStore.createIndex('by-region', 'strongholds', { multiEntry: true });

        // 创建名字存储
        const nameStore = db.createObjectStore('names', {
          keyPath: 'id'
        });
        nameStore.createIndex('by-gender', 'gender');
        nameStore.createIndex('by-era', 'era');
      },
    });
  }

  async loadSurnames(): Promise<SurnameRecord[]> {
    if (!this.db) await this.init();
    return this.db!.getAll('surnames');
  }

  async searchSurnamesByOrigin(origin: string): Promise<SurnameRecord[]> {
    if (!this.db) await this.init();
    return this.db!.getAllFromIndex('surnames', 'by-origin', origin);
  }

  async updateSurnameData(data: SurnameRecord[]): Promise<void> {
    if (!this.db) await this.init();
    const tx = this.db!.transaction('surnames', 'readwrite');
    
    await Promise.all([
      ...data.map(surname => tx.store.put(surname)),
      tx.done
    ]);
  }
}

export const surnameDB = new SurnameDatabase();
```

### 方案三：混合存储策略（最佳方案）

结合静态JSON和动态加载，实现最优的性能和用户体验：

```typescript
// lib/data-manager.ts
interface DataManager {
  // 核心数据（静态打包）
  coreData: CoreSurnameData;
  
  // 缓存层
  cache: Map<string, any>;
  
  // 加载策略
  loadingStrategy: 'static' | 'dynamic' | 'hybrid';
}

class JapaneseSurnameDataManager {
  private cache = new Map<string, any>();
  private coreData: CoreSurnameData | null = null;

  constructor() {
    this.loadCoreData();
  }

  // 加载核心数据（应用启动时）
  private async loadCoreData() {
    if (this.coreData) return this.coreData;
    
    try {
      const { default: data } = await import('../data/core-surnames.json');
      this.coreData = data;
      return data;
    } catch (error) {
      console.error('Failed to load core surname data:', error);
      return null;
    }
  }

  // 获取基础姓氏列表
  async getBasicSurnames(): Promise<BasicSurnameInfo[]> {
    const coreData = await this.loadCoreData();
    return coreData?.basic || [];
  }

  // 获取姓氏详细信息（按需加载）
  async getSurnameDetails(surnameId: string): Promise<DetailedSurnameData | null> {
    // 先检查缓存
    const cacheKey = `surname-detail-${surnameId}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      // 动态导入详细数据
      const { default: detailData } = await import(`../data/surnames/${surnameId}.json`);
      
      // 缓存数据
      this.cache.set(cacheKey, detailData);
      return detailData;
    } catch (error) {
      console.error(`Failed to load details for surname ${surnameId}:`, error);
      return null;
    }
  }

  // 搜索姓氏
  async searchSurnames(query: SearchQuery): Promise<SurnameRecord[]> {
    const coreData = await this.loadCoreData();
    if (!coreData) return [];

    return coreData.basic.filter(surname => {
      if (query.kanji && surname.kanji.includes(query.kanji)) return true;
      if (query.reading && surname.hiragana.includes(query.reading)) return true;
      if (query.origin && surname.origin === query.origin) return true;
      return false;
    });
  }

  // 获取统计数据
  async getStatistics(): Promise<StatisticsData> {
    const cacheKey = 'statistics';
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const { default: stats } = await import('../data/statistics.json');
      this.cache.set(cacheKey, stats);
      return stats;
    } catch (error) {
      console.error('Failed to load statistics:', error);
      return { totalSurnames: 0, totalNames: 0, lastUpdated: new Date() };
    }
  }
}

export const dataManager = new JapaneseSurnameDataManager();
```

## 文件结构设计

```
public/
├── data/
│   ├── core-surnames.json          # 核心姓氏数据（约100KB）
│   ├── statistics.json             # 统计数据
│   ├── surnames/                   # 姓氏详细数据目录
│   │   ├── sato.json              # 佐藤姓详细信息
│   │   ├── suzuki.json            # 鈴木姓详细信息
│   │   └── ...
│   ├── names/                      # 名字数据目录
│   │   ├── male-names.json        # 男性名字
│   │   ├── female-names.json      # 女性名字
│   │   └── unisex-names.json      # 中性名字
│   ├── historical/                 # 历史数据
│   │   ├── clans.json             # 氏族数据
│   │   ├── periods.json           # 历史时期
│   │   └── figures.json           # 历史人物
│   └── regions/                    # 地域数据
│       ├── tohoku.json            # 东北地方
│       ├── kanto.json             # 关东地方
│       └── ...

src/
├── lib/
│   ├── data-manager.ts            # 数据管理器
│   ├── cache-manager.ts           # 缓存管理
│   └── search-engine.ts           # 搜索引擎
└── types/
    └── surname-types.ts           # 类型定义
```

## 数据压缩优化

### 1. JSON压缩

```typescript
// scripts/compress-data.ts
import { gzipSync } from 'zlib';
import { writeFileSync } from 'fs';

function compressDataFiles() {
  const files = [
    'public/data/core-surnames.json',
    'public/data/statistics.json'
  ];

  files.forEach(file => {
    const data = require(file);
    const compressed = gzipSync(JSON.stringify(data));
    writeFileSync(file + '.gz', compressed);
  });
}
```

### 2. 分片策略

```typescript
// 按频率分片
const coreData = {
  tier1: surnames.filter(s => s.ranking <= 50),    // 前50大姓
  tier2: surnames.filter(s => s.ranking <= 200),   // 前200大姓
  tier3: surnames.filter(s => s.ranking <= 1000),  // 前1000大姓
};

// 按来源分片
const dataByOrigin = {
  geographic: surnames.filter(s => s.origin === 'geographic'),
  occupational: surnames.filter(s => s.origin === 'occupational'),
  clan: surnames.filter(s => s.origin === 'clan'),
  // ...
};
```

## 缓存策略

### 1. 浏览器缓存

```typescript
// lib/cache-manager.ts
class CacheManager {
  private static readonly CACHE_VERSION = '1.0.0';
  private static readonly CACHE_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7天

  static getCacheKey(key: string): string {
    return `japanese-names-${this.CACHE_VERSION}-${key}`;
  }

  static set(key: string, data: any): void {
    const cacheData = {
      data,
      timestamp: Date.now(),
      version: this.CACHE_VERSION
    };
    
    try {
      localStorage.setItem(this.getCacheKey(key), JSON.stringify(cacheData));
    } catch (error) {
      console.warn('Failed to cache data:', error);
    }
  }

  static get<T>(key: string): T | null {
    try {
      const cached = localStorage.getItem(this.getCacheKey(key));
      if (!cached) return null;

      const { data, timestamp, version } = JSON.parse(cached);
      
      // 检查版本和过期时间
      if (version !== this.CACHE_VERSION || 
          Date.now() - timestamp > this.CACHE_EXPIRY) {
        this.remove(key);
        return null;
      }

      return data;
    } catch (error) {
      console.warn('Failed to read cache:', error);
      return null;
    }
  }

  static remove(key: string): void {
    localStorage.removeItem(this.getCacheKey(key));
  }

  static clear(): void {
    Object.keys(localStorage)
      .filter(key => key.startsWith(`japanese-names-${this.CACHE_VERSION}`))
      .forEach(key => localStorage.removeItem(key));
  }
}
```

### 2. Service Worker缓存

```typescript
// public/sw.js
const CACHE_NAME = 'japanese-names-v1';
const DATA_CACHE_NAME = 'japanese-names-data-v1';

const urlsToCache = [
  '/',
  '/data/core-surnames.json',
  '/data/statistics.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  if (event.request.url.includes('/data/')) {
    event.respondWith(
      caches.open(DATA_CACHE_NAME)
        .then(cache => {
          return cache.match(event.request)
            .then(response => {
              if (response) {
                return response;
              }
              
              return fetch(event.request)
                .then(fetchResponse => {
                  cache.put(event.request, fetchResponse.clone());
                  return fetchResponse;
                });
            });
        })
    );
  }
});
```

## 使用示例

```typescript
// components/SurnameSelector.tsx
import { useEffect, useState } from 'react';
import { dataManager } from '@/lib/data-manager';

export function SurnameSelector() {
  const [surnames, setSurnames] = useState<BasicSurnameInfo[]>([]);
  const [selectedSurname, setSelectedSurname] = useState<string>('');
  const [surnameDetails, setSurnameDetails] = useState<DetailedSurnameData | null>(null);

  useEffect(() => {
    // 加载基础姓氏列表
    dataManager.getBasicSurnames().then(setSurnames);
  }, []);

  useEffect(() => {
    if (selectedSurname) {
      // 按需加载详细信息
      dataManager.getSurnameDetails(selectedSurname).then(setSurnameDetails);
    }
  }, [selectedSurname]);

  return (
    <div>
      <select 
        value={selectedSurname} 
        onChange={(e) => setSelectedSurname(e.target.value)}
      >
        <option value="">选择姓氏</option>
        {surnames.map(surname => (
          <option key={surname.id} value={surname.id}>
            {surname.kanji} ({surname.hiragana})
          </option>
        ))}
      </select>

      {surnameDetails && (
        <div className="mt-4">
          <h3>{surnameDetails.kanji}</h3>
          <p>来源：{surnameDetails.etymology}</p>
          <p>含义：{surnameDetails.meaning}</p>
          <p>排名：{surnameDetails.ranking}</p>
        </div>
      )}
    </div>
  );
}
```

## 数据更新策略

```typescript
// lib/data-updater.ts
class DataUpdater {
  static async checkForUpdates(): Promise<boolean> {
    try {
      const response = await fetch('/api/data-version');
      const { version, lastUpdated } = await response.json();
      
      const localVersion = localStorage.getItem('data-version');
      return version !== localVersion;
    } catch (error) {
      console.error('Failed to check for updates:', error);
      return false;
    }
  }

  static async updateData(): Promise<void> {
    // 清除缓存
    CacheManager.clear();
    
    // 重新加载核心数据
    await dataManager.loadCoreData();
    
    // 更新版本号
    const response = await fetch('/api/data-version');
    const { version } = await response.json();
    localStorage.setItem('data-version', version);
  }
}
```

## 推荐方案

对于你的纯前端日本取名项目，我推荐使用**混合存储策略**：

1. **核心数据**：静态JSON文件打包到应用中
2. **详细数据**：按需动态加载
3. **缓存层**：浏览器LocalStorage + Service Worker
4. **压缩优化**：Gzip压缩 + 数据分片

这样既保证了首次加载速度，又提供了良好的用户体验和可维护性。 