import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const samples = [
  {to: '/samples/quickstart', title: 'Developer Quickstart', text: 'From API key to first event in five minutes, with troubleshooting.'},
  {to: '/samples/ai-assisted-docs', title: 'AI-Assisted Docs Case Study', text: 'Consolidating ten procedures into one, with guardrails on accuracy.'},
  {to: '/samples/architecture-c4', title: 'C4 Architecture Overview', text: 'Context and container diagrams with the decisions behind them.'},
  {to: '/samples/runbook-high-cpu', title: 'Incident Runbook', text: 'Triage and resolution steps for sustained high CPU in production.'},
  {to: '/samples/api-reference', title: 'REST API Reference', text: 'Endpoint reference generated from an OpenAPI 3.0 specification.'},
  {to: '/samples/ssp-excerpt', title: 'System Security Plan Excerpt', text: 'NIST SP 800-171 control implementation statements for CMMC Level 2.'},
  {to: '/samples/sop-change-control', title: 'Change Control SOP', text: 'Roles, steps, and approval gates for production changes.'},
  {to: '/samples/release-notes', title: 'Release Notes', text: 'Customer-facing notes with upgrade and breaking-change guidance.'},
];

export default function Home() {
  return (
    <Layout title="Technical Writing Portfolio" description="Engineering, cloud, and security documentation samples by Abby Kendrick">
      <header className={styles.hero}>
        <div className="container">
          <h1>Abby Kendrick</h1>
          <p className={styles.lead}>
            Senior technical writer for engineering, cloud, and security documentation.
            Experience at Meta, Millennium, and Sierra Nevada Corporation.
          </p>
          <Link className="button button--primary button--lg" to="/samples">Browse the samples</Link>
        </div>
      </header>
      <main className="container margin-vert--lg">
        <div className={styles.grid}>
          {samples.map((s) => (
            <Link key={s.to} to={s.to} className={styles.card}>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Link>
          ))}
        </div>
        <p className={styles.note}>
          Every sample uses a fictional company, Meridian Analytics, and invented systems. No client material is included.
          The site is built with Docusaurus, written in Markdown, reviewed through pull requests, and deployed by GitHub Actions.
        </p>
      </main>
    </Layout>
  );
}
