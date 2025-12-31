export interface EmergencyCase {
  caseId: string;
  emergencyType: string;
  patientInfo: any;
  location: any;
  severity: string;
  timestamp: string;
  status: string;
  assignedDoctor: string;
}

export interface EmergencyCaseRepository {
  create(caseRecord: EmergencyCase): Promise<EmergencyCase>;
}

/**
 * Mock implementation of EmergencyCaseRepository.
 *
 * IMPORTANT: This implementation stores data in memory.
 * In a serverless environment (like Vercel), this data WILL BE LOST
 * when the function execution context is recycled.
 *
 * TODO: Replace this with a real database adapter (e.g., PostgreSQL, MongoDB, DynamoDB)
 * when a persistent storage system is available.
 */
export class MockEmergencyCaseRepository implements EmergencyCaseRepository {
  private cases: EmergencyCase[] = [];

  async create(caseRecord: EmergencyCase): Promise<EmergencyCase> {
    // In a real application, this would save to a database.
    // For now, we simulate persistence by storing in memory (which is transient)
    // and logging the action.
    this.cases.push(caseRecord);
    console.log(`[MockDB] Emergency case stored: ${caseRecord.caseId}`);

    // In production with a real DB, you would do something like:
    // await db.emergencyCases.create({ data: caseRecord });

    return caseRecord;
  }
}

// Singleton instance for the application to use
// When a real DB is added, swap this export with the real repository instance.
export const emergencyCaseRepository = new MockEmergencyCaseRepository();
