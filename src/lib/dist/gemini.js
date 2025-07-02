"use strict";
exports.__esModule = true;
exports.getGeminiClient = exports.getRandomGeminiApiKey = void 0;
var generative_ai_1 = require("@google/generative-ai");
function getRandomGeminiApiKey() {
    var apiKeys = process.env.GEMINI_API_KEY;
    if (!apiKeys) {
        return undefined;
    }
    var keys = apiKeys
        .split(',')
        .map(function (key) { return key.trim(); })
        .filter(function (key) { return key; });
    if (keys.length === 0) {
        return undefined;
    }
    var randomIndex = Math.floor(Math.random() * keys.length);
    return keys[randomIndex];
}
exports.getRandomGeminiApiKey = getRandomGeminiApiKey;
function getGeminiClient(apiKey) {
    var key = apiKey || getRandomGeminiApiKey();
    if (!key) {
        throw new Error('GEMINI_API_KEY is not set');
    }
    return new generative_ai_1.GoogleGenerativeAI(key);
}
exports.getGeminiClient = getGeminiClient;
