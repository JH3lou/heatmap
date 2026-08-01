import { DocPage, DocH2, DocP, InlineCode, Callout, PropsTable } from "@/components/docs/doc"
import { CodeBlock } from "@/components/docs/code-block"

export const metadata = { title: "React · Testing & Automation — Account Heatmap Docs" }

export default function Page() {
  return (
    <DocPage
      title="Testing & Automation"
      lead="The component ships stable, semantic locators — data-slot / data-category plus real ARIA roles — so Playwright and agents can drive it reliably."
    >
      <DocH2>Locators</DocH2>
      <PropsTable
        rows={[
          { name: '[data-slot="heatmap"]', type: "root", description: "Also carries data-orientation and data-type (active type key)." },
          { name: '[data-slot="heatmap-type-select"]', type: "trigger", description: 'The type dropdown. aria-label="Select heatmap type".' },
          { name: '[data-slot="heatmap-segment"]', type: "bar segment", description: 'data-category, data-selected, role="button", aria-pressed, aria-label="<label>: <n> items (<pct>%)". Keyboard-activatable.' },
          { name: '[data-slot="heatmap-legend-item"]', type: "legend button", description: "Horizontal orientation only. data-category, data-selected, aria-pressed." },
        ]}
      />
      <Callout>
        These are deliberately <em>not</em> <InlineCode>data-testid</InlineCode> attributes — they
        double as accessibility hooks, so prefer role + accessible name where you can.
      </Callout>

      <DocH2>Playwright snippets</DocH2>
      <CodeBlock
        lang="ts"
        code={`// Toggle a category by its stable data-category
await page.locator('[data-slot="heatmap-segment"][data-category="Active"]').click()

// Or by accessible name
await page.getByRole('button', { name: /^Active:/ }).click()

// Assert a segment is selected
await expect(
  page.locator('[data-slot="heatmap-segment"][data-category="Active"]')
).toHaveAttribute('data-selected', 'true')

// Read the count a segment reports
const label = await page
  .locator('[data-slot="heatmap-segment"][data-category="Active"]')
  .getAttribute('aria-label')            // "Active: 5 items (50.0%)"

// Which type is showing?
const type = await page.locator('[data-slot="heatmap"]').getAttribute('data-type')`}
      />
      <DocP>
        Changing the type is a Radix Select — click{" "}
        <InlineCode>[data-slot=&quot;heatmap-type-select&quot;]</InlineCode> and pick an option by
        its visible text (each type&apos;s <InlineCode>label</InlineCode>).
      </DocP>

      <DocH2>Asserting filter state</DocH2>
      <DocP>
        With <InlineCode>HeatmapPanel</InlineCode>, assert on what <InlineCode>onFilter</InlineCode>{" "}
        reports (<InlineCode>filteredData</InlineCode>, <InlineCode>selectedType</InlineCode>,{" "}
        <InlineCode>selectedCategories</InlineCode>) rather than scraping the DOM — it is the
        source of truth. In unit tests, drive <InlineCode>useHeatmap</InlineCode> directly and
        assert on <InlineCode>filteredData</InlineCode>.
      </DocP>
    </DocPage>
  )
}
