// ⚠️ UX-only mirror of backend filter
// NEVER relied on for security

const bannedPatterns = [
  /\b\d{8,14}\b/i,
  /\b(call|text me|contact|dm me)\b/i,
  /\b(whatsapp|telegram|instagram)\b/i,
  /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i,
  /\b(i live|i stay|my place|my house|address)\b/i,
  /\b(no\.?\s?\d+|house\s?\d+|flat\s?\d+)\b/i,
  /\b(street|road|avenue|close)\b/i,
  /\b(come here|come over|meet me|near me)\b/i,
  /\b(meet|make we meet|let us meet)\b/i,
  /\b(lagos|abuja|ibadan|lekki|ikeja|yaba)\b/i,
];

export function containsBannedContentClient(text: string) {
  return bannedPatterns.some((p) => p.test(text.toLowerCase()));
}
