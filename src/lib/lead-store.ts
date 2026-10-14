import fs from 'fs/promises';
import path from 'path';
import { LeadRecord } from './types';

const DATA_DIR = path.join(process.cwd(), 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    // Already exists or permission handled
  }
}

export async function getLeads(): Promise<LeadRecord[]> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(LEADS_FILE, 'utf-8');
    return JSON.parse(data) as LeadRecord[];
  } catch {
    return [];
  }
}

export async function saveLead(lead: LeadRecord): Promise<void> {
  await ensureDataDir();
  const leads = await getLeads();
  // Check for duplicate recent submission with same mobile or email in last 2 minutes
  const recentDuplicate = leads.find(
    (l) =>
      l.mobile === lead.mobile &&
      new Date(l.createdAt).getTime() > new Date(lead.createdAt).getTime() - 2 * 60 * 1000
  );
  if (recentDuplicate) {
    throw new Error('Duplicate submission detected. Please wait a moment before trying again.');
  }

  leads.unshift(lead); // newest first
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
}

export async function updateLeadEmailStatus(
  id: string,
  status: LeadRecord['emailStatus'],
  error?: string
): Promise<void> {
  try {
    const leads = await getLeads();
    const target = leads.find((l) => l.id === id);
    if (target) {
      target.emailStatus = status;
      if (error) target.emailError = error;
      await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('Failed to update lead status:', err);
  }
}
