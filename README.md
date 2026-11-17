<p>
  <picture>
    <source media="(prefers-reduced-motion: reduce)" srcset="assets/profile-banner-contours.png">
    <img src="assets/profile-banner-contours.gif" width="100%" alt="Patrick Wong, AI and Data Engineering">
  </picture>
</p>

I build explainable AI tools and data pipelines. I’m exploring RAG, AI agents, and model evaluation while preparing for AWS certification.

## Selected work

- **FAST** · Mobile prototype for explainable financial risk and Monte Carlo forecasts. _Private source._
- **[Data Quality Monitor](https://github.com/junpat32/data-quality-monitor)** · Windows validator that caught all **1,000 injected violations** in a 1M-row scan.
- **[Data Pipeline Toolkit](https://github.com/junpat32/data-pipeline-toolkit)** · CSV and Parquet delivery checks. Accepted **10,000 UCI retail records**.
- **[LayoutLab](https://github.com/junpat32/layoutlab-ci)** · Parquet tuning cut SQL runtime by **33–37%** on a 20.3M-row test workload.

**Toolkit** · Python, SQL, DuckDB, PyArrow, scikit-learn, Streamlit, React Native

[All repositories →](https://github.com/junpat32?tab=repositories)

<details>
<summary>Project details and benchmarks</summary>

<picture>
  <source media="(prefers-reduced-motion: reduce)" srcset="assets/fast-contours.png">
  <img src="assets/fast-contours.gif" width="100%" alt="FAST, explainable risk modelling. Illustration of a forecast and its range of possible outcomes.">
</picture>

**FAST — Financial Advisory and Safety Tracker** is a mobile financial-wellbeing prototype designed to make financial risk easier to understand. It brings together a Python assessment engine, explainable machine learning, scenario simulation, and a React Native application.

- **Assess and explain:** combine rule-based risk bands and a financial-health score with ML forecasts and traceable explanations of the model's reasoning.
- **Explore possible futures:** use Monte Carlo simulations and life-event scenarios to show a range of possible future balances and financial pressures.
- **Connect the experience:** bring transaction entry, risk views, forecast explanations, and a future-self view into a mobile app, with non-competitive progress feedback.
- **Ground the money helper:** use supplied financial facts to support explanations, with checks on quoted numbers and refusal handling for product or investment selections.

**Engineering focus:** connecting modelling and simulation to an application people can use, while keeping assessments, forecasts, and explanations distinct.

**Evaluation approach:** compare predictive models with transparent rule-based and probabilistic baselines; inspect calibration, sensitivity, and robustness; and test the assessment logic and application flows.

Predictive evaluation uses synthetic data. Real-world predictive performance and user-study outcomes have not been established. Forecast explanations describe model contributions, not causes of financial outcomes.

**Private source · In development**

<a href="https://github.com/junpat32/data-quality-monitor">
  <picture>
    <source media="(prefers-reduced-motion: reduce)" srcset="assets/data-quality-monitor-contours.png">
    <img src="assets/data-quality-monitor-contours.gif" width="100%" alt="View Data Quality Monitor, a project for reusable rules and evidence comparison.">
  </picture>
</a>

**[Data Quality Monitor](https://github.com/junpat32/data-quality-monitor)** is a local Windows desktop workspace for checking tabular data, reusing rule contracts, and comparing saved assessments. It supports CSV/TSV, selected Excel worksheets, and scalar Parquet.

- **Define and reuse:** column contracts, foreign keys, reconciliation, structured business checks, and immutable rule-template revisions.
- **Compare deliveries:** key-based baseline comparisons with compatibility checks, paged finding changes, and before/after record inspection.
- **Review and recover:** append-only review history, saved-evidence exports, resumable scans, and isolated input previews.

Recorded validation for **Windows beta 0.5.0b1**:

| Check | Recorded result |
| :--- | :--- |
| Automated suite | **108 tests passed** |
| Packaged CSV scan | **1,000,000 generated records** in **226.5 seconds** |
| Detection check | All **1,000 deliberately injected product-check violations** recorded |

The scan measurement uses one local, four-column synthetic workload. The Windows 11 x64 beta is unsigned, with separate clean-machine acceptance still pending.

**[User guide →](https://github.com/junpat32/data-quality-monitor/blob/main/USER_GUIDE.md)** &nbsp; [Recorded beta validation](https://github.com/junpat32/data-quality-monitor/blob/main/BETA_VALIDATION.md) &nbsp; [Packaging & acceptance](https://github.com/junpat32/data-quality-monitor/blob/main/BETA_RELEASE.md)

<a href="https://github.com/junpat32/data-pipeline-toolkit">
  <picture>
    <source media="(prefers-reduced-motion: reduce)" srcset="assets/data-pipeline-toolkit-contours.png">
    <img src="assets/data-pipeline-toolkit-contours.gif" width="100%" alt="View Data Pipeline Toolkit, a project for validating and reporting on recurring deliveries.">
  </picture>
</a>

**[Data Pipeline Toolkit](https://github.com/junpat32/data-pipeline-toolkit)** is a Python command-line tool for recurring CSV and Parquet deliveries. It validates incoming data against versioned rules and uses DuckDB to publish quality and business reports for a local Streamlit dashboard.

- **Handle repeated deliveries.** Skip exact duplicate imports, log failed attempts, and retry with a corrected file.
- **Trace each report.** Record the input file fingerprints and rule versions that produced it.
- **Reuse the workflow.** Run the same validation workflow for retail and inventory using separate dataset configurations.

Recorded results from the Windows verification

| Check | Recorded result |
| :--- | :--- |
| Synthetic retail demo | **8 of 9 records accepted**, with 2 rule findings. Negative-quantity lines reduced **£110 gross** to **£84 net**. |
| UCI Online Retail sample | **10,000 records accepted** from the first 10,000 rows. The report counted 130 negative-quantity lines and 2,280 UK lines with missing customer IDs. |
| Automated tests | **15 passed**, covering duplicate imports, rollback after failed ingestion, and dashboard filters. |

**[Try the demo →](https://github.com/junpat32/data-pipeline-toolkit#run-the-demo-on-windows)** &nbsp; [Verification record](https://github.com/junpat32/data-pipeline-toolkit/blob/main/docs/verification.md)

<a href="https://github.com/junpat32/layoutlab-ci">
  <picture>
    <source media="(prefers-reduced-motion: reduce)" srcset="assets/layoutlab-contours.png">
    <img src="assets/layoutlab-contours.gif" width="100%" alt="View LayoutLab, a project about Parquet layout and SQL performance.">
  </picture>
</a>

**[LayoutLab](https://github.com/junpat32/layoutlab-ci)** asks how Parquet storage choices affect analytical SQL performance. I built a computational intelligence experiment pipeline and a Python app for exploring the saved results.

Recorded results for the **20.3-million-row item-properties workload**, comparing the selected layout with the default:

| Measure | Recorded result |
| :--- | :--- |
| Workload runtime | **32.85% and 37.20% lower** in two separate 30-round paired sessions |
| Storage | **33.36% less** for the selected layout |
| Correctness | **624 query-result checks** across 78 saved layouts |

These results apply to the tested workload and laptop. Random search found the same layout as the genetic algorithm; the events workload's default remained fastest.

**[Code & methodology →](https://github.com/junpat32/layoutlab-ci#results-and-scope)** &nbsp; [Benchmark records](https://github.com/junpat32/layoutlab-ci/tree/main/notebook_outputs/validation/paired_runs)

<img src="assets/profile-divider.svg" width="100%" alt="">

</details>
