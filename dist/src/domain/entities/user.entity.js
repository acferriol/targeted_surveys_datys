"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userEntity = void 0;
class userEntity {
    constructor(provincia, municipio, sex, age, educational_level) {
        this.provincia = provincia;
        this.municipio = municipio;
        this.sex = sex;
        this.age = age;
        this.educational_level = educational_level;
    }
    isValid() {
        var _a, _b, _c, _d;
        return (this.provincia !== null && ((_a = this.provincia) === null || _a === void 0 ? void 0 : _a.length) > 0 &&
            this.municipio !== null && ((_b = this.municipio) === null || _b === void 0 ? void 0 : _b.length) > 0 &&
            this.sex !== null && ((_c = this.sex) === null || _c === void 0 ? void 0 : _c.length) > 0 &&
            this.age !== null && this.age > 0 &&
            this.educational_level !== null && ((_d = this.educational_level) === null || _d === void 0 ? void 0 : _d.length) > 0);
    }
}
exports.userEntity = userEntity;
//# sourceMappingURL=user.entity.js.map