"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.DELETE = exports.PUT = exports.GET = exports.POST = exports.OPTIONS = void 0;
var server_1 = require("next/server");
var gemini_1 = require("@/lib/gemini");
// 域名白名单检查函数
function isAllowedOrigin(request) {
    // 从环境变量获取允许的域名列表
    var allowedOrigins = process.env.ALLOWED_ORIGINS;
    if (!allowedOrigins) {
        // 开发环境允许 localhost
        if (process.env.NODE_ENV === 'development') {
            return true;
        }
        console.warn('ALLOWED_ORIGINS not configured, denying all requests');
        return false;
    }
    // 解析允许的域名（支持多个域名，用逗号分隔）
    var allowedList = allowedOrigins.split(',').map(function (origin) { return origin.trim().toLowerCase(); });
    // 获取请求来源
    var origin = request.headers.get('Origin');
    var referer = request.headers.get('Referer');
    // 检查 Origin 头（优先）
    if (origin) {
        var originLower = origin.toLowerCase();
        if (allowedList.includes(originLower)) {
            return true;
        }
        // 检查是否包含通配符域名
        for (var _i = 0, allowedList_1 = allowedList; _i < allowedList_1.length; _i++) {
            var allowed = allowedList_1[_i];
            if (allowed.startsWith('*.')) {
                var domain = allowed.substring(2);
                if (originLower.endsWith('.' + domain) || originLower === domain) {
                    return true;
                }
            }
        }
    }
    // 如果没有 Origin，检查 Referer
    if (referer) {
        try {
            var refererUrl = new URL(referer);
            var refererOrigin = refererUrl.origin.toLowerCase();
            if (allowedList.includes(refererOrigin)) {
                return true;
            }
            // 检查通配符域名
            for (var _a = 0, allowedList_2 = allowedList; _a < allowedList_2.length; _a++) {
                var allowed = allowedList_2[_a];
                if (allowed.startsWith('*.')) {
                    var domain = allowed.substring(2);
                    if (refererOrigin.endsWith('.' + domain) ||
                        refererOrigin === "https://" + domain ||
                        refererOrigin === "http://" + domain) {
                        return true;
                    }
                }
            }
        }
        catch (error) {
            console.error('Invalid referer URL:', referer, error);
        }
    }
    return false;
}
// 获取 CORS 头函数
function getCorsHeaders(request) {
    var origin = request.headers.get('Origin');
    // 如果来源在白名单中，返回具体的 Origin
    if (origin && isAllowedOrigin(request)) {
        return {
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Credentials': 'true'
        };
    }
    // 开发环境允许所有来源
    if (process.env.NODE_ENV === 'development') {
        return {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        };
    }
    // 否则返回限制性的头
    return {
        'Access-Control-Allow-Origin': 'null',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    };
}
// 错误响应创建函数
function createErrorResponse(message, status) {
    if (status === void 0) { status = 400; }
    return server_1.NextResponse.json({
        error: {
            message: message,
            status: status
        }
    }, {
        status: status,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': process.env.NODE_ENV === 'development' ? '*' : 'null',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    });
}
// 简单的频率限制检查（基于 IP 和时间窗口）
var rateLimitMap = new Map();
function checkRateLimit(clientIP) {
    try {
        var now = Date.now();
        var windowStart = Math.floor(now / 60000) * 60000; // 1分钟窗口
        var key = clientIP;
        var current = rateLimitMap.get(key);
        if (current) {
            if (current.windowStart === windowStart && current.count >= 20) {
                return false; // 超过限制（每分钟20次）
            }
            if (current.windowStart === windowStart) {
                rateLimitMap.set(key, {
                    windowStart: windowStart,
                    count: current.count + 1
                });
            }
            else {
                rateLimitMap.set(key, {
                    windowStart: windowStart,
                    count: 1
                });
            }
        }
        else {
            rateLimitMap.set(key, {
                windowStart: windowStart,
                count: 1
            });
        }
        // 清理过期的记录
        if (Math.random() < 0.1) { // 10% 概率清理
            for (var _i = 0, _a = rateLimitMap.entries(); _i < _a.length; _i++) {
                var _b = _a[_i], k = _b[0], v = _b[1];
                if (now - v.windowStart > 120000) { // 清理2分钟前的记录
                    rateLimitMap["delete"](k);
                }
            }
        }
        return true;
    }
    catch (error) {
        console.error('Rate limit check failed:', error);
        return true; // 如果检查失败，允许请求通过
    }
}
// CORS 预检请求处理
function OPTIONS(request) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new server_1.NextResponse(null, {
                    status: 200,
                    headers: __assign(__assign({}, getCorsHeaders(request)), { 'Access-Control-Max-Age': '86400' })
                })];
        });
    });
}
exports.OPTIONS = OPTIONS;
// POST 请求处理 - LLM 聊天交互
function POST(request) {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function () {
        var clientIP, apiKey, apiEndpoint, requestBody, geminiRequestBody, geminiResponse, responseData, error_1;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _f.trys.push([0, 4, , 5]);
                    // 域名白名单检查
                    if (!isAllowedOrigin(request)) {
                        return [2 /*return*/, createErrorResponse('Access denied: Origin not allowed', 403)];
                    }
                    clientIP = request.headers.get('CF-Connecting-IP') ||
                        request.headers.get('X-Forwarded-For') ||
                        request.headers.get('X-Real-IP') ||
                        'unknown';
                    if (!checkRateLimit(clientIP)) {
                        return [2 /*return*/, createErrorResponse('Rate limit exceeded', 429)];
                    }
                    apiKey = gemini_1.getRandomGeminiApiKey();
                    if (!apiKey) {
                        return [2 /*return*/, createErrorResponse('LLM API key not configured', 500)];
                    }
                    apiEndpoint = process.env.API_ENDPOINT ||
                        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
                    return [4 /*yield*/, request.json()
                        // 验证请求体格式
                    ];
                case 1:
                    requestBody = _f.sent();
                    // 验证请求体格式
                    if (!requestBody.contents || !Array.isArray(requestBody.contents)) {
                        return [2 /*return*/, createErrorResponse('Invalid request format: contents array required', 400)];
                    }
                    // 验证 contents 数组不为空
                    if (requestBody.contents.length === 0) {
                        return [2 /*return*/, createErrorResponse('Invalid request format: contents array cannot be empty', 400)];
                    }
                    geminiRequestBody = {
                        contents: requestBody.contents,
                        generationConfig: __assign({ maxOutputTokens: ((_a = requestBody.generationConfig) === null || _a === void 0 ? void 0 : _a.maxOutputTokens) || 16000, temperature: ((_b = requestBody.generationConfig) === null || _b === void 0 ? void 0 : _b.temperature) || 0.8, topP: ((_c = requestBody.generationConfig) === null || _c === void 0 ? void 0 : _c.topP) || 0.9, topK: ((_d = requestBody.generationConfig) === null || _d === void 0 ? void 0 : _d.topK) || 40 }, requestBody.generationConfig),
                        safetySettings: requestBody.safetySettings || [
                            {
                                category: "HARM_CATEGORY_HARASSMENT",
                                threshold: "BLOCK_MEDIUM_AND_ABOVE"
                            },
                            {
                                category: "HARM_CATEGORY_HATE_SPEECH",
                                threshold: "BLOCK_MEDIUM_AND_ABOVE"
                            },
                            {
                                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                                threshold: "BLOCK_MEDIUM_AND_ABOVE"
                            },
                            {
                                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                                threshold: "BLOCK_MEDIUM_AND_ABOVE"
                            }
                        ]
                    };
                    return [4 /*yield*/, fetch(apiEndpoint + "?key=" + apiKey, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'User-Agent': 'JapaneseName-Generator/1.0'
                            },
                            body: JSON.stringify(geminiRequestBody)
                        })
                        // 获取响应数据
                    ];
                case 2:
                    geminiResponse = _f.sent();
                    return [4 /*yield*/, geminiResponse.json()
                        // 检查 API 响应状态
                    ];
                case 3:
                    responseData = _f.sent();
                    // 检查 API 响应状态
                    if (!geminiResponse.ok) {
                        console.error('Gemini API Error:', responseData);
                        return [2 /*return*/, createErrorResponse(((_e = responseData.error) === null || _e === void 0 ? void 0 : _e.message) || 'LLM API request failed', geminiResponse.status)];
                    }
                    // 返回成功响应
                    return [2 /*return*/, server_1.NextResponse.json(responseData, {
                            status: 200,
                            headers: __assign(__assign({ 'Content-Type': 'application/json' }, getCorsHeaders(request)), { 'Cache-Control': 'no-cache' })
                        })];
                case 4:
                    error_1 = _f.sent();
                    console.error('Chat API Error:', error_1);
                    return [2 /*return*/, createErrorResponse('Internal server error', 500)];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.POST = POST;
// 不支持其他 HTTP 方法
function GET() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, createErrorResponse('Method not allowed. Use POST to send chat messages.', 405)];
        });
    });
}
exports.GET = GET;
function PUT() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, createErrorResponse('Method not allowed. Use POST to send chat messages.', 405)];
        });
    });
}
exports.PUT = PUT;
function DELETE() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, createErrorResponse('Method not allowed. Use POST to send chat messages.', 405)];
        });
    });
}
exports.DELETE = DELETE;
