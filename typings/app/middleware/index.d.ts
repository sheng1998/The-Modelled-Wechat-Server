// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHandleError from '../../../app/middleware/handle_error';

declare module 'egg' {
  interface IMiddleware {
    handleError: typeof ExportHandleError;
  }
}
