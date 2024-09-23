export interface Track {
  id: string
  title: string
  artist: string
  audioSrc: string
  img: string
  music_source: string
  license_code: string
  duration: number
}

export const tracks: Track[] = [
  {
    id: '1',
    title: 'Hope',
    artist: 'Hugo Dujardin',
    audioSrc: '/src/assets/audio/hope.mp3',
    img: '/src/assets/img/pic_5.jpg',
    music_source: 'Bensound.com',
    license_code: 'FIR7IQJG0ONJSZHR',
    duration: 0,
  },
  {
    id: '2',
    title: 'Funky suspense',
    artist: 'Benjamin Tissot',
    audioSrc: '/src/assets/audio/funkysuspense.mp3',
    img: '/src/assets/img/pic_3.jpg',
    music_source: 'Bensound.com',
    license_code: 'B4CIKJB2BUBRXT4E',
    duration: 0,
  },
  {
    id: '3',
    title: 'Echo of sadness',
    artist: 'TURNIQUE',
    audioSrc: '/src/assets/audio/echoofsadness.mp3',
    img: '/src/assets/img/pic_1.jpg',
    music_source: 'Bensound.com',
    license_code: 'DTNK0XMEMCCBTQNK',
    duration: 0,
  },
  {
    id: '4',
    title: 'Sway',
    artist: 'Yunior Arronte',
    audioSrc: '/src/assets/audio/sway.mp3',
    img: '/src/assets/img/pic_4.png',
    music_source: 'Bensound.com',
    license_code: 'XQWNS8KRA2QAHMUA',
    duration: 0,
  },
  {
    id: '5',
    title: 'As your world grows smaller',
    artist: 'Diffie Bosman',
    audioSrc: '/src/assets/audio/asyourworldgrowssmaller.mp3',
    img: '/src/assets/img/pic_2.jpg',
    music_source: 'Bensound.com',
    license_code: 'MBDDX6SUQTLZMRLG',
    duration: 0,
  },
]
