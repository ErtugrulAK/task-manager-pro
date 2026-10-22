# Deployment Guide

This document provides step-by-step instructions for building and deploying the Task Manager application using Firebase Hosting and Cloud Functions.

## Prerequisites

Ensure you have the Firebase CLI installed and are authenticated:

```bash
npm install -g firebase-tools
firebase login
```

Also deploy the security rules and the Firestore composite index; without them the
auth-gated queries in `TaskList.js` fail (reads denied / missing-index error):

```bash
firebase deploy --only firestore:rules,firestore:indexes
```

(`firestore.indexes.json` declares the `userId + status + createdAt` index that the
Pending/Completed filters require.)

---

## Deployment Options

### 1. Frontend Only (Firebase Hosting)

To build and deploy only the React client application:

```bash
cd client
npm run build
cd ..
firebase deploy --only hosting
```

### 2. Backend Only (Firebase Cloud Functions)

To deploy only the Cloud Functions (from the `task-manager-pro` directory):

```bash
firebase deploy --only functions
```

### 3. Full Stack Deployment (Frontend & Backend)

To perform a complete deployment of both the React client and Cloud Functions:

```bash
cd client
npm run build
cd ..
firebase deploy
```
