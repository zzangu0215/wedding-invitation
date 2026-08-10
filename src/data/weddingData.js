// ------------------------------------------------------------------
// 청첩장 내용을 이 파일에서만 수정하면 전체 화면에 반영됩니다.
// 이미지는 public/photos/ 폴더에 넣고 아래 photos 항목의 파일명만 바꿔주세요.
// ------------------------------------------------------------------

// GitHub Pages처럼 하위 경로(/wedding-invitation/)에 배포해도 이미지가 깨지지 않도록
// vite의 base 경로를 붙여줍니다. public/ 기준 경로를 앞의 '/' 없이 넘기세요.
// 예: asset('photos/main.jpg') -> '/wedding-invitation/photos/main.jpg'
const asset = (path) => `${import.meta.env.BASE_URL}${path}`.replace(/([^:]\/)\/+/g, '$1');

const weddingData = {
  // 신랑 신부 기본 정보
  groom: {
    name: '박석준',
    fatherName: '박종철',
    motherName: '김묘진',
    // 청첩장 소개 문구 (선택, 비워두면 표시하지 않음)
    intro: '',
  },
  bride: {
    name: '이지은',
    fatherName: '이상록',
    motherName: '명주현',
    intro: '',
  },

  // 표지(Hero)에 표시할 부제 (선택)
  heroSubtitle: 'WEDDING INVITATION',

  // 예식 일시
  wedding: {
    // 실제 날짜 (JS Date에서 파싱 가능한 형식, 카운트다운/달력 계산에 사용)
    dateISO: '2026-09-13T15:00:00+09:00',
    // 화면에 보여줄 날짜 문구
    dateDisplay: '2026년 9월 13일 일요일 오후 3시',
    lunarDisplay: '음력 8월 2일',
  },

  // 예식장 정보
  venue: {
    name: '라포레홀',
    building: '안양 더파티움 7층',
    address: '경기도 안양시 동안구 시민대로 311 금강스마트빌딩',
    kakaoMapUrl: 'https://place.map.kakao.com/138147430',
    naverMapUrl: 'https://naver.me/IFgdHqLz',
  },

  // 모시는 글
  greeting: {
    title: '모시는 글',
    // 줄바꿈은 배열의 각 항목으로 표현합니다.
    lines: [
      '함께하는 시간 속에서',
      '서로에게 배우고,',
      '서로를 이해하며,',
      '조금씩 더 나은 사람이 되어갈 수 있었습니다.',
      '',
      '앞으로도 서로를 존중하고 배려하며,',
      '감사와 겸손을 잃지 않는 부부로 살아가고자 합니다.',
      '',
      '소중한 분들을 모시고',
      '저희의 약속을 나누고자 하오니,',
      '귀한 걸음으로 함께해 주시면 감사하겠습니다.',
    ],
  },

  // 주차 안내
  parking: [
    {
      label: '제1주차장',
      description: '본 건물 지하주차장',
      address: '안양시 동안구 시민대로 311',
    },
    {
      label: '제2주차장',
      description: '지아이에스(구 네온테크) 지하주차장',
      address: '안양시 동안구 부림로 146',
    },
    {
      label: '제3주차장',
      description: '이마트 평촌점',
      address: '안양시 동안구 시민대로 300',
    },
    {
      label: '제4주차장',
      description: '평촌칼라힐 주차빌딩 2층 이상',
      address: '안양시 동안구 시민대로 312',
    },
  ],

  // 마음 전하실 곳 (계좌 안내)
  accounts: {
    notice:
      '참석이 어려우신 분들을 위해 계좌번호를 기재하였습니다. 너그러운 마음으로 양해 부탁드립니다.',
    groomSide: {
      label: '신랑측',
      list: [
        { bank: '국민은행', number: '35880204359124', holder: '박석준' },
        { bank: '국민은행', number: '60310101280292', holder: '박종철' },
        { bank: '국민은행', number: '47452501036446', holder: '김묘진' },
      ],
    },
    brideSide: {
      label: '신부측',
      list: [
        { bank: '카카오뱅크', number: '3333326953920', holder: '이지은' },
        { bank: '하나은행', number: '71381038084307', holder: '이상록' },
        { bank: '전북은행', number: '1021011686567', holder: '명주현' },
      ],
    },
  },

  // 맺음말 (선택, 짧은 한 줄 정도)
  closing: {
    lines: ['저희 두 사람의 새로운 시작을', '따뜻한 마음으로 축복해 주세요.'],
  },

  // 푸터
  footer: {
    copyright: '© 2026 석준 & 지은. All rights reserved.',
    contact: '청첩장 제작 문의: jneration.code@gmail.com',
  },

  // 사진 -------------------------------------------------------------
  // 실제 사진은 public/photos/ 에 있습니다.
  // 원본은 프로젝트 루트 originals/ 폴더에 보관되어 있고(git 제외),
  // public/photos/ 안의 파일들은 모바일 로딩 속도를 위해 리사이즈·압축한 버전입니다.
  // 사진을 교체하려면 originals/ 에서 골라 같은 규격으로 변환 후 파일명을 맞춰주세요.
  // (mainPhoto를 null로 두면 자동으로 자리표시자가 표시됩니다)
  photos: {
    mainPhoto: asset('photos/main.jpg'),
    gallery: [
      asset('photos/gallery-01.jpg'),
      asset('photos/gallery-02.jpg'),
      asset('photos/gallery-03.jpg'),
      asset('photos/gallery-04.jpg'),
      asset('photos/gallery-05.jpg'),
      asset('photos/gallery-06.jpg'),
      asset('photos/gallery-07.jpg'),
      asset('photos/gallery-08.jpg'),
      asset('photos/gallery-09.jpg'),
      asset('photos/gallery-10.jpg'),
      asset('photos/gallery-11.jpg'),
      asset('photos/gallery-12.jpg'),
    ],
  },

  // 기능 on/off 스위치
  features: {
    showCountdown: true,
    showGallery: true,
  },
};

export default weddingData;
