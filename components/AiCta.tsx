/**
 * AI Dream Interpretation CTA — interface stub only.
 * The button is intentionally disabled: no AI backend exists in Phase 2.
 */
export function AiCta() {
  return (
    <section className="ai-cta" aria-labelledby="ai-cta-heading">
      <h2 id="ai-cta-heading">AI Dream Interpretation</h2>
      <p>
        Describe your dream and receive a structured interpretation draft
        grounded in this knowledge base. The tool is under construction.
      </p>
      <div className="ai-cta__field">
        <textarea
          aria-label="Describe your dream"
          placeholder="I dreamed that…"
          disabled
        />
        <button type="button" className="ai-cta__btn" disabled>
          Interpret
        </button>
      </div>
      <div className="ai-cta__soon">Coming soon</div>
    </section>
  );
}
