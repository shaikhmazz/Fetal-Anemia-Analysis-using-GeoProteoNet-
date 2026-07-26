## 🏗️ Architecture

### 1. Current Architecture (What's Deployed Now)

![GeoProteoNet Architecture](./docs/architecture.png)

GeoProteoNet's current deployment runs on a single AWS VPC, isolated from the rest of the AWS account:

- **GitHub Actions CI/CD** builds, tests, and deploys the app on every push
- A **least-privilege IAM Role** grants the app read-only access to S3 — nothing more
- Inside the **VPC (GeoProteoNet-Network)**, a **Security Group** allows only HTTP/HTTPS traffic (ports 80/443) through
- A single **EC2 instance (t3.medium)** runs both application services as **Docker containers**:
  - **React Frontend (UI)** — the interface clinicians interact with
  - **FastAPI Backend (ML API)** — serves the two-stage ML pipeline (CNN segmentation + Random Forest classification)
- **Amazon S3** stores the model weights and training data, accessed by the backend via the IAM role
- The **clinician** accesses the app through their browser, hitting the React frontend directly

This is the architecture actually running in production today.

### 2. Future Architecture / Roadmap (Planned Expansion — Not Current State)

The diagram above also outlines where this deployment is headed next, moving from a single EC2 instance toward a more scalable, observable setup:

- **Infrastructure as Code** — provisioning managed by **Terraform**, with **Ansible** handling configuration management, both triggered from the same GitHub Actions pipeline
- **Amazon EKS** replacing the single EC2 instance, running the frontend, backend, and a separate **ML Inference Service** as individual pods
- **NGINX Ingress Controller** acting as a reverse proxy / load balancer in front of the pods
- **Route 53** handling DNS and routing incoming clinician traffic into the cluster
- **Observability stack** — **Prometheus** for metrics collection and **Grafana** for dashboards
- **Amazon CloudWatch** for centralized logging, metrics, and alerting

**Key future improvements:**
- Scalable container orchestration on EKS
- NGINX Ingress for high availability and routing
- Centralized monitoring with Prometheus + Grafana
- Logging & alerts with CloudWatch
- DNS management with Route53
- Infrastructure as Code with Terraform & configuration management with Ansible

