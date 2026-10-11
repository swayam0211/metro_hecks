# 🚇 MetroFlow OCC — Ahmedabad–Gandhinagar Metro Intelligence System
> **GDG Gandhinagar Metro Hacks | Official Problem Statement: PS-04 — "No Day Is an Average Day"**  
> *Dynamic Schedule Injection & Intelligent Operations Control Center (OCC) for Gujarat Metro Rail Corporation (GMRC)*

---

## ⚡ Executive Summary

On a moving metro train or inside underground tunnels, cellular connectivity drops to zero. Simultaneously, city events—such as **95,000 spectators exiting an IPL match at Narendra Modi Stadium**, **35,000 candidates taking the GPSC civil service exam**, or sudden monsoon flash floods—create extreme passenger surges that standard static timetables cannot handle.

**The Fatal Flaw of Traditional Timetables:**  
If a transit authority casually reschedules regular trains, everyday office-goers and commuters get stranded and confused.

**The MetroFlow OCC Solution:**  
**Dynamic Headway Gap Injection**. MetroFlow OCC keeps the official base timetable **100% untouched and intact**, while dynamically calculating and injecting supplementary **"⚡ Special Rake Trains"** directly into headway gaps from Sabarmati Depot. When the event ends, the schedule automatically reverts to normal.

---

## 🎯 Key Innovations & Technical Highlights

| Feature | Engineering Implementation | Operational Impact |
| :--- | :--- | :--- |
| **🛡️ 100% Offline-First Architecture** | Local JSON data engines + client-side vector projection. Zero external Google Maps/Mapbox API calls. | Runs flawlessly inside underground tunnels on moving trains with Airplane Mode ON. |
| **⚡ Headway Injection Engine** | Algorithmic midpoint calculation between base trains; drops headway from **8.0 min down to 3.2 min**. | Eliminates dangerous platform overcrowding and stampede risks at surge stations. |
| **💰 Operational Profitability Model** | Computes additional traction electricity costs (`₹44,000`) vs. projected fare collection (`₹2,24,000`). | Generates **+₹1,80,000 Net Profit** per event for GMRC. |
| **🗺️ Offline Vector Radar Track Map** | Custom SVG track layout featuring the authentic **Sabarmati River** (`સાબરમતી નદી`) corridor, SP Ring Road, moving train capsules with speedometer telemetry, and platform crowd heatmaps. | OCC operators monitor live train movements (`REG-01 • 64km/h`, `⚡ SPL-04`) in real time. |
| **👥 Dual-Sided Information System** | **OCC Mode** (Rake IDs, depot origins, turnaround buffers) vs. **Commuter Mode** (Transparent departure board with *"Added for tonight's IPL match"* tags). | Prevents passenger confusion while giving engineers full technical control. |
| **🌐 Bilingual Operations** | One-click real-time toggle between **English** and **Gujarati (`ગુજરાતી`)** operator briefing briefs. | Tailored directly for Gujarat Metro OCC controllers and station masters. |
| **📡 Multi-Channel Dispatch** | Instant broadcast distribution to Passenger App notifications, Station Platform Displays (PIDS), and Depot Maintenance alerts. | Complete loop: Detection ➔ Approval ➔ Public Broadcast. |

---

## 🗺️ System Workflow Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CITY DISRUPTION FEED                            │
│   IPL Match (Motera)  •  GPSC Exam (GNLU)  •  Monsoon Red Alert Storm  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ (Surge Multiplier & Time Window)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                    METROFLOW INJECTION COCKPIT                         │
│  - Base Trains Preserved: [06:30] [06:38] [06:46] ... (Untouched)      │
│  - Injected Special Rakes: [22:05 ⚡] [22:15 ⚡] (Headway: 8m ➔ 3.2m)   │
│  - Financial Net Impact: +₹1,80,000 net fare gain                      │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ (OCC Operator 1-Click Approval ✓)
                                    ▼
┌───────────────────────────────────┴────────────────────────────────────┐
│                       DUAL DISPATCH INTERFACE                          │
├───────────────────────────────────┬────────────────────────────────────┤
│         GMRC OCC RADAR            │      COMMUTER DEPARTURE BOARD      │
│  - Offline SVG Corridor Track     │  - Unaltered Regular Departures    │
│  - Sabarmati River Overlay        │  - Injected ⚡ Special Rows         │
│  - Platform Heatmap Density       │  - Clear "Reason" Passenger Tag    │
│  - Real-Time Train Speedometer    │  - Next-Day Automatic Revert       │
└───────────────────────────────────┴────────────────────────────────────┘
```

---

## 🏙️ Pre-Configured Ahmedabad Event Scenarios

MetroFlow OCC comes pre-loaded with 5 authentic Gujarat urban disruption scenarios, plus an interactive custom injection simulator:

1. **🏏 IPL 2026 Match: GT vs MI at Narendra Modi Stadium (Motera)**
   - *Impact Level:* **CRITICAL**
   - *Crowd Surge:* **+22,400 passengers** | Headway: **8.0 min ➔ 3.2 min**
   - *Fleet Deployment:* 4 reserve rakes dispatched from Sabarmati Depot Siding 3.
   - *Financial Impact:* Additional electricity: `₹44,000` | Fare revenue: `₹2,24,000` | **Net Gain: +₹1,80,000**.

2. **🎓 GPSC Civil Services Prelims (GNLU & Infocity Hubs)**
   - *Impact Level:* **HIGH**
   - *Crowd Surge:* **+8,200 exam candidates** | Headway: **8.0 min ➔ 5.0 min**
   - *Fleet Deployment:* 2 extra morning rakes dispatched to handle 07:30–09:00 AM rush.

3. **🌧️ Monsoon Red Alert Storm (Ahmedabad Flood & Road Waterlogging)**
   - *Impact Level:* **HIGH**
   - *Crowd Surge:* **+14,600 diverted bus/car commuters** | Headway: **8.0 min ➔ 4.0 min**
   - *Failover:* Surface transport gridlock diverted safely to grade-separated elevated metro.

4. **🏛️ Vibrant Gujarat Global Summit (Mahatma Mandir Convention Centre)**
   - *Impact Level:* **MODERATE**
   - *Crowd Surge:* **+6,400 VIP delegates** | High-frequency airport & GIFT City express connectors.

5. **🚌 AMTS City Bus Drivers Strike**
   - *Impact Level:* **MODERATE**
   - *Crowd Surge:* **+11,200 passengers** | Corridor-wide feeder absorption.

6. **➕ Interactive Custom Scenario Simulator:**
   - Operators and hackathon judges can click **`+ Custom Event`**, input any event name (e.g., *"Coldplay Concert"*) and expected crowd size, and watch the algorithm compute rake requirements and net revenue in real time!

---

## 💻 Tech Stack & Offline Libraries

- **Framework:** Next.js (App Router, React 19)
- **Language:** TypeScript 5.0+ (Strict Type Checking)
- **Styling:** Vanilla CSS & Tailwind CSS (Custom luxury titanium design tokens)
- **Motion & Physics:** Framer Motion (Train kinematics & interactive transitions)
- **Delight & Feedback:** Canvas Confetti (Official schedule approval celebration)
- **Icons:** Lucide React
- **Map & Spatial:** Pure SVG + D3-Geo projections (100% offline; zero map tiles or internet calls needed)
- **Desktop Kiosk Launcher:** Windows Batch (`Launch_MetroFlow.bat`)

---

## 🚀 How to Run the App

### Option A: 1-Click Desktop Kiosk (Recommended for Demo)
Simply double-click the included batch file in the repository root:
```bat
Launch_MetroFlow.bat
```
*This launches MetroFlow OCC in a borderless, standalone mobile kiosk window (430×920) with no browser address bar or tabs—just like a native desktop application!*

---

### Option B: Standard Terminal Commands
1. Clone the repository:
   ```bash
   git clone https://github.com/swayam0211/metro_hecks.git
   cd metro_hecks
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## 📋 90-Second Judge Walkthrough Sequence

1. **Events Tab:** Browse the 5 Ahmedabad disruption scenarios or click **`+ Custom Event`** to test a custom crowd surge. Select **"IPL Match at Narendra Modi Stadium"**.
2. **Cockpit Tab:** Review the interactive headway timeline bar showing how headway drops from 8m to 3.2m. Toggle the Gujarati brief (`ગુજરાતી`), check the net financial gain (+₹1,80,000), and click **`Approve Schedule ✓`** to trigger the confetti celebration.
3. **Map Tab:** Observe the offline vector radar map featuring the Sabarmati River corridor, animated moving trains (`REG-01 • 64km/h` and `⚡ SPL-04`), and click on **Motera Stadium** to inspect live platform crowd telemetry (92% load).
4. **Board Tab:** Toggle between **OCC View** and **Commuter View** to verify that regular trains remain untouched while injected special trains appear with transparent reason tags.
5. **Broadcast Tab:** Select notification channels and click **`📡 Broadcast to All Channels Now`** to complete the end-to-end dispatch cycle.

---

## 👥 Authors & Acknowledgments

- **Project:** MetroFlow OCC
- **Hackathon:** Metro Hacks (GDG Gandhinagar)
- **Problem Statement:** PS-04 ("No Day Is an Average Day")
- **Target Network:** Ahmedabad–Gandhinagar Metro Corridor (Phase 1 & Phase 2), GMRC