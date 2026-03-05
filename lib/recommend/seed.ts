export interface SeedTrack {
  id: string;
  title: string;
  artist: string;
  genre: string;
  tags: string[];
  energy: number;    // 0-100
  valence: number;   // -1 to 1
  soundDescription: string;
}

export const SEED_TRACKS: SeedTrack[] = [
  // ── CALM / AMBIENT ─────────────────────────────────────────────────────────
  { id: "t001", title: "Weightless", artist: "Marconi Union", genre: "ambient", tags: ["calm","slow","floating","sleep"], energy: 10, valence: 0.1, soundDescription: "겹겹이 쌓인 드론과 부드러운 피아노가 몸에서 무게를 덜어내는 질감." },
  { id: "t002", title: "Experience", artist: "Ludovico Einaudi", genre: "neoclassical", tags: ["introspective","piano","cinematic","calm"], energy: 25, valence: 0.2, soundDescription: "현악 파도 위에 피아노 선율 — 기억이 슬로모션으로 재생되는 느낌." },
  { id: "t012", title: "Dissolve Me", artist: "Alt-J", genre: "indie", tags: ["dreamlike","sparse","calm","texture"], energy: 35, valence: 0.2, soundDescription: "비전통적인 보컬 하모닉스가 최소한의 타악기 위에 녹아든다." },
  { id: "t016", title: "Nuvole Bianche", artist: "Ludovico Einaudi", genre: "neoclassical", tags: ["piano","gentle","italian","calm"], energy: 22, valence: 0.3, soundDescription: "흰 구름처럼 반복되다 조금씩 달라지는 피아노 멜로디." },
  { id: "t017", title: "Gymnopédie No.1", artist: "Erik Satie", genre: "classical", tags: ["slow","minimal","timeless","calm"], energy: 12, valence: 0.15, soundDescription: "19세기의 고요함 — 음표 사이의 여백이 선율만큼 중요하다." },
  { id: "t018", title: "An Ending (Ascent)", artist: "Brian Eno", genre: "ambient", tags: ["spacious","slow","ambient","calm"], energy: 8, valence: 0.05, soundDescription: "우주적 규모의 고요함 — 소리가 공간 자체가 된다." },
  { id: "t030", title: "River", artist: "Joni Mitchell", genre: "folk", tags: ["piano","sad","winter","calm"], energy: 28, valence: -0.1, soundDescription: "겨울 강 같은 피아노와 고독한 보컬 — 따뜻하면서도 차갑다." },
  { id: "t036", title: "Music For Airports 1/1", artist: "Brian Eno", genre: "ambient", tags: ["calm","drone","spacious","minimal"], energy: 6, valence: 0.05, soundDescription: "시간이 흐르는 것을 잊게 만드는 공간음악의 원형 — 소리가 벽지처럼 존재한다." },
  { id: "t037", title: "On the Nature of Daylight", artist: "Max Richter", genre: "neoclassical", tags: ["calm","strings","cinematic","tender"], energy: 18, valence: -0.1, soundDescription: "현악 4중주가 천천히 빛을 묘사한다 — 아름다움과 슬픔의 경계." },
  { id: "t038", title: "Says", artist: "Nils Frahm", genre: "neoclassical", tags: ["calm","piano","electronic","build"], energy: 30, valence: 0.3, soundDescription: "피아노 음표가 반복되며 서서히 전자음으로 진화하는 — 조용한 폭발." },
  { id: "t039", title: "Near Light", artist: "Ólafur Arnalds", genre: "neoclassical", tags: ["calm","strings","delicate","nordic"], energy: 20, valence: 0.15, soundDescription: "아이슬란드의 겨울 낮처럼 — 희고 조용하고 끝이 없는." },
  { id: "t040", title: "Svefn-g-englar", artist: "Sigur Rós", genre: "post-rock", tags: ["calm","ethereal","icelandic","dream"], energy: 22, valence: 0.1, soundDescription: "지구 어딘가에서 들려오는 것 같지 않은 보컬 — 꿈과 현실의 경계에 서있다." },
  { id: "t041", title: "Spiegel im Spiegel", artist: "Arvo Pärt", genre: "classical", tags: ["calm","minimalist","piano","violin"], energy: 10, valence: 0.1, soundDescription: "거울 속 거울 — 피아노와 바이올린이 영원히 반사된다." },
  { id: "t042", title: "Metamorphosis Two", artist: "Philip Glass", genre: "classical", tags: ["calm","piano","minimalist","repetitive"], energy: 18, valence: 0.2, soundDescription: "패턴이 미묘하게 변하며 진화하는 — 같은 것 같지만 절대 같지 않다." },
  { id: "t043", title: "Clair de Lune", artist: "Claude Debussy", genre: "classical", tags: ["calm","piano","moonlight","impressionist"], energy: 20, valence: 0.25, soundDescription: "달빛 소나타 — 물 위에 달이 비치는 그 순간의 음악." },
  { id: "t044", title: "The Köln Concert (Part I)", artist: "Keith Jarrett", genre: "jazz", tags: ["calm","piano","improvised","live"], energy: 28, valence: 0.35, soundDescription: "피아노 즉흥의 최고봉 — 밤 한 편의 감정이 모두 담겨있다." },
  { id: "t045", title: "Peace Piece", artist: "Bill Evans", genre: "jazz", tags: ["calm","piano","meditative","slow"], energy: 15, valence: 0.2, soundDescription: "변하지 않는 저음 위에 흘러가는 멜로디 — 평화를 소리로 만들면 이럴까." },
  { id: "t046", title: "Roygbiv", artist: "Boards of Canada", genre: "electronic", tags: ["calm","nostalgic","warm","lo-fi"], energy: 30, valence: 0.3, soundDescription: "VHS 테이프처럼 따뜻하게 바랜 전자음 — 어린 시절의 오후." },
  { id: "t047", title: "Xtal", artist: "Aphex Twin", genre: "ambient", tags: ["calm","lush","water","crystalline"], energy: 12, valence: 0.4, soundDescription: "수면 아래서 들리는 것 같은 맑은 전자음 — 투명하고 깊다." },
  { id: "t048", title: "Breathe (In the Air)", artist: "Pink Floyd", genre: "progressive rock", tags: ["calm","psychedelic","floating","classic"], energy: 25, valence: 0.2, soundDescription: "공기를 마시는 것처럼 — 전설적인 앨범의 첫 숨결." },
  { id: "t049", title: "All I Want", artist: "Kodaline", genre: "indie pop", tags: ["calm","emotional","piano","longing"], energy: 35, valence: -0.2, soundDescription: "원하는 것을 잃었을 때의 고요한 슬픔 — 피아노와 보컬이 맞닿는다." },
  { id: "t050", title: "Re: Stacks", artist: "Bon Iver", genre: "indie folk", tags: ["calm","introspective","acoustic","winter"], energy: 28, valence: -0.1, soundDescription: "눈 쌓인 숲 속의 오두막 — 아무것도 하지 않아도 되는 그 느낌." },
  { id: "t051", title: "Holocene", artist: "Bon Iver", genre: "folk", tags: ["introspective","landscape","echo","soft"], energy: 30, valence: 0.1, soundDescription: "열린 들판처럼 넓은 기타와 보컬 — 자신이 작아지는 좋은 감각." },
  { id: "t052", title: "Lover, You Should've Come Over", artist: "Jeff Buckley", genre: "alternative", tags: ["calm","longing","piano","passionate"], energy: 40, valence: -0.15, soundDescription: "사랑에 대한 후회가 아름다움으로 승화된다 — 버클리 특유의 목소리로." },
  { id: "t053", title: "Retrograde", artist: "James Blake", genre: "electronic soul", tags: ["calm","bass","ethereal","minimalist"], energy: 32, valence: -0.1, soundDescription: "저음과 보컬의 질량 대결 — 공간이 무너지는 것 같은 전자 소울." },
  { id: "t054", title: "The Night Will Always Win", artist: "James Blake", genre: "electronic soul", tags: ["calm","sparse","soul","dark"], energy: 25, valence: -0.2, soundDescription: "밤이 이긴다는 사실을 받아들이는 노래 — 저항 없는 평화." },
  { id: "t055", title: "Anchor", artist: "Novo Amor", genre: "indie folk", tags: ["calm","falsetto","acoustic","tender"], energy: 28, valence: 0.05, soundDescription: "높은 목소리가 잔잔한 기타 위를 흐른다 — 닻처럼 마음을 붙잡는다." },
  { id: "t056", title: "Fourth of July", artist: "Sufjan Stevens", genre: "indie folk", tags: ["calm","sparse","death","personal"], energy: 20, valence: -0.3, soundDescription: "아버지에게 바치는 노래 — 슬픔이 너무 조용해서 더 크게 들린다." },
  { id: "t057", title: "Lua", artist: "Bright Eyes", genre: "indie folk", tags: ["calm","acoustic","heartfelt","simple"], energy: 22, valence: -0.1, soundDescription: "밤에 쓴 편지 같은 노래 — 꾸밈 없이 직접적이다." },
  { id: "t058", title: "Feather", artist: "Nujabes feat. Cise Starr", genre: "lo-fi hip-hop", tags: ["calm","jazz","hip-hop","meditative"], energy: 38, valence: 0.4, soundDescription: "재즈와 힙합이 만나는 지점 — 누자베스의 깃털처럼 가벼운 프로덕션." },
  { id: "t059", title: "Elegy", artist: "Lisa Gerrard", genre: "world", tags: ["calm","haunting","wordless","spiritual"], energy: 15, valence: -0.15, soundDescription: "말이 없어도 모든 것을 말하는 목소리 — 국경과 시간을 초월한다." },
  { id: "t060", title: "Adagio for Strings", artist: "Samuel Barber", genre: "classical", tags: ["calm","strings","orchestral","emotional"], energy: 22, valence: -0.4, soundDescription: "슬픔의 정점을 음악으로 표현한 작품 — 여러 역사적 순간에 흘렀다." },
  { id: "t061", title: "Here", artist: "Alessia Cara", genre: "pop", tags: ["calm","introvert","party","relatable"], energy: 40, valence: 0.1, soundDescription: "파티에서 혼자인 느낌을 담담하게 — 소음 속의 고요함." },
  { id: "t062", title: "Skinny Love (Birdy cover)", artist: "Birdy", genre: "indie pop", tags: ["calm","vulnerable","piano","cover"], energy: 30, valence: -0.2, soundDescription: "원곡보다 더 작아진 목소리 — 피아노 한 대와 소녀의 고백." },
  { id: "t063", title: "I Will Follow You into the Dark", artist: "Death Cab for Cutie", genre: "indie rock", tags: ["calm","love","death","acoustic"], energy: 32, valence: 0.0, soundDescription: "죽음을 주제로 한 가장 로맨틱한 노래 — 어쿠스틱 기타의 진심." },
  { id: "t064", title: "Such Great Heights", artist: "Iron & Wine (cover)", genre: "indie folk", tags: ["calm","whisper","tender","love"], energy: 25, valence: 0.35, soundDescription: "속삭임 같은 보컬이 사랑을 속삭인다 — 원곡보다 더 조용하고 더 깊다." },
  { id: "t065", title: "The Night", artist: "Zac Brown Band", genre: "country", tags: ["calm","campfire","night","storytelling"], energy: 28, valence: 0.2, soundDescription: "모닥불 앞에서 들려주는 이야기 — 밤의 온도가 느껴진다." },
  { id: "t066", title: "Something", artist: "The Beatles", genre: "rock", tags: ["calm","love","classic","george harrison"], energy: 42, valence: 0.5, soundDescription: "조지 해리슨의 가장 아름다운 사랑 노래 — 단순하지만 완벽하다." },
  { id: "t067", title: "Fade Into You", artist: "Mazzy Star", genre: "dream pop", tags: ["calm","dreamy","slow","hazy"], energy: 30, valence: -0.1, soundDescription: "안개 속에서 누군가를 찾는 것 같은 — 꿈처럼 선명하지 않지만 진짜다." },
  { id: "t068", title: "Motion Picture Soundtrack", artist: "Radiohead", genre: "art rock", tags: ["calm","orchestral","sad","cinematic"], energy: 20, valence: -0.6, soundDescription: "오르간과 현악이 거의 침묵 속으로 사라지는 — 슬픔이 청각화된다." },
  { id: "t069", title: "Naked As We Came", artist: "Iron & Wine", genre: "indie folk", tags: ["calm","mortality","love","quiet"], energy: 18, valence: -0.05, soundDescription: "삶과 죽음을 가장 조용하게 이야기하는 노래 — 전혀 무섭지 않다." },
  { id: "t070", title: "Blackbird", artist: "The Beatles", genre: "folk rock", tags: ["calm","acoustic","liberation","classic"], energy: 28, valence: 0.3, soundDescription: "혼자 연주하는 어쿠스틱 기타 — 60년대의 희망이 담겨있다." },
  { id: "t071", title: "Dream a Little Dream of Me", artist: "Ella Fitzgerald", genre: "jazz", tags: ["calm","classic","vocals","lullaby"], energy: 28, valence: 0.4, soundDescription: "꿈 속에서 만나자는 노래 — 엘라의 목소리는 언제나 따뜻하다." },
  { id: "t072", title: "La Vie En Rose", artist: "Édith Piaf", genre: "chanson", tags: ["calm","romantic","french","classic"], energy: 30, valence: 0.5, soundDescription: "장밋빛 인생 — 프랑스어로만 가능한 그 감성." },
  { id: "t073", title: "Cello Suite No. 1", artist: "Johann Sebastian Bach", genre: "classical", tags: ["calm","cello","baroque","meditative"], energy: 16, valence: 0.2, soundDescription: "첼로 혼자서 완전한 세계를 만든다 — 바흐의 무궁한 수학." },
  { id: "t074", title: "Nocturne Op. 9 No. 2", artist: "Frédéric Chopin", genre: "classical", tags: ["calm","piano","romantic","night"], energy: 18, valence: 0.25, soundDescription: "밤을 위해 쓴 피아노 독주 — 19세기가 현재와 연결된다." },
  { id: "t075", title: "Gymnopédie No.2", artist: "Erik Satie", genre: "classical", tags: ["calm","piano","slow","impressionist"], energy: 10, valence: 0.1, soundDescription: "1번보다 조금 더 어둡고 조금 더 내면으로 향한다 — 사티의 세계." },

  // ── ECHO / NOSTALGIC / REFLECTIVE ──────────────────────────────────────────
  { id: "t003", title: "Teardrop", artist: "Massive Attack", genre: "trip-hop", tags: ["echo","dark","beats","vocal"], energy: 40, valence: -0.2, soundDescription: "따뜻한 베이스 리듬 아래 부서질 듯한 보컬 — 낯익지만 멀리 있는." },
  { id: "t004", title: "Intro", artist: "The xx", genre: "indie", tags: ["soft","guitar","atmospheric","echo"], energy: 30, valence: 0.05, soundDescription: "기타 선율이 엮이고 풀리며 침묵을 위한 공간을 만든다." },
  { id: "t009", title: "Bittersweet Symphony", artist: "The Verve", genre: "britpop", tags: ["strings","melancholy","echo","walk"], energy: 55, valence: -0.15, soundDescription: "체념한 보컬 아래 오케스트라 루프 — 어딘가로 가는 것 같지만 제자리." },
  { id: "t019", title: "Motion Picture Soundtrack", artist: "Radiohead", genre: "art rock", tags: ["hollow","orchestral","sad","cinematic","echo"], energy: 20, valence: -0.6, soundDescription: "오르간과 현악이 거의 침묵 속으로 사라지는 — 슬픔이 청각화된다." },
  { id: "t020", title: "Crystalised", artist: "The xx", genre: "indie", tags: ["static","sparse","whisper","cold","echo"], energy: 25, valence: -0.4, soundDescription: "박자 사이 거의 침묵에 가까운 여백 — 무언가가 끝나는 소리." },
  { id: "t021", title: "Skinny Love", artist: "Bon Iver", genre: "folk", tags: ["raw","acoustic","pain","echo"], energy: 45, valence: -0.3, soundDescription: "날 것의 보컬과 어쿠스틱 기타 — 고백처럼 직접적이다." },
  { id: "t022", title: "The Scientist", artist: "Coldplay", genre: "alternative", tags: ["piano","regret","echo","cinematic"], energy: 38, valence: -0.25, soundDescription: "뒤로 되감는 뮤직비디오처럼 과거로 돌아가고 싶은 감정." },
  { id: "t031", title: "Lost!", artist: "Coldplay", genre: "alternative", tags: ["uplifting","echo","journey","hope"], energy: 65, valence: 0.3, soundDescription: "길을 잃었지만 그게 새로운 발견의 시작인 곡." },
  { id: "t076", title: "Hallelujah", artist: "Jeff Buckley", genre: "alternative", tags: ["echo","sacred","vocal","cover"], energy: 38, valence: -0.2, soundDescription: "코헨의 시를 버클리가 대성당으로 만들었다 — 세상에서 가장 많이 불린 곡." },
  { id: "t077", title: "Pink Moon", artist: "Nick Drake", genre: "folk", tags: ["echo","acoustic","simple","melancholy"], energy: 15, valence: -0.15, soundDescription: "기타 혼자, 목소리 하나 — 너무 이른 작별의 예감이 담겨있다." },
  { id: "t078", title: "Between the Bars", artist: "Elliott Smith", genre: "indie folk", tags: ["echo","whisper","sad","intimate"], energy: 18, valence: -0.25, soundDescription: "속삭임으로 부르는 가장 슬픈 노래 — 취기와 진심 사이." },
  { id: "t079", title: "In the Aeroplane Over the Sea", artist: "Neutral Milk Hotel", genre: "indie folk", tags: ["echo","surreal","love","historic"], energy: 50, valence: 0.1, soundDescription: "홀로코스트를 배경으로 한 사랑 이야기 — 초현실과 감동의 경계." },
  { id: "t080", title: "Chicago", artist: "Sufjan Stevens", genre: "indie folk", tags: ["echo","orchestral","journey","uplifting"], energy: 55, valence: 0.2, soundDescription: "모든 것을 바꿀 수 있다고 믿었던 순간 — 오케스트라가 그 기억을 확장한다." },
  { id: "t081", title: "White Winter Hymnal", artist: "Fleet Foxes", genre: "indie folk", tags: ["echo","harmony","winter","choral"], energy: 45, valence: 0.15, soundDescription: "여러 목소리가 하나의 화음을 이루는 — 겨울 숲 속의 합창." },
  { id: "t082", title: "The Suburbs", artist: "Arcade Fire", genre: "indie rock", tags: ["echo","nostalgic","suburban","cinematic"], energy: 55, valence: -0.1, soundDescription: "자란 동네로 돌아갔을 때의 복잡한 감정 — 낯설고도 익숙한." },
  { id: "t083", title: "Space Song", artist: "Beach House", genre: "dream pop", tags: ["echo","dreamy","reverb","floating"], energy: 40, valence: 0.1, soundDescription: "드림팝의 교과서 — 우주처럼 광활하고 꿈처럼 흐릿하다." },
  { id: "t084", title: "Feels Like We Only Go Backwards", artist: "Tame Impala", genre: "psychedelic", tags: ["echo","retro","psychedelic","dreamy"], energy: 45, valence: -0.1, soundDescription: "60년대 팝을 21세기로 끌어온 — 뒤로 가는 것 같은 전진." },
  { id: "t085", title: "Bloodbuzz Ohio", artist: "The National", genre: "indie rock", tags: ["echo","existential","bass","literary"], energy: 52, valence: -0.2, soundDescription: "빚과 삶의 무게를 저음 기타로 — 매트 버닝어의 목소리는 밤처럼 깊다." },
  { id: "t086", title: "Motion Sickness", artist: "Phoebe Bridgers", genre: "indie folk", tags: ["echo","dark humor","breakup","guitar"], energy: 42, valence: -0.15, soundDescription: "헤어진 이유를 담담하게 나열하는 — 피비 브리저스 특유의 냉정한 슬픔." },
  { id: "t087", title: "Kaputt", artist: "Destroyer", genre: "indie pop", tags: ["echo","saxophone","80s","nostalgic"], energy: 35, valence: 0.0, soundDescription: "80년대 소프트 록에 대한 애정 어린 풍자 — 색소폰이 모든 것을 말한다." },
  { id: "t088", title: "My Girls", artist: "Animal Collective", genre: "indie electronic", tags: ["echo","euphoric","family","hypnotic"], energy: 62, valence: 0.5, soundDescription: "사랑하는 사람을 위한 집이 필요하다는 단순한 소망 — 반복이 주문이 된다." },
  { id: "t089", title: "Obstacles", artist: "Syd Matters", genre: "indie folk", tags: ["echo","gentle","french","beautiful"], energy: 30, valence: 0.1, soundDescription: "영화 라이프 이즈 스트레인지로 유명한 — 장애물들 사이에서의 고요함." },
  { id: "t090", title: "Lua", artist: "Bright Eyes", genre: "indie folk", tags: ["echo","insomnia","honest","acoustic"], energy: 22, valence: -0.15, soundDescription: "불면의 밤에 쓴 것 같은 솔직함 — 코너 오버스트의 떨리는 목소리." },
  { id: "t091", title: "Landslide", artist: "Fleetwood Mac", genre: "folk rock", tags: ["echo","aging","change","classic"], energy: 30, valence: -0.1, soundDescription: "눈사태처럼 밀려오는 시간의 흐름 — 스티비 닉스의 목소리에 세월이 담겨있다." },
  { id: "t092", title: "Both Sides Now", artist: "Joni Mitchell", genre: "folk", tags: ["echo","perspective","clouds","wisdom"], energy: 28, valence: 0.0, soundDescription: "구름을 양쪽에서 보았지만 여전히 모른다 — 나이가 들수록 더 깊어지는 노래." },
  { id: "t093", title: "The Sound of Silence", artist: "Simon & Garfunkel", genre: "folk rock", tags: ["echo","darkness","silence","classic"], energy: 32, valence: -0.2, soundDescription: "어둠 속에서 침묵과 나누는 대화 — 어느 세대에도 통하는 고독." },
  { id: "t094", title: "Yesterday", artist: "The Beatles", genre: "pop", tags: ["echo","regret","yesterday","classic"], energy: 30, valence: -0.2, soundDescription: "아마 역사상 가장 많이 불린 노래 — 어제가 그리운 감정의 원형." },
  { id: "t095", title: "Wish You Were Here", artist: "Pink Floyd", genre: "progressive rock", tags: ["echo","absence","friendship","classic"], energy: 42, valence: -0.2, soundDescription: "네가 여기 있었으면 좋겠다 — 빈자리에게 건네는 노래." },
  { id: "t096", title: "Fast Car", artist: "Tracy Chapman", genre: "folk rock", tags: ["echo","escape","dream","story"], energy: 48, valence: 0.1, soundDescription: "빠른 차로 모든 것을 바꾸려는 꿈 — 심플한 기타에 인생이 담겨있다." },
  { id: "t097", title: "Black", artist: "Pearl Jam", genre: "grunge", tags: ["echo","loss","guitar","powerful"], energy: 52, valence: -0.4, soundDescription: "잃어버린 사랑을 위한 가장 강렬한 발라드 — 에디 베더의 목소리가 찢어진다." },
  { id: "t098", title: "Mad World", artist: "Tears for Fears", genre: "synth-pop", tags: ["echo","existential","80s","world"], energy: 38, valence: -0.4, soundDescription: "미친 세상에서 달리는 꿈 — 원곡이지만 Gary Jules 버전만큼 유명하다." },
  { id: "t099", title: "Heaven or Las Vegas", artist: "Cocteau Twins", genre: "dream pop", tags: ["echo","ethereal","vocals","mysterious"], energy: 45, valence: 0.2, soundDescription: "가사를 알 수 없어도 감정이 전달된다 — 목소리가 악기가 된다." },
  { id: "t100", title: "Glory Box", artist: "Portishead", genre: "trip-hop", tags: ["echo","sensual","dark","bass"], energy: 42, valence: -0.1, soundDescription: "여성성과 트립합이 만나는 곳 — 베이스가 모든 것을 감싼다." },
  { id: "t101", title: "Lovesong", artist: "The Cure", genre: "alternative", tags: ["echo","love","gothic","tender"], energy: 48, valence: 0.3, soundDescription: "로버트 스미스가 아내를 위해 쓴 노래 — 고딕 밴드의 가장 달콤한 순간." },
  { id: "t102", title: "Fake Plastic Trees", artist: "Radiohead", genre: "alternative", tags: ["echo","alienation","consumerism","sad"], energy: 38, valence: -0.35, soundDescription: "가짜로 가득한 세상에서의 실제 슬픔 — 톰 요크의 목소리가 쪼개진다." },
  { id: "t103", title: "Fix You", artist: "Coldplay", genre: "alternative", tags: ["echo","hope","comfort","anthemic"], energy: 58, valence: 0.2, soundDescription: "가장 어두운 순간을 지나는 사람을 위한 노래 — 천천히 쌓이는 위로." },
  { id: "t104", title: "Dog Days Are Over", artist: "Florence + the Machine", genre: "indie pop", tags: ["echo","liberation","run","cathartic"], energy: 68, valence: 0.4, soundDescription: "힘든 날들이 끝나간다는 선언 — 달려가라는 명령이 해방처럼 들린다." },
  { id: "t105", title: "Keep the Car Running", artist: "Arcade Fire", genre: "indie rock", tags: ["echo","urgency","folk","run"], energy: 65, valence: 0.1, soundDescription: "어딘가에서 도망치는 긴박함 — 어쿠스틱 악기가 만드는 록 에너지." },
  { id: "t106", title: "Electric Eye", artist: "Judas Priest", genre: "heavy metal", tags: ["overdrive","surveillance","80s","metal"], energy: 82, valence: -0.1, soundDescription: "하늘에서 모든 것을 내려다보는 전기 눈 — 메탈의 SF적 상상력." },
  { id: "t107", title: "Mirrorball", artist: "Taylor Swift", genre: "indie folk", tags: ["echo","vulnerability","disco","introspective"], energy: 35, valence: -0.1, soundDescription: "모두를 위해 빛을 반사하다 혼자 남은 미러볼 — 테일러의 가장 취약한 순간." },
  { id: "t108", title: "Exile", artist: "Taylor Swift ft. Bon Iver", genre: "indie folk", tags: ["echo","duet","misunderstanding","longing"], energy: 40, valence: -0.3, soundDescription: "서로 다른 이야기를 동시에 하는 두 목소리 — 엇갈림의 완벽한 묘사." },
  { id: "t109", title: "Seaside", artist: "The Kooks", genre: "indie rock", tags: ["echo","summer","nostalgia","simple"], energy: 55, valence: 0.3, soundDescription: "여름의 기억 — 단순하고 직접적이라 더 강렬하다." },
  { id: "t110", title: "Maps", artist: "Yeah Yeah Yeahs", genre: "indie rock", tags: ["echo","love","guitar","raw"], energy: 48, valence: -0.2, soundDescription: "기다려줘 — 카렌 O가 눈물을 참으며 부르는 노래." },
  { id: "t111", title: "Like Real People Do", artist: "Hozier", genre: "indie folk", tags: ["echo","tenderness","nature","love"], energy: 30, valence: 0.2, soundDescription: "사람처럼 사랑하고 싶다는 소박한 소망 — 호지어의 가장 부드러운 곡." },
  { id: "t112", title: "Northern Downpour", artist: "Panic! at the Disco", genre: "alternative", tags: ["echo","rain","love","bittersweet"], energy: 42, valence: -0.1, soundDescription: "북쪽의 폭우처럼 쏟아지는 감정 — 가장 아름다운 이별 노래 중 하나." },
  { id: "t113", title: "Tenerife Sea", artist: "Ed Sheeran", genre: "pop", tags: ["echo","love","sincere","acoustic"], energy: 38, valence: 0.4, soundDescription: "테네리페 바다처럼 파란 눈 — 에드의 가장 진심 어린 사랑 노래." },
  { id: "t114", title: "First Day of My Life", artist: "Bright Eyes", genre: "indie folk", tags: ["echo","love","discovery","acoustic"], energy: 35, valence: 0.5, soundDescription: "누군가를 만난 날이 인생의 첫날이 됐다 — 가장 순수한 사랑 고백." },
  { id: "t115", title: "Patience", artist: "Guns N' Roses", genre: "rock", tags: ["echo","acoustic","love","waiting"], energy: 38, valence: 0.1, soundDescription: "기다림에 대한 록 발라드 — 어쿠스틱 기타의 GN'R, 예상 밖의 부드러움." },

  // ── SPARK / UPBEAT / DISCOVERY ─────────────────────────────────────────────
  { id: "t007", title: "Midnight City", artist: "M83", genre: "synth-pop", tags: ["nostalgia","drive","spark","80s"], energy: 75, valence: 0.5, soundDescription: "색소폰 브레이크와 신스 코드 — 밤의 도시에서 느끼는 젊음." },
  { id: "t010", title: "Paper Planes", artist: "M.I.A.", genre: "hip-hop", tags: ["spark","playful","global","beats"], energy: 70, valence: 0.4, soundDescription: "단순한 루프 안에 감춰진 장난기 넘치는 에너지." },
  { id: "t023", title: "Take Five", artist: "Dave Brubeck Quartet", genre: "jazz", tags: ["spark","complex","classic","jazz"], energy: 60, valence: 0.35, soundDescription: "5/4박자의 마법 — 예상을 비틀면서도 자연스러운 리듬." },
  { id: "t024", title: "Digital Love", artist: "Daft Punk", genre: "electronic", tags: ["spark","dance","nostalgic","funky"], energy: 78, valence: 0.6, soundDescription: "기타 샘플 위에 쌓이는 로봇 보컬 — 순수한 설렘." },
  { id: "t025", title: "Flume", artist: "Bon Iver", genre: "indie folk", tags: ["spark","intimate","warm","discovery"], energy: 42, valence: 0.3, soundDescription: "밀접한 보컬과 기타 — 첫 발견의 감각." },
  { id: "t032", title: "Electric Feel", artist: "MGMT", genre: "psychedelic pop", tags: ["spark","groove","electric","danceable"], energy: 72, valence: 0.55, soundDescription: "전기처럼 흐르는 베이스라인 — 몸이 먼저 반응한다." },
  { id: "t033", title: "Africa", artist: "Toto", genre: "rock", tags: ["spark","epic","classic","singalong"], energy: 68, valence: 0.5, soundDescription: "완벽한 프로덕션의 80년대 팝록 — 어느 시대에도 유효하다." },
  { id: "t116", title: "Oxford Comma", artist: "Vampire Weekend", genre: "indie pop", tags: ["spark","witty","preppy","energetic"], energy: 68, valence: 0.5, soundDescription: "문법에 관한 가장 신나는 노래 — 지적이면서도 즐겁다." },
  { id: "t117", title: "1901", artist: "Phoenix", genre: "indie pop", tags: ["spark","french","upbeat","carefree"], energy: 75, valence: 0.6, soundDescription: "프랑스 밴드가 만든 가장 미국적인 소리 — 청량한 기타 리프." },
  { id: "t118", title: "This Must Be the Place", artist: "Talking Heads", genre: "new wave", tags: ["spark","home","joy","quirky"], energy: 65, valence: 0.7, soundDescription: "집이 어디냐고 묻는 가장 행복한 방식 — 데이비드 번의 해맑음." },
  { id: "t119", title: "All My Friends", artist: "LCD Soundsystem", genre: "electronic rock", tags: ["spark","aging","friends","anthem"], energy: 72, valence: 0.3, soundDescription: "나이 드는 것과 친구들에 대한 전자음악 서사시 — 8분이 순식간에 간다." },
  { id: "t120", title: "Mr. Brightside", artist: "The Killers", genre: "indie rock", tags: ["spark","jealousy","energy","singalong"], energy: 82, valence: 0.2, soundDescription: "질투와 집착을 가장 신나게 표현한 — 2000년대 인디 록의 찬가." },
  { id: "t121", title: "Take Me Out", artist: "Franz Ferdinand", genre: "indie rock", tags: ["spark","dance","post-punk","cool"], energy: 80, valence: 0.4, soundDescription: "포스트펑크의 리듬으로 만든 가장 춤추기 좋은 곡 — 베이스라인이 핵심." },
  { id: "t122", title: "Pumped Up Kicks", artist: "Foster the People", genre: "indie pop", tags: ["spark","dark","catchy","irony"], energy: 70, valence: 0.3, soundDescription: "밝은 멜로디 뒤에 숨겨진 어두운 내용 — 대비가 기묘한 긴장감을 만든다." },
  { id: "t123", title: "R U Mine?", artist: "Arctic Monkeys", genre: "indie rock", tags: ["spark","riff","cool","desire"], energy: 78, valence: 0.25, soundDescription: "매튜 헬더스의 드럼이 심장을 때린다 — 욕망의 에너지를 리프로 표현." },
  { id: "t124", title: "Do I Wanna Know?", artist: "Arctic Monkeys", genre: "indie rock", tags: ["spark","slow burn","desire","riff"], energy: 65, valence: 0.05, soundDescription: "천천히 쌓이는 욕망 — 리프 하나로 모든 것을 설명하는 아틱 몽키즈." },
  { id: "t125", title: "Let It Happen", artist: "Tame Impala", genre: "psychedelic pop", tags: ["spark","euphoric","long","surrender"], energy: 75, valence: 0.4, soundDescription: "8분의 사이키델릭 여행 — 흐름에 몸을 맡기라는 메시지." },
  { id: "t126", title: "Somebody That I Used to Know", artist: "Gotye", genre: "indie pop", tags: ["spark","breakup","distinctive","hook"], energy: 62, valence: -0.1, soundDescription: "이상한 악기와 독특한 훅 — 이별 노래의 새로운 문법." },
  { id: "t127", title: "Kids", artist: "MGMT", genre: "psychedelic pop", tags: ["spark","children","synthesizer","catchy"], energy: 70, valence: 0.4, soundDescription: "어린 시절의 에너지를 신스팝으로 — MGMT의 가장 즉각적인 곡." },
  { id: "t128", title: "Young Folks", artist: "Peter Bjorn and John", genre: "indie pop", tags: ["spark","whistle","carefree","summer"], energy: 60, valence: 0.55, soundDescription: "휘파람 한 소절로 모든 것을 설명하는 — 여름의 가벼움." },
  { id: "t129", title: "Ho Hey", artist: "The Lumineers", genre: "folk rock", tags: ["spark","singalong","folk","communal"], energy: 65, valence: 0.55, soundDescription: "모두가 함께 부를 수 있는 단순한 행복 — 루미니어스의 대표곡." },
  { id: "t130", title: "Home", artist: "Edward Sharpe and the Magnetic Zeros", genre: "folk pop", tags: ["spark","community","wandering","joy"], energy: 65, valence: 0.7, soundDescription: "집이 장소가 아니라 사람이라는 — 가장 따뜻한 집 이야기." },
  { id: "t131", title: "Tongue Tied", artist: "Grouplove", genre: "indie rock", tags: ["spark","carefree","young","energetic"], energy: 75, valence: 0.6, soundDescription: "말이 막히는 설렘 — 청춘의 에너지가 그대로 담겨있다." },
  { id: "t132", title: "Dog Days Are Over", artist: "Florence + the Machine", genre: "indie pop", tags: ["spark","liberation","run","cathartic"], energy: 70, valence: 0.5, soundDescription: "힘든 날들이 끝나고 달려가라는 — 플로렌스의 폭발적인 에너지." },
  { id: "t133", title: "Little Talks", artist: "Of Monsters and Men", genre: "indie folk", tags: ["spark","duet","nordic","anthemic"], energy: 72, valence: 0.3, soundDescription: "아이슬란드 듀오의 대화 — 어두운 내용을 밝게 부르는 역설." },
  { id: "t134", title: "The Less I Know the Better", artist: "Tame Impala", genre: "psychedelic pop", tags: ["spark","funky","jealousy","groove"], energy: 74, valence: 0.2, soundDescription: "사이키델릭이 펑크와 만날 때 — 슬픔도 그루브가 된다." },
  { id: "t135", title: "505", artist: "Arctic Monkeys", genre: "indie rock", tags: ["spark","longing","hotel","build"], energy: 58, valence: -0.05, soundDescription: "505호로 돌아가고 싶다는 — 서서히 폭발하는 그리움." },
  { id: "t136", title: "Ribs", artist: "Lorde", genre: "indie pop", tags: ["spark","growing up","anxiety","teen"], energy: 55, valence: -0.1, soundDescription: "어른이 되는 것이 무섭다는 — 로드의 10대 불안이 팝이 된다." },
  { id: "t137", title: "Team", artist: "Lorde", genre: "indie pop", tags: ["spark","community","outsider","anthem"], energy: 60, valence: 0.3, soundDescription: "함께라는 의미를 재정의한 — 팀이 없어도 우리는 팀이야." },
  { id: "t138", title: "Royals", artist: "Lorde", genre: "indie pop", tags: ["spark","minimalist","cool","critique"], energy: 52, valence: 0.25, soundDescription: "최소한의 프로덕션으로 최대의 충격 — 10대가 쓴 팝 비평." },
  { id: "t139", title: "Somebody Else", artist: "The 1975", genre: "indie pop", tags: ["spark","breakup","irony","catchy"], energy: 65, valence: 0.1, soundDescription: "헤어진 뒤 다른 사람의 것이 된 그 사람 — 반짝이는 신스 팝으로." },
  { id: "t140", title: "Chocolate", artist: "The 1975", genre: "indie pop", tags: ["spark","youth","cool","guitar"], energy: 70, valence: 0.35, soundDescription: "청춘의 무모함을 기타 리프 하나로 — The 1975의 초기 매력." },
  { id: "t141", title: "Girls Like You", artist: "Maroon 5", genre: "pop", tags: ["spark","love","catchy","radio"], energy: 68, valence: 0.6, soundDescription: "완벽한 라디오 팝의 공식 — 단순하지만 효과적이다." },
  { id: "t142", title: "Counting Stars", artist: "OneRepublic", genre: "pop rock", tags: ["spark","dream","uplifting","singalong"], energy: 72, valence: 0.45, soundDescription: "꿈을 향해 나아가는 에너지 — 원리퍼블릭의 가장 강렬한 코러스." },
  { id: "t143", title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", genre: "funk", tags: ["spark","funky","dance","retro"], energy: 85, valence: 0.7, soundDescription: "70년대 펑크를 현대로 소환한 — 브루노 마스의 완벽한 퍼포먼스." },
  { id: "t144", title: "Happy", artist: "Pharrell Williams", genre: "neo soul", tags: ["spark","joy","dance","simple"], energy: 80, valence: 0.85, soundDescription: "행복이 이렇게 들릴 수 있다면 — 24시간 분량의 뮤직비디오가 괜히 나온 게 아니다." },
  { id: "t145", title: "Get Lucky", artist: "Daft Punk ft. Pharrell Williams", genre: "disco funk", tags: ["spark","disco","dance","night"], energy: 80, valence: 0.7, soundDescription: "오늘 밤 운이 좋을 것 같다는 — 다프트 펑크의 가장 인간적인 노래." },
  { id: "t146", title: "Around the World", artist: "Daft Punk", genre: "electronic", tags: ["spark","hypnotic","dance","loop"], energy: 78, valence: 0.5, soundDescription: "같은 말의 반복이 주문이 된다 — 7분 동안 세계를 돌아다니는 느낌." },
  { id: "t147", title: "One More Time", artist: "Daft Punk", genre: "electronic", tags: ["spark","euphoric","dance","anthem"], energy: 82, valence: 0.8, soundDescription: "한 번만 더 — 끝나지 않기를 바라는 파티의 정점." },
  { id: "t148", title: "Redbone", artist: "Childish Gambino", genre: "funk soul", tags: ["spark","funky","retro","groove"], energy: 62, valence: 0.2, soundDescription: "70년대 소울과 현대 힙합의 이종 교배 — 도널드 글로버의 완전한 변신." },
  { id: "t149", title: "Bohemian Rhapsody", artist: "Queen", genre: "rock", tags: ["spark","theatrical","epic","classic"], energy: 70, valence: 0.1, soundDescription: "6분짜리 오페라 록 — 규칙을 전부 깨고 역사가 됐다." },
  { id: "t150", title: "Good as Hell", artist: "Lizzo", genre: "pop soul", tags: ["spark","empowerment","dance","fun"], energy: 78, valence: 0.8, soundDescription: "자기 자신에 대한 가장 신나는 선언 — 리조의 에너지는 전염된다." },
  { id: "t151", title: "Levitating", artist: "Dua Lipa", genre: "disco pop", tags: ["spark","disco","dance","catchy"], energy: 82, valence: 0.7, soundDescription: "중력을 거부하는 디스코 팝 — 두아 리파의 완벽한 팝 공식." },
  { id: "t152", title: "Don't Start Now", artist: "Dua Lipa", genre: "disco pop", tags: ["spark","confidence","breakup","dance"], energy: 80, valence: 0.45, soundDescription: "이제 시작하지 마 — 자신감 있는 이별 선언을 디스코로." },
  { id: "t153", title: "As It Was", artist: "Harry Styles", genre: "synth-pop", tags: ["spark","change","catchy","melancholic"], energy: 72, valence: 0.2, soundDescription: "예전과 같지 않다는 사실을 신나는 신스 팝으로 — 모순적이라 더 좋다." },
  { id: "t154", title: "Blinding Lights", artist: "The Weeknd", genre: "synth-pop", tags: ["spark","80s","night drive","neon"], energy: 85, valence: 0.4, soundDescription: "눈부신 불빛들 — 네온 도시의 새벽을 달리는 80년대 신스팝." },
  { id: "t155", title: "Save Your Tears", artist: "The Weeknd", genre: "synth-pop", tags: ["spark","nostalgia","80s","bittersweet"], energy: 75, valence: 0.1, soundDescription: "눈물을 아껴두라는 — 밝은 멜로디 뒤의 씁쓸한 감정." },
  { id: "t156", title: "Industry Baby", artist: "Lil Nas X ft. Jack Harlow", genre: "hip-hop", tags: ["spark","confident","loud","celebration"], energy: 88, valence: 0.6, soundDescription: "팡파르처럼 시작되는 자기 선언 — 아무도 막을 수 없다는 에너지." },
  { id: "t157", title: "MONTERO", artist: "Lil Nas X", genre: "pop", tags: ["spark","bold","identity","catchy"], energy: 78, valence: 0.5, soundDescription: "자신을 향한 가장 대담한 사랑 노래 — 경계를 두려워하지 않는다." },
  { id: "t158", title: "good 4 u", artist: "Olivia Rodrigo", genre: "pop punk", tags: ["spark","anger","breakup","punk"], energy: 85, valence: 0.2, soundDescription: "분노를 팝펑크로 — 10대의 이별 감정이 이렇게 강렬할 수 있다." },
  { id: "t159", title: "drivers license", artist: "Olivia Rodrigo", genre: "pop", tags: ["spark","heartbreak","suburban","cinematic"], energy: 48, valence: -0.35, soundDescription: "운전면허를 따던 날의 기억 — 이별과 성장이 동시에 담겨있다." },
  { id: "t160", title: "Flowers", artist: "Miley Cyrus", genre: "pop", tags: ["spark","self-love","empowerment","catchy"], energy: 74, valence: 0.6, soundDescription: "스스로에게 꽃을 사줄 수 있다는 — 자기애의 팝 선언." },

  // ── OVERDRIVE / INTENSE / RELEASE ──────────────────────────────────────────
  { id: "t005", title: "Runaway", artist: "Kanye West", genre: "hip-hop", tags: ["piano","emotional","overdrive","cinematic"], energy: 65, valence: -0.1, soundDescription: "단순한 피아노 루프가 감정의 기념비로 확장된다." },
  { id: "t013", title: "99 Problems", artist: "Jay-Z", genre: "hip-hop", tags: ["overdrive","energy","confrontational","hard"], energy: 88, valence: 0.1, soundDescription: "공격적 자신감으로 구동되는 기타 리프 — 통제된 해방감." },
  { id: "t026", title: "Supermassive Black Hole", artist: "Muse", genre: "rock", tags: ["overdrive","riff","dark","powerful"], energy: 85, valence: 0.0, soundDescription: "블랙홀처럼 모든 것을 빨아들이는 기타와 드럼." },
  { id: "t027", title: "Sabotage", artist: "Beastie Boys", genre: "rock/hip-hop", tags: ["overdrive","urgent","punk","raw"], energy: 92, valence: 0.15, soundDescription: "시작부터 끝까지 단 한 템포 — 모든 게 터지는 소리." },
  { id: "t028", title: "Seven Nation Army", artist: "The White Stripes", genre: "blues rock", tags: ["overdrive","iconic","riff","raw"], energy: 80, valence: 0.2, soundDescription: "세계에서 가장 인식도 높은 기타 리프 중 하나 — 단순하지만 강력하다." },
  { id: "t034", title: "Lose Yourself", artist: "Eminem", genre: "hip-hop", tags: ["overdrive","motivation","intense","rap"], energy: 90, valence: 0.3, soundDescription: "단 한 번의 기회 — 극도의 집중과 해방." },
  { id: "t161", title: "Smells Like Teen Spirit", artist: "Nirvana", genre: "grunge", tags: ["overdrive","rebellion","90s","anthem"], energy: 92, valence: 0.1, soundDescription: "한 세대의 불만이 기타 하나로 터졌다 — 그런지의 탄생." },
  { id: "t162", title: "Where Is My Mind?", artist: "Pixies", genre: "alternative", tags: ["overdrive","surreal","quiet-loud","iconic"], energy: 70, valence: -0.1, soundDescription: "조용함과 폭발의 반복 — 내 정신은 어디 있냐는 질문이 이렇게 아름답다." },
  { id: "t163", title: "Killing in the Name", artist: "Rage Against the Machine", genre: "rock", tags: ["overdrive","political","rage","iconic"], energy: 95, valence: -0.2, soundDescription: "저항의 에너지를 기타와 랩으로 — 알아서 해라는 말의 가장 강렬한 버전." },
  { id: "t164", title: "Chop Suey!", artist: "System of a Down", genre: "metal", tags: ["overdrive","chaotic","intense","dynamic"], energy: 93, valence: -0.1, soundDescription: "폭발과 고요가 예측불가하게 교차하는 — 들어도 들어도 새롭다." },
  { id: "t165", title: "B.Y.O.B.", artist: "System of a Down", genre: "metal", tags: ["overdrive","political","fast","intense"], energy: 95, valence: -0.15, soundDescription: "전쟁에 대한 분노를 가장 빠르게 — 속도가 메시지다." },
  { id: "t166", title: "Closer", artist: "Nine Inch Nails", genre: "industrial", tags: ["overdrive","dark","industrial","raw"], energy: 85, valence: -0.3, soundDescription: "산업적 소음이 욕망의 언어가 된다 — NIN의 가장 강렬한 에너지." },
  { id: "t167", title: "Firestarter", artist: "The Prodigy", genre: "electronic", tags: ["overdrive","rave","aggressive","90s"], energy: 94, valence: 0.0, soundDescription: "불을 질러버리겠다는 — 90년대 레이브씬의 분노 집약판." },
  { id: "t168", title: "Born Slippy .NUXX", artist: "Underworld", genre: "electronic", tags: ["overdrive","rave","90s","cathartic"], energy: 90, valence: 0.2, soundDescription: "트레인스포팅의 마지막 장면 — 질주하는 전자음이 모든 것을 쓸어낸다." },
  { id: "t169", title: "Harder Better Faster Stronger", artist: "Daft Punk", genre: "electronic", tags: ["overdrive","robot","dance","loop"], energy: 85, valence: 0.5, soundDescription: "더 힘차게, 더 나은, 더 빠르게, 더 강하게 — 로봇의 노동 찬가." },
  { id: "t170", title: "Enter Sandman", artist: "Metallica", genre: "heavy metal", tags: ["overdrive","dark","classic metal","iconic"], energy: 88, valence: -0.2, soundDescription: "모래 사나이가 온다 — 메탈리카의 가장 접근 가능한 공포." },
  { id: "t171", title: "Master of Puppets", artist: "Metallica", genre: "heavy metal", tags: ["overdrive","fast","iconic","complex"], energy: 96, valence: -0.3, soundDescription: "꼭두각시의 주인 — 8분짜리 메탈 서사시의 교과서." },
  { id: "t172", title: "Walk", artist: "Pantera", genre: "heavy metal", tags: ["overdrive","riff","groove","aggressive"], energy: 90, valence: 0.0, soundDescription: "걸어라, 나에게 재언어화하지 마라 — 그루브 메탈의 리프 원형." },
  { id: "t173", title: "Du Hast", artist: "Rammstein", genre: "industrial metal", tags: ["overdrive","german","industrial","dramatic"], energy: 88, valence: -0.15, soundDescription: "독일어의 언어유희를 산업 금속 소음으로 — 웅장하고 묵직하다." },
  { id: "t174", title: "American Idiot", artist: "Green Day", genre: "punk rock", tags: ["overdrive","political","punk","2000s"], energy: 88, valence: 0.1, soundDescription: "2000년대 미국을 향한 펑크의 분노 — 그린데이의 두 번째 전성기." },
  { id: "t175", title: "Welcome to the Black Parade", artist: "My Chemical Romance", genre: "emo", tags: ["overdrive","theatrical","emo","anthemic"], energy: 85, valence: 0.1, soundDescription: "죽음을 맞이하는 가장 극적인 방식 — MCR의 가장 웅장한 순간." },
  { id: "t176", title: "Numb", artist: "Linkin Park", genre: "nu-metal", tags: ["overdrive","angst","teen","expectations"], energy: 75, valence: -0.25, soundDescription: "기대에 짓눌린 감정을 록으로 — 2000년대 10대의 anthem." },
  { id: "t177", title: "In the End", artist: "Linkin Park", genre: "nu-metal", tags: ["overdrive","futility","rap-rock","emotional"], energy: 72, valence: -0.2, soundDescription: "결국 아무것도 중요하지 않다는 — 체념의 록 선언." },
  { id: "t178", title: "Crawling", artist: "Linkin Park", genre: "nu-metal", tags: ["overdrive","pain","vulnerability","rock"], energy: 70, valence: -0.35, soundDescription: "내면의 상처를 기어 다니듯 — 가장 솔직한 링킨 파크." },
  { id: "t179", title: "Given Up", artist: "Linkin Park", genre: "nu-metal", tags: ["overdrive","scream","intensity","cathartic"], energy: 92, valence: -0.2, soundDescription: "17초짜리 절규 — 록 역사상 가장 강렬한 단일 순간." },
  { id: "t180", title: "Uprising", artist: "Muse", genre: "rock", tags: ["overdrive","resistance","synth","anthem"], energy: 85, valence: 0.2, soundDescription: "저항을 선동하는 신스 록 — 뮤즈의 음모론적 세계관이 집약된다." },
  { id: "t181", title: "Psycho", artist: "Muse", genre: "rock", tags: ["overdrive","military","intense","riff"], energy: 88, valence: 0.0, soundDescription: "군사적 리듬으로 만든 록 — 매트 벨라미의 가장 사이코틱한 순간." },
  { id: "t182", title: "Hysteria", artist: "Muse", genre: "rock", tags: ["overdrive","bass","urgent","powerful"], energy: 90, valence: 0.1, soundDescription: "베이스 리프가 세상을 뒤흔드는 — 크리스 월스텐홀름의 시간." },
  { id: "t183", title: "Undisclosed Desires", artist: "Muse", genre: "rock", tags: ["overdrive","synth","dark","desire"], energy: 70, valence: 0.1, soundDescription: "드러내지 않은 욕망을 신스 팝으로 — 뮤즈의 의외의 부드러움." },
  { id: "t184", title: "Teenagers", artist: "My Chemical Romance", genre: "emo", tags: ["overdrive","teen","sarcastic","punk"], energy: 80, valence: 0.0, soundDescription: "10대를 향한 냉소적 경고 — MCR의 블랙 유머." },
  { id: "t185", title: "Helena", artist: "My Chemical Romance", genre: "emo", tags: ["overdrive","grief","theatrical","guitar"], energy: 78, valence: -0.15, soundDescription: "할머니를 위한 진혼곡이 이렇게 웅장할 수 있다 — MCR의 감정적 극장." },
  { id: "t186", title: "Paralyzer", artist: "Finger Eleven", genre: "rock", tags: ["overdrive","club","groove","hook"], energy: 82, valence: 0.2, soundDescription: "클럽에서 움직이지 못하게 마비시키는 — 록과 댄스의 경계에서." },
  { id: "t187", title: "Before He Cheats", artist: "Carrie Underwood", genre: "country pop", tags: ["overdrive","revenge","country","anger"], energy: 75, valence: 0.0, soundDescription: "바람피운 남자친구의 차를 부수는 — 컨트리 복수 서사의 정점." },
  { id: "t188", title: "Since U Been Gone", artist: "Kelly Clarkson", genre: "pop rock", tags: ["overdrive","liberation","breakup","power"], energy: 82, valence: 0.4, soundDescription: "이별이 자유가 된다는 선언 — 팝록의 카타르시스." },
  { id: "t189", title: "Roar", artist: "Katy Perry", genre: "pop", tags: ["overdrive","empowerment","pop","loud"], energy: 78, valence: 0.6, soundDescription: "사자처럼 포효하는 자기 발견 — 케이티 페리의 가장 강렬한 선언." },
  { id: "t190", title: "Eye of the Tiger", artist: "Survivor", genre: "rock", tags: ["overdrive","motivation","80s","sports"], energy: 85, valence: 0.4, soundDescription: "록키의 그 노래 — 운동을 시작하게 만드는 80년대 최강의 록." },
  { id: "t191", title: "We Will Rock You", artist: "Queen", genre: "rock", tags: ["overdrive","stomping","anthem","classic"], energy: 82, valence: 0.4, soundDescription: "발구르기 두 번, 손뼉 한 번 — 가장 단순한 리듬이 가장 강력한 이유." },
  { id: "t192", title: "We Are the Champions", artist: "Queen", genre: "rock", tags: ["overdrive","victory","anthem","classic"], energy: 78, valence: 0.6, soundDescription: "우리가 챔피언 — 모든 승리의 순간에 울려 퍼지는 노래." },
  { id: "t193", title: "Thunderstruck", artist: "AC/DC", genre: "hard rock", tags: ["overdrive","riff","energy","classic"], energy: 90, valence: 0.3, soundDescription: "앙귀스의 기타 인트로 — 번개처럼 에너지가 치고 들어온다." },
  { id: "t194", title: "Back in Black", artist: "AC/DC", genre: "hard rock", tags: ["overdrive","classic","riff","iconic"], energy: 88, valence: 0.3, soundDescription: "검은 옷을 입고 돌아왔다 — 록 역사상 가장 많이 팔린 앨범의 오프닝." },
  { id: "t195", title: "Highway to Hell", artist: "AC/DC", genre: "hard rock", tags: ["overdrive","freedom","road","classic"], energy: 87, valence: 0.35, soundDescription: "지옥으로 가는 고속도로가 이렇게 즐거울 수 있다 — 록의 본질." },

  // ── STATIC / HOLLOW / MINIMAL ──────────────────────────────────────────────
  { id: "t006", title: "4:33", artist: "John Cage", genre: "experimental", tags: ["static","silence","concept","minimal"], energy: 5, valence: 0.0, soundDescription: "방이 자기 자신을 듣는 소리." },
  { id: "t008", title: "Motion Picture Soundtrack", artist: "Radiohead", genre: "art rock", tags: ["hollow","orchestral","sad","cinematic"], energy: 20, valence: -0.6, soundDescription: "오르간과 현악이 거의 침묵 속으로 사라지는 장면." },
  { id: "t015", title: "Breathe (2 AM)", artist: "Anna Nalick", genre: "singer-songwriter", tags: ["hollow","vulnerability","piano","acoustic"], energy: 22, valence: -0.3, soundDescription: "피아노 위의 고백 — 날 것 그대로, 가감 없이." },
  { id: "t029", title: "The Sound of Silence", artist: "Simon & Garfunkel", genre: "folk", tags: ["hollow","classic","silence","timeless"], energy: 30, valence: -0.2, soundDescription: "어둠 속에서 침묵에게 건네는 말 — 반세기가 지나도 유효하다." },
  { id: "t035", title: "Mad World", artist: "Gary Jules", genre: "alternative", tags: ["hollow","sad","minimal","cover"], energy: 18, valence: -0.55, soundDescription: "피아노 한 대와 목소리만 — 세상의 허무함이 응축된다." },
  { id: "t196", title: "Atmosphere", artist: "Joy Division", genre: "post-punk", tags: ["hollow","dark","minimal","iconic"], energy: 22, valence: -0.5, soundDescription: "이언 커티스의 목소리와 드럼 — 어둠이 리듬을 갖는다." },
  { id: "t197", title: "Love Will Tear Us Apart", artist: "Joy Division", genre: "post-punk", tags: ["hollow","breakup","cult","classic"], energy: 48, valence: -0.35, soundDescription: "사랑이 우리를 찢어놓는다 — 조이 디비전의 가장 유명한 역설." },
  { id: "t198", title: "Hurt", artist: "Nine Inch Nails", genre: "industrial", tags: ["hollow","pain","addiction","raw"], energy: 35, valence: -0.6, soundDescription: "스스로를 다치게 하는 것만이 살아있음을 느끼게 한다 — NIN의 가장 취약한 순간." },
  { id: "t199", title: "Hurt (Johnny Cash cover)", artist: "Johnny Cash", genre: "country", tags: ["hollow","mortality","regret","legendary"], energy: 25, valence: -0.55, soundDescription: "노인이 되어 부르는 — 원곡보다 더 무겁고 더 진짜인 이유." },
  { id: "t200", title: "Enjoy the Silence", artist: "Depeche Mode", genre: "synth-pop", tags: ["hollow","silence","minimalist","80s"], energy: 55, valence: -0.2, soundDescription: "침묵을 즐겨라 — 말이 너무 많다는 가장 냉정한 선언." },
  { id: "t201", title: "Fade to Black", artist: "Metallica", genre: "heavy metal", tags: ["hollow","dark","slow","introspective"], energy: 55, valence: -0.5, soundDescription: "메탈리카의 가장 어둡고 느린 노래 — 검게 사라지는 것의 아름다움." },
  { id: "t202", title: "Black Hole Sun", artist: "Soundgarden", genre: "grunge", tags: ["hollow","surreal","dark","classic"], energy: 52, valence: -0.3, soundDescription: "태양이 블랙홀이 된다면 — 크리스 코넬의 목소리로 들어야 한다." },
  { id: "t203", title: "The Becoming", artist: "Nine Inch Nails", genre: "industrial", tags: ["hollow","isolation","dark","long"], energy: 60, valence: -0.4, soundDescription: "무언가가 되어가는 공포 — NIN의 가장 길고 어두운 여정." },
  { id: "t204", title: "Casimir Pulaski Day", artist: "Sufjan Stevens", genre: "indie folk", tags: ["hollow","grief","religion","cancer"], energy: 18, valence: -0.4, soundDescription: "친구의 죽음을 목요일로 기억하는 — 슬픔을 날짜로 고정시킨다." },
  { id: "t205", title: "Death With Dignity", artist: "Sufjan Stevens", genre: "indie folk", tags: ["hollow","father","death","tender"], energy: 15, valence: -0.3, soundDescription: "아버지의 죽음을 존엄하게 받아들이는 — 가장 조용한 그리움." },
  { id: "t206", title: "Casimir Pulaski Day", artist: "Sufjan Stevens", genre: "indie folk", tags: ["hollow","grief","religion","banjo"], energy: 18, valence: -0.4, soundDescription: "죽음을 종교적으로 받아들이는 것의 복잡함 — 밴조 한 대의 무게." },
  { id: "t207", title: "No Surprises", artist: "Radiohead", genre: "alternative", tags: ["hollow","numbness","suburban","lullaby"], energy: 25, valence: -0.3, soundDescription: "충격 없는 삶을 원하는 — 글로켄슈필 멜로디가 자장가처럼 마비시킨다." },
  { id: "t208", title: "Exit Music (For a Film)", artist: "Radiohead", genre: "alternative", tags: ["hollow","cinematic","escape","dark"], energy: 42, valence: -0.4, soundDescription: "영화가 끝난 후의 음악 — 도망치는 연인들을 위한 어두운 찬가." },
  { id: "t209", title: "How to Disappear Completely", artist: "Radiohead", genre: "alternative", tags: ["hollow","dissociation","strings","dream"], energy: 28, valence: -0.5, soundDescription: "이것은 나에게 일어나고 있지 않다 — 현실 부정을 현악으로 표현." },
  { id: "t210", title: "Street Spirit (Fade Out)", artist: "Radiohead", genre: "alternative", tags: ["hollow","dark","guitar","bleak"], energy: 30, valence: -0.55, soundDescription: "길의 정신이 사라진다 — 라디오헤드의 가장 어두운 아르페지오." },
  { id: "t211", title: "Carbon Monoxide", artist: "Sufjan Stevens", genre: "indie folk", tags: ["hollow","death","quiet","sparse"], energy: 12, valence: -0.45, soundDescription: "소리 없이 스며드는 것들에 대하여 — 가장 조용한 공포." },
  { id: "t212", title: "Disintegration Loop 1.1", artist: "William Basinski", genre: "ambient", tags: ["hollow","decay","loop","9/11"], energy: 5, valence: -0.2, soundDescription: "녹음 테이프가 분해되며 만들어진 — 9/11과 함께 역사에 새겨진 소리." },
  { id: "t213", title: "Archangel", artist: "Burial", genre: "dubstep", tags: ["hollow","urban","rain","melancholy"], energy: 38, valence: -0.3, soundDescription: "도시의 새벽, 빗소리 — 버리얼의 고독한 전자음이 인간적이다." },
  { id: "t214", title: "Lullaby for a Stormy Night", artist: "Vienna Teng", genre: "singer-songwriter", tags: ["hollow","lullaby","storm","tender"], energy: 18, valence: 0.0, soundDescription: "폭풍우 속 자장가 — 두려움을 달래는 목소리의 힘." },
  { id: "t215", title: "Nothing Compares 2 U", artist: "Sinéad O'Connor", genre: "pop", tags: ["hollow","grief","loss","iconic"], energy: 28, valence: -0.55, soundDescription: "그 무엇도 당신과 비교할 수 없다 — 뮤직비디오의 눈물 한 방울이 역사가 됐다." },
  { id: "t216", title: "Creep", artist: "Radiohead", genre: "alternative", tags: ["hollow","self-loathing","outsider","90s"], energy: 52, valence: -0.4, soundDescription: "나는 어기고, 나는 이상하다 — 소외감의 가장 솔직한 고백." },
  { id: "t217", title: "Karma Police", artist: "Radiohead", genre: "alternative", tags: ["hollow","vengeance","piano","drone"], energy: 45, valence: -0.25, soundDescription: "카르마 경찰에게 신고하는 — 라디오헤드의 피아노 드론 세계." },
  { id: "t218", title: "Videotape", artist: "Radiohead", genre: "alternative", tags: ["hollow","mortality","piano","final"], energy: 22, valence: -0.4, soundDescription: "죽는 날 카메라에 담기고 싶은 것들 — 라디오헤드의 마지막 선물." },
  { id: "t219", title: "That's How I Knew This Story Would Break My Heart", artist: "Aimee Mann", genre: "singer-songwriter", tags: ["hollow","sadness","storytelling","quiet"], energy: 20, valence: -0.4, soundDescription: "이야기가 어떻게 끝날지 처음부터 알았던 — 체념의 아름다움." },
  { id: "t220", title: "I Can't Make You Love Me", artist: "Bonnie Raitt", genre: "r&b", tags: ["hollow","unrequited","acceptance","sad"], energy: 25, valence: -0.45, soundDescription: "당신을 사랑하게 만들 수 없다 — 체념의 궁극적 표현." },
  { id: "t221", title: "Cemeteries of London", artist: "Coldplay", genre: "alternative", tags: ["hollow","death","drums","dark"], energy: 55, valence: -0.3, soundDescription: "런던의 묘지들 — 콜드플레이의 가장 어둡고 타악기적인 순간." },
  { id: "t222", title: "Pyramid Song", artist: "Radiohead", genre: "alternative", tags: ["hollow","jazz","piano","afterlife"], energy: 30, valence: -0.2, soundDescription: "피라미드 송 — 재즈 피아노와 함께 죽음 이후를 상상한다." },
  { id: "t223", title: "Complications of You", artist: "Hozier", genre: "blues rock", tags: ["hollow","longing","guitar","bluesy"], energy: 35, valence: -0.15, soundDescription: "당신의 복잡함 — 호지어의 블루지한 그리움." },
  { id: "t224", title: "From Eden", artist: "Hozier", genre: "indie folk", tags: ["hollow","dark","biblical","desire"], energy: 40, valence: -0.1, soundDescription: "에덴으로부터의 추방을 욕망으로 — 호지어의 성경적 색정." },
  { id: "t225", title: "Work Song", artist: "Hozier", genre: "blues", tags: ["hollow","love","devotion","gospel"], energy: 38, valence: 0.1, soundDescription: "당신 없이는 아무 일도 할 수 없다는 고백 — 블루스와 복음성가 사이." },

  // ── K-POP / KOREAN INDIE ───────────────────────────────────────────────────
  { id: "t226", title: "Through the Night", artist: "IU", genre: "k-pop", tags: ["calm","korean","night","tender"], energy: 28, valence: 0.2, soundDescription: "밤새 당신 곁에 있고 싶다는 — 아이유의 가장 따뜻한 자장가." },
  { id: "t227", title: "Palette", artist: "IU ft. G-Dragon", genre: "k-pop", tags: ["calm","maturity","identity","bittersweet"], energy: 42, valence: 0.3, soundDescription: "25살의 자화상 — 더 이상 증명할 필요가 없다는 선언." },
  { id: "t228", title: "Black Swan", artist: "BTS", genre: "k-pop", tags: ["echo","art","losing passion","poetic"], energy: 55, valence: -0.1, soundDescription: "예술에 대한 열정을 잃는 공포를 무용으로 — BTS의 가장 예술적인 순간." },
  { id: "t229", title: "Fly", artist: "Epik High ft. Tablo", genre: "k-hip-hop", tags: ["spark","freedom","classic","korean hip-hop"], energy: 68, valence: 0.4, soundDescription: "한국 힙합의 고전 — 나는 법을 잃었던 사람들의 이야기." },
  { id: "t230", title: "Yanghwa BRDG", artist: "Zion.T", genre: "k-r&b", tags: ["calm","bridge","city","introspective"], energy: 35, valence: 0.1, soundDescription: "양화대교 위에서 — 우리가 모두 지나갔던 그 다리의 기억." },
  { id: "t231", title: "Instagram", artist: "Dean", genre: "k-r&b", tags: ["echo","social media","yearning","smooth"], energy: 45, valence: -0.05, soundDescription: "소셜 미디어로 떠보는 사람 — 딘의 부드럽고도 날카로운 감각." },
  { id: "t232", title: "Beautiful", artist: "Crush", genre: "k-r&b", tags: ["calm","love","smooth","warm"], energy: 38, valence: 0.5, soundDescription: "아름다운 사람에게 건네는 가장 단순한 말 — 크러쉬의 따뜻함." },
  { id: "t233", title: "Star", artist: "Heize", genre: "k-r&b", tags: ["echo","longing","star","sadness"], energy: 30, valence: -0.15, soundDescription: "별에 담은 그리움 — 헤이즈 특유의 허스키한 목소리." },
  { id: "t234", title: "Me After You", artist: "Paul Kim", genre: "k-pop", tags: ["hollow","breakup","rain","piano"], energy: 22, valence: -0.35, soundDescription: "당신 이후의 나 — 폴킴의 담담한 목소리에 담긴 이별." },
  { id: "t235", title: "Autumn Letter", artist: "AKMU", genre: "k-pop", tags: ["echo","nostalgia","siblings","seasonal"], energy: 32, valence: -0.1, soundDescription: "가을 편지 — 악뮤 남매의 감성이 계절과 만나는 순간." },
  { id: "t236", title: "Wi Ing Wi Ing", artist: "Hyukoh", genre: "korean indie", tags: ["echo","youth","guitar","nostalgic"], energy: 48, valence: 0.1, soundDescription: "위잉위잉 — 혁오의 청춘 소음, 기타가 감정을 대신한다." },
  { id: "t237", title: "For Lovers Who Hesitate", artist: "Jannabi", genre: "korean indie", tags: ["echo","love","retro","guitar"], energy: 55, valence: 0.2, soundDescription: "망설이는 연인들을 위하여 — 잔나비의 레트로한 록 감성." },
  { id: "t238", title: "Ocean of Light", artist: "Nell", genre: "korean rock", tags: ["echo","vast","emotional","guitars"], energy: 52, valence: -0.1, soundDescription: "빛의 바다 위에서 — 넬의 광활한 사운드스케이프." },
  { id: "t239", title: "나의 사람", artist: "10cm", genre: "korean indie", tags: ["calm","love","acoustic","honest"], energy: 30, valence: 0.4, soundDescription: "나의 사람 — 10cm의 단순하고 진심 어린 사랑 고백." },
  { id: "t240", title: "어디선가 잃어버렸을 너에게", artist: "10cm", genre: "korean indie", tags: ["echo","loss","nostalgia","acoustic"], energy: 25, valence: -0.2, soundDescription: "어딘가에서 잃어버린 당신에게 — 10cm의 가장 애틋한 순간." },
  { id: "t241", title: "Comes and Goes", artist: "Oh Hyuk", genre: "korean indie", tags: ["echo","dreamy","guitar","indie"], energy: 42, valence: 0.05, soundDescription: "왔다 갔다 — 오혁의 몽환적인 기타 사운드." },
  { id: "t242", title: "Egotistic", artist: "Mamamoo", genre: "k-pop", tags: ["spark","confidence","retro","girl group"], energy: 75, valence: 0.6, soundDescription: "이기적이라도 괜찮아 — 마마무의 자신감 넘치는 라틴 팝." },
  { id: "t243", title: "Dynamite", artist: "BTS", genre: "k-pop", tags: ["spark","disco","fun","global"], energy: 80, valence: 0.8, soundDescription: "다이너마이트처럼 — BTS의 첫 영어 노래, 팬데믹 시대의 빛." },
  { id: "t244", title: "Likey", artist: "TWICE", genre: "k-pop", tags: ["spark","social media","cute","upbeat"], energy: 78, valence: 0.75, soundDescription: "좋아요를 누르고 싶게 만드는 — 트와이스의 중독성 있는 팝." },
  { id: "t245", title: "Red Flavor", artist: "Red Velvet", genre: "k-pop", tags: ["spark","summer","funky","fresh"], energy: 82, valence: 0.8, soundDescription: "빨간 맛 — 레드벨벳의 여름 팝, 달콤하고 새콤한 에너지." },
  { id: "t246", title: "ELEVEN", artist: "IVE", genre: "k-pop", tags: ["spark","debut","love","confident"], energy: 75, valence: 0.7, soundDescription: "열한 번째 사람 — 아이브의 데뷔곡, 독보적인 존재감." },
  { id: "t247", title: "Next Level", artist: "aespa", genre: "k-pop", tags: ["overdrive","metaverse","concept","unique"], energy: 85, valence: 0.5, soundDescription: "다음 레벨로 — 에스파의 메타버스 세계관이 음악이 된 독특한 경험." },
  { id: "t248", title: "Pink Venom", artist: "BLACKPINK", genre: "k-pop", tags: ["overdrive","badass","confident","global"], energy: 85, valence: 0.4, soundDescription: "핑크 독약 — 블랙핑크의 가장 날카롭고 자신감 있는 에너지." },
  { id: "t249", title: "SOLO", artist: "JENNIE", genre: "k-pop", tags: ["spark","independence","confident","breakup"], energy: 68, valence: 0.5, soundDescription: "혼자서도 충분하다는 — 제니의 솔로가 자립의 선언이 된 이유." },
  { id: "t250", title: "Celebrity", artist: "IU", genre: "k-pop", tags: ["spark","self-love","tribute","warm"], energy: 60, valence: 0.7, soundDescription: "당신은 나의 셀러브리티 — 아이유가 팬들에게 바치는 사랑." },

  // ── JAZZ / SOUL / BLUES ────────────────────────────────────────────────────
  { id: "t251", title: "So What", artist: "Miles Davis", genre: "jazz", tags: ["calm","cool jazz","modal","classic"], energy: 32, valence: 0.3, soundDescription: "카인드 오브 블루의 첫 트랙 — '그래서 뭐?'라는 가장 쿨한 태도." },
  { id: "t252", title: "A Love Supreme", artist: "John Coltrane", genre: "jazz", tags: ["calm","spiritual","saxophone","dedication"], energy: 48, valence: 0.3, soundDescription: "신에 대한 사랑을 색소폰으로 — 콜트레인의 영적 절정." },
  { id: "t253", title: "My Favorite Things", artist: "John Coltrane", genre: "jazz", tags: ["spark","soprano sax","energetic","reinterpretation"], energy: 62, valence: 0.4, soundDescription: "사운드 오브 뮤직의 곡을 완전히 재창조 — 콜트레인의 소프라노 색소폰 폭발." },
  { id: "t254", title: "Round Midnight", artist: "Thelonious Monk", genre: "jazz", tags: ["echo","midnight","piano","melancholy"], energy: 35, valence: -0.15, soundDescription: "자정의 고독을 피아노로 — 몽크 특유의 어긋난 화음이 완벽하다." },
  { id: "t255", title: "Summertime", artist: "Ella Fitzgerald & Louis Armstrong", genre: "jazz", tags: ["calm","classic","summer","vocals"], energy: 28, valence: 0.2, soundDescription: "여름 자장가 — 엘라와 루이의 목소리가 만든 완벽한 여름." },
  { id: "t256", title: "What a Wonderful World", artist: "Louis Armstrong", genre: "jazz", tags: ["calm","optimism","simple","timeless"], energy: 20, valence: 0.7, soundDescription: "얼마나 아름다운 세상인지 — 그의 쉰 목소리로 들어야 비로소 믿긴다." },
  { id: "t257", title: "Ain't No Sunshine", artist: "Bill Withers", genre: "soul", tags: ["echo","breakup","simple","classic"], energy: 40, valence: -0.3, soundDescription: "그녀가 없을 때는 햇살도 없다 — 19번의 '아이 노우'가 전부를 말한다." },
  { id: "t258", title: "Lean on Me", artist: "Bill Withers", genre: "soul", tags: ["spark","community","support","classic"], energy: 55, valence: 0.6, soundDescription: "기대도 돼 — 인류 역사상 가장 따뜻한 노래 중 하나." },
  { id: "t259", title: "Superstition", artist: "Stevie Wonder", genre: "funk soul", tags: ["spark","groove","funk","classic"], energy: 82, valence: 0.4, soundDescription: "클라비넷의 리프 하나가 세상을 움직인다 — 스티비의 펑크 마스터피스." },
  { id: "t260", title: "I Was Made to Love Her", artist: "Stevie Wonder", genre: "soul", tags: ["spark","love","motown","upbeat"], energy: 75, valence: 0.7, soundDescription: "그녀를 사랑하기 위해 태어났다 — 모타운의 순수한 기쁨." },
  { id: "t261", title: "Respect", artist: "Aretha Franklin", genre: "soul", tags: ["overdrive","empowerment","classic","r-e-s-p-e-c-t"], energy: 82, valence: 0.6, soundDescription: "R-E-S-P-E-C-T — 아레사의 철자 하나하나가 혁명이었다." },
  { id: "t262", title: "Think", artist: "Aretha Franklin", genre: "soul", tags: ["overdrive","freedom","energetic","classic"], energy: 80, valence: 0.5, soundDescription: "자유에 대해 생각해봐 — 아레사가 외치는 자유." },
  { id: "t263", title: "At Last", artist: "Etta James", genre: "soul", tags: ["calm","love","classic","ballad"], energy: 30, valence: 0.6, soundDescription: "마침내 — 기다리던 사랑이 왔을 때의 그 안도감." },
  { id: "t264", title: "I'd Rather Go Blind", artist: "Etta James", genre: "blues", tags: ["hollow","heartbreak","raw","classic"], energy: 35, valence: -0.4, soundDescription: "차라리 눈이 멀고 싶다 — 에타 제임스의 가장 강렬한 고통." },
  { id: "t265", title: "Cross Road Blues", artist: "Robert Johnson", genre: "blues", tags: ["hollow","delta","legend","raw"], energy: 40, valence: -0.3, soundDescription: "악마와 계약을 맺은 기타리스트의 전설 — 블루스의 원형." },
  { id: "t266", title: "Stormy Monday", artist: "T-Bone Walker", genre: "blues", tags: ["hollow","monday","sadness","classic"], energy: 38, valence: -0.25, soundDescription: "월요일은 폭풍 같고 화요일도 슬프다 — 블루스의 요일 서사." },
  { id: "t267", title: "Hound Dog", artist: "Big Mama Thornton", genre: "blues", tags: ["overdrive","raw","original","fierce"], energy: 75, valence: 0.1, soundDescription: "엘비스 이전의 하운드 독 — 원작자의 분노가 훨씬 날카롭다." },
  { id: "t268", title: "Feel Like Going Home", artist: "Muddy Waters", genre: "blues", tags: ["hollow","delta","home","longing"], energy: 30, valence: -0.2, soundDescription: "집으로 돌아가고 싶은 마음 — 델타 블루스의 고향 그리움." },
  { id: "t269", title: "The Thrill Is Gone", artist: "B.B. King", genre: "blues", tags: ["hollow","loss","guitar","classic"], energy: 42, valence: -0.3, soundDescription: "설렘이 사라졌다 — BB 킹의 루실이 우는 소리." },
  { id: "t270", title: "Strange Fruit", artist: "Billie Holiday", genre: "jazz", tags: ["hollow","protest","dark","historic"], energy: 22, valence: -0.7, soundDescription: "이 노래를 들으면 쉽게 잊을 수 없다 — 역사의 가장 어두운 과거를 노래한다." },
  { id: "t271", title: "All of Me", artist: "Billie Holiday", genre: "jazz", tags: ["echo","love","vulnerability","classic"], energy: 30, valence: 0.2, soundDescription: "나의 전부를 당신에게 — 빌리 홀리데이의 목소리가 실연을 살아있게 한다." },
  { id: "t272", title: "Nature Boy", artist: "Nat King Cole", genre: "jazz", tags: ["echo","philosophy","love","timeless"], energy: 22, valence: 0.15, soundDescription: "가장 위대한 일은 사랑하고 사랑받는 것 — 단 한 줄의 진리." },
  { id: "t273", title: "Stardust", artist: "Nat King Cole", genre: "jazz", tags: ["echo","nostalgia","dreamy","standard"], energy: 28, valence: 0.2, soundDescription: "별먼지 같은 추억 — 냇 킹 콜의 목소리로 듣는 재즈 스탠다드의 정점." },
  { id: "t274", title: "The Girl from Ipanema", artist: "João Gilberto", genre: "bossa nova", tags: ["calm","brazil","easy","summer"], energy: 30, valence: 0.5, soundDescription: "이파네마의 소녀가 지나갈 때 — 보사노바의 탄생을 알린 명곡." },
  { id: "t275", title: "Desafinado", artist: "Stan Getz & João Gilberto", genre: "bossa nova", tags: ["calm","brazil","jazz","gentle"], energy: 35, valence: 0.4, soundDescription: "음치라서 미안해 — 약간의 어긋남이 완벽한 화음이 된다." },

  // ── LO-FI / INDIE / STUDY ──────────────────────────────────────────────────
  { id: "t276", title: "Don't Cry", artist: "J Dilla", genre: "lo-fi hip-hop", tags: ["calm","lo-fi","hip-hop","warm"], energy: 38, valence: 0.1, soundDescription: "제이 딜라의 따뜻한 비트가 울지 말라고 — 편안한 로파이의 원형." },
  { id: "t277", title: "Never Catch Me", artist: "Flying Lotus ft. Kendrick Lamar", genre: "jazz hip-hop", tags: ["spark","death","jazz","complex"], energy: 72, valence: 0.2, soundDescription: "죽음을 피할 수 없지만 춤추며 맞이하자 — 플라잉 로터스의 재즈 힙합." },
  { id: "t278", title: "Lite Spots", artist: "Kaytranada", genre: "electronic", tags: ["spark","groove","dance","smooth"], energy: 70, valence: 0.6, soundDescription: "가벼운 자리들 — 케이트라나다의 가장 부드러운 댄스 플로어." },
  { id: "t279", title: "Drunk", artist: "Thundercat", genre: "jazz funk", tags: ["spark","funky","bass","quirky"], energy: 65, valence: 0.4, soundDescription: "취해서 — 썬더캣의 베이스가 이상하고 아름다운 세계를 만든다." },
  { id: "t280", title: "Golden", artist: "Harry Styles", genre: "pop rock", tags: ["spark","summer","road trip","shiny"], energy: 72, valence: 0.7, soundDescription: "골든 — 해리 스타일스의 여름 팝록, 눈부시게 밝다." },
  { id: "t281", title: "Watermelon Sugar", artist: "Harry Styles", genre: "pop rock", tags: ["spark","summer","sensual","catchy"], energy: 75, valence: 0.7, soundDescription: "수박 설탕 — 여름을 맛으로 표현한 팝록." },
  { id: "t282", title: "Best Friend", artist: "Rex Orange County", genre: "indie pop", tags: ["calm","friendship","sincere","bedroom pop"], energy: 40, valence: 0.5, soundDescription: "가장 좋은 친구 — 렉스 오렌지 카운티의 침실 팝, 따뜻하고 진심이다." },
  { id: "t283", title: "Loving Is Easy", artist: "Rex Orange County", genre: "indie pop", tags: ["spark","love","light","optimistic"], energy: 58, valence: 0.7, soundDescription: "사랑은 쉽다 — 이렇게 단순하고 행복하면 안 될 것 같은 느낌." },
  { id: "t284", title: "This Is Home", artist: "Cavetown", genre: "bedroom pop", tags: ["calm","identity","safe","tender"], energy: 25, valence: 0.2, soundDescription: "이곳이 집이야 — 케이브타운의 약하고 진심 어린 목소리." },
  { id: "t285", title: "Prom Dress", artist: "mxmtoon", genre: "indie pop", tags: ["echo","teen","regret","ukulele"], energy: 30, valence: -0.1, soundDescription: "댄스파티 드레스 — 고등학교 시절의 회한을 우쿨렐레로." },
  { id: "t286", title: "Line Without a Hook", artist: "Ricky Montgomery", genre: "indie pop", tags: ["echo","heartbreak","simple","emotional"], energy: 35, valence: -0.2, soundDescription: "미끼 없는 낚싯줄 — 릭키 몽고메리의 단순하고 직접적인 고통." },
  { id: "t287", title: "Multi-Love", artist: "Unknown Mortal Orchestra", genre: "psychedelic", tags: ["spark","polyamory","funky","complex"], energy: 65, valence: 0.2, soundDescription: "여러 사람을 동시에 사랑하는 것의 복잡함 — UMO의 사이키델릭 펑크." },
  { id: "t288", title: "Tailwhip", artist: "Men I Trust", genre: "dream pop", tags: ["calm","ethereal","synth","dreamy"], energy: 40, valence: 0.2, soundDescription: "테일윕 — 멘아이트러스트의 몽환적인 신스팝이 현실과 꿈 사이를 떠다닌다." },
  { id: "t289", title: "Ivy", artist: "Frank Ocean", genre: "r&b", tags: ["echo","nostalgia","guitar","raw"], energy: 38, valence: -0.1, soundDescription: "아이비 — 프랭크 오션의 가장 날 것의 기타와 목소리." },
  { id: "t290", title: "Self Control", artist: "Frank Ocean", genre: "r&b", tags: ["echo","summer","yearning","vocal layers"], energy: 42, valence: -0.05, soundDescription: "자제력 — 보컬 레이어들이 쌓이며 여름의 그리움이 된다." },
  { id: "t291", title: "Chanel", artist: "Frank Ocean", genre: "r&b", tags: ["calm","identity","both sides","introspective"], energy: 40, valence: 0.1, soundDescription: "나는 양쪽을 다 본다 — 프랭크 오션의 정체성과 욕망에 대하여." },
  { id: "t292", title: "Chamber of Reflection", artist: "Mac DeMarco", genre: "indie pop", tags: ["echo","lo-fi","meditation","slow"], energy: 28, valence: -0.05, soundDescription: "반성의 방 — 맥 드마르코의 로파이 드림팝, 명상적이고 느리다." },
  { id: "t293", title: "Salad Days", artist: "Mac DeMarco", genre: "indie rock", tags: ["spark","youth","lazy","guitar"], energy: 52, valence: 0.3, soundDescription: "샐러드의 날들 — 청춘의 무기력함이 기타 팝이 된다." },
  { id: "t294", title: "Still Beating", artist: "Mac DeMarco", genre: "indie pop", tags: ["calm","love","sincere","slow"], energy: 30, valence: 0.3, soundDescription: "아직 뛰고 있어 — 맥 드마르코의 가장 순수한 사랑 고백." },
  { id: "t295", title: "Slow Burn", artist: "Kacey Musgraves", genre: "country pop", tags: ["calm","patience","life","optimistic"], energy: 35, valence: 0.4, soundDescription: "천천히 타오르는 — 카시 머스그레이브스의 인생에 대한 여유로운 태도." },
  { id: "t296", title: "Golden Hour", artist: "Kacey Musgraves", genre: "country pop", tags: ["spark","love","summer","golden"], energy: 55, valence: 0.7, soundDescription: "황금빛 시간 — 음악 자체가 황금빛으로 빛나는 컨트리 팝." },
  { id: "t297", title: "Rainbow", artist: "Kacey Musgraves", genre: "country pop", tags: ["hollow","hope","resilience","piano"], energy: 32, valence: 0.3, soundDescription: "비가 와도 무지개가 온다 — 힘든 시간을 통과하는 사람에게 주는 선물." },
  { id: "t298", title: "Everywhere", artist: "Fleetwood Mac", genre: "pop rock", tags: ["spark","love","80s","upbeat"], energy: 68, valence: 0.7, soundDescription: "어디에나 있어 — 플리트우드 맥의 80년대 팝록, 햇살처럼 가볍다." },
  { id: "t299", title: "Go Your Own Way", artist: "Fleetwood Mac", genre: "rock", tags: ["overdrive","breakup","classic","guitar"], energy: 75, valence: 0.1, soundDescription: "당신의 길을 가세요 — 실제 이별 중에 만든 가장 씁쓸한 록 명곡." },
  { id: "t300", title: "Dreams", artist: "Fleetwood Mac", genre: "pop rock", tags: ["echo","breakup","classic","60s vibe"], energy: 58, valence: 0.2, soundDescription: "꿈을 꾸지만 당신도 — 플리트우드 맥의 이별 노래 중 가장 아이러니한 것." },
];

// ── Search ────────────────────────────────────────────────────────────────────
export function searchTracks(query: string, limit = 10): SeedTrack[] {
  if (!query.trim()) return SEED_TRACKS.slice(0, limit);
  const q = query.toLowerCase();
  const scored = SEED_TRACKS.map((t) => {
    let score = 0;
    if (t.title.toLowerCase().includes(q)) score += 10;
    if (t.artist.toLowerCase().includes(q)) score += 8;
    if (t.genre.toLowerCase().includes(q)) score += 5;
    if (t.tags.some((tag) => tag.toLowerCase().includes(q))) score += 4;
    if (t.soundDescription.toLowerCase().includes(q)) score += 2;
    return { track: t, score };
  });
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.track);
}

// ── Signal-based recommendation ───────────────────────────────────────────────
export function recommendBySignals(
  energy: number,
  valence: number,
  genres: string[],
  count = 5
): SeedTrack[] {
  let candidates = SEED_TRACKS;

  if (genres.length > 0) {
    const filtered = candidates.filter((t) =>
      genres.some(
        (g) =>
          t.genre.toLowerCase().includes(g.toLowerCase()) ||
          t.tags.some((tag) => tag.toLowerCase().includes(g.toLowerCase()))
      )
    );
    if (filtered.length >= 3) candidates = filtered;
  }

  return candidates
    .map((t) => ({
      track: t,
      score: Math.sqrt(
        Math.pow((t.energy - energy) / 100, 2) + Math.pow(t.valence - valence, 2)
      ),
    }))
    .sort((a, b) => a.score - b.score)
    .slice(0, count)
    .map((s) => s.track);
}
