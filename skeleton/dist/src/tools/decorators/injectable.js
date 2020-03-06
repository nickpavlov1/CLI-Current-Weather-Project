"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Injectable = () => {
    return (target) => {
        // for debugging and tracing injectables only
        // console.log(`${target.name} is now injectable`);
    };
};
