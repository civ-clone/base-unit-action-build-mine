"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildMine = void 0;
const BuildingMine_1 = require("./Rules/BuildingMine");
const DelayedAction_1 = require("@civ-clone/core-unit/DelayedAction");
const Mine_1 = require("@civ-clone/base-tile-improvement-mine/Mine");
const Moved_1 = require("@civ-clone/core-unit/Rules/Moved");
const MovementCost_1 = require("@civ-clone/core-unit/Rules/MovementCost");
class BuildMine extends DelayedAction_1.default {
    perform() {
        const [moveCost] = this.ruleRegistry()
            .process(MovementCost_1.default, this.unit(), this)
            .sort((a, b) => b - a);
        super.perform(moveCost || 0, () => {
            new Mine_1.default(this.unit().tile());
        }, BuildingMine_1.default);
        this.ruleRegistry().process(Moved_1.default, this.unit(), this);
    }
}
exports.BuildMine = BuildMine;
exports.default = BuildMine;
//# sourceMappingURL=BuildMine.js.map