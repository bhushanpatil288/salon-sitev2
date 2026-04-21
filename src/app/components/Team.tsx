import Image from "next/image";

const TEAM_MEMBERS = [{ name: "Pooja", role: "Owner & Lead Stylist" }];

export default function Team() {
  return (
    <section className="team" id="team">
      <div className="team__container">
        <p className="team__overline">The Stylist</p>
        <h2 className="team__heading">Meet Our Stylist</h2>

        <div className="team__grid">
          {TEAM_MEMBERS.map((member) => (
            <div key={member.name} className="team__card">
              <div className="team__image-wrapper">
                <Image
                  src="/team.png"
                  alt={`${member.name} — ${member.role}`}
                  fill
                  className="team__image"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="team__name-overlay">
                  <span className="team__name">{member.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="team__cta-wrapper">
          <a href="#team" className="team__cta">
            Click Here to Meet Them All →
          </a>
        </div>
      </div>
    </section>
  );
}
