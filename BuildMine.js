"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildMine = void 0;
const Moved_1 = require("@civ-clone/core-unit/Rules/Moved");
const MovementCost_1 = require("@civ-clone/core-unit/Rules/MovementCost");
const DelayedAction_1 = require("@civ-clone/core-unit/DelayedAction");
const Mine_1 = require("@civ-clone/base-tile-improvement-mine/Mine");
class BuildMine extends DelayedAction_1.default {
    perform() {
        const [moveCost,] = this.ruleRegistry()
            .process(MovementCost_1.MovementCost, this.unit(), this)
            .sort((a, b) => b - a);
        super.perform(moveCost || 0, () => {
            new Mine_1.default(this.unit().tile());
        });
        this.ruleRegistry().process(Moved_1.Moved, this.unit(), this);
    }
}
exports.BuildMine = BuildMine;
exports.default = BuildMine;
//# sourceMappingURL=BuildMine.js.map