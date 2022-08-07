module.exports = () => async function handleError(ctx, next) {
  try {
    await next();
  } catch (error) {
    // 记录错误日志
    ctx.app.emit('error', error, ctx);

    const status = error.status || 500;
    ctx.body = {
      code: error.code === undefined ? 1 : error.code,
      message: error.message,
    };
    if (status === 422) {
      ctx.body.detail = error.errors;
    }
    ctx.status = status;
  }
};
