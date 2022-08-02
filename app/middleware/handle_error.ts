module.exports = () => async function handleError(ctx, next) {
  try {
    await next();
  } catch (error: any) {
    // 记录错误日志
    ctx.app.emit('error', error, ctx);

    const status = error.status || 500;
    ctx.body = { code: 1, message: error.message };
    if (status === 422) {
      ctx.body.detail = error.errors;
    }
    ctx.status = status;
  }
};
