"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogError = exports.LogWarning = exports.LogInfo = exports.LogSuccess = void 0;
const LogSuccess = (msg) => {
    console.log(`Success: ${msg}`);
};
exports.LogSuccess = LogSuccess;
const LogInfo = (msg) => {
    console.log(`Info: ${msg}`);
};
exports.LogInfo = LogInfo;
const LogWarning = (msg) => {
    console.log(`Warning: ${msg}`);
};
exports.LogWarning = LogWarning;
const LogError = (msg) => {
    console.log(`Error: ${msg}`);
};
exports.LogError = LogError;
//# sourceMappingURL=logger.js.map