// js/db.js

export class Database {
  constructor(storageKey = "devflow_db") {
    this.storageKey = storageKey;
    this.data = this.load();
    if (!this.data) {
      this.data = this.seed();
    }
  }

  load() {
    try {
      const serialized = localStorage.getItem(this.storageKey);
      return serialized ? JSON.parse(serialized) : null;
    } catch (e) {
      console.error("Failed to read localStorage:", e);
      return null;
    }
  }

  save() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    } catch (e) {
      console.error("Failed to write to localStorage:", e);
    }
  }

  seed() {
    const seedData = {
      users: [
        {
          id: 1,
          name: "DevExpert",
          email: "expert@devflow.com",
          password: "admin123", // Storing in plaintext for client-side local DB simulation
          reputation: 150,
          questionsCount: 0,
          answersCount: 0,
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          name: "GuestDev",
          email: "guest@devflow.com",
          password: "guest123",
          reputation: 1,
          questionsCount: 0,
          answersCount: 0,
          createdAt: new Date().toISOString()
        }
      ],
      questions: [],
      answers: [],
      comments: [],
      currentUser: null // Stores active user record if logged in
    };
    
    this.data = seedData;
    this.save();
    return seedData;
  }

  // Collection CRUD Operations
  getCollection(collectionName) {
    return this.data[collectionName] || [];
  }

  insert(collectionName, record) {
    if (!this.data[collectionName]) {
      this.data[collectionName] = [];
    }
    const collection = this.data[collectionName];
    const newId = collection.reduce((max, item) => item.id > max ? item.id : max, 0) + 1;
    
    const newRecord = {
      id: newId,
      ...record,
      createdAt: new Date().toISOString()
    };
    
    collection.push(newRecord);
    this.save();
    return newRecord;
  }

  findOne(collectionName, predicate) {
    const collection = this.getCollection(collectionName);
    return collection.find(predicate) || null;
  }

  findMany(collectionName, predicate) {
    const collection = this.getCollection(collectionName);
    return collection.filter(predicate);
  }

  update(collectionName, id, updates) {
    const collection = this.getCollection(collectionName);
    const index = collection.findIndex(item => item.id === id);
    if (index === -1) return null;

    collection[index] = {
      ...collection[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.save();
    return collection[index];
  }

  delete(collectionName, id) {
    if (!this.data[collectionName]) return false;
    const initialLength = this.data[collectionName].length;
    this.data[collectionName] = this.data[collectionName].filter(item => item.id !== id);
    const deleted = this.data[collectionName].length < initialLength;
    if (deleted) {
      this.save();
    }
    return deleted;
  }

  // Authentication Session Management
  getCurrentUser() {
    return this.data.currentUser || null;
  }

  setCurrentUser(user) {
    this.data.currentUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      reputation: user.reputation,
      questionsCount: user.questionsCount,
      answersCount: user.answersCount
    };
    this.save();
    return this.data.currentUser;
  }

  clearCurrentUser() {
    this.data.currentUser = null;
    this.save();
  }
}

// Export singleton instance
export const db = new Database();
