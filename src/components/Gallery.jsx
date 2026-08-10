import FadeIn from './FadeIn.jsx';
import Divider from './Divider.jsx';
import weddingData from '../data/weddingData.js';

export default function Gallery() {
  const { photos, features } = weddingData;

  if (!features.showGallery) return null;

  const hasPhotos = photos.gallery && photos.gallery.length > 0;
  // 사진이 없을 때는 자리표시자 4칸을 보여 레이아웃만 미리 확인할 수 있게 합니다.
  const items = hasPhotos ? photos.gallery : [null, null, null, null];

  return (
    <section className="section">
      <FadeIn>
        <Divider />
        <h2 className="section__title">갤러리</h2>
        <div className="gallery">
          {items.map((src, i) =>
            src ? (
              <img
                key={i}
                className="gallery__photo"
                src={src}
                alt={`갤러리 사진 ${i + 1}`}
                // 첫 두 장 외에는 스크롤해서 보일 때 받아오도록 해 초기 로딩을 가볍게 유지합니다.
                loading={i < 2 ? 'eager' : 'lazy'}
                decoding="async"
              />
            ) : (
              <div key={i} className="gallery__photo gallery__photo--placeholder">
                <span>{i + 1}</span>
              </div>
            )
          )}
        </div>
        {!hasPhotos && (
          <p className="gallery__hint">
            public/ 폴더에 사진을 넣고 weddingData.js의 photos.gallery 배열에
            파일명을 추가하면 표시됩니다.
          </p>
        )}
      </FadeIn>
    </section>
  );
}
