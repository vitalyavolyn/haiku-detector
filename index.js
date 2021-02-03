import { VK } from 'vk-io'
import { getHaiku } from './detector.js'
import { token } from './config.js'

const vk = new VK({ token })

vk.updates.on('message_new', async (ctx) => {
  if (!ctx.hasText) return

  const haiku = getHaiku(ctx.text)
  if (!haiku) return

  const [user] = await vk.api.users.get({ user_ids: ctx.senderId })
  const suffix = `-- ${user.first_name} ${user.last_name}`

  ctx.send(`${haiku}\n\n${suffix}`)
})

vk.updates.start()
