# Aegis-SAR

Aegis-SAR is a hardware-agnostic, cloud-based intelligence layer for search-and-rescue (SAR) drones. This project was developed for the AMD AI Hackathon to enable autonomous anomaly detection on standard drone fleets.

## Technical Specifications

### AI & Inference
* **Models:** Llama 3.2 Vision / Qwen-VL.
* **Methodology:** Zero-shot multimodal inference for real-time video processing.
* **Capabilities:** Identification of trapped survivors, fire hazards, and structural damage without prior model training.

### Infrastructure & Stack
* **Hardware:** Optimized for AMD Instinct MI300X GPUs.
* **Backend:** Python-based FastAPI for model orchestration and low-latency processing.
* **Frontend:** Next JS for the command and monitoring dashboard.
* **Protocol:** Cloud-linked video telemetry for real-time anomaly reporting.

## Key Features
* **Hardware Agnostic:** Deploys intelligence to existing drone hardware by offloading compute to the cloud.
* **Zero-Shot Pipeline:** Eliminates the need for time-consuming data labeling and training phases.
* **Multimodal Processing:** Simultaneously analyzes visual data and textual rescue protocols.
* **Centralized Dashboard:** Real-time device monitoring and incident logging.

## Development Status
Current phase: Initial prototype for AMD AI Hackathon.

## License
Apache License 2.0
