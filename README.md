# Disk Scheduling Algorithms Visualizer

## Table of Contents

1. [Introduction](#1-introduction)
2. [Features](#2-features)
3. [Tech Stack](#3-tech-stack)
4. [Local Setup](#4-local-setup)
5. [Disk Scheduling Algorithms](#5-disk-scheduling-algorithms)
   - [FCFS](#51-fcfs--first-come-first-serve)
   - [SSTF](#52-sstf--shortest-seek-time-first)
   - [SCAN](#53-scan--elevator-algorithm)
   - [C-SCAN](#54-c-scan--circular-scan)
   - [LOOK](#55-look)
   - [C-LOOK](#56-c-look)
6. [Goals of Disk Scheduling](#6-goals-of-disk-scheduling)

---

## 1. Introduction

This project is an interactive web-based visualizer designed to simulate and compare different disk scheduling algorithms.

Disk scheduling is an important part of operating systems. When multiple I/O requests arrive, the OS must decide the order in which they are served. The choice of algorithm directly affects seek time, latency, and throughput.

This tool allows users to:

* Input disk request sequences
* Choose different scheduling algorithms
* Visualize head movements
* Compare total seek time
* Understand algorithm behavior through graphical representation

The purpose of this project is to provide conceptual clarity through visualization rather than just theoretical explanation.

---

## 2. Features

* Interactive UI for entering disk requests
* Visualization of disk head movement
* Seek time comparison
* Multiple algorithm support
* Clean and responsive frontend

---

## 3. Tech Stack

| Technology | Description         |
| ---------- | ------------------- |
| React      | Frontend UI Library |
| Express.js | Backend Framework   |
| Chart.js   | Data Visualization  |
| Vite       | Frontend Build Tool |
| Node.js    | Runtime Environment |

---

## 4. Local Setup

### Frontend Setup

Navigate to the frontend directory:

```
cd frontend
```

Install dependencies:

```
npm install
```

Start development server:

```
npm run dev
```

---

### Backend Setup

Navigate to the backend directory:

```
cd backend
```

Install dependencies:

```
npm install
```

Start the backend server:

```
npm start
```

---

## 5. Disk Scheduling Algorithms

### 5.1 FCFS – First Come First Serve

The simplest disk scheduling algorithm.

* Requests are served in the order they arrive.
* Easy to implement.
* Can result in high total seek time.
* No starvation.
* Poor average response time compared to optimized algorithms.

---

### 5.2 SSTF – Shortest Seek Time First

* Selects the request closest to the current head position.
* Reduces average seek time.
* May cause starvation for distant requests.
* Greedy approach.

---

### 5.3 SCAN – Elevator Algorithm

* The disk arm moves in one direction servicing all requests.
* When it reaches the end, it reverses direction.
* Provides better performance than FCFS.
* More predictable wait time.

---

### 5.4 C-SCAN – Circular SCAN

* Head moves in one direction only.
* After reaching the end, it jumps back to the beginning.
* Provides uniform waiting time.
* Better fairness compared to SCAN.

---

### 5.5 LOOK

* Similar to SCAN.
* Head only moves up to the last request in that direction.
* Does not go to the physical end of disk unnecessarily.
* Reduces unnecessary head movement.

---

### 5.6 C-LOOK

* Circular version of LOOK.
* Moves only up to the last request in current direction.
* Jumps to the farthest request at the other end.
* More efficient than C-SCAN in many cases.

---

## 6. Goals of Disk Scheduling

The primary objectives of disk scheduling algorithms are:

### Minimize Seek Time

Reduce the time required to move the disk head to the requested track.

### Maximize Throughput

Serve maximum I/O requests per unit time.

### Minimize Latency

Reduce rotational delay required for sector positioning.

---

## Why This Project Matters

Understanding disk scheduling conceptually is not enough. Visualizing how head movement changes across algorithms builds deeper intuition about performance tradeoffs.

This project helps bridge theory and practical understanding.
