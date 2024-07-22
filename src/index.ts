import { Context, h, Schema } from 'koishi'

export const name = 'otto-synth'

export interface Config { }

export const Config: Schema<Config> = Schema.object({})

class OttoSynth {
    constructor(ctx: Context) {
        ctx.command('hzys <content:text>', '使用 Otto 语音合成句子')
            .alias('otto')
            .alias('活字印刷')
            .option('raw', '-r 使用原始语音合成器', { fallback: false })
            .option('pitch', '-p [pitch] 设定音高', { fallback: 1.0 })
            .option('speed', '-s [speed] 设定语速', { fallback: 1.0 })
            .option('norm', '-n 是否音频标准化', { fallback: true })
            .usage('使用 Otto 语音切片活字印刷出给定的字符串')
            .example('hzys 大家好啊 我是说的道理机器人 今天来点大家想看的东西')
            .action(async ({ options }, content) => {
                const res = await ctx.http.get(`https://vercel-otto-voice-print.vercel.app/api?` +
                    `content="${content}"&raw_mode=${options.raw}&pitch=${options.pitch}` +
                    `&speed=${options.speed}&norm=${options.norm}`, {
                    responseType: 'arraybuffer',
                })

                return h.audio(res, 'audio/wav')
            })
    }
}

export function apply(ctx: Context) {
    ctx.plugin(OttoSynth)
}
