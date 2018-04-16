import * as mongoose from 'mongoose';
import {IUnitModel} from './Unit';
import {IFreeTextUnit} from '../../../../shared/models/units/IFreeTextUnit';

interface IFreeTextUnitModel extends IFreeTextUnit, IUnitModel {
  exportJSON: () => Promise<IFreeTextUnit>;
  toFile: () => String;
}

const freeTextUnitSchema = new mongoose.Schema({
  markdown: {
    type: String,
  }
});

freeTextUnitSchema.methods.toFile = function (): String {
  return this.name + '\n' + this.description + '\n' + this.markdown;
};

export {freeTextUnitSchema, IFreeTextUnitModel};
