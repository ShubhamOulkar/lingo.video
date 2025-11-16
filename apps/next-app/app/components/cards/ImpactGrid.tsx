import styles from "./ImpactGrid.module.css";

export default function ImpactGrid() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Impact & Benefits for Global Companies</h2>
      <div className={styles.grid}>
        {/* Card 1 */}
        <div className={styles.card}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={styles.icon}
          >
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4f46e5" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
            <path
              d="M5 13l4 4L19 7"
              stroke="url(#grad1)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <h3 className={styles.title}>Eliminates VTT file maintenance</h3>
          <p className={styles.description}>
            No need to manually create or store .vtt subtitle files for each
            language.
          </p>
        </div>

        {/* Card 2 */}
        <div className={styles.card}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={styles.icon}
          >
            <defs>
              <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
            </defs>
            <path
              d="M3 10h4l3 6 4-8 3 6h4"
              stroke="url(#grad2)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <h3 className={styles.title}>Reduces database and storage costs</h3>
          <p className={styles.description}>
            Subtitles are generated and translated on the fly, so companies
            don’t pay for storing multiple language files.
          </p>
        </div>

        {/* Card 3 */}
        <div className={styles.card}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={styles.icon}
          >
            <defs>
              <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#eab308" />
              </linearGradient>
            </defs>
            <path
              d="M9 12h6m-6 4h6m-6-8h6"
              stroke="url(#grad3)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <h3 className={styles.title}>Minimizes developer workload</h3>
          <p className={styles.description}>
            No extra development effort is required to maintain multilingual
            video content.
          </p>
        </div>

        {/* Card 4 */}
        <div className={styles.card}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={styles.icon}
          >
            <defs>
              <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#dc2626" />
              </linearGradient>
            </defs>
            <path
              d="M13 10V3L4 14h7v7l9-11h-7z"
              stroke="url(#grad4)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <h3 className={styles.title}>Faster time-to-market</h3>
          <p className={styles.description}>
            Videos can be shipped in days instead of months, accelerating global
            reach.
          </p>
        </div>

        {/* Card 5 */}
        <div className={styles.card}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={styles.icon}
          >
            <defs>
              <linearGradient id="grad5" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
            <path
              d="M12 4v16m8-8H4"
              stroke="url(#grad5)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <h3 className={styles.title}>Unlimited language support</h3>
          <p className={styles.description}>
            AI-driven translation opens the door to reaching any country in the
            world.
          </p>
        </div>

        {/* Card 6 */}
        <div className={styles.card}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={styles.icon}
          >
            <defs>
              <linearGradient id="grad6" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#14b8a6" />
                <stop offset="100%" stopColor="#0d9488" />
              </linearGradient>
            </defs>
            <path
              d="M5 12h14M12 5l7 7-7 7"
              stroke="url(#grad6)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <h3 className={styles.title}>Focus on product, not translation</h3>
          <p className={styles.description}>
            Teams can concentrate on improving the core product while the system
            handles multilingual content automatically.
          </p>
        </div>
      </div>
    </section>
  );
}
