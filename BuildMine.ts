import { Moved, IMovedRegistry } from '@civ-clone/core-unit/Rules/Moved';
import {
  MovementCost,
  IMovementCostRegistry,
} from '@civ-clone/core-unit/Rules/MovementCost';
import DelayedAction from '@civ-clone/core-unit/DelayedAction';
import Mine from '@civ-clone/base-tile-improvement-mine/Mine';

export class BuildMine extends DelayedAction {
  perform(): void {
    const [
      moveCost,
    ]: number[] = (this.ruleRegistry() as IMovementCostRegistry)
      .process(MovementCost, this.unit(), this)
      .sort((a: number, b: number): number => b - a);

    super.perform(moveCost || 0, (): void => {
      new Mine(this.unit().tile());
    });

    (this.ruleRegistry() as IMovedRegistry).process(Moved, this.unit(), this);
  }
}

export default BuildMine;
