import init, { run, js_response_transform, js_response_transforms_flush, js_key_down, js_key_up } from '../../app/deploy/app_rs.js';

Module['app_rs'] = {
   run,
   init,
   js_response_transform,
   js_response_transforms_flush,
   js_key_down,
   js_key_up,
}