export interface Track {
  id: number
  title: string
  artist: string
  audioSrc: string
  attribution_text_1: string
  attribution_text_2: string
}

export const tracks: Track[] = [
  {
    id: 1,
    title: 'Hope',
    artist: 'Hugo Dujardin',
    audioSrc: '/src/assets/audio/hope.mp3',
    attribution_text_1: 'Royalty Free Music: Bensound.com',
    attribution_text_2: 'License Code: FIR7IQJG0ONJSZHR',
  },
  {
    id: 2,
    title: 'Funky suspense',
    artist: 'Benjamin Tissot',
    audioSrc: '/src/assets/audio/funkysuspense.mp3',
    attribution_text_1: 'Royalty Free Music: Bensound.com',
    attribution_text_2: 'License Code: B4CIKJB2BUBRXT4E',
  },
  {
    id: 3,
    title: 'Echo of sadness',
    artist: 'TURNIQUE',
    audioSrc: '/src/assets/audio/echoofsadness.mp3',
    attribution_text_1: 'Royalty Free Music: Bensound.com',
    attribution_text_2: 'License Code: DTNK0XMEMCCBTQNK',
  },
  {
    id: 4,
    title: 'Sway',
    artist: 'Yunior Arronte',
    audioSrc: '/src/assets/audio/sway.mp3',
    attribution_text_1: 'Royalty Free Music: Bensound.com',
    attribution_text_2: 'License Code: XQWNS8KRA2QAHMUA',
  },
  {
    id: 5,
    title: 'As your world grows smaller',
    artist: 'Diffie Bosman',
    audioSrc: '/src/assets/audio/asyourworldgrowssmaller.mp3',
    attribution_text_1: 'Royalty Free Music: Bensound.com',
    attribution_text_2: 'License Code: MBDDX6SUQTLZMRLG',
  },
]
