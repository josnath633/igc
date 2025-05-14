import React from 'react';

export default function AboutPage() {
  return (
    <div style={{
      padding: '2rem',
      fontFamily: 'Helvetica, Arial, sans-serif',
      maxWidth: '900px',
      margin: '0 auto',
      lineHeight: '1.7',
      color: '#333'
    }}>
      <h1 style={{ fontSize: '2.5rem', color: '#2c3e50', marginBottom: '1rem' }}>
        À propos de l'Église IGC
      </h1>

      <p style={{ fontSize: '1.2rem' }}>
        L'Église IGC (Iglesia de la Grâce et de la Compassion) est une communauté chrétienne vivante,
        centrée sur Jésus-Christ et animée par la puissance de l’amour de Dieu.
        Nous croyons que chacun mérite de vivre une transformation spirituelle profonde
        et de faire partie d'une famille unie par la foi.
      </p>

      <section style={{ marginTop: '2.5rem' }}>
        <h2 style={{ color: '#2980b9' }}>Notre mission</h2>
        <p>
          Apporter l’Évangile à tous, élever des disciples, et bâtir un environnement
          où la grâce, la vérité et l’amour de Dieu sont vécus au quotidien.
        </p>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ color: '#2980b9' }}>Nos valeurs</h2>
        <ul style={{ paddingLeft: '1.5rem' }}>
          <li>✨ Foi authentique</li>
          <li>💖 Amour inconditionnel</li>
          <li>🤝 Unité et entraide</li>
          <li>🙌 Service et engagement</li>
        </ul>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ color: '#27ae60' }}>Ceux qui ont codé ce site</h2>
        <p>
          Nous remercions chaleureusement les personnes talentueuses qui ont donné de leur temps et de
          leurs compétences pour créer ce site :
        </p>
        <ul style={{ paddingLeft: '1.5rem' }}>
        <li>👨‍💻 <strong>BOULINGUI MOUNGUENGUI JOSUE</strong> — Développeur backend</li>
          <li>👨‍💻 <strong>Nathalie SANDUKU ELITE</strong> — Développeur Frontend</li>
          <li>👩‍💻 <strong>Nathalie SANDUKU ELITE</strong> — Designer & intégratrice</li>
          <li>🧑‍💼 <strong>Aubin</strong> — Direction de contenu</li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          Que Dieu bénisse tous ceux qui mettent leur talent au service de Son royaume 🙏
        </p>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ color: '#8e44ad' }}>Rejoignez-nous</h2>
        <p>
          Nos cultes ont lieu chaque dimanche à 10h00. Nous serions ravis de vous accueillir en personne !
        </p>
      </section>
    </div>
  );
}
