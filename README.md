<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/header-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="assets/header-light.svg">
  <img src="assets/header-light.svg" width="100%" alt="Patrick Wong — AI and Data Engineering.">
</picture>

<p align="center">
  <a href="#about-me">About</a> &nbsp; · &nbsp;
  <a href="#selected-work">Selected work</a> &nbsp; · &nbsp;
  <a href="#what-im-exploring">AI interests</a> &nbsp; · &nbsp;
  <a href="#toolkit">Toolkit</a>
</p>

## About me

I'm **Patrick Wong**, focused on **AI and data engineering**. I'm interested in the full path from useful data to AI applications: preparing inputs, evaluating models, and building software around the results.

My current work explores computational intelligence for data-layout optimisation, combining Python experiments, SQL benchmarks, and a desktop results explorer.

## Selected work

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

`Python` &nbsp; `SQL` &nbsp; `DuckDB` &nbsp; `pandas` &nbsp; `NumPy` &nbsp; `scikit-learn` &nbsp; `Jupyter` &nbsp; `Tkinter`

---

<p align="center">
  <a href="https://github.com/junpat32?tab=repositories"><strong>More experiments & projects →</strong></a>
</p>
