import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

export default function Icon() {
    const fileBuffer = readFileSync(join(process.cwd(), 'public/me.png'))
    const base64 = fileBuffer.toString('base64')
    const src = `data:image/png;base64,${base64}`

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    backgroundColor: '#000',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        width: '150%',
                        height: '150%',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                    }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={src}
                        width="100%"
                        height="100%"
                        style={{
                            objectFit: 'cover',
                        }}
                    />
                </div>
            </div>
        ),
        { ...size }
    )
}
