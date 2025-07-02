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
    var allowedOrigins = process.env.ALLOWED_ORIGINS;
    if (!allowedOrigins) {
        if (process.env.NODE_ENV === 'development') {
            return true;
        }
        console.warn('ALLOWED_ORIGINS not configured, denying all requests');
        return false;
    }
    var allowedList = allowedOrigins.split(',').map(function (origin) { return origin.trim().toLowerCase(); });
    var origin = request.headers.get('Origin');
    var referer = request.headers.get('Referer');
    if (origin) {
        var originLower = origin.toLowerCase();
        if (allowedList.includes(originLower)) {
            return true;
        }
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
    if (referer) {
        try {
            var refererUrl = new URL(referer);
            var refererOrigin = refererUrl.origin.toLowerCase();
            if (allowedList.includes(refererOrigin)) {
                return true;
            }
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
    if (origin && isAllowedOrigin(request)) {
        return {
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Credentials': 'true'
        };
    }
    if (process.env.NODE_ENV === 'development') {
        return {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        };
    }
    return {
        'Access-Control-Allow-Origin': 'null',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    };
}
// 错误响应创建函数
function createErrorResponse(message, status, request) {
    if (status === void 0) { status = 400; }
    var headers = request ? getCorsHeaders(request) : {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': process.env.NODE_ENV === 'development' ? '*' : 'null',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    };
    return server_1.NextResponse.json({
        error: {
            message: message,
            status: status
        }
    }, {
        status: status,
        headers: __assign(__assign({}, headers), { 'Content-Type': 'application/json' })
    });
}
// 获取用户语言偏好
function getUserLocale(request) {
    // 首先检查URL参数
    var url = new URL(request.url);
    var localeParam = url.searchParams.get('locale');
    if (localeParam && ['zh', 'en'].includes(localeParam)) {
        return localeParam;
    }
    // 检查Accept-Language头
    var acceptLanguage = request.headers.get('Accept-Language');
    if (acceptLanguage) {
        if (acceptLanguage.includes('zh'))
            return 'zh';
        if (acceptLanguage.includes('en'))
            return 'en';
    }
    // 默认返回中文
    return 'zh';
}
// 获取本地化的家纹设计提示词
function getLocalizedPrompt(name, meaning, culturalBackground, personalityMatch, locale) {
    if (locale === 'en') {
        return "As a professional Japanese family crest (Kamon) designer, please design a traditional Japanese family crest based on the following information for the name \"" + name + "\":\n\nName Information:\n- Name: " + name + "\n- Meaning: " + meaning + "\n- Cultural Background: " + culturalBackground + "\n- Personality Match: " + personalityMatch + "\n\nDesign Requirements:\n1. **Style**: Traditional Japanese family crest, circular badge, black and white, simple lines.\n2. **Core**: Incorporate symbolic elements that reflect the name's meaning, cultural background, and personality.\n3. **Composition**: The design should be harmonious and balanced, embodying Japanese aesthetics.\n4. **Image**: Generate a high-resolution image with white background and black crest.\n5. **Design Description**: Provide a concise 50-100 word explanation in English, explaining the design concept, symbolic meaning, and connection to the name.\n\nPlease provide both the generated image and design description text in your response.";
    }
    else {
        return "\u4F5C\u4E3A\u4E00\u4F4D\u4E13\u4E1A\u7684\u65E5\u672C\u5BB6\u7EB9\u8BBE\u8BA1\u5E08\uFF0C\u8BF7\u57FA\u4E8E\u4EE5\u4E0B\u4FE1\u606F\u4E3A\u540D\u5B57\"" + name + "\"\u8BBE\u8BA1\u4E00\u4E2A\u4F20\u7EDF\u7684\u65E5\u672C\u5BB6\u7EB9\uFF08\u5BB6\u7D0B/Kamon\uFF09\uFF1A\n\n\u540D\u5B57\u4FE1\u606F\uFF1A\n- \u540D\u5B57\uFF1A" + name + "\n- \u542B\u4E49\uFF1A" + meaning + "\n- \u6587\u5316\u80CC\u666F\uFF1A" + culturalBackground + "\n- \u6027\u683C\u5339\u914D\uFF1A" + personalityMatch + "\n\n\u8BBE\u8BA1\u8981\u6C42:\n1. **\u98CE\u683C**: \u4F20\u7EDF\u7684\u65E5\u672C\u5BB6\u7EB9\uFF0C\u5706\u5F62\u5FBD\u7AE0\uFF0C\u9ED1\u767D\u5206\u660E\uFF0C\u7EBF\u6761\u7B80\u6D01\u3002\n2. **\u6838\u5FC3**: \u878D\u5165\u53CD\u6620\u540D\u5B57\u542B\u4E49\u3001\u6587\u5316\u80CC\u666F\u548C\u6027\u683C\u7684\u8C61\u5F81\u6027\u5143\u7D20\u3002\n3. **\u6784\u56FE**: \u8BBE\u8BA1\u5E94\u548C\u8C10\u5E73\u8861\uFF0C\u4F53\u73B0\u65E5\u672C\u7F8E\u5B66\u3002\n4. **\u56FE\u50CF**: \u751F\u6210\u4E00\u5F20\u9AD8\u5206\u8FA8\u7387\u7684\u56FE\u50CF\uFF0C\u767D\u8272\u80CC\u666F\uFF0C\u5BB6\u7EB9\u4E3A\u9ED1\u8272\u3002\n5. **\u8BBE\u8BA1\u8BF4\u660E**: \u63D0\u4F9B\u4E00\u6BB550-100\u5B57\u7684\u7B80\u6D01\u4E2D\u6587\u8BF4\u660E\uFF0C\u89E3\u91CA\u5BB6\u7EB9\u7684\u8BBE\u8BA1\u7406\u5FF5\u3001\u8C61\u5F81\u610F\u4E49\u4EE5\u53CA\u4E0E\u540D\u5B57\u7684\u5173\u8054\u3002\n\n\u8BF7\u5728\u54CD\u5E94\u4E2D\u540C\u65F6\u63D0\u4F9B\u751F\u6210\u7684\u56FE\u50CF\u548C\u8BBE\u8BA1\u8BF4\u660E\u6587\u672C\u3002";
    }
}
function OPTIONS(request) {
    return __awaiter(this, void 0, void 0, function () {
        var corsHeaders;
        return __generator(this, function (_a) {
            corsHeaders = getCorsHeaders(request);
            return [2 /*return*/, new server_1.NextResponse(null, {
                    status: 200,
                    headers: corsHeaders
                })];
        });
    });
}
exports.OPTIONS = OPTIONS;
function POST(request) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var body, name, meaning, culturalBackground, personalityMatch, locale, geminiApiKey, userLocale, designPrompt, geminiResponse, errorText, geminiData, parts, imagePart, textPart, finalSvg, dataUrl, explanation, svgContent, svgMatch, svgBase64, corsHeaders, error_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 6, , 7]);
                    // 域名白名单检查
                    if (!isAllowedOrigin(request)) {
                        console.warn('Request denied - origin not in whitelist');
                        return [2 /*return*/, createErrorResponse('Access denied', 403, request)];
                    }
                    return [4 /*yield*/, request.json()];
                case 1:
                    body = _d.sent();
                    name = body.name, meaning = body.meaning, culturalBackground = body.culturalBackground, personalityMatch = body.personalityMatch, locale = body.locale;
                    if (!name) {
                        return [2 /*return*/, createErrorResponse('Name is required', 400, request)];
                    }
                    geminiApiKey = gemini_1.getRandomGeminiApiKey();
                    if (!geminiApiKey) {
                        console.error('Gemini API key not configured');
                        return [2 /*return*/, createErrorResponse('AI service not configured', 500, request)];
                    }
                    userLocale = locale || getUserLocale(request);
                    designPrompt = getLocalizedPrompt(name, meaning, culturalBackground, personalityMatch, userLocale);
                    return [4 /*yield*/, fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-image-generation:generateContent?key=" + geminiApiKey, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                contents: [{
                                        parts: [{
                                                text: designPrompt
                                            }]
                                    }],
                                generationConfig: {
                                    responseModalities: ["TEXT", "IMAGE"]
                                }
                            })
                        })];
                case 2:
                    geminiResponse = _d.sent();
                    if (!!geminiResponse.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, geminiResponse.text()];
                case 3:
                    errorText = _d.sent();
                    console.error('Gemini API error:', geminiResponse.status, errorText);
                    return [2 /*return*/, createErrorResponse('Failed to generate family crest design', 500, request)];
                case 4: return [4 /*yield*/, geminiResponse.json()];
                case 5:
                    geminiData = _d.sent();
                    parts = ((_c = (_b = (_a = geminiData.candidates) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.content) === null || _c === void 0 ? void 0 : _c.parts) || [];
                    imagePart = parts.find(function (part) { return part.inlineData; });
                    textPart = parts.find(function (part) { return part.text; });
                    finalSvg = '';
                    dataUrl = '';
                    explanation = '';
                    if (imagePart && imagePart.inlineData) {
                        dataUrl = "data:" + imagePart.inlineData.mimeType + ";base64," + imagePart.inlineData.data;
                    }
                    else {
                        svgContent = (textPart === null || textPart === void 0 ? void 0 : textPart.text) || '';
                        svgMatch = svgContent.match(/<svg[\s\S]*?<\/svg>/i);
                        finalSvg = svgMatch ? svgMatch[0] : '';
                        if (!finalSvg) {
                            finalSvg = "<svg width=\"512\" height=\"512\" viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\">\n          <circle cx=\"256\" cy=\"256\" r=\"200\" fill=\"none\" stroke=\"black\" stroke-width=\"8\"/>\n          <circle cx=\"256\" cy=\"256\" r=\"120\" fill=\"none\" stroke=\"black\" stroke-width=\"6\"/>\n          <circle cx=\"256\" cy=\"256\" r=\"60\" fill=\"none\" stroke=\"black\" stroke-width=\"4\"/>\n          <text x=\"256\" y=\"276\" text-anchor=\"middle\" font-family=\"serif\" font-size=\"24\" fill=\"black\">" + name.charAt(0) + "</text>\n        </svg>";
                        }
                        // 确保SVG有正确的尺寸
                        if (!finalSvg.includes('width=') || !finalSvg.includes('height=')) {
                            finalSvg = finalSvg.replace('<svg', '<svg width="512" height="512"');
                        }
                        svgBase64 = Buffer.from(finalSvg).toString('base64');
                        dataUrl = "data:image/svg+xml;base64," + svgBase64;
                    }
                    if (textPart && textPart.text) {
                        explanation = textPart.text;
                    }
                    corsHeaders = getCorsHeaders(request);
                    return [2 /*return*/, server_1.NextResponse.json({
                            success: true,
                            image: dataUrl,
                            prompt: designPrompt,
                            explanation: explanation,
                            svg: finalSvg,
                            text: (textPart === null || textPart === void 0 ? void 0 : textPart.text) || '',
                            locale: userLocale // 返回使用的语言
                        }, {
                            status: 200,
                            headers: __assign(__assign({}, corsHeaders), { 'Content-Type': 'application/json' })
                        })];
                case 6:
                    error_1 = _d.sent();
                    console.error('Family crest generation error:', error_1);
                    return [2 /*return*/, createErrorResponse(error_1 instanceof Error ? error_1.message : 'Internal server error', 500, request)];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.POST = POST;
// 不支持的方法
function GET() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, createErrorResponse('Method not allowed', 405)];
        });
    });
}
exports.GET = GET;
function PUT() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, createErrorResponse('Method not allowed', 405)];
        });
    });
}
exports.PUT = PUT;
function DELETE() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, createErrorResponse('Method not allowed', 405)];
        });
    });
}
exports.DELETE = DELETE;
