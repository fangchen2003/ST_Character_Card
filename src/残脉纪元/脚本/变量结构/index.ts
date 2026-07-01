import { registerMvuSchema } from 'https://testingcf.jsdelivr.net/gh/StageDog/tavern_resource/dist/util/mvu_zod.js';
import { Schema } from './schema';

$(() => {
  registerMvuSchema(Schema);

  void (async () => {
    await waitGlobalInitialized('Mvu');
    eventOn(Mvu.events.VARIABLE_UPDATE_ENDED, (variables: typeof Schema) => {
      _.update(variables, 'stat_data.主角.物品栏', (data) => _.pickBy(data, ({ 数量 }) => 数量 > 0));
    });
  })();
});
