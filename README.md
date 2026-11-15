<img src="assets/profile-banner-emerald.jpg" width="100%" alt="Patrick Wong, AI and Data Engineering">

<p align="center">
  <a href="#about-me">About</a> &nbsp; · &nbsp;
  <a href="#selected-work">Selected work</a> &nbsp; · &nbsp;
  <a href="#what-im-exploring">AI interests</a> &nbsp; · &nbsp;
  <a href="#toolkit">Toolkit</a>
</p>

## About me

I'm **Patrick Wong**, focused on **AI and data engineering**. I'm interested in the full path from useful data to AI applications: preparing inputs, evaluating models, and building software around the results.

My current work spans **explainable financial-risk modelling**, **data quality monitoring**, and **computational intelligence for SQL performance**. I focus on explicit contracts, reproducible evaluation, and evidence people can inspect.

## Selected work

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/fast-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="assets/fast-light.svg">
  <img src="assets/fast-light.svg" width="100%" alt="FAST — Explainable risk. Financial wellbeing. Private-source project.">
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
    <source media="(prefers-color-scheme: dark)" srcset="assets/data-quality-monitor-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="assets/data-quality-monitor-light.svg">
    <img src="assets/data-quality-monitor-light.svg" width="100%" alt="Data Quality Monitor — Reusable rules. Evidence comparisons. View the project.">
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

<a href="https://github.com/junpat32/layoutlab-ci">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/layoutlab-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="assets/layoutlab-light.svg">
    <img src="assets/layoutlab-light.svg" width="100%" alt="LayoutLab — Data-layout optimisation for analytical SQL. View the project.">
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

## What I'm exploring

- **Generative AI & agents:** retrieval-augmented generation (RAG), tool use, and evaluating LLM outputs.
- **ML engineering & MLOps:** reproducible training, model serving, monitoring, and evaluation pipelines.
- **Data engineering for AI:** data quality, SQL transformations, and efficient storage for AI workloads.
- **Intelligent optimisation:** evolutionary search and surrogate models for practical engineering problems.

**Current learning focus:** cloud AI/ML engineering on AWS, with associate-level certification preparation in progress.

## Toolkit

**Build:** `Python` &nbsp; `React Native` &nbsp; `PySide6` &nbsp; `Tkinter`

**Work with data:** `SQL` &nbsp; `DuckDB` &nbsp; `SQLite` &nbsp; `PyArrow` &nbsp; `pandas` &nbsp; `NumPy`

**Experiment:** `scikit-learn` &nbsp; `Jupyter`

**Test and package:** `pytest` &nbsp; `Ruff` &nbsp; `PyInstaller` &nbsp; `Inno Setup`

---

<p align="center">
  <a href="https://github.com/junpat32?tab=repositories"><strong>More experiments & projects →</strong></a>
</p>
