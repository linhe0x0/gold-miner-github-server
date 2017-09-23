async function handle(ctx, next) {
  try {
    await next()
  } catch(err) {
    const status = err.status || 500
    const message = err.message || '服务器错误'

    ctx.status = status

    ctx.body = {
      message,
    }

    if (status === 500) {
      ctx.app.emit('error', err, ctx)
    }
  }
}

module.exports = handle
