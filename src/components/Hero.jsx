import weddingData from '../data/weddingData.js';

export default function Hero() {
  const { groom, bride, wedding, venue, heroSubtitle, photos } = weddingData;

  return (
    <section className="hero">
      <div className="hero__photo-wrap">
        {photos.mainPhoto ? (
          <img
            className="hero__photo"
            src={photos.mainPhoto}
            alt={`${groom.name}, ${bride.name} 커플 사진`}
          />
        ) : (
          <div className="hero__photo hero__photo--placeholder" role="img" aria-label="대표 사진 자리표시자">
            <span>MAIN PHOTO</span>
          </div>
        )}
      </div>

      <div className="hero__content">
        <p className="hero__eyebrow">{heroSubtitle}</p>
        <h1 className="hero__names">
          <span>{groom.name}</span>
          <span className="hero__amp">&amp;</span>
          <span>{bride.name}</span>
        </h1>
        <p className="hero__date">{wedding.dateDisplay}</p>
        <p className="hero__venue">
          {venue.name} · {venue.building}
        </p>
      </div>
    </section>
  );
}
