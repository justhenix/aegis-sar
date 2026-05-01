<div align="center">

# 🛰️ Aegis-SAR

**AI vision layer for search-and-rescue drones.**

![AMD](https://img.shields.io/badge/AMD-MI300X-red?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-Dashboard-black?style=for-the-badge&logo=next.js)
![FastAPI](https://img.shields.io/badge/FastAPI-AI_Backend-009688?style=for-the-badge&logo=fastapi)
![Vision AI](https://img.shields.io/badge/Multimodal-Vision_AI-blueviolet?style=for-the-badge)

*Drone frame in. Rescue intelligence out.*

</div>

Aegis-SAR turns raw drone footage into structured emergency insights, helping SAR teams identify survivors, hazards, and high-risk zones in seconds. Built as an end-to-end AI demo on AMD MI300X for the AMD Hackathon.

## How it works

```
Drone Image -> Next.js Dashboard -> FastAPI -> Qwen-VL / Llama Vision -> Incident Report
```

Upload an image. Get severity, confidence, and a recommended action back immediately.

```json
{
  "incident": "possible_survivor",
  "severity": "high",
  "confidence": 0.84,
  "action": "Send rescue team through eastern access route."
}
```

## Stack

| What             | Tech                                      |
|------------------|-------------------------------------------|
| UI Dashboard     | Next.js, React, Tailwind                  |
| AI Backend       | FastAPI, Python                           |
| Vision Model     | Qwen-VL / Llama 3.2 Vision               |
| GPU Infra        | AMD MI300X, ROCm, AMD Developer Cloud     |

## What it detects

- Possible survivors
- Fire and smoke hazards
- Collapsed structures
- Flooded or blocked routes
- High-risk rescue zones

## MVP scope

- [ ] Upload drone/SAR image
- [ ] Multimodal AI analysis
- [ ] Severity + confidence output
- [ ] Rescue recommendation
- [ ] Demo-safe mock mode

## Status

Hackathon WIP. 
Fast to build, easy to demo, useful by design.

## License

Apache 2.0

<div align="center">

*See faster. Rescue smarter.*

</div>
